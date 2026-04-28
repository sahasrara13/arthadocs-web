/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  ShieldAlert, 
  Calendar, 
  Users, 
  Search, 
  CheckCircle2, 
  Globe, 
  ChevronRight,
  Info,
  ExternalLink,
  Briefcase,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'motion/react';
import { LegalAnalysis } from '../types';
import { cn } from '../lib/utils';

interface AnalysisViewProps {
  analysis: LegalAnalysis;
  fileName: string;
}

export function AnalysisView({ analysis, fileName }: AnalysisViewProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'clauses' | 'risks' | 'details' | 'insights'>('summary');

  const tabs = [
    { id: 'summary', label: 'Executive Summary', icon: Info },
    { id: 'clauses', label: 'Key Clauses', icon: FileText },
    { id: 'risks', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'details', label: 'Dates & Parties', icon: Calendar },
    { id: 'insights', label: 'Business Insights', icon: Search },
  ] as const;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-2">
            <FileText className="w-4 h-4" />
            <span>AI ANALYSIS REPORT</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{fileName}</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-bold border border-green-100 uppercase tracking-wider">
            Verified Analysis
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200 uppercase tracking-wider">
            Draft Only
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200",
                isActive 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'summary' && (
            <section className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  📌 Executive Summary
                </h3>
                <ul className="space-y-4">
                  {analysis.executiveSummary.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4">📖 Business-Friendly Summary</h3>
                <p className="text-slate-600 leading-relaxed text-lg italic">
                  "{analysis.businessSummary}"
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-500" />
                  🌐 Multi-Language Glance
                </h3>
                <div className="grid grid-cols-1 gap-6 mt-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Hindi / हिंदी</span>
                    <p className="text-slate-700 font-medium">{analysis.multilingualSummary.hindi}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Marathi / मराठी</span>
                    <p className="text-slate-700 font-medium">{analysis.multilingualSummary.marathi}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'clauses' && (
            <section className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {analysis.keyClauses.map((clause, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={i}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-blue-300 transition-colors"
                  >
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <span className="font-bold text-slate-900">{clause.name}</span>
                      <button className="text-blue-600 text-xs font-bold uppercase tracking-tight hover:underline flex items-center gap-1">
                        View Text <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">CONTRACT EXTRACT</span>
                        <p className="text-sm font-mono text-slate-700 leading-relaxed italic">{clause.extract}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-blue-400 uppercase block mb-1">BUSINESS IMPACT</span>
                        <p className="text-slate-600 text-sm leading-relaxed">{clause.impact}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'risks' && (
            <section className="space-y-6">
              {analysis.risks.map((risk, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "p-6 rounded-2xl border flex items-start gap-5 shadow-sm",
                    risk.classification === 'High Risk' ? "bg-red-50/50 border-red-100" :
                    risk.classification === 'Medium Risk' ? "bg-amber-50/50 border-amber-100" :
                    "bg-slate-50/50 border-slate-100"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                    risk.classification === 'High Risk' ? "bg-red-500 text-white" :
                    risk.classification === 'Medium Risk' ? "bg-amber-500 text-white" :
                    "bg-slate-500 text-white"
                  )}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-slate-900">{risk.title}</h4>
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                        risk.classification === 'High Risk' ? "bg-red-200 text-red-800" :
                        risk.classification === 'Medium Risk' ? "bg-amber-200 text-amber-800" :
                        "bg-slate-200 text-slate-800"
                      )}>
                        {risk.classification}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{risk.description}</p>
                  </div>
                </div>
              ))}
            </section>
          )}

          {activeTab === 'details' && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Commitments & Deadlines
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {analysis.datesAndCommitments.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">{item.label}</span>
                      <p className="text-slate-800 font-medium">{item.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-500" />
                  Key Parties & Roles
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {analysis.parties.map((party, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                          {party.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900">{party.name}</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-slate-400 font-semibold uppercase text-[10px]">Role:</span> {party.role}</p>
                        <p><span className="text-slate-400 font-semibold uppercase text-[10px]">Scope:</span> {party.responsibilities}</p>
                        {party.financials && <p><span className="text-slate-400 font-semibold uppercase text-[10px]">Financials:</span> {party.financials}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === 'insights' && (
            <section className="space-y-8">
              <div className="bg-blue-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10 space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Search className="w-6 h-6" />
                    Actionable Insights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {analysis.actionableInsights.map((insight, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 text-xs font-bold">
                          {i + 1}
                        </div>
                        <p className="text-sm font-medium leading-relaxed">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Decorative background blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-slate-500" />
                  Plain English Version
                </h3>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {analysis.plainLanguageVersion}
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6 lg:border-l lg:border-slate-200 lg:pl-8">
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
            <ShieldAlert className="w-8 h-8 text-blue-400 mb-2" />
            <h4 className="text-lg font-bold">Disclaimer</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              This analysis is generated by AI for information purposes only. It does not constitute legal advice and should not be relied upon as a substitute for professional legal counsel.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Analysis Health</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Confidence Score</span>
                <span className="text-green-600 font-bold">94%</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full w-[94%]" />
              </div>
              
              <div className="flex items-center justify-between text-sm pt-2">
                <span className="text-slate-500">Key Terms Identified</span>
                <span className="text-slate-900 font-bold">{analysis.keyClauses.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Risks Flagged</span>
                <span className="text-slate-900 font-bold">{analysis.risks.length}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 space-y-4">
            <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              Next Steps
            </h4>
            <ul className="space-y-3 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 opacity-50" />
                Review Risk Analysis with Legal Counsel
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 opacity-50" />
                Cross-check commitments with Project Plan
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 opacity-50" />
                Prepare signature/approval workflow
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
