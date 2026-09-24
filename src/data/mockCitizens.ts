export interface MedicalTimelineEvent {
  id: string;
  date: string;
  type: 'visit' | 'diagnosis' | 'test' | 'prescription' | 'followup' | 'referral';
  facilityName: string;
  doctorName: string;
  title: string;
  description: string;
  details?: Record<string, string>;
  status?: string;
}

export interface PrescriptionItem {
  medicineName: string;
  genericComposition: string;
  dosage: string;
  frequency: string; // e.g. "1-0-1 (After Food)"
  durationDays: number;
  instructions: string;
  dispensed: boolean;
}

export interface DiagnosticRecord {
  id: string;
  testName: string;
  category: string;
  prescribedDate: string;
  resultDate: string;
  facility: string;
  status: 'Completed' | 'Sample Collected' | 'Requested';
  doctor: string;
  readings: {
    parameter: string;
    value: string;
    normalRange: string;
    unit: string;
    isAbnormal: boolean;
  }[];
  impression: string;
}

export interface PatientHealthRecord {
  id: string;
  abhaId: string;
  abhaAddress: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  age: number;
  bloodGroup: string;
  mobile: string;
  address: string;
  district: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  vitals: {
    lastUpdated: string;
    bp: string;
    pulse: string;
    bloodSugarFasting: string;
    spo2: string;
    weightKg: string;
  };
  activePrescriptions: PrescriptionItem[];
  diagnosticReports: DiagnosticRecord[];
  timeline: MedicalTimelineEvent[];
}

export const MOCK_CITIZEN_RECORD: PatientHealthRecord = {
  id: 'CIT-7821',
  abhaId: '91-4829-1048-2910',
  abhaAddress: 'ramesh.jadhav@abdm',
  name: 'Ramesh Dattatray Jadhav',
  gender: 'Male',
  dob: '1978-05-14',
  age: 48,
  bloodGroup: 'B+ (Positive)',
  mobile: '+91 98220 14829',
  address: 'House No. 142, Kasbe Galli, Trimbakeshwar',
  district: 'Nashik, Maharashtra - 422212',
  emergencyContact: {
    name: 'Savitri Ramesh Jadhav',
    relation: 'Spouse',
    phone: '+91 98221 98312'
  },
  allergies: ['Penicillin (Moderate rash)', 'Sulfa drugs'],
  chronicConditions: ['Type 2 Diabetes Mellitus', 'Essential Hypertension (Stage 1)'],
  vitals: {
    lastUpdated: '19 Sep 2026, 09:30 AM',
    bp: '136/86 mmHg',
    pulse: '76 bpm',
    bloodSugarFasting: '134 mg/dL',
    spo2: '98% on Room Air',
    weightKg: '72.5 kg'
  },
  activePrescriptions: [
    {
      medicineName: 'Tab. Metformin 500mg',
      genericComposition: 'Metformin Hydrochloride IP',
      dosage: '500 mg',
      frequency: '1-0-1 (Twice daily after food)',
      durationDays: 30,
      instructions: 'Take immediately after meals with warm water',
      dispensed: true
    },
    {
      medicineName: 'Tab. Amlodipine 5mg',
      genericComposition: 'Amlodipine Besylate IP',
      dosage: '5 mg',
      frequency: '0-0-1 (Night time)',
      durationDays: 30,
      instructions: 'Take at night before bedtime consistently',
      dispensed: true
    },
    {
      medicineName: 'Tab. Paracetamol 650mg',
      genericComposition: 'Paracetamol IP',
      dosage: '650 mg',
      frequency: 'SOS (Only when fever > 100°F or bodyache)',
      durationDays: 5,
      instructions: 'Do not exceed 3 tablets in 24 hours',
      dispensed: true
    }
  ],
  diagnosticReports: [
    {
      id: 'LAB-2026-981',
      testName: 'Complete Blood Count (CBC) & HbA1c',
      category: 'Haematology & Biochemistry',
      prescribedDate: '2026-09-12',
      resultDate: '2026-09-14',
      facility: 'District Civil Hospital Pathology Lab, Nashik',
      status: 'Completed',
      doctor: 'Dr. Ananya Patil',
      readings: [
        { parameter: 'Haemoglobin (Hb)', value: '13.8', normalRange: '13.0 - 17.0', unit: 'g/dL', isAbnormal: false },
        { parameter: 'Glycated Haemoglobin (HbA1c)', value: '7.4', normalRange: '< 5.7 (Normal), < 7.0 (Target)', unit: '%', isAbnormal: true },
        { parameter: 'Total WBC Count', value: '7,400', normalRange: '4,000 - 11,000', unit: '/cumm', isAbnormal: false },
        { parameter: 'Platelet Count', value: '2.4', normalRange: '1.5 - 4.5', unit: 'Lakhs/cumm', isAbnormal: false },
        { parameter: 'Serum Creatinine', value: '0.9', normalRange: '0.7 - 1.2', unit: 'mg/dL', isAbnormal: false }
      ],
      impression: 'Glycaemic control marginally above target (HbA1c 7.4%). Normal renal indices.'
    }
  ],
  timeline: [
    {
      id: 'EVT-1',
      date: '19 Sep 2026',
      type: 'visit',
      facilityName: 'District Civil Hospital, Nashik',
      doctorName: 'Dr. Ananya Patil',
      title: 'OPD Regular Review Visit',
      description: 'Patient presented for routine monthly diabetic & hypertension monitoring.',
      details: { 'Room': 'OPD 4', 'Vitals BP': '136/86 mmHg', 'Blood Sugar': '134 mg/dL' },
      status: 'In Progress'
    },
    {
      id: 'EVT-2',
      date: '14 Sep 2026',
      type: 'test',
      facilityName: 'Civil Hospital Lab, Nashik',
      doctorName: 'Dr. S. M. Kulkarni (Pathologist)',
      title: 'Lab Blood Chemistry Verified',
      description: 'HbA1c reported at 7.4%; Fasting blood glucose 134 mg/dL.',
      status: 'Report Verified'
    },
    {
      id: 'EVT-3',
      date: '20 Aug 2026',
      type: 'prescription',
      facilityName: 'PHC Trimbakeshwar',
      doctorName: 'Dr. Meenal Jadhav',
      title: 'Prescription Refill Issued',
      description: 'Dispensed 30-day stock of Metformin and Amlodipine under National NCD Programme.',
      status: 'Dispensed'
    },
    {
      id: 'EVT-4',
      date: '15 Jul 2026',
      type: 'referral',
      facilityName: 'Sub-Centre Anjaneri → PHC Trimbak',
      doctorName: 'Sunita Tai Gaikwad (ASHA)',
      title: 'Field NCD Screening Referral',
      description: 'Elevated BP recorded during community door-to-door survey. Referred to PHC Medical Officer.',
      status: 'Completed'
    }
  ]
};
