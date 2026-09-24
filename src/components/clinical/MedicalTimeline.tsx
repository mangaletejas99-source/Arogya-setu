import React, { useState } from 'react';
import { MedicalTimelineEvent } from '../../data/mockCitizens';
import { Calendar, UserCheck, Stethoscope, TestTube, Pill, Share2, ChevronDown, ChevronUp } from 'lucide-react';

interface MedicalTimelineProps {
  events: MedicalTimelineEvent[];
}

export const MedicalTimeline: React.FC<MedicalTimelineProps> = ({ events }) => {
  const [expandedId, setExpandedId] = useState<string | null>(events[0]?.id || null);

  const getEventIcon = (type: MedicalTimelineEvent['type']) => {
    switch (type) {
      case 'visit': return Stethoscope;
      case 'diagnosis': return UserCheck;
      case 'test': return TestTube;
      case 'prescription': return Pill;
      case 'referral': return Share2;
      default: return Calendar;
    }
  };

  const getEventBadgeColor = (type: MedicalTimelineEvent['type']) => {
    switch (type) {
      case 'visit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'diagnosis': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'test': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'prescription': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'referral': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-gov-gray-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4 border-b border-gov-gray-200 pb-3">
        <div>
          <h2 className="text-base font-bold text-gov-navy">
            Longitudinal Health Journey & Medical Timeline
          </h2>
          <p className="text-xs text-gov-gray-600">
            Continuity of care records across Sub-Centre, PHC, and District Civil Hospital.
          </p>
        </div>
        <span className="text-xs font-semibold text-gov-gray-500">
          {events.length} Clinical Events
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {events.map((evt) => {
          const Icon = getEventIcon(evt.type);
          const isExpanded = expandedId === evt.id;

          return (
            <div key={evt.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-white border-2 border-gov-navy flex items-center justify-center text-gov-navy shadow-xs group-hover:scale-110 transition-transform">
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Event Card */}
              <div className="bg-slate-50 border border-gov-gray-200 rounded p-3 text-xs hover:border-gov-navy transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getEventBadgeColor(evt.type)}`}>
                      {evt.type}
                    </span>
                    <span className="font-bold text-gov-navy text-sm">{evt.title}</span>
                  </div>
                  <div className="text-slate-500 text-[11px] font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{evt.date}</span>
                  </div>
                </div>

                <div className="mt-1 text-slate-700 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
                  <span><strong>Facility:</strong> {evt.facilityName}</span>
                  <span><strong>Clinician:</strong> {evt.doctorName}</span>
                  {evt.status && (
                    <span className="text-emerald-700 font-semibold">● {evt.status}</span>
                  )}
                </div>

                <p className="mt-2 text-slate-600 leading-relaxed">
                  {evt.description}
                </p>

                {/* Optional expanded details */}
                {evt.details && (
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : evt.id)}
                      className="text-gov-navy font-semibold text-[11px] flex items-center gap-1 hover:underline focus:outline-none"
                    >
                      <span>{isExpanded ? 'Hide clinical parameters' : 'View clinical parameters'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 bg-white p-2.5 rounded border border-slate-200 text-[11px]">
                        {Object.entries(evt.details).map(([key, val]) => (
                          <div key={key}>
                            <span className="text-slate-500">{key}: </span>
                            <span className="font-semibold text-slate-900">{val}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
