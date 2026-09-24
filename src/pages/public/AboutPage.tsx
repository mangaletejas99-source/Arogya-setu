import React from 'react';
import { Shield, Building2, Share2, Award, Lock, FileCheck, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';

const communityCareImage = 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Masthead */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          Institutional Overview
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gov-navy mt-1">
          About Arogya Setu (आरोग्य सेतू)
        </h1>
        <p className="text-sm text-gov-gray-600 mt-1">
          Integrated Digital Public Health Platform — Demonstration Prototype modeled on Indian Public Healthcare Systems.
        </p>
      </div>

      {/* Prototype Statement Callout */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-5 text-amber-950 text-xs leading-relaxed space-y-2">
        <div className="font-bold text-sm text-amber-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-700" />
          <span>PROTOTYPE / DEMO • Public Health Information Platform</span>
        </div>
        <p>
          Arogya Setu is an architectural prototype created to demonstrate an end-to-end digital public health platform connecting rural citizens, community health workers (ASHA/ANM), Primary Health Centres, Civil Hospitals, and Government Administrators.
        </p>
        <p>
          <strong>Notice:</strong> This is NOT an official Government of India or Government of Maharashtra website. Its information architecture, accessibility, and visual discipline are inspired by guidelines published by the Ministry of Health & Family Welfare (MoHFW) and the Guidelines for Indian Government Websites (GIGW).
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gov-gray-300 bg-white shadow-sm">
        <ImageWithFallback
          src={communityCareImage}
          alt="Community healthcare workers speaking with a patient during a rural public health outreach visit"
          className="h-72 w-full object-cover"
        />
      </div>

      {/* 3-Tier Public Health Network Architecture */}
      <section id="hierarchy" className="space-y-4">
        <h2 className="text-xl font-bold text-gov-navy flex items-center gap-2 border-b border-gov-gray-200 pb-2">
          <Building2 className="w-5 h-5 text-gov-saffron" />
          <span>The Integrated 5-Tier Healthcare Continuum</span>
        </h2>
        <p className="text-xs text-gov-gray-600 leading-relaxed">
          The core vision of Arogya Setu is bridging geographic disparities across rural and urban India by establishing a continuous digital pipeline from the grassroots village to tertiary care:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="bg-white border-2 border-gov-navy rounded-lg p-4 shadow-xs">
            <span className="bg-gov-navy text-white text-[10px] font-bold px-2 py-0.5 rounded">Tier 1</span>
            <h3 className="font-bold text-gov-navy text-sm mt-2">Health Sub-Centre / Ayushman Arogya Mandir</h3>
            <p className="text-slate-600 text-[11px] mt-1">
              Field screening by ASHA & ANM. Offline-first vitals recording, immunisation, and NCD door-to-door surveys.
            </p>
          </div>

          <div className="bg-white border-2 border-gov-navy rounded-lg p-4 shadow-xs">
            <span className="bg-gov-navy text-white text-[10px] font-bold px-2 py-0.5 rounded">Tier 2</span>
            <h3 className="font-bold text-gov-navy text-sm mt-2">Primary Health Centre (PHC)</h3>
            <p className="text-slate-600 text-[11px] mt-1">
              Medical Officer OPD, basic blood/urine diagnostics, 24x7 normal deliveries, and e-Sanjeevani teleconsultation hub.
            </p>
          </div>

          <div className="bg-white border-2 border-gov-navy rounded-lg p-4 shadow-xs">
            <span className="bg-gov-navy text-white text-[10px] font-bold px-2 py-0.5 rounded">Tier 3</span>
            <h3 className="font-bold text-gov-navy text-sm mt-2">Rural Hospital / CHC (30 Beds)</h3>
            <p className="text-slate-600 text-[11px] mt-1">
              First Referral Unit (FRU) providing emergency obstetric care, minor OT, digital X-Ray, and 108 ambulance base.
            </p>
          </div>

          <div className="bg-white border-2 border-gov-navy rounded-lg p-4 shadow-xs">
            <span className="bg-gov-navy text-white text-[10px] font-bold px-2 py-0.5 rounded">Tier 4</span>
            <h3 className="font-bold text-gov-navy text-sm mt-2">District Civil Hospital (500 Beds)</h3>
            <p className="text-slate-600 text-[11px] mt-1">
              Secondary care multi-specialty hub: ICU, NICU, Dialysis, Blood Bank, and CT/MRI imaging.
            </p>
          </div>

          <div className="bg-white border-2 border-gov-navy rounded-lg p-4 shadow-xs">
            <span className="bg-gov-navy text-white text-[10px] font-bold px-2 py-0.5 rounded">Tier 5</span>
            <h3 className="font-bold text-gov-navy text-sm mt-2">Government Medical College</h3>
            <p className="text-slate-600 text-[11px] mt-1">
              Super-specialty tertiary oncology, cardiac surgery, neurosurgery, and academic research.
            </p>
          </div>
        </div>
      </section>

      {/* Key Architectural Pillars */}
      <section id="standards" className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="bg-white border border-gov-gray-200 rounded-lg p-5 space-y-2">
          <div className="p-2 w-9 h-9 rounded bg-blue-100 text-gov-navy flex items-center justify-center font-bold">
            <Share2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gov-navy text-sm">Ayushman Bharat Digital Standards</h3>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Implements interoperable Fast Healthcare Interoperability Resources (FHIR) architecture concepts with consent-managed ABHA health records sharing between facilities.
          </p>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded-lg p-5 space-y-2">
          <div className="p-2 w-9 h-9 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gov-navy text-sm">GIGW & Accessibility by Design</h3>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Engineered to conform with Guidelines for Indian Government Websites (GIGW 3.0), featuring screen reader tags, high contrast modes, and font zoom from 80% to 140%.
          </p>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded-lg p-5 space-y-2">
          <div className="p-2 w-9 h-9 rounded bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gov-navy text-sm">Offline-First Low Connectivity</h3>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Designed for deep rural environments with unreliable 2G/3G mobile networks. ASHA workers record vital maternal/child data offline with auto-sync upon reconnection.
          </p>
        </div>
      </section>

      {/* Website Policies & Security */}
      <section id="privacy" className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4 text-xs">
        <h2 className="text-base font-bold text-gov-navy border-b border-slate-200 pb-2">
          Privacy Policy & Data Security Framework
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700 leading-relaxed text-[11px]">
          <div>
            <h4 className="font-bold text-gov-navy mb-1">Consent-Based Access Control</h4>
            <p>
              Citizen medical history, diagnostic reports, and prescriptions cannot be accessed by doctors or health workers without explicit patient OTP or biometric consent, conforming to Digital Personal Data Protection (DPDP) principles.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gov-navy mb-1">De-Identified Public Health Analytics</h4>
            <p>
              The Government Health Administration dashboard strictly aggregates epidemiological indices (disease trends, stock levels, wait times). Personally identifiable health information (PII/PHI) is never exposed in administrative views.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
