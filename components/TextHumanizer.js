'use client';

import { useState, useEffect } from 'react';
import { Sparkles, FileText, Copy, Check, Clipboard, Loader2 } from 'lucide-react';

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
        switch(plan) {
            case 'basic': return 500;
            case 'pro': return 1500;
            case 'ultra': return 3000;
            default: return 500;
        }
    };

    const maxWords = getWordLimit();

    useEffect(() => {
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
            <div className="w-full mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Solid Write converts your AI-generated content into fully humanized, undetectable writing—ensuring it passes every AI detection tool
                    </p>
                </div>

                {/* Single Input Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                    <div className="p-6 sm:p-8">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-base font-semibold text-slate-900">Your Text</h3>
                            <button
                                onClick={handlePaste}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                <Clipboard className="w-4 h-4" />
                                Paste Text
                            </button>
                        </div>

                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Paste your text here..."
                            className="w-full h-80 resize-none text-slate-800 text-base focus:outline-none placeholder:text-slate-400 border border-slate-200 rounded-xl p-4"
                        />

                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${wordCount > maxWords ? 'text-red-500' : 'text-slate-400'}`}>
                                    {wordCount.toLocaleString()} / {maxWords.toLocaleString()} words
                                </span>
                                {wordCount > maxWords && (
                                    <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">Over limit</span>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleDetect}
                                    disabled={!inputText.trim() || isDetecting || wordCount > maxWords}
                                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 rounded-xl text-sm font-medium transition-all min-w-[140px]"
                                >
                                    {isDetecting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
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
                                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all min-w-[140px]"
                                >
                                    {isHumanizing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
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
        <div className="w-full mx-auto">
            {/* Header with CTA */}
            <div className="text-center mb-8">
                <p className="text-base text-slate-600 max-w-2xl mx-auto mb-6">
                    Solid Write converts your AI-generated content into fully humanized, undetectable writing—ensuring it passes every AI detection tool
                </p>
                <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all">
                    Get more words
                </button>
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Input */}
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-base font-semibold text-slate-900">Your Text</h3>
                            <button
                                onClick={handlePaste}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                <Clipboard className="w-4 h-4" />
                            </button>
                        </div>

                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Paste your text here..."
                            className="w-full h-96 resize-none text-slate-800 text-base focus:outline-none placeholder:text-slate-400 border border-slate-200 rounded-xl p-4"
                        />

                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${wordCount > maxWords ? 'text-red-500' : 'text-slate-400'}`}>
                                    {wordCount.toLocaleString()} / {maxWords.toLocaleString()} words
                                </span>
                                {wordCount > maxWords && (
                                    <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">Over limit</span>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleDetect}
                                    disabled={!inputText.trim() || isDetecting || wordCount > maxWords}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 rounded-xl text-sm font-medium transition-all"
                                >
                                    {isDetecting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Checking...
                                        </>
                                    ) : (
                                        'Check for AI'
                                    )}
                                </button>

                                <button
                                    onClick={handleHumanize}
                                    disabled={!inputText.trim() || isHumanizing || wordCount > maxWords}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all"
                                >
                                    {isHumanizing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
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
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-base font-semibold text-slate-900">Result</h3>
                            {outputText && (
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4 text-emerald-500" />
                                            Copied!
                                        </>
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Detection Results */}
                        {detectionResult && !outputText ? (
                            <div className="space-y-6 h-96 overflow-y-auto">
                                <div className="text-center py-8">
                                    <div className="text-6xl font-bold text-slate-900 mb-2">
                                        {detectionResult.displayHumanScore}%
                                    </div>
                                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                                        HUMAN WRITTEN
                                    </div>
                                </div>

                                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className="h-2.5 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all duration-500 rounded-full"
                                        style={{ width: `${detectionResult.displayHumanScore}%` }}
                                    ></div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {detectionResult.detectorScores && detectionResult.detectorScores.slice(0, 5).map((detector, index) => {
                                            const { humanScore } = detector;
                                            let icon = '⚠️';
                                            let colorClass = 'text-amber-600';

                                            if (humanScore >= 60) {
                                                icon = '✅';
                                                colorClass = 'text-emerald-600';
                                            } else if (humanScore < 40) {
                                                icon = '⛔';
                                                colorClass = 'text-red-500';
                                            }

                                            return (
                                                <div key={index} className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-slate-50 rounded-lg">
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
                                                let colorClass = 'text-amber-600';

                                                if (humanScore >= 60) {
                                                    icon = '✅';
                                                    colorClass = 'text-emerald-600';
                                                } else if (humanScore < 40) {
                                                    icon = '⛔';
                                                    colorClass = 'text-red-500';
                                                }

                                                return (
                                                    <div key={index} className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-slate-50 rounded-lg">
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
                                className="w-full h-96 resize-none text-slate-800 text-base focus:outline-none border border-slate-200 rounded-xl p-4 bg-slate-50"
                            />
                        ) : (
                            /* Loading or Error State */
                            <div className="flex flex-col items-center justify-center h-96">
                                {isDetecting || isHumanizing ? (
                                    <>
                                        <div className="w-12 h-12 rounded-full border-2 border-slate-200 border-t-emerald-500 animate-spin mb-4"></div>
                                        <p className="text-slate-500">
                                            {isDetecting ? 'Analyzing text...' : 'Humanizing text...'}
                                        </p>
                                    </>
                                ) : (
                                    <div className="text-center">
                                        <div className="text-4xl mb-4">⚠️</div>
                                        <p className="text-red-500 font-semibold">Something went wrong. Try again.</p>
                                        <p className="text-sm text-slate-500 mt-2">Insufficient balance</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Reset Button */}
                        {(detectionResult || outputText) && (
                            <button
                                onClick={handleReset}
                                className="w-full mt-4 py-2.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
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