"use client"
import { useState } from "react";
import { Sparkles, Clipboard, Loader2 } from "lucide-react";
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
      <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50 px-6 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8">
          {/* Headline */}
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight">
            Make AI Text Sound Human
          </h1>
          <p className="text-lg lg:text-xl text-base-content/70 max-w-2xl">
            Transform AI-generated content into natural, human-like writing that bypasses AI detectors.
          </p>

          {/* Single Input Card */}
          <div className="w-full mt-6">
            <div className="card bg-white shadow-xl border border-base-200">
              <div className="card-body p-0">
                {/* Header */}
                <div className="flex justify-between items-center px-6 pt-6 pb-3 border-b border-base-200">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    Your Text
                    <span className="badge badge-ghost">Default</span>
                  </h3>
                  <button
                    onClick={handlePaste}
                    className="btn btn-sm btn-ghost gap-2"
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
                  className="flex-1 w-full resize-none p-6 text-base-content text-base focus:outline-none bg-white min-h-[240px]"
                />

                {/* Footer */}
                <div className="flex justify-between items-center px-6 pb-6 pt-3 border-t border-base-200">
                  <span className="text-sm text-base-content/60">
                    {wordCount} / {maxWords} words
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleDetect}
                      disabled={!text.trim() || wordCount > maxWords || isDetecting}
                      className="btn btn-primary btn-sm gap-2"
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
                      className="btn btn-primary btn-sm gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Humanize
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-error mt-4">
                <span>{error}</span>
              </div>
            )}
            
            <p className="text-sm text-base-content/60 mt-3 text-center">
              {config.appName} converts your AI text into readable, human-like content instantly.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-base-content/60">
            <div className="flex items-center gap-2">
              <span className="text-success text-lg">✓</span>
              <span>Bypass AI Detectors</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-success text-lg">✓</span>
              <span>Natural Writing Style</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-success text-lg">✓</span>
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Two column layout with results
  return (
    <section className="bg-base-100 px-6 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-4">
            Make AI Text Sound Human
          </h1>
          <p className="text-lg lg:text-xl text-base-content/70 max-w-2xl mx-auto">
            Transform AI-generated content into natural, human-like writing that bypasses AI detectors.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Input */}
          <div className="card bg-white shadow-xl border border-base-200">
            <div className="card-body p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Your Text</h3>
                <button
                  onClick={handlePaste}
                  className="btn btn-sm btn-ghost gap-2"
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
                className="w-full resize-none p-4 text-base-content text-base focus:outline-none border border-base-300 rounded-lg min-h-[400px]"
              />

              <div className="flex justify-between items-center mt-4">
                <span className={`text-sm font-semibold ${wordCount > maxWords ? 'text-error' : 'text-base-content/60'}`}>
                  {wordCount} / {maxWords} words
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={handleDetect}
                    disabled={!text.trim() || wordCount > maxWords || isDetecting}
                    className="btn btn-primary btn-sm gap-2"
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
                    className="btn btn-success btn-sm text-white gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Humanize
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="card bg-white shadow-xl border border-base-200">
            <div className="card-body p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Result</h3>
              </div>

              {/* Error State */}
              {error && (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  <div className="text-4xl mb-4 text-error">⚠️</div>
                  <p className="text-error font-semibold">{error}</p>
                  <button onClick={handleReset} className="btn btn-ghost btn-sm mt-4">
                    Try Again
                  </button>
                </div>
              )}

              {/* Loading State */}
              {!detectionResult && !error && isDetecting && (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <p className="mt-4 text-base-content/60">Analyzing text...</p>
                </div>
              )}

              {/* Detection Results */}
              {detectionResult && !error && (
                <div className="space-y-6 min-h-[400px]">
                  {/* Human Score Display */}
                  <div className="text-center py-8">
                    <div className="text-6xl font-bold text-base-content mb-2">
                      {Math.round(100 - detectionResult.score)}%
                    </div>
                    <div className="text-base font-semibold text-base-content/70 uppercase tracking-wide">
                      HUMAN WRITTEN
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 bg-gradient-to-r from-error via-warning to-success transition-all duration-500"
                      style={{ width: `${Math.round(100 - detectionResult.score)}%` }}
                    ></div>
                  </div>

                  {/* Detector Badges */}
                  {detectionResult.details && (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {Object.entries(detectionResult.details).slice(0, 5).map(([detector, humanScore]) => {
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
                            <div key={detector} className="flex items-center gap-1 text-sm">
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
                            let colorClass = 'text-warning';

                            if (humanScore >= 60) {
                              icon = '✅';
                              colorClass = 'text-success';
                            } else if (humanScore < 40) {
                              icon = '⛔';
                              colorClass = 'text-error';
                            }

                            return (
                              <div key={detector} className="flex items-center gap-1 text-sm">
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
                    className="btn btn-ghost btn-sm w-full"
                  >
                    Start New
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-base-content/60">
          <div className="flex items-center gap-2">
            <span className="text-success text-lg">✓</span>
            <span>Bypass AI Detectors</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-success text-lg">✓</span>
            <span>Natural Writing Style</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-success text-lg">✓</span>
            <span>Instant Results</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;