export type HighRiskCategory = 'Pregnant Women (ANC)' | 'Infant / Malnutrition' | 'Chronic NCD' | 'Elderly / Bedridden';
export type RiskLevel = 'Severe' | 'High' | 'Moderate';

export interface HighRiskPatient {
  id: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male';
  abhaId: string;
  category: HighRiskCategory;
  village: string;
  riskLevel: RiskLevel;
  clinicalSummary: string;
  lastVisitDate: string;
  nextFollowUpDate: string;
  pendingActions: string[];
  currentMedicines: string[];
  assignedHealthWorker: string;
  workerPhone: string;
  status: 'Due' | 'Overdue' | 'Scheduled' | 'Completed';
}

export const MOCK_HIGH_RISK_PATIENTS: HighRiskPatient[] = [
  {
    id: 'HRP-01',
    name: 'Kavita Shinde',
    age: 24,
    gender: 'Female',
    abhaId: '91-3019-4820-1192',
    category: 'Pregnant Women (ANC)',
    village: 'Anjaneri Village',
    riskLevel: 'Severe',
    clinicalSummary: 'Primi gravida, 34 weeks, severe gestational hypertension (BP 150/98 mmHg), mild proteinuria, pedal oedema.',
    lastVisitDate: '2026-09-15',
    nextFollowUpDate: '2026-09-20',
    pendingActions: ['Obstetrics Referral to District Hospital', 'Urine Albumin Test', 'NST Monitoring'],
    currentMedicines: ['Tab. Labetalol 100mg BD', 'Tab. Calcium 500mg'],
    assignedHealthWorker: 'Sunita Tai Gaikwad (ASHA)',
    workerPhone: '+91 94231 87291',
    status: 'Due'
  },
  {
    id: 'HRP-02',
    name: 'Aarav Sachin More',
    age: 2,
    gender: 'Male',
    abhaId: '91-8819-2018-9901',
    category: 'Infant / Malnutrition',
    village: 'Talegaon Pada',
    riskLevel: 'High',
    clinicalSummary: 'Severe Acute Malnutrition (SAM) Grade 2, weight-for-height <-3SD, delayed Pentavalent-3 booster.',
    lastVisitDate: '2026-09-08',
    nextFollowUpDate: '2026-09-18',
    pendingActions: ['Nutrition Rehabilitation Centre (NRC) Admission', 'Pentavalent 3 Vaccination', 'Therapeutic Energy Food Pack'],
    currentMedicines: ['Multivitamin Syrup 5ml OD', 'Zinc Sulphate 20mg'],
    assignedHealthWorker: 'Sunita Tai Gaikwad (ASHA)',
    workerPhone: '+91 94231 87291',
    status: 'Overdue'
  },
  {
    id: 'HRP-03',
    name: 'Babanrao Pawar',
    age: 72,
    gender: 'Male',
    abhaId: '91-4412-8871-3329',
    category: 'Elderly / Bedridden',
    village: 'Pimpri Trimbak',
    riskLevel: 'Moderate',
    clinicalSummary: 'Post-stroke hemiparesis, uncontrolled hypertension, requires home-based palliative & nursing check.',
    lastVisitDate: '2026-09-01',
    nextFollowUpDate: '2026-09-22',
    pendingActions: ['Home BP & Glucose Check', 'Decubitus Ulcer Dressing', 'Physiotherapy Guidance'],
    currentMedicines: ['Tab. Telmisartan 40mg OD', 'Tab. Ecosprin 75mg OD'],
    assignedHealthWorker: 'Sunita Tai Gaikwad (ASHA)',
    workerPhone: '+91 94231 87291',
    status: 'Scheduled'
  },
  {
    id: 'HRP-04',
    name: 'Sunita Ravindra Jadhav',
    age: 52,
    gender: 'Female',
    abhaId: '91-9921-4820-1100',
    category: 'Chronic NCD',
    village: 'Pegadwadi',
    riskLevel: 'High',
    clinicalSummary: 'Poorly controlled Type-2 Diabetes (RBS 280 mg/dL) with early diabetic foot ulcer on right plantar surface.',
    lastVisitDate: '2026-09-10',
    nextFollowUpDate: '2026-09-24',
    pendingActions: ['Wound Debridement Review', 'HbA1c Repeat', 'Insulin Titration by PHC MO'],
    currentMedicines: ['Tab. Glimepiride 1mg + Metformin 500mg BD', 'Topical Silver Sulfadiazine'],
    assignedHealthWorker: 'Sunita Tai Gaikwad (ASHA)',
    workerPhone: '+91 94231 87291',
    status: 'Scheduled'
  }
];
