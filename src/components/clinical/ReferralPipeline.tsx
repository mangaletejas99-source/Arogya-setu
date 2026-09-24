import React, { useState } from 'react';
import { ReferralRecord, ReferralStatus } from '../../data/mockReferrals';
import { StatusBadge } from '../common/StatusBadge';
import {
  Share2,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  UserCheck,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface ReferralPipelineProps {
  referral: ReferralRecord;
  onStatusChange?: (newStatus: ReferralStatus) => void;
}

export const ReferralPipeline: React.FC<ReferralPipelineProps> = ({ referral, onStatusChange }) => {
  const [currentStatus, setCurrentStatus] = useState<ReferralStatus>(referral.status);

  const steps: ReferralStatus[] = ['Created', 'Accepted', 'Patient Reached', 'Under Consultation', 'Completed'];

  const getStepIndex = (status: ReferralStatus) => steps.indexOf(status);

  const currentIndex = getStepIndex(currentStatus);

  const advanceStatus = () => {
    if (currentIndex < steps.length - 1) {
      const next = steps[currentIndex + 1];
      setCurrentStatus(next);
      if (onStatusChange) onStatusChange(next);
    }
  };

  return (
    <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-sm space-y-4">
      {/* Referral Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gov-gray-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-gov-navy uppercase tracking-wider">
              {referral.id}
            </span>
            <StatusBadge status={referral.priority} size="sm" />
            <span className="text-xs text-slate-500 font-medium">Created: {referral.createdDate}</span>
          </div>
          <h3 className="text-base font-bold text-gov-navy mt-1">
            Patient: {referral.patientName} ({referral.patientAge}y, {referral.gender})
          </h3>
          <div className="text-xs text-slate-500">ABHA: {referral.patientAbha}</div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={currentStatus} />
          {currentIndex < steps.length - 1 && (
            <button
              onClick={advanceStatus}
              className="bg-gov-navy text-white text-xs px-3 py-1.5 rounded font-semibold hover:bg-gov-navyLight transition-colors"
            >
              Advance to '{steps[currentIndex + 1]}'
            </button>
          )}
        </div>
      </div>

      {/* Origin -> Destination Flow Diagram */}
      <div className="bg-slate-50 border border-gov-gray-200 rounded p-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Referring Facility */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded bg-blue-100 text-gov-navy flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5 text-gov-navy" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">Referring Origin</div>
            <div className="font-bold text-gov-navy">{referral.fromFacilityName}</div>
            <div className="text-slate-600 text-[11px]">{referral.referringDoctorOrWorker}</div>
          </div>
        </div>

        {/* Transfer Arrow */}
        <div className="flex flex-col items-center">
          <ArrowRight className="w-5 h-5 text-gov-saffron hidden md:block" />
          <span className="text-[10px] font-bold text-gov-saffron uppercase">Referral Transit</span>
        </div>

        {/* Receiving Facility */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5 text-emerald-800" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase">Receiving Specialty Center</div>
            <div className="font-bold text-gov-navy">{referral.toFacilityName}</div>
            <div className="text-emerald-700 text-[11px] font-semibold">{referral.receivingSpecialty}</div>
          </div>
        </div>
      </div>

      {/* Multi-Step Pipeline Indicator */}
      <div className="py-2">
        <div className="text-xs font-bold text-gov-navy mb-2 uppercase tracking-wider">
          Multi-Tier Referral Progress Pipeline
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div
                key={step}
                className={`p-2.5 rounded border text-center text-xs transition-colors ${
                  isCurrent
                    ? 'bg-gov-navy text-white border-gov-navy font-bold shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold'
                    : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-center gap-1 text-[11px] mb-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : isCurrent ? (
                    <Clock className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-300 text-[10px] flex items-center justify-center">
                      {idx + 1}
                    </span>
                  )}
                  <span>Step {idx + 1}</span>
                </div>
                <div className="truncate text-xs">{step}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clinical Indication Details */}
      <div className="bg-slate-50 border border-gov-gray-200 rounded p-3 text-xs">
        <span className="font-bold text-gov-navy">Clinical Indication & Referral Notes: </span>
        <span className="text-slate-700">{referral.clinicalReason}</span>
      </div>

      {/* Historical Audit Trail */}
      <div className="text-xs space-y-1.5 border-t border-slate-200 pt-3">
        <div className="font-bold text-gov-gray-600 text-[11px] uppercase">Audit Trail & Chain of Custody:</div>
        {referral.history.map((h, i) => (
          <div key={i} className="flex items-start gap-2 text-slate-600">
            <span className="font-bold text-gov-navy min-w-[120px]">{h.timestamp}:</span>
            <span className="font-semibold text-slate-800">[{h.status}]</span>
            <span>{h.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
