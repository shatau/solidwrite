'use client';

import { useState, useEffect } from 'react';
import { Sparkles, FileText, Copy, Check, Clipboard } from 'lucide-react';

export default function TextHumanizer({ onCreditsUpdate, initialCredits, userPlan = 'free' }) {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isDetecting, setIsDetecting] = useState(false);
    const [isHumanizing, setIsHumanizing] = useState(false);
    const [detectionResult, setDetectionResult] = useState(null);
    const [copied, setCopied] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;

    // Get word limit based on plan
    const getWordLimit = () => {
        const plan = (userPlan || 'free').toLowerCase();
        console.log('Current plan:', plan); // Debug
        switch(plan) {
            case 'basic': return 500;
            case 'pro': return 1500;
            case 'ultra': return 3000;
            default: return 500; // free plan
        }
    };

    const maxWords = getWordLimit();

    // Debug - log when plan changes
    useEffect(() => {
        console.log('Plan updated:', userPlan, 'Max words:', maxWords);
    }, [userPlan, maxWords]);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setInputText(text);
        } catch (error) {
            console.error('Failed to paste:', error);
        }
    };

    const handleDetect = async () => {
        if (!inputText.trim()) return;

        if (wordCount > maxWords) {
            alert(`Your ${userPlan?.toUpperCase() || 'FREE'} plan allows up to ${maxWords} words per request. Current: ${wordCount} words.`);
            return;
        }

        setIsDetecting(true);
        setDetectionResult(null);
        setShowResults(true);

        try {
            const response = await fetch('/api/detect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputText }),
            });

            const data = await response.json();

            if (response.status === 402) {
                alert(`Insufficient credits. Required: ${data.required}, Available: ${data.available}`);
                setShowResults(false);
                return;
            }

            if (!response.ok) {
                throw new Error(data.error || 'Detection failed');
            }

            // Update credits via callback instead of fetching
            if (onCreditsUpdate && data.remainingCredits !== undefined) {
                onCreditsUpdate(data.remainingCredits);
            }

            const detectorScores = data.details
                ? Object.entries(data.details).map(([name, humanScore]) => ({
                    name,
                    humanScore: Math.round(humanScore),
                    aiScore: Math.round(100 - humanScore)
                }))
                : [];

            setDetectionResult({
                ...data,
                detectorScores,
                displayHumanScore: Math.round(data.humanScore || (100 - data.score))
            });
        } catch (error) {
            console.error('Detection error:', error);
            alert(error.message || 'Failed to detect AI content. Please try again.');
            setShowResults(false);
        } finally {
            setIsDetecting(false);
        }
    };

    const handleHumanize = async () => {
        if (!inputText.trim()) return;

        if (inputText.trim().length < 50) {
            alert('Text must be at least 50 characters long for humanization');
            return;
        }

        if (wordCount > maxWords) {
            alert(`Your ${userPlan?.toUpperCase() || 'FREE'} plan allows up to ${maxWords} words per request. Current: ${wordCount} words.`);
            return;
        }

        setIsHumanizing(true);
        setOutputText('');
        setShowResults(true);

        try {
            const response = await fetch('/api/humanize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: inputText }),
            });

            const data = await response.json();

            if (response.status === 402) {
                alert(`Insufficient credits. Required: ${data.required}, Available: ${data.available}`);
                setShowResults(false);
                return;
            }

            if (!response.ok) {
                throw new Error(data.error || 'Humanization failed');
            }

            setOutputText(data.output);
            
            // Update credits via callback instead of fetching
            if (onCreditsUpdate && data.remainingCredits !== undefined) {
                onCreditsUpdate(data.remainingCredits);
            }
        } catch (error) {
            console.error('Humanization error:', error);
            alert(error.message || 'Failed to humanize text. Please try again.');
            setShowResults(false);
        } finally {
            setIsHumanizing(false);
        }
    };

    const handleCopy = async () => {
        if (!outputText) return;

        await navigator.clipboard.writeText(outputText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setInputText('');
        setOutputText('');
        setDetectionResult(null);
        setCopied(false);
        setShowResults(false);
    };

    // Single box view (initial state)
    if (!showResults) {
        return (
            <div className="w-full mx-auto  max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Solid Write converts your AI-generated content into fully humanized, undetectable writing—ensuring it passes every AI detection tool
                    </p>
                    {/* <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-base-300 rounded-full">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium">
                            {userPlan ? `${userPlan.toUpperCase()} Plan` : 'FREE Plan'}: <span className="text-primary font-semibold">{maxWords.toLocaleString()}</span> words per request
                        </span>
                    </div> */}
                </div>

                {/* Single Input Card */}
                <div className="card bg-base-100 shadow-2xl">
                    <div className="card-body p-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">Your Text</h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handlePaste}
                                    className="btn btn-sm btn-ghost gap-2"
                                >
                                    <Clipboard className="w-4 h-4" />
                                    Paste Text
                                </button>
                            </div>
                        </div>

                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Paste your text here..."
                            className="textarea textarea-bordered w-full h-80 resize-none focus:outline-none focus:border-primary text-base"
                        />

                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-semibold ${wordCount > maxWords ? 'text-error' : 'text-base-content/60'}`}>
                                    {wordCount.toLocaleString()} / {maxWords.toLocaleString()} words
                                </span>
                                {wordCount > maxWords && (
                                    <span className="badge badge-error badge-sm">Over limit</span>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleDetect}
                                    disabled={!inputText.trim() || isDetecting || wordCount > maxWords}
                                    className="btn btn-primary gap-2 min-w-[140px]"
                                >
                                    {isDetecting ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Checking...
                                        </>
                                    ) : (
                                        <>
                                            <FileText className="w-4 h-4" />
                                            Check for AI
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleHumanize}
                                    disabled={!inputText.trim() || isHumanizing || wordCount > maxWords}
                                    className="btn btn-success text-white gap-2 min-w-[140px]"
                                >
                                    {isHumanizing ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4" />
                                            Humanize
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Two box view (results state)
    return (
        <div className="w-full bg-gradient-to-br from-amber-50 via-white to-orange-50 mx-auto">
            {/* Header with CTA */}
            <div className="text-center mb-8">
                {/* <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Humanize AI Text & Outsmart AI Detectors
                </h1> */}
                <p className="text-base text-base-content/70 max-w-2xl mx-auto mb-6">
                    Solid Write converts your AI-generated content into fully humanized, undetectable writing—ensuring it passes every AI detection tool
                </p>
                <button className="btn btn-success btn-lg text-white">
                    Get more words
                </button>
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Input */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body p-6">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold text-lg">Your Text</h3>
                            <button
                                onClick={handlePaste}
                                className="btn btn-sm btn-ghost gap-2"
                            >
                                <Clipboard className="w-4 h-4" />
                            </button>
                        </div>

                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Paste your text here..."
                            className="textarea textarea-bordered w-full h-96 resize-none focus:outline-none focus:border-primary"
                        />

                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-semibold ${wordCount > maxWords ? 'text-error' : 'text-base-content/60'}`}>
                                    {wordCount.toLocaleString()} / {maxWords.toLocaleString()} words
                                </span>
                                {wordCount > maxWords && (
                                    <span className="badge badge-error badge-sm">Over limit</span>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleDetect}
                                    disabled={!inputText.trim() || isDetecting || wordCount > maxWords}
                                    className="btn btn-primary btn-sm gap-2"
                                >
                                    {isDetecting ? (
                                        <>
                                            <span className="loading loading-spinner loading-xs"></span>
                                            Checking...
                                        </>
                                    ) : (
                                        <>
                                            Check for AI
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleHumanize}
                                    disabled={!inputText.trim() || isHumanizing || wordCount > maxWords}
                                    className="btn btn-success btn-sm text-white gap-2"
                                >
                                    {isHumanizing ? (
                                        <>
                                            <span className="loading loading-spinner loading-xs"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-4 h-4" />
                                            Humanize
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Output */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body p-6">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold text-lg">Result</h3>
                            {outputText && (
                                <button
                                    onClick={handleCopy}
                                    className="btn btn-sm btn-ghost gap-2"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Detection Results */}
                        {detectionResult && !outputText ? (
                            <div className="space-y-6 h-96 overflow-y-auto">
                                <div className="text-center py-8">
                                    <div className="text-6xl font-bold text-base-content mb-2">
                                        {detectionResult.displayHumanScore}%
                                    </div>
                                    <div className="text-base font-semibold text-base-content/70 uppercase tracking-wide">
                                        HUMAN WRITTEN
                                    </div>
                                </div>

                                <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="h-3 bg-gradient-to-r from-error via-warning to-success transition-all duration-500"
                                        style={{ width: `${detectionResult.displayHumanScore}%` }}
                                    ></div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {detectionResult.detectorScores && detectionResult.detectorScores.slice(0, 5).map((detector, index) => {
                                            const { humanScore } = detector;
                                            let icon = '⚠️';
                                            let colorClass = 'text-warning';

                                            if (humanScore >= 60) {
                                                icon = '✅';
                                                colorClass = 'text-success';
                                            } else if (humanScore < 40) {
                                                icon = '⛔';
                                                colorClass = 'text-error';
                                            }

                                            return (
                                                <div key={index} className="flex items-center gap-1 text-sm">
                                                    <span className="text-xs">{icon}</span>
                                                    <span className={colorClass}>{detector.name}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {detectionResult.detectorScores && detectionResult.detectorScores.length > 5 && (
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {detectionResult.detectorScores.slice(5).map((detector, index) => {
                                                const { humanScore } = detector;
                                                let icon = '⚠️';
                                                let colorClass = 'text-warning';

                                                if (humanScore >= 60) {
                                                    icon = '✅';
                                                    colorClass = 'text-success';
                                                } else if (humanScore < 40) {
                                                    icon = '⛔';
                                                    colorClass = 'text-error';
                                                }

                                                return (
                                                    <div key={index} className="flex items-center gap-1 text-sm">
                                                        <span className="text-xs">{icon}</span>
                                                        <span className={colorClass}>{detector.name}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : outputText ? (
                            /* Humanized Output */
                            <textarea
                                value={outputText}
                                readOnly
                                className="textarea textarea-bordered w-full h-96 resize-none"
                            />
                        ) : (
                            /* Loading or Error State */
                            <div className="flex flex-col items-center justify-center h-96">
                                {isDetecting || isHumanizing ? (
                                    <>
                                        <span className="loading loading-spinner loading-lg text-primary"></span>
                                        <p className="mt-4 text-base-content/60">
                                            {isDetecting ? 'Analyzing text...' : 'Humanizing text...'}
                                        </p>
                                    </>
                                ) : (
                                    <div className="text-center">
                                        <div className="text-4xl mb-4 text-error">⚠️</div>
                                        <p className="text-error font-semibold">Something went wrong. Try again.</p>
                                        <p className="text-sm text-base-content/60 mt-2">Insufficient balance</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Reset Button */}
                        {(detectionResult || outputText) && (
                            <button
                                onClick={handleReset}
                                className="btn btn-ghost btn-sm w-full mt-4"
                            >
                                Start New
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}