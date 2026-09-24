import React, { useState } from 'react';
import { MOCK_HIGH_RISK_PATIENTS, HighRiskPatient } from '../../data/mockHighRisk';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AlertTriangle, UserCheck, Calendar, Phone, Bell, CheckCircle2, Search, Filter } from 'lucide-react';

export const HighRiskFollowUpView: React.FC = () => {
  const [patients, setPatients] = useState<HighRiskPatient[]>(MOCK_HIGH_RISK_PATIENTS);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [reminderNotice, setReminderNotice] = useState<string | null>(null);

  const categories = ['All', 'Pregnant Women (ANC)', 'Infant / Malnutrition', 'Chronic NCD', 'Elderly / Bedridden'];

  const filtered = patients.filter((p) => categoryFilter === 'All' || p.category === categoryFilter);

  const handleSendReminder = (patientName: string) => {
    setReminderNotice(`Automated SMS and Interactive Voice Response (IVRS) reminder dispatched to ${patientName}.`);
    setTimeout(() => setReminderNotice(null), 4000);
  };

  const handleMarkCompleted = (id: string) => {
    setPatients(prev =>
      prev.map(p => p.id === id ? { ...p, status: 'Completed' } : p)
    );
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          Community Health Surveillance
        </span>
        <h1 className="text-2xl font-bold text-gov-navy mt-1">
          High-Risk Patient Follow-up & Reminder Registry
        </h1>
        <p className="text-xs text-slate-600">
          Intensive follow-up tracking for high-risk antenatal mothers, severe acute malnutrition infants, and bedridden seniors.
        </p>
      </div>

      {reminderNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{reminderNotice}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="bg-white p-3 border border-gov-gray-300 rounded-lg shadow-xs flex flex-wrap items-center gap-2">
        <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter Category:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded font-semibold transition-colors ${
              categoryFilter === cat
                ? 'bg-gov-navy text-white'
                : 'bg-gov-gray-100 text-gov-gray-700 hover:bg-gov-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Patient Cards List */}
      <div className="space-y-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className={`bg-white border rounded-lg p-5 shadow-xs flex flex-col justify-between transition-all ${
              p.riskLevel === 'Severe'
                ? 'border-rose-300 bg-rose-50/10'
                : 'border-gov-gray-300'
            }`}
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gov-navy text-sm">{p.name} ({p.age} Yrs, {p.gender})</span>
                  <span className="font-mono text-[10px] text-slate-500">ABHA: {p.abhaId}</span>
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                    {p.village}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={p.riskLevel + ' Risk'} size="sm" />
                  <StatusBadge status={p.status} size="sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div>
                  <span className="text-slate-500 font-semibold uppercase text-[10px]">Clinical Summary:</span>
                  <p className="font-medium text-slate-800 mt-0.5 leading-relaxed bg-slate-50 p-2 rounded border border-slate-200">
                    {p.clinicalSummary}
                  </p>
                </div>

                <div className="space-y-1 bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-slate-500 font-semibold uppercase text-[10px]">Pending Clinical Protocol:</span>
                  <ul className="list-disc list-inside text-slate-700 space-y-0.5">
                    {p.pendingActions.map((act, i) => (
                      <li key={i} className="font-medium">{act}</li>
                    ))}
                  </ul>
                  <div className="pt-1 text-slate-500">
                    Active Rx: <strong className="text-slate-700">{p.currentMedicines.join(', ')}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-4">
                  <span>Last Checked: <strong>{p.lastVisitDate}</strong></span>
                  <span>Next Due: <strong className="text-gov-navy">{p.nextFollowUpDate}</strong></span>
                  <span>ASHA: <strong>{p.assignedHealthWorker}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  {p.status !== 'Completed' && (
                    <button
                      onClick={() => handleMarkCompleted(p.id)}
                      className="border border-emerald-600 text-emerald-800 hover:bg-emerald-50 px-3 py-1.5 rounded font-bold transition-colors"
                    >
                      ✓ Mark Visited
                    </button>
                  )}
                  <button
                    onClick={() => handleSendReminder(p.name)}
                    className="bg-gov-navy text-white hover:bg-gov-navyLight px-3 py-1.5 rounded font-bold transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Send SMS/Voice Reminder</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
