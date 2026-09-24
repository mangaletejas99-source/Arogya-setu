export interface DiagnosticTestCatalog {
  id: string;
  name: string;
  category: 'Pathology' | 'Biochemistry' | 'Microbiology' | 'Radiology' | 'Cardiology';
  sampleType: string;
  fastingRequired: boolean;
  turnaroundHours: number;
  availableFacilities: string[];
}

export interface DiagnosticOrder {
  id: string;
  testId: string;
  testName: string;
  category: string;
  patientName: string;
  patientAbha: string;
  prescribedByDoctor: string;
  facilityName: string;
  requestDate: string;
  status: 'Requested' | 'Scheduled' | 'Sample Collected' | 'Processing' | 'Result Available';
  resultDownloadUrl?: string;
  sampleCollectionTime?: string;
  reportSummary?: string;
}

export const DIAGNOSTIC_CATALOG: DiagnosticTestCatalog[] = [
  {
    id: 'TST-CBC',
    name: 'Complete Blood Count (CBC) with Platelets',
    category: 'Pathology',
    sampleType: 'Whole Blood (EDTA)',
    fastingRequired: false,
    turnaroundHours: 4,
    availableFacilities: ['FAC-NSK-01', 'FAC-TRM-02', 'FAC-DHL-03', 'FAC-JLG-04', 'FAC-PUN-05']
  },
  {
    id: 'TST-HBA1C',
    name: 'Glycated Haemoglobin (HbA1c)',
    category: 'Biochemistry',
    sampleType: 'Whole Blood',
    fastingRequired: false,
    turnaroundHours: 6,
    availableFacilities: ['FAC-NSK-01', 'FAC-TRM-02', 'FAC-DHL-03', 'FAC-PUN-05']
  },
  {
    id: 'TST-LIPID',
    name: 'Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)',
    category: 'Biochemistry',
    sampleType: 'Serum',
    fastingRequired: true,
    turnaroundHours: 8,
    availableFacilities: ['FAC-NSK-01', 'FAC-DHL-03', 'FAC-PUN-05']
  },
  {
    id: 'TST-KFT',
    name: 'Kidney Function Test (Urea, Creatinine, Electrolytes)',
    category: 'Biochemistry',
    sampleType: 'Serum',
    fastingRequired: false,
    turnaroundHours: 6,
    availableFacilities: ['FAC-NSK-01', 'FAC-TRM-02', 'FAC-DHL-03', 'FAC-PUN-05']
  },
  {
    id: 'TST-LFT',
    name: 'Liver Function Test (Bilirubin, SGOT, SGPT, Alkaline Phosphatase)',
    category: 'Biochemistry',
    sampleType: 'Serum',
    fastingRequired: false,
    turnaroundHours: 6,
    availableFacilities: ['FAC-NSK-01', 'FAC-DHL-03', 'FAC-PUN-05']
  },
  {
    id: 'TST-DENGUE',
    name: 'Dengue NS1 Antigen & IgM/IgG Antibody Card',
    category: 'Microbiology',
    sampleType: 'Serum',
    fastingRequired: false,
    turnaroundHours: 2,
    availableFacilities: ['FAC-NSK-01', 'FAC-TRM-02', 'FAC-DHL-03', 'FAC-JLG-04', 'FAC-PUN-05']
  },
  {
    id: 'TST-ECG',
    name: '12-Lead Electrocardiogram (ECG)',
    category: 'Cardiology',
    sampleType: 'Non-invasive procedure',
    fastingRequired: false,
    turnaroundHours: 1,
    availableFacilities: ['FAC-NSK-01', 'FAC-TRM-02', 'FAC-DHL-03', 'FAC-PUN-05']
  },
  {
    id: 'TST-XRAY',
    name: 'Digital Chest X-Ray (PA View)',
    category: 'Radiology',
    sampleType: 'Radiological exposure',
    fastingRequired: false,
    turnaroundHours: 2,
    availableFacilities: ['FAC-NSK-01', 'FAC-DHL-03', 'FAC-PUN-05']
  }
];

export const MOCK_DIAGNOSTIC_ORDERS: DiagnosticOrder[] = [
  {
    id: 'ORD-2026-081',
    testId: 'TST-CBC',
    testName: 'Complete Blood Count (CBC) with Platelets',
    category: 'Pathology',
    patientName: 'Ramesh D. Jadhav',
    patientAbha: '91-4829-1048-2910',
    prescribedByDoctor: 'Dr. Ananya Patil',
    facilityName: 'District Civil Hospital, Nashik',
    requestDate: '2026-09-18',
    status: 'Result Available',
    sampleCollectionTime: '18 Sep 2026, 11:30 AM',
    reportSummary: 'Hb: 13.8 g/dL (Normal). Platelets: 2.4 Lakhs/cumm. WBC: 7,400. No acute signs of infection.'
  },
  {
    id: 'ORD-2026-082',
    testId: 'TST-LIPID',
    testName: 'Lipid Profile (Fasting)',
    category: 'Biochemistry',
    patientName: 'Ramesh D. Jadhav',
    patientAbha: '91-4829-1048-2910',
    prescribedByDoctor: 'Dr. Ananya Patil',
    facilityName: 'District Civil Hospital, Nashik',
    requestDate: '2026-09-19',
    status: 'Scheduled',
    sampleCollectionTime: 'Scheduled for 20 Sep 2026, 08:00 AM (Fasting Required)',
    reportSummary: 'Awaiting 12-hour fasting sample collection.'
  },
  {
    id: 'ORD-2026-079',
    testId: 'TST-DENGUE',
    testName: 'Dengue NS1 Antigen & IgM/IgG',
    category: 'Microbiology',
    patientName: 'Sanjay Ahire',
    patientAbha: '91-8812-4910-3321',
    prescribedByDoctor: 'Dr. Meenal Jadhav',
    facilityName: 'Primary Health Centre – Trimbakeshwar',
    requestDate: '2026-09-19',
    status: 'Processing',
    sampleCollectionTime: '19 Sep 2026, 10:45 AM',
    reportSummary: 'Sample in incubator; card test reaction in progress.'
  }
];
