import React from 'react';
import { MOCK_CITIZEN_RECORD } from '../../data/mockCitizens';
import { AbhaCard } from '../../components/clinical/AbhaCard';
import { MedicalTimeline } from '../../components/clinical/MedicalTimeline';
import { FileText, Activity, AlertTriangle, Pill, Download, ShieldCheck, Printer } from 'lucide-react';

export const HealthRecordsView: React.FC = () => {
  const patient = MOCK_CITIZEN_RECORD;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
            ABDM Personal Health Record (PHR)
          </span>
          <h1 className="text-2xl font-bold text-gov-navy mt-1">
            Digital Health Records: {patient.name}
          </h1>
          <p className="text-xs text-slate-600">
            ABHA ID: <strong className="font-mono text-gov-navy">{patient.abhaId}</strong> • Linked to National Health Registry
          </p>
        </div>

        <div className="flex items-center gap-2 no-print">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gov-gray-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Records</span>
          </button>
          <button
            onClick={() => alert("Consolidated Health History PDF exported.")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gov-navy text-white rounded text-xs font-bold hover:bg-gov-navyLight"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Health Profile</span>
          </button>
        </div>
      </div>

      {/* Embedded ABHA Identity Card */}
      <AbhaCard record={patient} />

      {/* Clinical Summary Panels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Vitals Panel */}
        <div className="bg-white border border-gov-gray-300 rounded-lg p-4 shadow-xs space-y-2">
          <div className="font-bold text-gov-navy text-xs uppercase flex items-center justify-between border-b border-slate-200 pb-1.5">
            <span className="flex items-center gap-1">
              <Activity className="w-4 h-4 text-gov-saffron" /> Latest Recorded Vitals
            </span>
            <span className="text-[10px] text-slate-400 font-normal">{patient.vitals.lastUpdated}</span>
          </div>

          <div className="space-y-1.5 text-slate-700 pt-1">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Blood Pressure:</span>
              <strong className="text-slate-900">{patient.vitals.bp}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Pulse Rate:</span>
              <strong className="text-slate-900">{patient.vitals.pulse}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Fasting Blood Sugar:</span>
              <strong className="text-amber-800">{patient.vitals.bloodSugarFasting}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Oxygen Saturation (SpO2):</span>
              <strong className="text-emerald-800">{patient.vitals.spo2}</strong>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Weight:</span>
              <strong className="text-slate-900">{patient.vitals.weightKg}</strong>
            </div>
          </div>
        </div>

        {/* Allergies & Alerts Panel */}
        <div className="bg-white border border-gov-gray-300 rounded-lg p-4 shadow-xs space-y-2">
          <div className="font-bold text-gov-navy text-xs uppercase flex items-center justify-between border-b border-slate-200 pb-1.5">
            <span className="flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 text-gov-emergency" /> Clinical Warnings & Allergies
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <div>
              <span className="text-[11px] font-bold text-slate-600 block mb-1">Drug Allergies:</span>
              <div className="flex flex-wrap gap-1">
                {patient.allergies.map((a) => (
                  <span key={a} className="bg-rose-100 text-rose-900 border border-rose-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                    ⚠ {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-600 block mb-1">Diagnosed Chronic Conditions:</span>
              <ul className="list-disc list-inside text-slate-700 text-[11px] space-y-0.5">
                {patient.chronicConditions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Active Medications Panel */}
        <div className="bg-white border border-gov-gray-300 rounded-lg p-4 shadow-xs space-y-2">
          <div className="font-bold text-gov-navy text-xs uppercase flex items-center justify-between border-b border-slate-200 pb-1.5">
            <span className="flex items-center gap-1">
              <Pill className="w-4 h-4 text-gov-green" /> Active Prescribed Medications
            </span>
          </div>

          <div className="space-y-2 pt-1 text-[11px]">
            {patient.activePrescriptions.map((p, idx) => (
              <div key={idx} className="bg-slate-50 p-2 rounded border border-slate-200 space-y-0.5">
                <div className="font-bold text-gov-navy flex items-center justify-between">
                  <span>{p.medicineName}</span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 rounded">Dispensed</span>
                </div>
                <div className="text-slate-600">{p.frequency} ({p.durationDays} days)</div>
                <div className="text-[10px] text-slate-500 italic">{p.instructions}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Longitudinal Care Timeline Component */}
      <MedicalTimeline events={patient.timeline} />
    </div>
  );
};
