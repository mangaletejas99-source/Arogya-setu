export type PregnancyRecordCategoryId =
  | 'hemoglobin'
  | 'rbc'
  | 'wbc'
  | 'blood-pressure'
  | 'blood-sugar'
  | 'ultrasound'
  | 'pregnancy-history'
  | 'medications'
  | 'antenatal-visits'
  | 'risk-assessment'
  | 'referrals'
  | 'fetal-monitoring'
  | 'allergies-alerts';

export interface PregnancyMeasurement {
  label: string;
  value: string;
  unit?: string;
  referenceRange?: string;
  interpretation?: string;
  requiresReview?: boolean;
}

export interface PregnancyRecordEntry {
  date?: string;
  title: string;
  summary?: string;
  source: string;
  measurements?: PregnancyMeasurement[];
  details?: { label: string; value: string }[];
  reportAvailable?: boolean;
  reportText?: string;
}

export interface PregnancyRecordCategory {
  id: PregnancyRecordCategoryId;
  title: string;
  entries: PregnancyRecordEntry[];
}

export interface PregnancyMonitoringProfile {
  patientId: string;
  pregnancyStatus: 'Pregnant';
  gestationalAgeWeeks?: number;
  expectedDeliveryDate?: string;
  riskClassification: 'High Risk' | 'Routine Risk';
  riskFactors: string[];
  riskAssessment?: string;
  riskAssessedBy?: string;
  riskAssessmentDate?: string;
  lastAntenatalVisit?: string;
  nextFollowUp?: string;
  outstandingItems: { label: string; status: 'Pending' | 'Follow-up Required' | 'Requires Clinical Review' }[];
  categories: PregnancyRecordCategory[];
}

const demoSource = 'Clearly labelled DEMO DATA • Prototype clinician-entered record';

export const PREGNANCY_MONITORING_PROFILES: Record<string, PregnancyMonitoringProfile> = {
  'PAT-1002': {
    patientId: 'PAT-1002',
    pregnancyStatus: 'Pregnant',
    gestationalAgeWeeks: 34,
    expectedDeliveryDate: '2026-11-23',
    riskClassification: 'High Risk',
    riskFactors: ['Clinician-recorded anaemia', 'High-risk ANC referral in progress'],
    riskAssessment: 'High-risk ANC classification recorded for follow-up. This prototype does not calculate risk from measurements.',
    riskAssessedBy: 'Dr. Neha Kulkarni',
    riskAssessmentDate: '2026-10-12',
    lastAntenatalVisit: '2026-10-12',
    nextFollowUp: '2026-10-20',
    outstandingItems: [
      { label: 'District Hospital ANC referral review', status: 'Follow-up Required' },
      { label: 'Repeat CBC', status: 'Pending' },
    ],
    categories: [
      {
        id: 'hemoglobin',
        title: 'Hemoglobin (Hb) Level',
        entries: [
          {
            date: '2026-10-12',
            title: 'Hemoglobin',
            source: demoSource,
            measurements: [{ label: 'Hb', value: '10.2', unit: 'g/dL', referenceRange: 'Per reporting laboratory; confirm locally', interpretation: 'Below the reference interval recorded by this demo laboratory. Requires clinician review; not a diagnosis.', requiresReview: true }],
          },
          {
            date: '2026-09-10',
            title: 'Hemoglobin',
            source: demoSource,
            measurements: [{ label: 'Hb', value: '9.8', unit: 'g/dL', referenceRange: 'Per reporting laboratory; confirm locally', interpretation: 'Historical demo result. Pregnancy-specific thresholds are not inferred.' }],
          },
        ],
      },
      {
        id: 'rbc',
        title: 'Red Blood Cell (RBC) Count',
        entries: [{
          date: '2026-10-12',
          title: 'RBC count',
          source: demoSource,
          measurements: [{ label: 'RBC', value: '3.82', unit: 'million/µL', referenceRange: '4.0–5.2 million/µL (demo lab interval)', interpretation: 'Below the demo laboratory interval; clinical correlation required.' }],
        }],
      },
      {
        id: 'wbc',
        title: 'White Blood Cell (WBC) Count',
        entries: [{
          date: '2026-10-12',
          title: 'WBC count',
          source: demoSource,
          measurements: [{ label: 'WBC', value: '8.6', unit: '×10³/µL', referenceRange: '4.0–11.0 ×10³/µL (demo lab interval)', interpretation: 'Within the reference interval recorded by this demo laboratory.' }],
        }],
      },
      {
        id: 'blood-pressure',
        title: 'Blood Pressure (BP) Records',
        entries: [
          {
            date: '2026-10-12 10:15',
            title: 'ANC visit measurement',
            source: demoSource,
            measurements: [
              { label: 'Systolic', value: '128', unit: 'mmHg' },
              { label: 'Diastolic', value: '82', unit: 'mmHg' },
            ],
            summary: 'Recorded for clinician review. No automated diagnosis is made.',
          },
          {
            date: '2026-09-10 09:40',
            title: 'Previous ANC measurement',
            source: demoSource,
            measurements: [
              { label: 'Systolic', value: '116', unit: 'mmHg' },
              { label: 'Diastolic', value: '74', unit: 'mmHg' },
            ],
          },
        ],
      },
      {
        id: 'blood-sugar',
        title: 'Blood Sugar Records',
        entries: [
          {
            date: '2026-10-12 08:20',
            title: 'Fasting plasma glucose',
            source: demoSource,
            measurements: [{ label: 'Glucose', value: '91', unit: 'mg/dL', referenceRange: 'Refer to reporting laboratory and clinician', interpretation: 'Recorded demo result; no diagnostic threshold is applied.' }],
          },
          {
            date: '2026-09-10 08:10',
            title: 'Fasting plasma glucose',
            source: demoSource,
            measurements: [{ label: 'Glucose', value: '94', unit: 'mg/dL', referenceRange: 'Refer to reporting laboratory and clinician', interpretation: 'Historical demo result.' }],
          },
        ],
      },
      {
        id: 'ultrasound',
        title: 'Ultrasound Scan Reports',
        entries: [{
          date: '2026-10-03',
          title: 'Obstetric ultrasound • 32 weeks',
          summary: 'Demo summary: single fetus documented; report available for authorized clinician review.',
          source: demoSource,
          measurements: [
            { label: 'Pregnancy week at scan', value: '32', unit: 'weeks' },
            { label: 'Fetal growth', value: 'No fetal growth measurement documented in this demo summary' },
          ],
          details: [
            { label: 'Relevant findings', value: 'No additional findings transcribed in this summary.' },
            { label: 'Clinician documentation', value: 'Review original report with the responsible clinician.' },
          ],
          reportAvailable: true,
          reportText: 'Prototype-only sample report: fetal measurements and scan interpretation are intentionally not supplied. Use the original facility report for clinical decisions.',
        }],
      },
      {
        id: 'pregnancy-history',
        title: 'Previous Pregnancy and Medical History',
        entries: [{
          date: '2026-10-12',
          title: 'History reviewed at ANC',
          source: demoSource,
          details: [
            { label: 'Previous pregnancies', value: 'One prior pregnancy recorded; outcome: uncomplicated term delivery (demo history).' },
            { label: 'Previous complications', value: 'None recorded in this demo profile.' },
            { label: 'Existing medical conditions', value: 'Anaemia (also listed in the patient record).' },
            { label: 'Relevant hospital admissions', value: 'No prior admission details recorded.' },
          ],
        }],
      },
      {
        id: 'medications',
        title: 'Current Medications and Prescriptions',
        entries: [{
          date: '2026-10-12',
          title: 'Medication reconciliation',
          source: demoSource,
          details: [
            { label: 'Medicine', value: 'Iron and folic acid tablets' },
            { label: 'Recorded dosage', value: '1 tablet daily (as recorded; verify prescription)' },
            { label: 'Prescribing clinician', value: 'Dr. Neha Kulkarni' },
            { label: 'Prescription date', value: '2026-10-12' },
            { label: 'Medication history', value: 'Iron tablets and calcium tablets listed in the patient demo record.' },
          ],
        }],
      },
      {
        id: 'antenatal-visits',
        title: 'Doctor Visits and Antenatal Check-ups',
        entries: [{
          date: '2026-10-12',
          title: 'Antenatal follow-up',
          source: demoSource,
          details: [
            { label: 'Clinician', value: 'Dr. Neha Kulkarni' },
            { label: 'Examination summary', value: 'ANC review recorded; vitals and CBC noted for clinician follow-up.' },
            { label: 'Recommended follow-up', value: '2026-10-20' },
          ],
        }],
      },
      {
        id: 'risk-assessment',
        title: 'Pregnancy Risk Assessment',
        entries: [{
          date: '2026-10-12',
          title: 'Recorded risk classification: High Risk',
          source: demoSource,
          details: [
            { label: 'Risk factors documented', value: 'Anaemia; high-risk ANC referral in progress.' },
            { label: 'Previous complications', value: 'None recorded in this demo assessment.' },
            { label: 'Clinician assessment', value: 'High-risk ANC classification recorded for follow-up; no automatic assessment is performed.' },
            { label: 'Recommended follow-up', value: '2026-10-20 with the assigned clinical team.' },
            { label: 'Assessed by', value: 'Dr. Neha Kulkarni' },
          ],
        }],
      },
      {
        id: 'referrals',
        title: 'Referral and Emergency History',
        entries: [{
          date: '2026-10-13',
          title: 'ANC referral',
          source: demoSource,
          details: [
            { label: 'Destination', value: 'District Civil Hospital, Nashik' },
            { label: 'Reason', value: 'High-risk ANC follow-up' },
            { label: 'Status', value: 'In Progress (demo record)' },
            { label: 'Previous emergency visits', value: 'No emergency visit recorded in this demo profile.' },
            { label: 'Recorded action', value: 'Referral review requested; follow facility protocol.' },
          ],
        }],
      },
      {
        id: 'fetal-monitoring',
        title: 'Fetal Heart Rate and Growth Monitoring',
        entries: [{
          date: '2026-10-12',
          title: 'Fetal assessment',
          source: demoSource,
          measurements: [{ label: 'Fetal heart rate', value: '142', unit: 'bpm', interpretation: 'Recorded demo observation; clinician interpretation required.' }],
          details: [
            { label: 'Gestational age at measurement', value: '34 weeks' },
            { label: 'Growth measurements', value: 'No fetal growth measurements recorded.' },
            { label: 'Clinician interpretation', value: 'No interpretation beyond the recorded observation is available.' },
          ],
        }],
      },
      {
        id: 'allergies-alerts',
        title: 'Allergies and Important Clinical Alerts',
        entries: [{
          date: '2026-10-12',
          title: 'Clinical alerts review',
          source: demoSource,
          details: [
            { label: 'Recorded allergies', value: 'No allergies recorded in this demo patient profile.' },
            { label: 'Clinical warning', value: 'High-risk ANC follow-up is recorded. Review the clinician assessment.' },
            { label: 'Important note', value: 'For urgent concerns, follow the facility-established emergency protocol.' },
          ],
        }],
      },
    ],
  },
  'PAT-1004': {
    patientId: 'PAT-1004',
    pregnancyStatus: 'Pregnant',
    gestationalAgeWeeks: 18,
    expectedDeliveryDate: '2027-03-20',
    riskClassification: 'Routine Risk',
    riskFactors: [],
    riskAssessment: 'Routine-risk classification recorded by the clinician. This prototype does not calculate risk from measurements.',
    riskAssessedBy: 'Dr. Meera Joshi',
    riskAssessmentDate: '2026-10-17',
    lastAntenatalVisit: '2026-10-17',
    nextFollowUp: '2026-11-14',
    outstandingItems: [],
    categories: [
      {
        id: 'hemoglobin',
        title: 'Hemoglobin (Hb) Level',
        entries: [{
          date: '2026-10-17',
          title: 'Hemoglobin',
          source: demoSource,
          measurements: [{ label: 'Hb', value: '12.1', unit: 'g/dL', referenceRange: 'Per reporting laboratory; confirm locally', interpretation: 'Within the reference interval recorded by this demo laboratory; not a diagnosis.' }],
        }],
      },
      {
        id: 'blood-pressure',
        title: 'Blood Pressure (BP) Records',
        entries: [{
          date: '2026-10-17 11:00',
          title: 'ANC visit measurement',
          source: demoSource,
          measurements: [
            { label: 'Systolic', value: '112', unit: 'mmHg' },
            { label: 'Diastolic', value: '70', unit: 'mmHg' },
          ],
          summary: 'Recorded for clinician review.',
        }],
      },
      {
        id: 'blood-sugar',
        title: 'Blood Sugar Records',
        entries: [{
          date: '2026-10-17 08:30',
          title: 'Fasting plasma glucose',
          source: demoSource,
          measurements: [{ label: 'Glucose', value: '89', unit: 'mg/dL', referenceRange: 'Refer to reporting laboratory and clinician', interpretation: 'Recorded demo result; no diagnostic threshold is applied.' }],
        }],
      },
      {
        id: 'antenatal-visits',
        title: 'Doctor Visits and Antenatal Check-ups',
        entries: [{
          date: '2026-10-17',
          title: 'Routine antenatal check-up',
          source: demoSource,
          details: [
            { label: 'Clinician', value: 'Dr. Meera Joshi' },
            { label: 'Examination summary', value: 'Routine ANC visit recorded.' },
            { label: 'Recommended follow-up', value: '2026-11-14' },
          ],
        }],
      },
      {
        id: 'risk-assessment',
        title: 'Pregnancy Risk Assessment',
        entries: [{
          date: '2026-10-17',
          title: 'Recorded risk classification: Routine Risk',
          source: demoSource,
          details: [
            { label: 'Risk factors documented', value: 'None recorded in this demo assessment.' },
            { label: 'Clinician assessment', value: 'Routine-risk classification recorded; no automatic assessment is performed.' },
            { label: 'Assessed by', value: 'Dr. Meera Joshi' },
            { label: 'Recommended follow-up', value: '2026-11-14' },
          ],
        }],
      },
    ],
  },
};

export const getPregnancyMonitoringProfile = (patientId: string) =>
  PREGNANCY_MONITORING_PROFILES[patientId.toUpperCase()] ?? null;
