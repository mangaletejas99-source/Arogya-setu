import React, { useState } from 'react';
import { MOCK_APPOINTMENTS, Appointment } from '../../data/mockAppointments';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Clock, User, CheckCircle2, AlertCircle, ArrowRight, Play, RefreshCw } from 'lucide-react';

export const ClinicalQueueView: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    MOCK_APPOINTMENTS[0],
    {
      id: 'APT-2026-0919',
      patientName: 'Kavita Shinde',
      patientAbha: '91-3019-4820-1192',
      doctorId: 'DOC-PATIL-01',
      doctorName: 'Dr. Ananya Patil',
      specialty: 'High-Risk Antenatal Care',
      facilityId: 'FAC-NSK-01',
      facilityName: 'District Civil Hospital, Nashik',
      roomNo: 'OPD Room 4',
      date: '2026-09-19',
      slotTime: '11:00 AM',
      tokenNumber: 19,
      currentServingToken: 13,
      status: 'confirmed',
      mode: 'In-Person OPD'
    },
    {
      id: 'APT-2026-0920',
      patientName: 'Babanrao Pawar',
      patientAbha: '91-4412-8871-3329',
      doctorId: 'DOC-PATIL-01',
      doctorName: 'Dr. Ananya Patil',
      specialty: 'Geriatric Hypertension',
      facilityId: 'FAC-NSK-01',
      facilityName: 'District Civil Hospital, Nashik',
      roomNo: 'OPD Room 4',
      date: '2026-09-19',
      slotTime: '11:30 AM',
      tokenNumber: 20,
      currentServingToken: 13,
      status: 'confirmed',
      mode: 'In-Person OPD'
    }
  ]);

  const [currentServing, setCurrentServing] = useState(13);

  const callNextPatient = () => {
    setCurrentServing(prev => prev + 1);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
            Clinical Workstation
          </span>
          <h1 className="text-2xl font-bold text-gov-navy mt-1">
            OPD Patient Queue & Calling Console
          </h1>
          <p className="text-xs text-slate-600">
            Civil Hospital Nashik • OPD Room 4 • Attending: Dr. Ananya Patil, MD Medicine
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded text-center">
            <div className="text-[10px] text-emerald-800 uppercase font-semibold">Active Token</div>
            <div className="text-lg font-black text-emerald-900 leading-none">#{currentServing}</div>
          </div>
          <button
            onClick={callNextPatient}
            className="bg-gov-navy hover:bg-gov-navyLight text-white px-4 py-2.5 rounded font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Call Next Token (#{currentServing + 1})</span>
          </button>
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-white border border-gov-gray-300 rounded-lg overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-gov-gray-200 flex items-center justify-between">
          <span className="font-bold text-gov-navy uppercase tracking-wider text-xs">
            Patients Registered in Today's Roster
          </span>
          <span className="text-slate-500 font-semibold">{appointments.length} Patients in Queue</span>
        </div>

        <div className="divide-y divide-gov-gray-200">
          {appointments.map((apt) => {
            const isCurrent = apt.tokenNumber === currentServing;
            return (
              <div
                key={apt.id}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  isCurrent ? 'bg-emerald-50/60 border-l-4 border-l-emerald-600' : 'hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-gov-navy bg-slate-100 px-2.5 py-0.5 rounded border border-slate-300">
                      Token #{apt.tokenNumber}
                    </span>
                    <StatusBadge status={isCurrent ? 'In Consultation' : apt.status} size="sm" />
                    <span className="text-slate-500 font-medium">{apt.slotTime}</span>
                  </div>
                  <div className="font-bold text-gov-navy text-sm">{apt.patientName}</div>
                  <div className="text-slate-600 text-[11px]">
                    ABHA: <strong className="font-mono text-slate-800">{apt.patientAbha}</strong> • Specialty: {apt.specialty}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Starting consultation with ${apt.patientName} (Token #${apt.tokenNumber})`)}
                    className="bg-gov-navy text-white px-3 py-1.5 rounded font-bold hover:bg-gov-navyLight"
                  >
                    Start Consultation
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
