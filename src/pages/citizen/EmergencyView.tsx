import React, { useState } from 'react';
import { AlertOctagon, PhoneCall, MapPin, Building2, ShieldAlert, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { MOCK_FACILITIES } from '../../data/mockFacilities';

export const EmergencyView: React.FC = () => {
  const [ambulanceDispatched, setAmbulanceDispatched] = useState(false);
  const [etaMinutes, setEtaMinutes] = useState(14);

  const emergencyFacilities = MOCK_FACILITIES.filter((f) => f.emergencyAvailable);

  const handleDispatchAmbulance = () => {
    setAmbulanceDispatched(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b-2 border-gov-emergency pb-4">
        <span className="text-xs font-bold text-gov-emergency uppercase tracking-wider">
          State Emergency Response Network (MEMS 108)
        </span>
        <h1 className="text-2xl font-bold text-gov-navy mt-1 flex items-center gap-2">
          <AlertOctagon className="w-7 h-7 text-gov-emergency" />
          <span>Emergency 108 Medical Escalation</span>
        </h1>
        <p className="text-xs text-slate-600">
          Immediate life-support dispatch, trauma care routing, and tertiary emergency hospital bed allocation.
        </p>
      </div>

      {/* Emergency Immediate Action Banner */}
      <div className="bg-rose-50 border-2 border-gov-emergency rounded-xl p-6 shadow-md text-gov-emergency">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-black uppercase tracking-wider bg-gov-emergency text-white px-3 py-0.5 rounded inline-block">
              Priority Red-Flag Emergency Gateway
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-rose-950">
              In Life-Threatening Health Crises, Call 108 Immediately
            </h2>
            <p className="text-xs text-rose-900 max-w-2xl leading-relaxed">
              For sudden severe chest pain, loss of consciousness, uncontrolled bleeding, severe burn injuries, or obstetrical emergencies in pregnant mothers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:108"
              className="w-full sm:w-auto bg-gov-emergency hover:bg-rose-800 text-white px-6 py-3 rounded-lg font-black text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <PhoneCall className="w-5 h-5 animate-bounce" />
              <span>Call 108 (Toll Free)</span>
            </a>

            {!ambulanceDispatched ? (
              <button
                onClick={handleDispatchAmbulance}
                className="w-full sm:w-auto bg-white border-2 border-gov-emergency text-gov-emergency hover:bg-rose-100 px-5 py-3 rounded-lg font-bold text-xs transition-colors"
              >
                Simulate Digital 108 Dispatch
              </button>
            ) : (
              <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ambulance #MH-15-EM-1082 Dispatched (ETA: ~{etaMinutes}m)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Escalation 6-Stage Workflow Pipeline */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs text-xs space-y-4">
        <h3 className="font-bold text-gov-navy text-sm uppercase tracking-wider border-b border-gov-gray-200 pb-2">
          Public Health Emergency Escalation Protocol
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center">
          {[
            { step: '1. Triage Distress', desc: 'Chest pain / Trauma detected' },
            { step: '2. 108 Dispatch', desc: 'Nearest GPS ALS ambulance assigned' },
            { step: '3. En-route Care', desc: 'Vitals transmitted to casualty desk' },
            { step: '4. Facility Alert', desc: 'Trauma & ICU team mobilized' },
            { step: '5. Bed Reserved', desc: 'Direct admission without OPD queue' },
            { step: '6. Hospital Arrival', desc: 'Golden hour clinical stabilization' },
          ].map((st, i) => (
            <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded">
              <div className="font-bold text-gov-navy text-xs">{st.step}</div>
              <div className="text-[11px] text-slate-600 mt-1 leading-snug">{st.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Emergency Trauma Care Facilities */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
          <h3 className="font-bold text-gov-navy text-sm uppercase tracking-wider">
            Nearest Emergency & Trauma Care Centers (with 24x7 Casualty)
          </h3>
          <span className="text-slate-500 font-semibold">{emergencyFacilities.length} Emergency Units</span>
        </div>

        <div className="space-y-3">
          {emergencyFacilities.map((fac) => (
            <div
              key={fac.id}
              className="p-4 rounded border border-rose-200 bg-rose-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-gov-emergency text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {fac.level}
                  </span>
                  <span className="text-xs font-bold text-slate-700">{fac.district}</span>
                </div>
                <div className="text-sm font-bold text-gov-navy">{fac.name}</div>
                <div className="text-slate-600 text-xs flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gov-saffron" />
                    <span>{fac.address} ({fac.distanceKm} km)</span>
                  </span>
                  <span className="font-bold text-slate-800">Phone: {fac.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`tel:${fac.phone}`}
                  className="bg-gov-navy text-white px-3.5 py-1.5 rounded font-bold text-xs hover:bg-gov-navyLight flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Casualty Desk</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
