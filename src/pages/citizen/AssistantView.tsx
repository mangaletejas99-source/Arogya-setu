import React from 'react';
import { AiHealthAssistant } from '../../components/clinical/AiHealthAssistant';

export const AssistantView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          AI-Powered Digital Health Assistant
        </span>
        <h1 className="text-2xl font-bold text-gov-navy mt-1">
          Arogya Saathi (आरोग्य साथी)
        </h1>
        <p className="text-xs text-slate-600">
          Describe your health concerns via text or voice in Marathi, Hindi, or English to receive triage guidance.
        </p>
      </div>

      {/* Embedded Assistant */}
      <AiHealthAssistant />
    </div>
  );
};
