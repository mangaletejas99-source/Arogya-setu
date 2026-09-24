import React from 'react';
import { TriageWorkflow } from '../../components/clinical/TriageWorkflow';
import { Stethoscope, ShieldAlert, HeartPulse, Info } from 'lucide-react';

export const TriageView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          Decision Support System (CDSS)
        </span>
        <h1 className="text-2xl font-bold text-gov-navy mt-1">
          Digital Clinical Triage & Symptom Evaluation
        </h1>
        <p className="text-xs text-slate-600">
          Standardized clinical triage categorizing urgency into Normal, Urgent, or Emergency with automated escalation pathways.
        </p>
      </div>

      {/* Embedded Clinical Triage Component */}
      <TriageWorkflow />
    </div>
  );
};
