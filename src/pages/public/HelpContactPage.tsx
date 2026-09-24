import React from 'react';
import { PhoneCall, Mail, MapPin, HelpCircle, FileQuestion, ChevronRight } from 'lucide-react';

export const HelpContactPage: React.FC = () => {
  const faqs = [
    {
      q: "How can I book an Outpatient (OPD) appointment at District Civil Hospital?",
      a: "Navigate to 'Citizen Services' > 'Book Appointment'. Choose your district, hospital facility, clinical specialty, and doctor. Select a date to receive an instant OPD Token Number and live queue position tracker."
    },
    {
      q: "What is an ABHA Number and how is it used in Arogya Setu?",
      a: "An Ayushman Bharat Health Account (ABHA) is a 14-digit unique health identifier. In this platform, it links your longitudinal medical timeline (diagnoses, prescriptions, and lab tests) across Sub-Centres, PHCs, and District Hospitals."
    },
    {
      q: "How does the Digital Triage system categorize symptoms?",
      a: "Our decision-support triage collects age, symptoms, vitals (BP, SpO2, Temperature), and chronic medical history to compute a NORMAL, URGENT, or EMERGENCY severity flag, recommending the nearest appropriate hospital tier."
    },
    {
      q: "How can health workers operate in villages with zero internet connectivity?",
      a: "Arogya Setu features an offline-first architecture. Community Health Workers (ASHA/ANM) can input maternal visits, child immunisations, and vitals offline. Once connectivity is restored, the 'Sync Now' feature synchronizes records to the cloud."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          Support & Public Assistance
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gov-navy mt-1">
          Help Desk, Helplines & Contact Directory
        </h1>
        <p className="text-sm text-gov-gray-600 mt-1">
          Access round-the-clock emergency medical assistance, citizen helpdesks, and district health officers.
        </p>
      </div>

      {/* 24x7 Helplines Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-rose-400 rounded-lg p-4 shadow-xs">
          <div className="text-gov-emergency font-bold text-xs uppercase flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4" /> Emergency Ambulance
          </div>
          <div className="text-3xl font-extrabold text-gov-emergency mt-1">108</div>
          <p className="text-slate-600 text-xs mt-1">Toll-free 24x7 state-wide emergency medical dispatch.</p>
        </div>

        <div className="bg-white border-2 border-emerald-400 rounded-lg p-4 shadow-xs">
          <div className="text-emerald-700 font-bold text-xs uppercase flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4" /> Health Advice & Tele-OPD
          </div>
          <div className="text-3xl font-extrabold text-emerald-800 mt-1">104</div>
          <p className="text-slate-600 text-xs mt-1">Free 24x7 telephonic clinical advice & counseling.</p>
        </div>

        <div className="bg-white border-2 border-blue-400 rounded-lg p-4 shadow-xs">
          <div className="text-gov-navy font-bold text-xs uppercase flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4" /> National Health Helpline
          </div>
          <div className="text-3xl font-extrabold text-gov-navy mt-1">1075</div>
          <p className="text-slate-600 text-xs mt-1">Epidemic alerts, public advisories & vaccine queries.</p>
        </div>

        <div className="bg-white border-2 border-amber-400 rounded-lg p-4 shadow-xs">
          <div className="text-amber-700 font-bold text-xs uppercase flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4" /> Ayushman Bharat (PM-JAY)
          </div>
          <div className="text-3xl font-extrabold text-amber-800 mt-1">14555</div>
          <p className="text-slate-600 text-xs mt-1">Golden card eligibility, hospital empannelment & claims.</p>
        </div>
      </div>

      {/* District Nodal Officers Directory */}
      <section className="bg-white border border-gov-gray-300 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-bold text-gov-navy border-b border-gov-gray-200 pb-2 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gov-saffron" />
          <span>District Health Officers (DHO) Public Directory</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded space-y-1">
            <div className="font-bold text-gov-navy text-sm">Nashik District Health Office</div>
            <div className="text-slate-600">Zilla Parishad Compound, Trimbak Road, Nashik - 422002</div>
            <div className="text-slate-800 font-semibold pt-1">Phone: 0253-2578129</div>
            <div className="text-slate-600">Email: dho.nashik@maharashtra.gov.in</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded space-y-1">
            <div className="font-bold text-gov-navy text-sm">Dhule District Health Office</div>
            <div className="text-slate-600">Civil Hospital Complex, Sakri Road, Dhule - 424001</div>
            <div className="text-slate-800 font-semibold pt-1">Phone: 02562-288210</div>
            <div className="text-slate-600">Email: dho.dhule@maharashtra.gov.in</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded space-y-1">
            <div className="font-bold text-gov-navy text-sm">Jalgaon District Health Office</div>
            <div className="text-slate-600">Near Collector Office, Court Road, Jalgaon - 425001</div>
            <div className="text-slate-800 font-semibold pt-1">Phone: 0257-2223101</div>
            <div className="text-slate-600">Email: dho.jalgaon@maharashtra.gov.in</div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-white border border-gov-gray-300 rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-bold text-gov-navy border-b border-gov-gray-200 pb-2 flex items-center gap-2">
          <FileQuestion className="w-5 h-5 text-gov-saffron" />
          <span>Frequently Asked Questions (FAQ)</span>
        </h2>

        <div className="space-y-3 text-xs">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-1.5">
              <div className="font-bold text-gov-navy text-sm flex items-center gap-1.5">
                <ChevronRight className="w-4 h-4 text-gov-saffron shrink-0" />
                <span>{faq.q}</span>
              </div>
              <p className="text-slate-700 leading-relaxed pl-5 text-xs">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
