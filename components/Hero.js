"use client"
import { useState } from "react";
import { Sparkles, Clipboard, Loader2, Check } from "lucide-react";
import config from "@/config";

const Hero = () => {
  const [text, setText] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionResult, setDetectionResult] = useState(null);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const maxWords = 500;
  
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      setDetectionResult(null);
      setError(null);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  const handleDetect = async () => {
    if (!text.trim() || wordCount > maxWords) return;

    setIsDetecting(true);
    setError(null);
    setDetectionResult(null);
    setShowResults(true);

    try {
      const response = await fetch('/api/detect-500', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setError('Rate limit exceeded. Please try again later or sign up for unlimited checks.');
        } else {
          setError(data.error || 'Detection failed');
        }
        setShowResults(false);
        return;
      }

      setDetectionResult(data);
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Detection error:', err);
      setShowResults(false);
    } finally {
      setIsDetecting(false);
    }
  };

  const handleHumanize = () => {
    window.location.href = "/dashboard";
  };

  const handleReset = () => {
    setText('');
    setDetectionResult(null);
    setError(null);
    setShowResults(false);
  };

  // Single column view (no results)
  if (!showResults) {
    return (
      <section className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 px-6 py-24 lg:py-32 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium">
            <span className="w-2 h-2 rounded-full text-emerald-500 animate-pulse" />
            Trusted by 10,000+ writers
          </div>

          {/* Headline */}
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-slate-900">
            Make AI Text Sound{" "}
            <span className="text-emerald-600">Human</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl">
            Transform AI-generated content into natural, human-like writing that bypasses AI detectors.
          </p>

          {/* Single Input Card */}
          <div className="w-full mt-6">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-slate-100">
                <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  Your Text
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-md font-medium">Default</span>
                </h3>
                <button
                  onClick={handlePaste}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <Clipboard className="w-4 h-4" />
                  Paste Text
                </button>
              </div>

              {/* Textarea */}
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setDetectionResult(null);
                  setError(null);
                }}
                placeholder="Paste your text here..."
                className="flex-1 w-full resize-none p-6 text-slate-800 text-base focus:outline-none bg-white min-h-[240px] placeholder:text-slate-400"
              />

              {/* Footer */}
              <div className="flex justify-between items-center px-6 pb-6 pt-4 border-t border-slate-100">
                <span className={`text-sm font-medium ${wordCount > maxWords ? 'text-red-500' : 'text-slate-400'}`}>
                  {wordCount} / {maxWords} words
                </span>
                <div className="flex gap-3">
                  <button 
                    onClick={handleDetect}
                    disabled={!text.trim() || wordCount > maxWords || isDetecting}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
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
                    disabled={!text.trim() || wordCount > maxWords}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Humanize
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}
            
            <p className="text-sm text-slate-500 mt-4 text-center">
              {config.appName} converts your AI text into readable, human-like content instantly.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Bypass AI Detectors</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Natural Writing Style</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Two column layout with results
  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 px-6 py-24 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-4 text-slate-900">
            Make AI Text Sound <span className="text-emerald-600">Human</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto">
            Transform AI-generated content into natural, human-like writing that bypasses AI detectors.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
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
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setDetectionResult(null);
                  setError(null);
                }}
                placeholder="Paste your text here..."
                className="w-full resize-none p-4 text-slate-800 text-base focus:outline-none border border-slate-200 rounded-xl min-h-[400px] placeholder:text-slate-400"
              />

              <div className="flex justify-between items-center mt-4">
                <span className={`text-sm font-medium ${wordCount > maxWords ? 'text-red-500' : 'text-slate-400'}`}>
                  {wordCount} / {maxWords} words
                </span>
                <div className="flex gap-3">
                  <button 
                    onClick={handleDetect}
                    disabled={!text.trim() || wordCount > maxWords || isDetecting}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
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
                    disabled={!text.trim() || wordCount > maxWords}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Humanize
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-slate-900">Result</h3>
              </div>

              {/* Error State */}
              {error && (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  <div className="text-4xl mb-4">⚠️</div>
                  <p className="text-red-500 font-semibold">{error}</p>
                  <button onClick={handleReset} className="mt-4 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    Try Again
                  </button>
                </div>
              )}

              {/* Loading State */}
              {!detectionResult && !error && isDetecting && (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-12 h-12 rounded-full border-2 border-slate-200 border-t-emerald-500 animate-spin mb-4"></div>
                  <p className="text-slate-500">Analyzing text...</p>
                </div>
              )}

              {/* Detection Results */}
              {detectionResult && !error && (
                <div className="space-y-6 min-h-[400px]">
                  {/* Human Score Display */}
                  <div className="text-center py-8">
                    <div className="text-6xl font-bold text-slate-900 mb-2">
                      {Math.round(100 - detectionResult.score)}%
                    </div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                      HUMAN WRITTEN
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-2.5 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all duration-500 rounded-full"
                      style={{ width: `${Math.round(100 - detectionResult.score)}%` }}
                    ></div>
                  </div>

                  {/* Detector Badges */}
                  {detectionResult.details && (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {Object.entries(detectionResult.details).slice(0, 5).map(([detector, humanScore]) => {
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
                            <div key={detector} className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-slate-50 rounded-lg">
                              <span className="text-xs">{icon}</span>
                              <span className={colorClass}>{detector}</span>
                            </div>
                          );
                        })}
                      </div>

                      {Object.entries(detectionResult.details).length > 5 && (
                        <div className="flex flex-wrap gap-2 justify-center">
                          {Object.entries(detectionResult.details).slice(5).map(([detector, humanScore]) => {
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
                              <div key={detector} className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-slate-50 rounded-lg">
                                <span className="text-xs">{icon}</span>
                                <span className={colorClass}>{detector}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Reset Button */}
                  <button
                    onClick={handleReset}
                    className="w-full py-2.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Start New
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Bypass AI Detectors</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Natural Writing Style</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Instant Results</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;