import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  PhoneCall,
  Share2,
  Calendar,
  Building2,
  Info,
  RotateCcw,
  FileText
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export type TriageSeverity = 'NORMAL' | 'URGENT' | 'EMERGENCY';

export const TriageWorkflow: React.FC = () => {
  const { t } = useAccessibility();
  const navigate = useNavigate();

  // Form states
  const [age, setAge] = useState<string>('48');
  const [gender, setGender] = useState<string>('Male');
  const [primarySymptom, setPrimarySymptom] = useState<string>('chest_pain');
  const [durationDays, setDurationDays] = useState<string>('2');
  const [temperature, setTemperature] = useState<string>('99.2');
  const [systolicBp, setSystolicBp] = useState<string>('152');
  const [diastolicBp, setDiastolicBp] = useState<string>('94');
  const [spo2, setSpo2] = useState<string>('97');
  const [isPregnant, setIsPregnant] = useState<string>('no');
  const [hasDiabetes, setHasDiabetes] = useState<boolean>(true);
  const [hasHypertension, setHasHypertension] = useState<boolean>(true);
  const [hasHeartHistory, setHasHeartHistory] = useState<boolean>(false);
  const [currentMeds, setCurrentMeds] = useState<string>('Metformin 500mg, Amlodipine 5mg');

  // Triage Result
  const [result, setResult] = useState<{
    severity: TriageSeverity;
    reasons: string[];
    recommendedFacility: string;
    actionAdvice: string;
  } | null>(null);

  const calculateTriage = (e: React.FormEvent) => {
    e.preventDefault();

    const reasons: string[] = [];
    let severity: TriageSeverity = 'NORMAL';

    const sBp = parseInt(systolicBp) || 120;
    const dBp = parseInt(diastolicBp) || 80;
    const temp = parseFloat(temperature) || 98.6;
    const o2 = parseInt(spo2) || 98;

    // Check Emergency criteria
    if (primarySymptom === 'chest_pain' && (sBp > 150 || dBp > 95 || hasHeartHistory)) {
      severity = 'EMERGENCY';
      reasons.push('Chest pain combined with elevated blood pressure and chronic vascular risk profile.');
    } else if (primarySymptom === 'breathless' || o2 < 93) {
      severity = 'EMERGENCY';
      reasons.push(`Low blood oxygen saturation (SpO2: ${o2}%) or acute respiratory compromise.`);
    } else if (isPregnant === 'yes' && (sBp >= 150 || dBp >= 100)) {
      severity = 'EMERGENCY';
      reasons.push('Suspected pre-eclampsia / gestational hypertension crisis in pregnancy.');
    } else if (primarySymptom === 'fever' && temp >= 103 && parseInt(durationDays) >= 3) {
      severity = 'URGENT';
      reasons.push('High-grade prolonged pyrexia (>103°F) suspicious of vector-borne / infectious etiology.');
    } else if (sBp >= 160 || dBp >= 100) {
      severity = 'URGENT';
      reasons.push('Stage 2 severe hypertension requiring in-person clinical titration.');
    } else if (primarySymptom === 'fever' || primarySymptom === 'vomiting' || primarySymptom === 'abdomen') {
      severity = 'URGENT';
      reasons.push('Active acute symptoms warranting Primary Health Centre evaluation within 24 hours.');
    } else {
      severity = 'NORMAL';
      reasons.push('Vital signs within physiological safety thresholds. No acute red-flag distress noted.');
    }

    let recommendedFacility = 'Primary Health Centre – Trimbakeshwar';
    let actionAdvice = 'Schedule regular OPD visit or start teleconsultation.';

    if (severity === 'EMERGENCY') {
      recommendedFacility = 'District Civil Hospital, Nashik (Trauma & Intensive Care Unit)';
      actionAdvice = 'Immediate medical attention recommended. Report to emergency casualty or dial 108 ambulance.';
    } else if (severity === 'URGENT') {
      recommendedFacility = 'Primary Health Centre or Sub-District Hospital OPD';
      actionAdvice = 'Visit doctor within 24 hours for evaluation, lab investigations, and prescription adjustment.';
    }

    setResult({
      severity,
      reasons,
      recommendedFacility,
      actionAdvice,
    });
  };

  const resetForm = () => {
    setResult(null);
  };

  return (
    <div className="bg-white border border-gov-gray-300 rounded-lg p-5">
      {/* Title & Statutory Clinical Disclaimer */}
      <div className="border-b border-gov-gray-200 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gov-navy uppercase tracking-wider">
            Clinical Decision Support System (CDSS)
          </span>
          <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 font-bold px-2 py-0.5 rounded">
            Prototype Algorithm
          </span>
        </div>
        <h2 className="text-lg font-bold text-gov-navy mt-1">
          Structured Digital Public Health Triage
        </h2>

        {/* Essential Safety Mandate */}
        <div className="mt-3 p-3 bg-blue-50/70 border border-blue-200 rounded flex items-start gap-2.5 text-xs text-blue-900 leading-relaxed">
          <Info className="w-4 h-4 text-gov-navy shrink-0 mt-0.5" />
          <div>
            <strong>Important Clinical Notice:</strong> This is an algorithmic decision-support prototype. It does <strong>NOT</strong> provide a definitive medical diagnosis and cannot replace qualified clinical examination. In case of acute chest discomfort, sudden paralysis, severe breathlessness, or trauma, contact Emergency <strong>108</strong> immediately.
          </div>
        </div>
      </div>

      {!result ? (
        <form onSubmit={calculateTriage} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Age */}
            <div>
              <label htmlFor="triage-age" className="block font-semibold text-gov-gray-700 mb-1">
                Patient Age (Years) *
              </label>
              <input
                id="triage-age"
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="triage-gender" className="block font-semibold text-gov-gray-700 mb-1">
                Gender *
              </label>
              <select
                id="triage-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Pregnancy */}
            <div>
              <label htmlFor="triage-pregnancy" className="block font-semibold text-gov-gray-700 mb-1">
                Currently Pregnant?
              </label>
              <select
                id="triage-pregnancy"
                disabled={gender === 'Male'}
                value={gender === 'Male' ? 'no' : isPregnant}
                onChange={(e) => setIsPregnant(e.target.value)}
                className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none bg-white disabled:bg-gray-100"
              >
                <option value="no">No</option>
                <option value="yes">Yes (Antenatal Mother)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Primary Symptom */}
            <div>
              <label htmlFor="triage-symptom" className="block font-semibold text-gov-gray-700 mb-1">
                Primary Chief Complaint / Symptom *
              </label>
              <select
                id="triage-symptom"
                value={primarySymptom}
                onChange={(e) => setPrimarySymptom(e.target.value)}
                className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none bg-white font-medium"
              >
                <option value="chest_pain">Chest Pain / Heaviness / Radiating Pain (Severe)</option>
                <option value="breathless">Acute Shortness of Breath / Wheezing</option>
                <option value="fever">High Fever with Chills / Shivering</option>
                <option value="abdomen">Severe Abdominal Pain / Colic</option>
                <option value="vomiting">Persistent Vomiting / Dehydration</option>
                <option value="dizziness">Sudden Dizziness / Fainting / Confusion</option>
                <option value="routine_cough">Mild Cough / Cold / Routine Check</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="triage-duration" className="block font-semibold text-gov-gray-700 mb-1">
                Symptom Duration (Days)
              </label>
              <input
                id="triage-duration"
                type="number"
                min="0"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
              />
            </div>
          </div>

          {/* Vitals Input Grid */}
          <div className="bg-gov-gray-50 border border-gov-gray-200 rounded p-3 text-xs space-y-2">
            <div className="font-bold text-gov-navy uppercase tracking-wider text-[11px]">
              Point-of-Care Vitals (Recorded by Patient or ASHA Worker)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label htmlFor="triage-temp" className="block text-slate-600 mb-1">Temperature (°F)</label>
                <input
                  id="triage-temp"
                  type="text"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="98.6"
                  className="w-full p-1.5 border border-slate-300 rounded bg-white"
                />
              </div>
              <div>
                <label htmlFor="triage-sbp" className="block text-slate-600 mb-1">Systolic BP (mmHg)</label>
                <input
                  id="triage-sbp"
                  type="number"
                  value={systolicBp}
                  onChange={(e) => setSystolicBp(e.target.value)}
                  placeholder="120"
                  className="w-full p-1.5 border border-slate-300 rounded bg-white"
                />
              </div>
              <div>
                <label htmlFor="triage-dbp" className="block text-slate-600 mb-1">Diastolic BP (mmHg)</label>
                <input
                  id="triage-dbp"
                  type="number"
                  value={diastolicBp}
                  onChange={(e) => setDiastolicBp(e.target.value)}
                  placeholder="80"
                  className="w-full p-1.5 border border-slate-300 rounded bg-white"
                />
              </div>
              <div>
                <label htmlFor="triage-spo2" className="block text-slate-600 mb-1">Oxygen SpO2 (%)</label>
                <input
                  id="triage-spo2"
                  type="number"
                  value={spo2}
                  onChange={(e) => setSpo2(e.target.value)}
                  placeholder="98"
                  className="w-full p-1.5 border border-slate-300 rounded bg-white"
                />
              </div>
            </div>
          </div>

          {/* Pre-existing conditions check */}
          <div className="text-xs">
            <div className="font-semibold text-gov-gray-700 mb-1.5">Pre-existing Medical History:</div>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasDiabetes}
                  onChange={(e) => setHasDiabetes(e.target.checked)}
                  className="rounded border-gray-300 text-gov-navy focus:ring-gov-navy"
                />
                <span>Diabetes Mellitus</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasHypertension}
                  onChange={(e) => setHasHypertension(e.target.checked)}
                  className="rounded border-gray-300 text-gov-navy focus:ring-gov-navy"
                />
                <span>Hypertension (High BP)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasHeartHistory}
                  onChange={(e) => setHasHeartHistory(e.target.checked)}
                  className="rounded border-gray-300 text-gov-navy focus:ring-gov-navy"
                />
                <span>Known Heart Condition / Stent</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="triage-meds" className="block font-semibold text-gov-gray-700 text-xs mb-1">
              Current Regular Medications
            </label>
            <input
              id="triage-meds"
              type="text"
              value={currentMeds}
              onChange={(e) => setCurrentMeds(e.target.value)}
              className="w-full p-2 border border-gov-gray-300 rounded text-xs focus:ring-1 focus:ring-gov-navy focus:outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-gov-navy text-white px-6 py-2.5 rounded font-bold text-xs hover:bg-gov-navyLight transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Execute Clinical Triage Assessment</span>
            </button>
          </div>
        </form>
      ) : (
        /* Results View */
        <div className="space-y-4">
          {/* Emergency Alert Banner */}
          {result.severity === 'EMERGENCY' && (
            <div className="bg-rose-50 border-2 border-gov-emergency rounded-lg p-4 text-gov-emergency">
              <div className="flex items-start gap-3">
                <AlertOctagon className="w-8 h-8 text-gov-emergency shrink-0 animate-pulse" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gov-emergency">
                    CRITICAL RED-FLAG ALERT
                  </div>
                  <h3 className="text-lg font-black text-gov-emergency">
                    {t.severityEmergency}
                  </h3>
                  <p className="mt-1 text-xs text-rose-950 font-medium">
                    {result.actionAdvice}
                  </p>
                </div>
              </div>

              {/* Immediate Escalation Action Strip */}
              <div className="mt-4 pt-3 border-t border-rose-200 flex flex-wrap items-center gap-3">
                <a
                  href="tel:108"
                  className="bg-gov-emergency text-white px-4 py-2 rounded font-bold text-xs flex items-center gap-1.5 hover:bg-rose-800 transition-colors shadow-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call 108 Ambulance</span>
                </a>
                <Link
                  to="/citizen/emergency"
                  className="bg-white border border-rose-400 text-gov-emergency px-4 py-2 rounded font-semibold text-xs hover:bg-rose-100 flex items-center gap-1.5"
                >
                  <AlertOctagon className="w-4 h-4" />
                  <span>View Emergency Facilities</span>
                </Link>
                <Link
                  to="/citizen/referrals"
                  className="bg-white border border-gov-navy text-gov-navy px-4 py-2 rounded font-semibold text-xs hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Initiate Emergency Transfer Referral</span>
                </Link>
              </div>
            </div>
          )}

          {/* Urgent Banner */}
          {result.severity === 'URGENT' && (
            <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-4 text-amber-900">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-7 h-7 text-amber-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    PRIORITY YELLOW STATUS
                  </div>
                  <h3 className="text-base font-black text-amber-900">
                    {t.severityUrgent}
                  </h3>
                  <p className="mt-1 text-xs text-amber-950 font-medium">
                    {result.actionAdvice}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Normal Banner */}
          {result.severity === 'NORMAL' && (
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-lg p-4 text-emerald-900">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    GREEN STATUS — ROUTINE CARE
                  </div>
                  <h3 className="text-base font-black text-emerald-900">
                    {t.severityNormal}
                  </h3>
                  <p className="mt-1 text-xs text-emerald-950 font-medium">
                    {result.actionAdvice}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Clinical Rationale Box */}
          <div className="bg-slate-50 border border-gov-gray-200 rounded p-4 text-xs space-y-2">
            <div className="font-bold text-gov-navy uppercase tracking-wider text-[11px]">
              Triage Assessment Findings:
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              {result.reasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>

            <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div>
                <span className="text-slate-500">Recommended Healthcare Tier:</span>
                <div className="font-bold text-gov-navy flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-gov-saffron" />
                  <span>{result.recommendedFacility}</span>
                </div>
              </div>
              <div>
                <span className="text-slate-500">Recorded Vitals:</span>
                <div className="font-semibold text-slate-800 mt-0.5">
                  BP: {systolicBp}/{diastolicBp} mmHg | Temp: {temperature}°F | SpO2: {spo2}%
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={resetForm}
              className="flex items-center gap-1.5 px-3 py-2 border border-gov-gray-300 rounded text-xs font-semibold text-gov-gray-700 hover:bg-gov-gray-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Triage Assessment</span>
            </button>

            <div className="flex items-center gap-2">
              <Link
                to="/citizen/appointments"
                className="bg-gov-navy text-white px-4 py-2 rounded text-xs font-bold hover:bg-gov-navyLight flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book OPD Slot</span>
              </Link>
              <button
                onClick={() => alert("Structured Clinical Triage Summary exported to Patient Health Record.")}
                className="border border-gov-navy text-gov-navy px-3 py-2 rounded text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Save to ABHA Record</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
