import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility } from '../../context/AccessibilityContext';
import { Shield, PhoneCall, ExternalLink, AlertTriangle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useAccessibility();

  return (
    <footer className="bg-[#07243B] text-slate-300 text-xs border-t-4 border-gov-saffron pt-10 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* National Emergency Helplines Strip */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-4 mb-8">
          <div className="text-xs font-bold text-gov-saffron uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-gov-saffron" />
            <span>National & State Emergency Health Helplines (Toll-Free 24x7)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-xs">
            <div className="bg-slate-900/60 p-2 rounded border border-slate-700">
              <div className="text-slate-400 text-[11px]">Ambulance Emergency</div>
              <div className="text-lg font-extrabold text-white">108</div>
            </div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-700">
              <div className="text-slate-400 text-[11px]">Health Advice / Tele-OPD</div>
              <div className="text-lg font-extrabold text-emerald-400">104</div>
            </div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-700">
              <div className="text-slate-400 text-[11px]">National Health Helpline</div>
              <div className="text-lg font-extrabold text-white">1075</div>
            </div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-700">
              <div className="text-slate-400 text-[11px]">All-in-One Emergency</div>
              <div className="text-lg font-extrabold text-amber-300">112</div>
            </div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-700">
              <div className="text-slate-400 text-[11px]">Ayushman Bharat (AB-PMJAY)</div>
              <div className="text-lg font-extrabold text-sky-300">14555</div>
            </div>
          </div>
        </div>

        {/* Multi-column government portal directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8 text-xs">
          
          {/* Col 1: About & Hierarchy */}
          <div className="space-y-2 col-span-2 sm:col-span-1">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-700 pb-1">
              About Arogya Setu
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link to="/about" className="hover:text-white">Vision & Objectives</Link></li>
              <li><Link to="/about#hierarchy" className="hover:text-white">Public Health Hierarchy</Link></li>
              <li><Link to="/about#standards" className="hover:text-white">ABDM Standards</Link></li>
              <li><Link to="/about#security" className="hover:text-white">Data Privacy Framework</Link></li>
            </ul>
          </div>

          {/* Col 2: Citizen Services */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-700 pb-1">
              Citizen Services
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link to="/citizen/appointments" className="hover:text-white">Book OPD Appointment</Link></li>
              <li><Link to="/citizen/queue" className="hover:text-white">Live Queue Status</Link></li>
              <li><Link to="/citizen/records" className="hover:text-white">Digital Health Record</Link></li>
              <li><Link to="/citizen/triage" className="hover:text-white">Digital Symptom Triage</Link></li>
              <li><Link to="/citizen/teleconsultation" className="hover:text-white">Teleconsultation</Link></li>
            </ul>
          </div>

          {/* Col 3: Clinical & Logistics */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-700 pb-1">
              Clinical & Facilities
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link to="/facilities" className="hover:text-white">Facility Directory</Link></li>
              <li><Link to="/citizen/medicines" className="hover:text-white">Medicine Stock Search</Link></li>
              <li><Link to="/citizen/diagnostics" className="hover:text-white">Diagnostic Coordination</Link></li>
              <li><Link to="/citizen/referrals" className="hover:text-white">Referral Tracking</Link></li>
              <li><Link to="/citizen/emergency" className="hover:text-white">Emergency Escalation</Link></li>
            </ul>
          </div>

          {/* Col 4: Schemes & Welfare */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-700 pb-1">
              Health Schemes
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link to="/schemes" className="hover:text-white">Ayushman Bharat PM-JAY</Link></li>
              <li><Link to="/schemes" className="hover:text-white">MJPJAY Maharashtra</Link></li>
              <li><Link to="/schemes" className="hover:text-white">PMSMA (Maternal)</Link></li>
              <li><Link to="/schemes" className="hover:text-white">Senior Vaya Vandana</Link></li>
              <li><Link to="/schemes" className="hover:text-white">Janani Suraksha Yojana</Link></li>
            </ul>
          </div>

          {/* Col 5: Governance & Grievance */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-700 pb-1">
              Public Governance
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link to="/notices" className="hover:text-white">Notices & Circulars</Link></li>
              <li><Link to="/grievance" className="hover:text-white">Lodge Grievance</Link></li>
              <li><Link to="/grievance#track" className="hover:text-white">Track Grievance Status</Link></li>
              <li><Link to="/government/dashboard" className="hover:text-white">Public Health Analytics</Link></li>
              <li><Link to="/help" className="hover:text-white">District Nodal Officers</Link></li>
            </ul>
          </div>

          {/* Col 6: Reference Links */}
          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] border-b border-slate-700 pb-1">
              External References
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a href="https://www.mohfw.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>MoHFW India</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://abdm.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>ABDM Portal</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>National Portal</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://guidelines.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>GIGW Guidelines</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Prototype & Public Service Integrity Notice */}
        <div className="border-t border-slate-800 pt-6 pb-4">
          <div className="flex items-start gap-3 bg-slate-900/90 border border-slate-700 p-3.5 rounded text-slate-300">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1 leading-relaxed">
              <div className="font-bold text-white">
                PROTOTYPE / DEMO
              </div>
              <p>
                {t.disclaimer} This platform is designed for research, architecture demonstration, and workflow modeling of an integrated public healthcare ecosystem in India (Sub-Centre → PHC → Rural Hospital → District Hospital). All patient profiles, biometric IDs, and hospital data shown are purely mock/demo illustrations.
              </p>
              <p className="text-amber-200 font-medium">
                AROGYA SETU is a prototype/demo developed for educational and hackathon purposes. It is not an official Government of India portal and is not connected to government health databases.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Policy Links & Timestamp */}
        <div className="border-t border-slate-800 pt-4 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link to="/about#privacy" className="hover:text-white">{t.privacyPolicy}</Link>
            <span>|</span>
            <Link to="/about#terms" className="hover:text-white">{t.termsOfUse}</Link>
            <span>|</span>
            <Link to="/accessibility" className="hover:text-white">Accessibility Statement</Link>
            <span>|</span>
            <Link to="/about#hyperlink" className="hover:text-white">Website Policies</Link>
            <span>|</span>
            <Link to="/help" className="hover:text-white">Feedback</Link>
          </div>

          <div className="flex items-center gap-4 text-center md:text-right">
            <span>{t.lastUpdated}</span>
            <span>•</span>
            <span>{t.copyrightNotice}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
