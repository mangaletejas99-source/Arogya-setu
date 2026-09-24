import { MOCK_SCHEMES } from './mockSchemes';

export interface MedicalHistoryEntry {
  date: string;
  facility: string;
  department: string;
  doctor: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  followUp: string;
}

export interface HospitalVisitEntry {
  date: string;
  hospital: string;
  department: string;
  doctor: string;
  reason: string;
  diagnosis: string;
  treatment: string;
  prescription: string;
  followUp: string;
}

export interface DiagnosticEntry {
  testName: string;
  date: string;
  result: string;
  referenceRange: string;
  viewReport: string;
}

export interface PrescriptionEntry {
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  doctor: string;
  hospital: string;
  date: string;
}

export interface ReferralEntry {
  date: string;
  referredBy: string;
  referredTo: string;
  reason: string;
  status: 'Pending' | 'Completed' | 'In Progress';
}

export interface PatientRecordDemo {
  patientId: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  abhaId: string;
  address: string;
  incomeCategory: string;
  emergencyContact: string;
  emergencyFlag: boolean;
  currentConditions: string[];
  activeMedicines: string[];
  followUpDue: string;
  highRisk: boolean;
  medicalHistory: MedicalHistoryEntry[];
  hospitalVisits: HospitalVisitEntry[];
  diagnostics: DiagnosticEntry[];
  prescriptions: PrescriptionEntry[];
  referrals: ReferralEntry[];
  schemes: string[];
}

export interface SchemeEligibilityResult {
  schemeId: string;
  name: string;
  description: string;
  status: 'Eligible' | 'Potentially Eligible' | 'Not Eligible';
  eligibilityReason: string;
  benefits: string[];
  applicationStatus: string;
}

export const DEMO_PATIENTS: PatientRecordDemo[] = [
  {
    patientId: 'PAT-1001',
    name: 'Ramesh D. Jadhav',
    age: 48,
    gender: 'Male',
    bloodGroup: 'B+',
    abhaId: 'DEMO-ABHA-001',
    address: 'Trimbakeshwar, Nashik',
    incomeCategory: 'Below Poverty Line',
    emergencyContact: '+91 98221 98312',
    emergencyFlag: true,
    currentConditions: ['Type 2 Diabetes', 'Hypertension'],
    activeMedicines: ['Metformin 500mg', 'Amlodipine 5mg'],
    followUpDue: '2026-09-30',
    highRisk: true,
    medicalHistory: [
      {
        date: '2026-09-12',
        facility: 'District Civil Hospital, Nashik',
        department: 'General Medicine',
        doctor: 'Dr. Ananya Patil',
        diagnosis: 'Diabetes monitoring review',
        treatment: 'Medication adjustment and lifestyle counseling',
        prescription: 'Metformin 500mg + Amlodipine 5mg',
        followUp: 'Repeat blood sugar test in 4 weeks'
      },
      {
        date: '2026-08-20',
        facility: 'PHC Trimbakeshwar',
        department: 'NCD Clinic',
        doctor: 'Dr. Meenal Jadhav',
        diagnosis: 'Persistent hypertension',
        treatment: 'Dose titration and dietary counselling',
        prescription: 'Amlodipine 5mg',
        followUp: 'Monthly BP review'
      }
    ],
    hospitalVisits: [
      {
        date: '2026-09-12',
        hospital: 'District Civil Hospital, Nashik',
        department: 'General Medicine',
        doctor: 'Dr. Ananya Patil',
        reason: 'Routine diabetes review',
        diagnosis: 'Type 2 diabetes with BP control needs',
        treatment: 'Medication + lifestyle advice',
        prescription: 'Metformin 500mg',
        followUp: '30 days'
      },
      {
        date: '2026-08-20',
        hospital: 'PHC Trimbakeshwar',
        department: 'Outpatient',
        doctor: 'Dr. Meenal Jadhav',
        reason: 'Hypertension review',
        diagnosis: 'Essential hypertension',
        treatment: 'Drug therapy and counselling',
        prescription: 'Amlodipine 5mg',
        followUp: '30 days'
      }
    ],
    diagnostics: [
      {
        testName: 'CBC',
        date: '2026-09-12',
        result: 'Within normal range',
        referenceRange: 'Hb 12-16 g/dL; WBC 4-11k',
        viewReport: 'View Report'
      },
      {
        testName: 'Blood Glucose',
        date: '2026-09-12',
        result: '134 mg/dL (Fasting)',
        referenceRange: '70-100 mg/dL fasting',
        viewReport: 'View Report'
      },
      {
        testName: 'Lipid Profile',
        date: '2026-08-20',
        result: 'Borderline high triglycerides',
        referenceRange: 'Triglycerides < 150',
        viewReport: 'View Report'
      }
    ],
    prescriptions: [
      {
        medicine: 'Metformin 500mg',
        dosage: '500 mg',
        frequency: 'Twice daily',
        duration: '30 days',
        doctor: 'Dr. Ananya Patil',
        hospital: 'District Civil Hospital, Nashik',
        date: '2026-09-12'
      },
      {
        medicine: 'Amlodipine 5mg',
        dosage: '5 mg',
        frequency: 'Nightly',
        duration: '30 days',
        doctor: 'Dr. Meenal Jadhav',
        hospital: 'PHC Trimbakeshwar',
        date: '2026-08-20'
      }
    ],
    referrals: [
      {
        date: '2026-08-15',
        referredBy: 'PHC Trimbakeshwar',
        referredTo: 'District Civil Hospital, Nashik',
        reason: 'Hypertension review and diabetes follow-up',
        status: 'Completed'
      }
    ],
    schemes: ['Ayushman Bharat PM-JAY', 'MJPJAY']
  },
  {
    patientId: 'PAT-1002',
    name: 'Kavita Shinde',
    age: 29,
    gender: 'Female',
    bloodGroup: 'O+',
    abhaId: 'DEMO-ABHA-002',
    address: 'Anjaneri, Nashik',
    incomeCategory: 'Low income',
    emergencyContact: '+91 98901 22334',
    emergencyFlag: false,
    currentConditions: ['Pregnancy follow-up', 'Anaemia'],
    activeMedicines: ['Iron tablets', 'Calcium tablets'],
    followUpDue: '2026-09-27',
    highRisk: true,
    medicalHistory: [
      {
        date: '2026-09-10',
        facility: 'Sub-Centre Anjaneri',
        department: 'ANC Clinic',
        doctor: 'Dr. Neha Kulkarni',
        diagnosis: 'Antenatal monitoring',
        treatment: 'Iron and folic acid supplementation',
        prescription: 'Iron + Folic Acid',
        followUp: 'Next ANC visit after 2 weeks'
      }
    ],
    hospitalVisits: [
      {
        date: '2026-09-10',
        hospital: 'Sub-Centre Anjaneri',
        department: 'ANC',
        doctor: 'Dr. Neha Kulkarni',
        reason: 'Routine pregnancy check-up',
        diagnosis: 'Pregnancy with mild anaemia',
        treatment: 'Supplementation and counseling',
        prescription: 'Iron + folic acid',
        followUp: '2 weeks'
      }
    ],
    diagnostics: [
      {
        testName: 'Haemoglobin',
        date: '2026-09-10',
        result: '9.8 g/dL',
        referenceRange: '11-14 g/dL',
        viewReport: 'View Report'
      },
      {
        testName: 'Blood Pressure',
        date: '2026-09-10',
        result: '116/74',
        referenceRange: '< 140/90',
        viewReport: 'View Report'
      }
    ],
    prescriptions: [
      {
        medicine: 'Iron tablets',
        dosage: '1 tablet',
        frequency: 'Daily',
        duration: '30 days',
        doctor: 'Dr. Neha Kulkarni',
        hospital: 'Sub-Centre Anjaneri',
        date: '2026-09-10'
      }
    ],
    referrals: [
      {
        date: '2026-09-11',
        referredBy: 'Sub-Centre Anjaneri',
        referredTo: 'District Civil Hospital, Nashik',
        reason: 'High-risk ANC follow-up',
        status: 'In Progress'
      }
    ],
    schemes: ['PMSMA', 'JSY']
  },
  {
    patientId: 'PAT-1003',
    name: 'Asha Pawar',
    age: 72,
    gender: 'Female',
    bloodGroup: 'A+',
    abhaId: 'DEMO-ABHA-003',
    address: 'Sakri, Dhule',
    incomeCategory: 'Senior citizen',
    emergencyContact: '+91 98234 66540',
    emergencyFlag: true,
    currentConditions: ['Arthritis', 'Hypertension'],
    activeMedicines: ['Aspirin low dose', 'Vitamin D'],
    followUpDue: '2026-09-28',
    highRisk: false,
    medicalHistory: [
      {
        date: '2026-08-29',
        facility: 'Rural Hospital, Sakri',
        department: 'Geriatrics',
        doctor: 'Dr. Rahul Deshmukh',
        diagnosis: 'Joint pain with age-related arthritis',
        treatment: 'Physiotherapy and medication',
        prescription: 'Ibuprofen 200mg',
        followUp: 'Follow-up in 4 weeks'
      }
    ],
    hospitalVisits: [
      {
        date: '2026-08-29',
        hospital: 'Rural Hospital, Sakri',
        department: 'Orthopaedics',
        doctor: 'Dr. Rahul Deshmukh',
        reason: 'Joint pain and mobility issue',
        diagnosis: 'Arthritis',
        treatment: 'Physiotherapy and medicines',
        prescription: 'Ibuprofen 200mg',
        followUp: '4 weeks'
      }
    ],
    diagnostics: [
      {
        testName: 'CBC',
        date: '2026-08-29',
        result: 'Normal',
        referenceRange: 'Normal',
        viewReport: 'View Report'
      }
    ],
    prescriptions: [
      {
        medicine: 'Ibuprofen 200mg',
        dosage: '200 mg',
        frequency: 'Once daily',
        duration: '14 days',
        doctor: 'Dr. Rahul Deshmukh',
        hospital: 'Rural Hospital, Sakri',
        date: '2026-08-29'
      }
    ],
    referrals: [
      {
        date: '2026-08-30',
        referredBy: 'Rural Hospital, Sakri',
        referredTo: 'District Civil Hospital, Nashik',
        reason: 'Orthopaedic review',
        status: 'Pending'
      }
    ],
    schemes: ['Ayushman Bharat PM-JAY', 'Ayushman Vaya Vandana Yojana']
  }
];

export const findPatientById = (patientId: string) => {
  const normalized = String(patientId || '').trim().toUpperCase();
  return DEMO_PATIENTS.find((patient) => patient.patientId.toUpperCase() === normalized) || null;
};

export const getPatientMedicalHistory = (patientId: string) => {
  const patient = findPatientById(patientId);
  return patient?.medicalHistory || [];
};

export const getPatientHospitalVisits = (patientId: string) => {
  const patient = findPatientById(patientId);
  return patient?.hospitalVisits || [];
};

export const getPatientDiagnostics = (patientId: string) => {
  const patient = findPatientById(patientId);
  return patient?.diagnostics || [];
};

export const getPatientPrescriptions = (patientId: string) => {
  const patient = findPatientById(patientId);
  return patient?.prescriptions || [];
};

export const getPatientReferrals = (patientId: string) => {
  const patient = findPatientById(patientId);
  return patient?.referrals || [];
};

export const getEligibleSchemes = (patient: PatientRecordDemo): SchemeEligibilityResult[] => {
  const schemeMap = MOCK_SCHEMES.map((scheme) => {
    const isBelowPoverty = patient.incomeCategory.toLowerCase().includes('below') || patient.incomeCategory.toLowerCase().includes('low');
    const hasChronic = patient.currentConditions.some(condition => /diabetes|hypertension|arthritis|anaemia/i.test(condition));
    const isSenior = patient.age >= 70;
    const isPregnancy = patient.gender === 'Female' && patient.currentConditions.some(item => /pregnancy|antenatal/i.test(item));

    let status: 'Eligible' | 'Potentially Eligible' | 'Not Eligible' = 'Not Eligible';
    let reason = 'Current profile does not match the scheme criteria in this demo model.';

    if (scheme.name.includes('Ayushman Bharat') || scheme.name.includes('Mahatma Jyotirao')) {
      if (isBelowPoverty || hasChronic || patient.age >= 45) {
        status = 'Eligible';
        reason = 'Patient profile matches government health coverage and chronic care priority criteria.';
      } else {
        status = 'Potentially Eligible';
        reason = 'Patient may qualify after income and family documentation are verified.';
      }
    }

    if (scheme.name.includes('PMSMA') && isPregnancy) {
      status = 'Eligible';
      reason = 'Pregnancy follow-up and maternal health monitoring are active in this patient record.';
    }

    if (scheme.name.includes('Ayushman Vaya Vandana') && isSenior) {
      status = 'Eligible';
      reason = 'Patient age qualifies for senior citizen financial protection coverage.';
    }

    if (scheme.name.includes('Janani Suraksha') && isPregnancy) {
      status = 'Eligible';
      reason = 'Institutional maternal care and delivery support are appropriate for this profile.';
    }

    return {
      schemeId: scheme.id,
      name: scheme.name,
      description: `Demo eligibility for ${patient.name} based on age, condition, and location profile.`,
      status,
      eligibilityReason: reason,
      benefits: scheme.benefits,
      applicationStatus: status === 'Eligible' ? 'Ready to apply / continue' : status === 'Potentially Eligible' ? 'Additional verification required' : 'Not currently eligible'
    };
  });

  return schemeMap;
};
