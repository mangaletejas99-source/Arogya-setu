import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Baby,
  CalendarDays,
  ClipboardList,
  Droplets,
  FileText,
  HeartPulse,
  Pill,
  ShieldCheck,
  Stethoscope,
  TestTube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { PatientRecordDemo } from '../../data/mockPatients';
import {
  getPregnancyMonitoringProfile,
  type PregnancyRecordCategory,
  type PregnancyRecordCategoryId,
  type PregnancyRecordEntry,
} from '../../data/pregnancyRecords';

interface PregnancyHealthRecordsProps {
  patient: PatientRecordDemo;
}

const categoryDisplay: Record<PregnancyRecordCategoryId, { icon: LucideIcon; description: string }> = {
  hemoglobin: { icon: Droplets, description: 'CBC result and prior Hb readings' },
  rbc: { icon: Droplets, description: 'Red blood cell laboratory result' },
  wbc: { icon: TestTube, description: 'White blood cell laboratory result' },
  'blood-pressure': { icon: HeartPulse, description: 'Dated measurements and history' },
  'blood-sugar': { icon: Activity, description: 'Glucose tests and previous results' },
  ultrasound: { icon: Baby, description: 'Clinician-documented scan reports' },
  'pregnancy-history': { icon: ClipboardList, description: 'Pregnancy and medical history' },
  medications: { icon: Pill, description: 'Recorded medicines and prescriptions' },
  'antenatal-visits': { icon: Stethoscope, description: 'Doctor visits and follow-up' },
  'risk-assessment': { icon: ShieldCheck, description: 'Clinician-recorded assessment' },
  referrals: { icon: FileText, description: 'Referral and emergency history' },
  'fetal-monitoring': { icon: HeartPulse, description: 'Fetal heart rate and growth records' },
  'allergies-alerts': { icon: AlertTriangle, description: 'Allergies and clinical alerts' },
};

const categoryOrder = Object.keys(categoryDisplay) as PregnancyRecordCategoryId[];
const categoryTitles: Record<PregnancyRecordCategoryId, string> = {
  hemoglobin: 'Hemoglobin (Hb) Level',
  rbc: 'Red Blood Cell (RBC) Count',
  wbc: 'White Blood Cell (WBC) Count',
  'blood-pressure': 'Blood Pressure (BP) Records',
  'blood-sugar': 'Blood Sugar Records',
  ultrasound: 'Ultrasound Scan Reports',
  'pregnancy-history': 'Previous Pregnancy and Medical History',
  medications: 'Current Medications and Prescriptions',
  'antenatal-visits': 'Doctor Visits and Antenatal Check-ups',
  'risk-assessment': 'Pregnancy Risk Assessment',
  referrals: 'Referral and Emergency History',
  'fetal-monitoring': 'Fetal Heart Rate and Growth Monitoring',
  'allergies-alerts': 'Allergies and Important Clinical Alerts',
};

const latestMeasurement = (category: PregnancyRecordCategory | undefined, label: string) => {
  const entries = [...(category?.entries ?? [])].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  const measurement = entries.flatMap((entry) => entry.measurements ?? []).find((item) => item.label === label);
  return measurement ? `${measurement.value}${measurement.unit ? ` ${measurement.unit}` : ''}` : 'Not recorded';
};

const getCategory = (profileCategories: PregnancyRecordCategory[], id: PregnancyRecordCategoryId) =>
  profileCategories.find((category) => category.id === id);

const MeasurementList: React.FC<{ entry: PregnancyRecordEntry }> = ({ entry }) => {
  if (!entry.measurements?.length) return null;
  return (
    <div className="mt-3 space-y-2">
      {entry.measurements.map((measurement) => (
        <div key={`${measurement.label}-${measurement.value}`} className="grid grid-cols-1 sm:grid-cols-[minmax(110px,0.5fr)_1fr] gap-x-3 gap-y-1 border-t border-slate-100 pt-2">
          <div className="font-semibold text-slate-700">{measurement.label}</div>
          <div className="font-bold text-gov-navy">{measurement.value}{measurement.unit ? ` ${measurement.unit}` : ''}</div>
          {measurement.referenceRange && (
            <>
              <div className="text-slate-500">Recorded reference</div>
              <div className="text-slate-600">{measurement.referenceRange}</div>
            </>
          )}
          {measurement.interpretation && (
            <>
              <div className="text-slate-500">Lab interpretation</div>
              <div className="text-slate-700">{measurement.interpretation}</div>
            </>
          )}
          {measurement.requiresReview && (
            <div className="sm:col-span-2 mt-1 rounded-md border border-amber-200 bg-amber-50 px-2.5 py-2 text-amber-900">
              Requires qualified clinical review. Follow the facility's established emergency protocol if an emergency is suspected.
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const RecordEntry: React.FC<{ entry: PregnancyRecordEntry }> = ({ entry }) => {
  const [showReport, setShowReport] = useState(false);
  return (
    <article className="rounded-lg border border-gov-gray-200 bg-white p-3.5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-bold text-gov-navy">{entry.title}</h3>
        {entry.date && <time className="text-[11px] text-slate-500">{entry.date}</time>}
      </div>
      {entry.summary && <p className="mt-2 text-slate-700">{entry.summary}</p>}
      <MeasurementList entry={entry} />
      {entry.details?.length ? (
        <dl className="mt-3 grid grid-cols-1 gap-2 border-t border-slate-100 pt-3 sm:grid-cols-[minmax(145px,0.5fr)_1fr]">
          {entry.details.map((detail) => (
            <React.Fragment key={detail.label}>
              <dt className="font-semibold text-slate-600">{detail.label}</dt>
              <dd className="text-slate-700">{detail.value}</dd>
            </React.Fragment>
          ))}
        </dl>
      ) : null}
      {entry.reportAvailable && entry.reportText && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowReport((visible) => !visible)}
            className="inline-flex items-center gap-1.5 rounded-md border border-gov-navy px-3 py-1.5 font-bold text-gov-navy hover:bg-slate-50"
          >
            <FileText className="h-3.5 w-3.5" />
            {showReport ? 'Hide Demo Report' : 'View Demo Report'}
          </button>
          {showReport && (
            <div className="mt-2 rounded-md border border-sky-200 bg-sky-50 p-3 text-slate-700">
              <div className="font-bold text-gov-navy">DEMO REPORT • Not for clinical use</div>
              <p className="mt-1">{entry.reportText}</p>
            </div>
          )}
        </div>
      )}
      <p className="mt-3 border-t border-slate-100 pt-2 text-[10px] text-slate-500">{entry.source}</p>
    </article>
  );
};

export const PregnancyHealthRecords: React.FC<PregnancyHealthRecordsProps> = ({ patient }) => {
  const profile = getPregnancyMonitoringProfile(patient.patientId);
  const [selectedCategoryId, setSelectedCategoryId] = useState<PregnancyRecordCategoryId | null>(null);

  const selectedCategory = useMemo(
    () => selectedCategoryId
      ? profile?.categories.find((category) => category.id === selectedCategoryId) ?? {
        id: selectedCategoryId,
        title: categoryTitles[selectedCategoryId],
        entries: [],
      }
      : undefined,
    [profile, selectedCategoryId],
  );

  const allCategories = categoryOrder.map((id) => ({
    id,
    title: getCategory(profile?.categories ?? [], id)?.title ?? categoryTitles[id],
    entries: getCategory(profile?.categories ?? [], id)?.entries ?? [],
  }));

  return (
    <section className="mt-4 rounded-lg border border-sky-200 bg-sky-50/50 p-4 sm:p-5" aria-label={`Pregnancy health records for ${patient.name}`}>
      <div className="flex flex-col gap-2 border-b border-sky-200 pb-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-sky-800">DEMO DATA • Prototype records only</div>
          <h2 className="mt-1 text-base font-bold text-gov-navy">Pregnancy Health Records</h2>
          <p className="text-[11px] text-slate-600">{patient.name} • {patient.patientId}</p>
        </div>
        {profile && (
          <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold ${
            profile.riskClassification === 'High Risk'
              ? 'border-amber-300 bg-amber-100 text-amber-950'
              : 'border-emerald-300 bg-emerald-100 text-emerald-900'
          }`}>
            {profile.riskClassification === 'High Risk' && <AlertTriangle className="h-3.5 w-3.5" />}
            {profile.riskClassification === 'High Risk' ? 'HIGH-RISK PREGNANCY' : 'ROUTINE-RISK PREGNANCY'}
          </span>
        )}
      </div>

      {!profile ? (
        <div className="mt-4 rounded-md border border-slate-200 bg-white p-4 text-slate-700">
          <div className="font-bold">No pregnancy monitoring profile is associated with this patient.</div>
          <p className="mt-1">No pregnancy records are shown. Confirm the patient ID and authorized record source.</p>
        </div>
      ) : (
        <>
          {profile.riskClassification === 'High Risk' && (
            <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <AlertTriangle className="h-4 w-4" />
                High-risk pregnancy • clinician-recorded classification
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div><div className="text-[10px] font-bold uppercase text-slate-500">Patient</div><div className="mt-0.5 font-bold text-gov-navy">{patient.name}</div><div>{patient.patientId} • {patient.age} years</div></div>
                <div><div className="text-[10px] font-bold uppercase text-slate-500">Pregnancy</div><div className="mt-0.5 font-semibold">{profile.pregnancyStatus} • {profile.gestationalAgeWeeks ?? 'Not recorded'} weeks</div><div>EDD: {profile.expectedDeliveryDate ?? 'Not recorded'}</div></div>
                <div><div className="text-[10px] font-bold uppercase text-slate-500">Latest recorded readings</div><div className="mt-0.5">BP: {latestMeasurement(getCategory(profile.categories, 'blood-pressure'), 'Systolic')} / {latestMeasurement(getCategory(profile.categories, 'blood-pressure'), 'Diastolic')}</div><div>Hb: {latestMeasurement(getCategory(profile.categories, 'hemoglobin'), 'Hb')}</div><div>Blood sugar: {latestMeasurement(getCategory(profile.categories, 'blood-sugar'), 'Glucose')}</div></div>
                <div><div className="text-[10px] font-bold uppercase text-slate-500">Antenatal follow-up</div><div className="mt-0.5">Last visit: {profile.lastAntenatalVisit ?? 'Not recorded'}</div><div>Next: {profile.nextFollowUp ?? 'Not recorded'}</div></div>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 border-t border-amber-200 pt-3 md:grid-cols-2">
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-500">Documented risk factors</div>
                  {profile.riskFactors.length ? <ul className="mt-1 list-inside list-disc">{profile.riskFactors.map((factor) => <li key={factor}>{factor}</li>)}</ul> : <p className="mt-1">None recorded</p>}
                  {profile.riskAssessment && <p className="mt-1 text-[11px] text-slate-600">{profile.riskAssessment}</p>}
                  {profile.riskAssessedBy && <p className="text-[10px] text-slate-500">Recorded by {profile.riskAssessedBy} on {profile.riskAssessmentDate}</p>}
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-500">Outstanding items</div>
                  {profile.outstandingItems.length ? (
                    <ul className="mt-1 space-y-1">{profile.outstandingItems.map((item) => <li key={item.label} className="flex flex-wrap items-center justify-between gap-2"><span>{item.label}</span><span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold text-amber-900">{item.status}</span></li>)}</ul>
                  ) : <p className="mt-1">No outstanding items recorded.</p>}
                </div>
              </div>
              <p className="mt-3 border-t border-amber-200 pt-2 text-[10px] text-amber-950">For qualified healthcare workers. Verify values with the source facility. This prototype does not diagnose or recommend treatment. Follow the facility's established emergency protocol for emergencies.</p>
            </div>
          )}

          {profile.riskClassification === 'Routine Risk' && (
            <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-950">
              <div className="font-bold">Routine-risk classification recorded by a clinician</div>
              <div className="mt-0.5 text-[11px]">{patient.name} • {patient.patientId} • {profile.gestationalAgeWeeks ?? 'Not recorded'} weeks • EDD: {profile.expectedDeliveryDate ?? 'Not recorded'}</div>
              <div className="mt-1 text-[10px]">This status is taken from the configured demo record; risk is not inferred from pregnancy or measurements.</div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="font-bold text-gov-navy">{selectedCategory ? selectedCategory.title : 'Available pregnancy record categories'}</div>
            {selectedCategory && (
              <button type="button" onClick={() => setSelectedCategoryId(null)} className="inline-flex items-center gap-1 text-[11px] font-bold text-gov-navy hover:underline">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Records List
              </button>
            )}
          </div>

          {selectedCategory ? (
            selectedCategory.entries.length ? (
              <div className="mt-3 space-y-3">
                {selectedCategory.entries.map((entry, index) => <RecordEntry key={`${selectedCategory.id}-${entry.date ?? entry.title}-${index}`} entry={entry} />)}
              </div>
            ) : (
              <div className="mt-3 rounded-md border border-slate-200 bg-white p-4 text-slate-700">
                <div className="font-bold">No {selectedCategory.id === 'ultrasound' ? 'ultrasound report' : 'record'} available</div>
                <p className="mt-1">No {selectedCategory.title.toLowerCase()} are recorded for {patient.patientId} in this demo profile.</p>
              </div>
            )
          ) : (
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {allCategories.map((category) => {
                const Icon = categoryDisplay[category.id].icon;
                return (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className="flex min-h-[68px] items-center gap-3 rounded-lg border border-gov-gray-200 bg-white p-3 text-left transition hover:border-gov-navy hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-gov-navy/30"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-gov-navy"><Icon className="h-4 w-4" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold text-gov-navy">{category.title}</span>
                      <span className="mt-0.5 block text-[10px] text-slate-500">{category.entries.length ? `${category.entries.length} recorded item${category.entries.length === 1 ? '' : 's'}` : 'No entries recorded'}</span>
                    </span>
                    <CalendarDays className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
};
