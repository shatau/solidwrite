'use client';

import { useState, useEffect } from 'react';
import { Sparkles, FileText, Copy, Check, Clipboard, Loader2, Shield } from 'lucide-react';

export default function TextHumanizer({ onCreditsUpdate, initialCredits, userPlan = 'free' }) {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [isDetecting, setIsDetecting] = useState(false);
    const [isHumanizing, setIsHumanizing] = useState(false);
    const [detectionResult, setDetectionResult] = useState(null);
    const [copied, setCopied] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;
    const outputWordCount = outputText.trim().split(/\s+/).filter(Boolean).length;

    const getWordLimit = () => {
        const plan = (userPlan || 'free').toLowerCase();
        switch (plan) {
            case 'basic': return 500;
            case 'pro': return 1500;
            case 'ultra': return 3000;
            default: return 500;
        }
    };

    const maxWords = getWordLimit();
    const minWords = 50;
    const isProcessing = isDetecting || isHumanizing;

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setInputText(text);
            // Auto-reset results when new text is pasted
            setOutputText('');
            setDetectionResult(null);
            setShowResults(false);
        } catch (error) {
            console.error('Failed to paste:', error);
        }
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
        // Auto-reset results when text is edited
        if (showResults) {
            setOutputText('');
            setDetectionResult(null);
            setShowResults(false);
        }
    };

    const handleDetect = async () => {
        if (!inputText.trim()) return;

        if (wordCount < minWords) {
            alert(`Minimum ${minWords} words required. Current: ${wordCount} words.`);
            return;
        }

        if (wordCount > maxWords) {
            alert(`Your ${userPlan?.toUpperCase() || 'FREE'} plan allows up to ${maxWords} words per request. Current: ${wordCount} words.`);
            return;
        }

        setIsDetecting(true);
        setDetectionResult(null);
        setOutputText('');
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

        if (wordCount < minWords) {
            alert(`Minimum ${minWords} words required. Current: ${wordCount} words.`);
            return;
        }

        if (wordCount > maxWords) {
            alert(`Your ${userPlan?.toUpperCase() || 'FREE'} plan allows up to ${maxWords} words per request. Current: ${wordCount} words.`);
            return;
        }

        setIsHumanizing(true);
        setOutputText('');
        setDetectionResult(null);
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



    // Single box view (initial state)
    if (!showResults) {
        return (
            <div className="w-full mx-auto max-w-4xl">


                <div className="text-center mb-12">
                    <h1 className="text-5xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-gray-900 max-w-5xl mx-auto leading-[1.1] mb-8">
                        Make AI Text Sound
                        <span className="relative mx-3">
                            <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Human
                            </span>
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-200" viewBox="0 0 200 12" preserveAspectRatio="none">
                                <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Transform AI-generated content into natural, authentic writing that bypasses all major AI detectors — instantly.
                    </p>
                </div>
               
                {/* Single Input Card */}
                <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/60 border border-gray-300 overflow-hidden">
                    <div className="p-6 sm:p-8">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <h3 className="text-sm font-medium text-gray-600">Your Text</h3>
                            </div>
                            <button
                                onClick={handlePaste}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <Clipboard className="w-4 h-4" />
                                Paste
                            </button>
                        </div>

                        <textarea
                            value={inputText}
                            onChange={handleInputChange}
                            placeholder="Paste your AI-generated text here to check or humanize it..."
                            className="w-full h-80 resize-none text-gray-800 text-base leading-relaxed focus:outline-none bg-white placeholder:text-gray-400"
                        />

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${wordCount < minWords ? 'text-amber-600' :
                                        wordCount > maxWords ? 'text-red-500' :
                                            'text-gray-500'
                                    }`}>
                                    {wordCount.toLocaleString()} / {maxWords.toLocaleString()} words
                                </span>
                                {wordCount < minWords && wordCount > 0 && (
                                    <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full font-medium">
                                        Min {minWords} words
                                    </span>
                                )}
                                {wordCount > maxWords && (
                                    <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">Over limit</span>
                                )}
                            </div>

                            <div className="flex gap-3 w-full sm:w-auto">
                                <button
                                    onClick={handleDetect}
                                    disabled={!inputText.trim() || wordCount < minWords || wordCount > maxWords || isProcessing}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-xl text-sm font-semibold transition-all"
                                >
                                    {isDetecting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Shield className="w-4 h-4" />
                                            Check AI Score
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={handleHumanize}
                                    disabled={!inputText.trim() || wordCount < minWords || wordCount > maxWords || isProcessing}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-all shadow-sm shadow-blue-600/20"
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
        <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-6xl font-extrabold tracking-tight text-gray-900 max-w-5xl mx-auto leading-[1.1] mb-8">
                Make AI Text Sound
                <span className="relative mx-3">
                    <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Human
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-200" viewBox="0 0 200 12" preserveAspectRatio="none">
                        <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Transform AI-generated content into natural, authentic writing that bypasses all major AI detectors — instantly.
            </p>
        </div>
            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {/* Left Column - Input */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <span className="text-sm font-semibold text-gray-900">Your Text</span>
                        <button
                            onClick={handlePaste}
                            disabled={isProcessing}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Clipboard className="w-4 h-4" />
                        </button>
                    </div>

                    <textarea
                        value={inputText}
                        onChange={handleInputChange}
                        disabled={isProcessing}
                        placeholder="Paste your text here..."
                        className="w-full resize-none p-6 text-gray-800 text-base focus:outline-none min-h-[400px] placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${wordCount < minWords ? 'text-amber-600' :
                                    wordCount > maxWords ? 'text-red-500' :
                                        'text-gray-500'
                                }`}>
                                {wordCount.toLocaleString()} / {maxWords.toLocaleString()} words
                            </span>
                            {wordCount < minWords && wordCount > 0 && (
                                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full font-medium">
                                    Min {minWords}
                                </span>
                            )}
                            {wordCount > maxWords && (
                                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">Over limit</span>
                            )}
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button
                                onClick={handleDetect}
                                disabled={!inputText.trim() || wordCount < minWords || wordCount > maxWords || isProcessing}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-xl text-sm font-semibold transition-all"
                            >
                                {isDetecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                                {isDetecting ? "Checking..." : "Check AI"}
                            </button>
                            <button
                                onClick={handleHumanize}
                                disabled={!inputText.trim() || wordCount < minWords || wordCount > maxWords || isProcessing}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-all"
                            >
                                <Sparkles className="w-4 h-4" />
                                Humanize
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Results */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <span className="text-sm font-semibold text-gray-900">Result</span>
                        {outputText && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                                <Check className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-semibold text-green-600">Human written</span>
                            </div>
                        )}
                    </div>

                    <div className="p-6 min-h-[400px] flex flex-col">
                        {/* Loading */}
                        {!detectionResult && !outputText && (isDetecting || isHumanizing) && (
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 rounded-full border-2 border-gray-100 border-t-blue-500 animate-spin mb-4" />
                                <p className="text-gray-500 font-medium">
                                    {isDetecting ? 'Analyzing your text...' : 'Humanizing your text...'}
                                </p>
                            </div>
                        )}

                        {/* Detection Results */}
                        {detectionResult && !outputText && (
                            <div className="flex-1 flex flex-col">
                                <div className="text-center py-8">
                                    <div className="text-7xl font-bold text-gray-900 mb-2">
                                        {detectionResult.displayHumanScore}%
                                    </div>
                                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                        Human Score
                                    </div>
                                </div>

                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden mb-6">
                                    <div
                                        className="h-3 rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500 transition-all duration-700"
                                        style={{ width: `${detectionResult.displayHumanScore}%` }}
                                    />
                                </div>

                                {detectionResult.detectorScores && (
                                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                                        {detectionResult.detectorScores.map((detector, index) => {
                                            const { humanScore } = detector;
                                            const passed = humanScore >= 60;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg ${passed ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                                                        }`}
                                                >
                                                    <span>{passed ? '✓' : '✗'}</span>
                                                    <span className="font-medium">{detector.name}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Humanized Output */}
                        {outputText && (
                            <div className="flex-1 flex flex-col">
                                <textarea
                                    value={outputText}
                                    readOnly
                                    className="flex-1 w-full resize-none text-gray-800 text-base focus:outline-none border border-gray-200 rounded-xl p-4 bg-gray-50 mb-4"
                                />

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-sm text-gray-500">{outputWordCount} words</span>
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4 text-green-500" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}