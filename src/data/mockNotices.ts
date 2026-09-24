export interface HealthNotice {
  id: string;
  date: string;
  department: string;
  title: string;
  category: 'Advisory' | 'Circular' | 'Tender' | 'Recruitment' | 'Vaccination';
  isImportant: boolean;
  pdfFileSize: string;
  summary: string;
}

export const MOCK_NOTICES: HealthNotice[] = [
  {
    id: 'NOT-2026-104',
    date: '18 Sep 2026',
    department: 'Epidemiology & Vector Borne Disease Control Cell',
    title: 'Public Advisory on Monsoon Vector-Borne Diseases: Dengue, Chikungunya and Malaria Prevention Protocols',
    category: 'Advisory',
    isImportant: true,
    pdfFileSize: '420 KB',
    summary: 'Standard operating procedures for container survey, larvicidal spray, and fever treatment protocols at Sub-Centre and PHC levels.'
  },
  {
    id: 'NOT-2026-103',
    date: '16 Sep 2026',
    department: 'National Health Mission (NHM) Maharashtra',
    title: 'Rollout of Revised National Diabetes and Hypertension Drug Dispensing SOP at HWCs',
    category: 'Circular',
    isImportant: true,
    pdfFileSize: '680 KB',
    summary: 'Instructions enabling Community Health Officers (CHOs) to dispense 30-day refills for stabilized NCD patients.'
  },
  {
    id: 'NOT-2026-102',
    date: '12 Sep 2026',
    department: 'Maternal & Child Health Division',
    title: 'Intensified Mission Indradhanush (IMI 6.0) Special Immunisation Drive Guidelines',
    category: 'Vaccination',
    isImportant: false,
    pdfFileSize: '1.2 MB',
    summary: 'Micro-planning guidelines for mop-up vaccination rounds targeting children under 5 and pregnant women in tribal pockets.'
  },
  {
    id: 'NOT-2026-101',
    date: '08 Sep 2026',
    department: 'Directorate of Medical Education & Research',
    title: 'Notice for Walk-in Interviews: Medical Officers & Specialist Doctors on Contractual Basis',
    category: 'Recruitment',
    isImportant: false,
    pdfFileSize: '540 KB',
    summary: 'Recruitment of 120 Medical Officers for Rural Hospitals and Sub-District Hospitals across North Maharashtra.'
  },
  {
    id: 'NOT-2026-100',
    date: '02 Sep 2026',
    department: 'Haffkine Bio-Pharmaceutical & State Drug Procurement',
    title: 'Notice Inviting E-Tender for Essential Surgical Consumables and Dialysis Fluids',
    category: 'Tender',
    isImportant: false,
    pdfFileSize: '2.4 MB',
    summary: 'E-tender for annual rate contract of hemodialysis concentrates and IV fluids for Government District Hospitals.'
  }
];
