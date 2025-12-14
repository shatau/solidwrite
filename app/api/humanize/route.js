import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/auth"
import { deductCredits, checkCredits } from "@/libs/creditManager";
import { NextResponse } from 'next/server';

const apiKey = process.env.UNDETECTABLE_AI_API_KEY;

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { text, readability, purpose, strength } = await req.json();

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: 'Text must be at least 50 characters long' },
        { status: 400 }
      );
    }

    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

    const creditCheck = await checkCredits(session.user.id, wordCount);
    
    if (!creditCheck.hasEnough) {
      return NextResponse.json(
        { 
          error: 'Insufficient credits',
          required: wordCount,
          available: creditCheck.current
        },
        { status: 402 }
      );
    }

    // Step 1: Submit document for humanization
    const submitResponse = await fetch('https://humanize.undetectable.ai/submit', {
      method: 'POST',
      headers: {
        'apikey': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: text,
        readability: readability || 'University',
        purpose: purpose || 'General Writing',
        strength: strength || 'More Human',
        model: 'v11'
      }),
    });

    if (!submitResponse.ok) {
      const errorData = await submitResponse.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || 'Failed to submit text for humanization' },
        { status: submitResponse.status }
      );
    }

    const submitData = await submitResponse.json();
    const documentId = submitData.id;

    // Step 2: Poll for results
    const maxAttempts = 30;
    const pollInterval = 2000;
    let attempts = 0;
    let documentData = null;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));

      const documentResponse = await fetch('https://humanize.undetectable.ai/document', {
        method: 'POST',
        headers: {
          'apikey': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: documentId
        }),
      });

      if (!documentResponse.ok) {
        return NextResponse.json(
          { error: 'Failed to retrieve humanized document' },
          { status: documentResponse.status }
        );
      }

      documentData = await documentResponse.json();

      if (documentData.output) {
        break;
      }

      attempts++;
    }

    if (!documentData || !documentData.output) {
      return NextResponse.json(
        { error: 'Humanization timeout - please try again' },
        { status: 408 }
      );
    }

    const creditResult = await deductCredits(session.user.id, wordCount);

    return NextResponse.json({
      success: true,
      output: documentData.output,
      input: documentData.input,
      creditsUsed: wordCount,
      remainingCredits: creditResult.remainingCredits
    });

  } catch (error) {
    if (error.message === 'Insufficient credits') {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 402 }
      );
    }
    
    console.error('Humanization API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}