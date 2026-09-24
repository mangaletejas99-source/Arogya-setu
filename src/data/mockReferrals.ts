export type ReferralStatus = 'Created' | 'Accepted' | 'Patient Reached' | 'Under Consultation' | 'Completed';
export type ReferralPriority = 'Routine' | 'Urgent' | 'Emergency';

export interface ReferralRecord {
  id: string;
  patientName: string;
  patientAbha: string;
  patientAge: number;
  gender: string;
  fromFacilityId: string;
  fromFacilityName: string;
  toFacilityId: string;
  toFacilityName: string;
  referringDoctorOrWorker: string;
  receivingSpecialty: string;
  clinicalReason: string;
  priority: ReferralPriority;
  createdDate: string;
  status: ReferralStatus;
  history: {
    status: ReferralStatus;
    timestamp: string;
    note: string;
  }[];
}

export const MOCK_REFERRALS: ReferralRecord[] = [
  {
    id: 'REF-2026-1049',
    patientName: 'Ramesh D. Jadhav',
    patientAbha: '91-4829-1048-2910',
    patientAge: 48,
    gender: 'Male',
    fromFacilityId: 'FAC-TRM-02',
    fromFacilityName: 'Primary Health Centre – Trimbakeshwar',
    toFacilityId: 'FAC-NSK-01',
    toFacilityName: 'District Civil Hospital, Nashik',
    referringDoctorOrWorker: 'Dr. Meenal Jadhav (PHC MO)',
    receivingSpecialty: 'General Medicine / Diabetology',
    clinicalReason: 'Sub-optimally controlled diabetes with recurrent neuropathy symptoms requiring specialist titration and ophthalmological fundoscopy.',
    priority: 'Urgent',
    createdDate: '2026-09-17',
    status: 'Patient Reached',
    history: [
      {
        status: 'Created',
        timestamp: '17 Sep 2026, 10:15 AM',
        note: 'Referral generated at PHC Trimbak with clinical summary attached.'
      },
      {
        status: 'Accepted',
        timestamp: '17 Sep 2026, 02:30 PM',
        note: 'Civil Hospital Nashik OPD registry acknowledged and allocated Token #18.'
      },
      {
        status: 'Patient Reached',
        timestamp: '19 Sep 2026, 09:15 AM',
        note: 'Biometric/ABHA verification completed at District Hospital Helpdesk.'
      }
    ]
  },
  {
    id: 'REF-2026-0982',
    patientName: 'Kavita Shinde',
    patientAbha: '91-3019-4820-1192',
    patientAge: 24,
    gender: 'Female',
    fromFacilityId: 'FAC-SUB-06',
    fromFacilityName: 'Sub-Centre Anjaneri',
    toFacilityId: 'FAC-NSK-01',
    toFacilityName: 'District Civil Hospital, Nashik',
    referringDoctorOrWorker: 'Sunita Tai Gaikwad (ASHA)',
    receivingSpecialty: 'Obstetrics (MCH Wing)',
    clinicalReason: 'Primi gravida 34 weeks with severe pregnancy-induced hypertension (BP 150/98 mmHg) and pedal oedema.',
    priority: 'Emergency',
    createdDate: '2026-09-18',
    status: 'Accepted',
    history: [
      {
        status: 'Created',
        timestamp: '18 Sep 2026, 04:00 PM',
        note: 'Emergency alert flagged by ASHA worker on field tablet.'
      },
      {
        status: 'Accepted',
        timestamp: '18 Sep 2026, 04:15 PM',
        note: 'Obstetrics emergency triage accepted; Bed #04 reserved in High-Risk Pregnancy unit.'
      }
    ]
  },
  {
    id: 'REF-2026-0812',
    patientName: 'Ganesh Bhil',
    patientAbha: '91-1182-4920-5541',
    patientAge: 32,
    gender: 'Male',
    fromFacilityId: 'FAC-DHL-03',
    fromFacilityName: 'Rural Hospital – Sakri (Dhule)',
    toFacilityId: 'FAC-PUN-05',
    toFacilityName: 'Sassoon General Hospital & BJ Medical College',
    referringDoctorOrWorker: 'Dr. S. B. Patil (Rural Surgeon)',
    receivingSpecialty: 'Cardiothoracic & Vascular Surgery',
    clinicalReason: 'Severe rheumatic mitral stenosis requiring tertiary surgical intervention.',
    priority: 'Routine',
    createdDate: '2026-09-02',
    status: 'Completed',
    history: [
      { status: 'Created', timestamp: '02 Sep 2026', note: 'Referral dispatched via State Lakehouse Registry.' },
      { status: 'Accepted', timestamp: '03 Sep 2026', note: 'Sassoon Cardiology OPD scheduled.' },
      { status: 'Patient Reached', timestamp: '08 Sep 2026', note: 'Patient reported at Sassoon Super-Specialty Desk.' },
      { status: 'Completed', timestamp: '14 Sep 2026', note: 'Valve repair surgery completed under MJPJAY scheme.' }
    ]
  }
];
