/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { AnalysisView } from './components/AnalysisView';
import { analyzeDocument } from './services/gemini';
import { LegalAnalysis } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Scale, History, PlusSquare } from 'lucide-react';

export default function App() {
  const [analysis, setAnalysis] = useState<LegalAnalysis | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = async (base64: string, mimeType: string, name: string) => {
    setIsLoading(true);
    setFileName(name);
    setProgress(10);

    // Simulate some progress steps for better UX
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 1000);

    try {
      const result = await analyzeDocument(base64, mimeType);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      alert('Analysis failed. Please try a different document or check your API key.');
    } finally {
      clearInterval(timer);
      setIsLoading(false);
      setProgress(0);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setFileName('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 italic-serif:font-serif italic-serif:italic">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <Scale className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">ArthaDocs</h1>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest leading-none mt-0.5">Corporate Document Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-slate-900 transition-colors p-2 hidden sm:block">
              <History className="w-5 h-5" />
            </button>
            {analysis && (
              <button
                onClick={resetAnalysis}
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <PlusSquare className="w-4 h-4" />
                Analyze New
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!analysis ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center min-h-[70vh] space-y-12"
            >
              <div className="text-center max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3 h-3" />
                  Secure PDF Analysis
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Decode Your Business Agreements
                </h1>
                <p className="text-xl text-slate-500 font-medium">
                  Upload service agreements, NDAs, or corporate reports for instant, structured insights and risk assessment.
                </p>
              </div>

              <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />

              {isLoading && (
                <div className="w-full max-w-sm space-y-3">
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>Processing Document</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Trust Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-slate-200 opacity-50">
                {["PDF Upload", "Full Summary", "Risk Mapping", "Multilingual"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="analysis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AnalysisView analysis={analysis} fileName={fileName} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 opacity-50">
            <Scale className="w-5 h-5" />
            <span className="text-sm font-medium">© 2026 ArthaDocs</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-semibold text-slate-400 uppercase tracking-wider">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">Terms of Use</a>
            <a href="#" className="hover:text-slate-900">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
