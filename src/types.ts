/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Clause {
  name: string;
  extract: string;
  impact: string;
}

export interface Risk {
  title: string;
  description: string;
  classification: 'High Risk' | 'Medium Risk' | 'Low Risk';
}

export interface DateCommitment {
  label: string;
  details: string;
}

export interface Party {
  name: string;
  role: string;
  responsibilities: string;
  financials?: string;
}

export interface LegalAnalysis {
  executiveSummary: string[];
  businessSummary: string;
  keyClauses: Clause[];
  risks: Risk[];
  datesAndCommitments: DateCommitment[];
  parties: Party[];
  actionableInsights: string[];
  plainLanguageVersion: string;
  multilingualSummary: {
    english: string;
    hindi: string;
    marathi: string;
  };
}
