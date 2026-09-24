import React, { useState } from 'react';
import { Share2, Building2, User, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export const ReferralOutView: React.FC = () => {
  const [patientName, setPatientName] = useState('Ramesh D. Jadhav');
  const [abhaId, setAbhaId] = useState('91-4829-1048-2910');
  const [targetCenter, setTargetCenter] = useState('FAC-PUN-05');
  const [department, setDepartment] = useState('Super-Specialty Cardiology & Vascular Evaluation');
  const [priority, setPriority] = useState<'Routine' | 'Urgent' | 'Emergency'>('Urgent');
  const [clinicalReason, setClinicalReason] = useState('Persistent angina on exertion refractory to dual antiplatelet therapy. Requires coronary angiographic evaluation and potential revascularization.');
  const [createdDocket, setCreatedDocket] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const docket = `REF-2026-${Math.floor(2000 + Math.random() * 8000)}`;
    setCreatedDocket(docket);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-xs">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          Inter-Facility Transfer Registry
        </span>
        <h1 className="text-2xl font-bold text-gov-navy mt-1">
          Initiate Tertiary Referral (Higher Healthcare Center)
        </h1>
        <p className="text-xs text-slate-600">
          Refer patients requiring super-specialty surgical, oncological, or advanced intensive care to Government Medical Colleges.
        </p>
      </div>

      {createdDocket ? (
        <div className="bg-emerald-50 border-2 border-emerald-400 rounded-lg p-6 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="text-lg font-bold text-emerald-900">
            Referral Case Transmitted Successfully!
          </h2>
          <p className="text-xs text-slate-700">
            Docket ID has been dispatched to Sassoon General Hospital Tertiary Registry:
          </p>
          <div className="text-xl font-mono font-black text-gov-navy bg-white px-4 py-1.5 rounded border border-slate-300 inline-block">
            {createdDocket}
          </div>
          <p className="text-[11px] text-slate-500">
            Patient received SMS notification and priority reporting instructions.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCreatedDocket(null)}
              className="bg-gov-navy text-white px-4 py-2 rounded font-bold hover:bg-gov-navyLight"
            >
              Issue Another Referral
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-gov-gray-300 rounded-lg p-6 shadow-xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Patient Name *</label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">ABHA Health ID *</label>
              <input
                type="text"
                required
                value={abhaId}
                onChange={(e) => setAbhaId(e.target.value)}
                className="w-full p-2 border border-gov-gray-300 rounded font-mono focus:ring-1 focus:ring-gov-navy focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Destination Tertiary Hospital *</label>
              <select
                value={targetCenter}
                onChange={(e) => setTargetCenter(e.target.value)}
                className="w-full p-2 border border-gov-gray-300 rounded bg-white focus:ring-1 focus:ring-gov-navy focus:outline-none"
              >
                <option value="FAC-PUN-05">Sassoon General Hospital & BJ Medical College, Pune</option>
                <option value="FAC-KEM-06">King Edward Memorial (KEM) Hospital, Mumbai</option>
                <option value="FAC-GMC-07">Government Medical College & Hospital, Chhatrapati Sambhajinagar</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Clinical Priority *</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full p-2 border border-gov-gray-300 rounded bg-white font-bold focus:ring-1 focus:ring-gov-navy focus:outline-none"
              >
                <option value="Routine">Routine Elective Referral</option>
                <option value="Urgent">Urgent (Within 48 Hours)</option>
                <option value="Emergency">Emergency Transfer (Trauma / ICU)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Super-Specialty Department *</label>
            <input
              type="text"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Clinical Reason & Provisional Diagnosis *</label>
            <textarea
              rows={4}
              required
              value={clinicalReason}
              onChange={(e) => setClinicalReason(e.target.value)}
              className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none leading-relaxed"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-gov-navy text-white px-6 py-2.5 rounded font-bold hover:bg-gov-navyLight transition-colors flex items-center gap-2 shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Issue Inter-Hospital Referral</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
