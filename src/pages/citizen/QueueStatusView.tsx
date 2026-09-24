import React from 'react';
import { MOCK_APPOINTMENTS } from '../../data/mockAppointments';
import { QueueTracker } from '../../components/clinical/QueueTracker';
import { Clock, Info, ShieldCheck, MapPin } from 'lucide-react';

export const QueueStatusView: React.FC = () => {
  const activeAppointment = MOCK_APPOINTMENTS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          Live Hospital Outpatient Telemetry
        </span>
        <h1 className="text-2xl font-bold text-gov-navy mt-1">
          Live OPD Queue Tracker
        </h1>
        <p className="text-xs text-slate-600">
          Track real-time patient queue progression, estimated waiting times, and consultation room callouts.
        </p>
      </div>

      {/* Embedded Live Queue Tracker Component */}
      <QueueTracker initialAppointment={activeAppointment} />

      {/* Hospital Queue Guidelines */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 text-xs space-y-3">
        <h2 className="font-bold text-gov-navy text-sm uppercase flex items-center gap-1.5 border-b border-slate-200 pb-2">
          <Info className="w-4 h-4 text-gov-saffron" />
          <span>Patient Guidelines for Smooth Queue Management</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-700 leading-relaxed text-[11px]">
          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <span className="font-bold text-gov-navy block mb-1">1. Waiting Hall Audio Chimes</span>
            <p>
              Digital display boards inside the OPD corridor chime three times when your token number is broadcast. Screen reader users can enable voice readouts.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <span className="font-bold text-gov-navy block mb-1">2. Priority Fast-Track</span>
            <p>
              Senior citizens (aged 70+), pregnant women in third trimester, and emergency triage cases receive priority OPD token sequencing.
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200">
            <span className="font-bold text-gov-navy block mb-1">3. Missed Token Recovery</span>
            <p>
              If your number is called while you are away at the pharmacy or diagnostic lab, speak to the nursing desk for a 2-patient re-insertion window.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
