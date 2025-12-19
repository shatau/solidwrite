import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Count words and enforce 200 word limit
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    
    if (wordCount > 200) {
      return NextResponse.json(
        { 
          error: 'Text exceeds maximum length',
          message: 'Please limit your text to 200 words or less.',
          wordCount,
          maxWords: 200
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.UNDETECTABLE_AI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Step 1: Submit text for detection
    const detectResponse = await fetch('https://ai-detect.undetectable.ai/detect', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        key: apiKey,
        model: 'xlm_ud_detector',
        retry_count: 0
      }),
    });

    if (!detectResponse.ok) {
      const errorData = await detectResponse.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.detail || 'Failed to submit text for detection' },
        { status: detectResponse.status }
      );
    }

    const detectData = await detectResponse.json();
    const documentId = detectData.id;

    // Step 2: Poll for results
    const maxAttempts = 15;
    const pollInterval = 2000;
    let attempts = 0;
    let queryData = null;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));

      const queryResponse = await fetch('https://ai-detect.undetectable.ai/query', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: documentId
        }),
      });

      if (!queryResponse.ok) {
        return NextResponse.json(
          { error: 'Failed to query detection status' },
          { status: queryResponse.status }
        );
      }

      queryData = await queryResponse.json();

      if (queryData.status === 'done') {
        break;
      }

      if (queryData.status === 'failed') {
        return NextResponse.json(
          { error: 'Detection processing failed' },
          { status: 500 }
        );
      }

      attempts++;
    }

    if (!queryData || queryData.status !== 'done') {
      return NextResponse.json(
        { error: 'Detection timeout - please try again' },
        { status: 408 }
      );
    }

    // Step 3: Process and return results
    const { result, result_details } = queryData;
    
    const aiScore = parseFloat(result || 0);
    const humanScore = 100 - aiScore;
    const isAI = aiScore > 50;
    
    const distance = Math.abs(50 - aiScore);
    let confidence;
    if (distance > 30) {
      confidence = 'High';
    } else if (distance > 20) {
      confidence = 'Medium';
    } else {
      confidence = 'Low';
    }

    const humanReadable = isAI ? 'AI-generated' : 'Human-written';
    
    const details = result_details ? {
      Turnitin: Math.round(result_details.scoreOpenAI || 0),
      GptZero: Math.round(result_details.scoreGptZero || 0),
      OpenAI: Math.round(result_details.scoreOpenAI || 0),
      Writer: Math.round(result_details.scoreWriter || 0),
      CrossPlag: Math.round(result_details.scoreCrossPlag || 0),
      CopyLeaks: Math.round(result_details.scoreCopyLeaks || 0),
      Sapling: Math.round(result_details.scoreSapling || 0),
      Originality: Math.round(result_details.scoreContentAtScale || 0),
      ZeroGPT: Math.round(result_details.scoreZeroGPT || 0),
    } : null;

    return NextResponse.json({
      isAI,
      score: aiScore,
      humanScore,
      confidence,
      humanReadable,
      details,
      wordCount
    });
  
  } catch (error) {
    console.error('Detection API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}