import React, { useState } from 'react';
import { Appointment, calculateQueueMetrics } from '../../data/mockAppointments';
import { Clock, UserCheck, AlertCircle, RefreshCw, Volume2 } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface QueueTrackerProps {
  initialAppointment: Appointment;
}

export const QueueTracker: React.FC<QueueTrackerProps> = ({ initialAppointment }) => {
  const [appointment, setAppointment] = useState<Appointment>(initialAppointment);
  const { announceToScreenReader } = useAccessibility();

  const metrics = calculateQueueMetrics(appointment);

  const simulateNextPatient = () => {
    if (appointment.currentServingToken < appointment.tokenNumber) {
      const nextServing = appointment.currentServingToken + 1;
      setAppointment(prev => ({
        ...prev,
        currentServingToken: nextServing,
      }));

      const newAhead = Math.max(0, appointment.tokenNumber - nextServing);
      const msg = `Queue updated. Currently serving token #${nextServing}. ${newAhead} patients ahead of you.`;
      announceToScreenReader(msg);
    }
  };

  return (
    <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gov-gray-200 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gov-navy uppercase tracking-wider">
              Real-Time Outpatient Queue Display
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> LIVE
            </span>
          </div>
          <h2 className="text-base font-bold text-gov-navy mt-0.5">
            {appointment.facilityName}
          </h2>
          <div className="text-xs text-gov-gray-600">
            {appointment.doctorName} • {appointment.specialty} • <strong>{appointment.roomNo}</strong>
          </div>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={simulateNextPatient}
            disabled={appointment.currentServingToken >= appointment.tokenNumber}
            className="flex items-center gap-1 px-3 py-1.5 bg-gov-gray-100 hover:bg-gov-gray-200 text-gov-navy rounded text-xs font-semibold transition-colors disabled:opacity-40 border border-gov-gray-300"
            title="Simulate doctor calling next token in queue"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Simulate Next Token</span>
          </button>
        </div>
      </div>

      {/* Main Queue Metric Displays */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {/* Your Token */}
        <div className="bg-gov-navy text-white p-4 rounded-lg shadow-sm">
          <div className="text-xs font-medium text-slate-300 uppercase">Your Token Number</div>
          <div className="text-4xl font-extrabold mt-1 tracking-tight">#{appointment.tokenNumber}</div>
          <div className="text-[11px] text-slate-300 mt-1">{appointment.mode}</div>
        </div>

        {/* Currently Serving */}
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-lg shadow-sm">
          <div className="text-xs font-medium uppercase text-emerald-700">Currently Serving</div>
          <div className="text-4xl font-extrabold mt-1 text-emerald-900">
            #{appointment.currentServingToken}
          </div>
          <div className="text-[11px] text-emerald-700 mt-1 font-semibold">Inside Consultation Room</div>
        </div>

        {/* People Ahead */}
        <div className="bg-amber-50 border border-amber-300 text-amber-900 p-4 rounded-lg shadow-sm">
          <div className="text-xs font-medium uppercase text-amber-700">Patients Ahead of You</div>
          <div className="text-4xl font-extrabold mt-1 text-amber-900">
            {metrics.peopleAhead}
          </div>
          <div className="text-[11px] text-amber-700 mt-1">In OPD Waiting Area</div>
        </div>

        {/* Estimated Waiting Time */}
        <div className="bg-slate-50 border border-slate-300 text-slate-900 p-4 rounded-lg shadow-sm">
          <div className="text-xs font-medium uppercase text-slate-600 flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gov-saffron" />
            <span>Estimated Wait</span>
          </div>
          <div className="text-3xl font-extrabold mt-1 text-gov-navy">
            {metrics.isCurrent ? '0 mins' : `~${metrics.estimatedWaitMinutes} mins`}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Based on ~7 mins/consultation</div>
        </div>
      </div>

      {/* Dynamic Status Alert Banner */}
      <div className="mt-4">
        {metrics.isCurrent ? (
          <div className="bg-emerald-600 text-white p-3 rounded flex items-center justify-between text-xs font-bold animate-bounce">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              <span>It is your turn! Please enter {appointment.roomNo} now.</span>
            </div>
            <button
              onClick={() => alert("Check-in acknowledged at clinician desk.")}
              className="bg-white text-emerald-900 px-3 py-1 rounded text-xs"
            >
              Enter Room
            </button>
          </div>
        ) : metrics.isNext ? (
          <div className="bg-amber-500 text-white p-3 rounded flex items-center gap-2 text-xs font-bold">
            <AlertCircle className="w-5 h-5" />
            <span>You are next in line! Please wait right outside {appointment.roomNo}.</span>
          </div>
        ) : (
          <div className="bg-slate-100 border border-slate-200 text-slate-700 p-3 rounded flex items-center justify-between text-xs">
            <span>You may wait comfortably in the designated OPD waiting hall. Audio announcements will chime when token #{appointment.tokenNumber - 1} is called.</span>
            <button
              onClick={() => announceToScreenReader(`Token #${appointment.tokenNumber}. Currently serving #${appointment.currentServingToken}. Estimated wait ${metrics.estimatedWaitMinutes} minutes.`)}
              className="text-gov-navy font-semibold hover:underline flex items-center gap-1 text-[11px]"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Voice Announcement</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
