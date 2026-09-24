export interface HealthScheme {
  id: string;
  name: string;
  shortCode: string;
  category: 'Health Insurance' | 'Maternal Health' | 'Child Health' | 'Senior Citizens' | 'Chronic Disease' | 'Preventive Care';
  coverageAmount: string;
  eligibility: string[];
  benefits: string[];
  documentsRequired: string[];
  applicationProcess: string;
  officialPortalUrl: string;
  isPrototypeNotice: boolean;
}

export const MOCK_SCHEMES: HealthScheme[] = [
  {
    id: 'SCHEME-PMJAY',
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
    shortCode: 'PM-JAY',
    category: 'Health Insurance',
    coverageAmount: 'Up to ₹5,00,000 per family / year',
    eligibility: [
      'Families identified under SECC 2011 database',
      'Active NFSA (Ration Card) priority beneficiaries',
      'No cap on family size, age, or gender'
    ],
    benefits: [
      'Cashless secondary and tertiary hospitalization across 28,000+ empannelled hospitals nationwide',
      'Pre-existing conditions covered from Day 1',
      'Covers 1,949 medical packages including oncology, neurosurgery, and cardiac care'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Ration Card / NFSA Document',
      'Mobile Number linked to Aadhaar'
    ],
    applicationProcess: 'Visit nearest Ayushman Mitra kiosk at any Government Hospital or Common Service Centre (CSC) with Aadhaar and Ration Card for instant e-KYC and golden card generation.',
    officialPortalUrl: 'https://pmjay.gov.in/',
    isPrototypeNotice: true
  },
  {
    id: 'SCHEME-MJPJAY',
    name: 'Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY - Maharashtra)',
    shortCode: 'MJPJAY',
    category: 'Health Insurance',
    coverageAmount: 'Up to ₹5,00,000 per family / year (Universal in Maharashtra)',
    eligibility: [
      'All domicile families of Maharashtra possessing valid Ration Card (Yellow, Orange, or White)',
      'Universal health insurance coverage across the state'
    ],
    benefits: [
      'Cashless treatment for 1,356 identified medical and surgical procedures',
      '119 follow-up packages for chronic and post-operative monitoring',
      'Free consultations, diagnostics, medicines, and food during hospital stay'
    ],
    documentsRequired: [
      'Maharashtra Ration Card',
      'Aadhaar Card of patient / family members',
      'Voter ID / Domicile Certificate'
    ],
    applicationProcess: 'Meet Arogya Mitra stationed at Network Government or Private Hospitals across Maharashtra with Aadhaar and Ration card.',
    officialPortalUrl: 'https://www.jeevandayee.gov.in/',
    isPrototypeNotice: true
  },
  {
    id: 'SCHEME-PMSMA',
    name: 'Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)',
    shortCode: 'PMSMA',
    category: 'Maternal Health',
    coverageAmount: '100% Free Antenatal Consultations & Diagnostics',
    eligibility: [
      'All pregnant women in their 2nd and 3rd trimesters (from 4th month of pregnancy onwards)'
    ],
    benefits: [
      'Comprehensive antenatal care package on the 9th of every month at designated public health centres',
      'Free specialist Ob-Gyn consultations, blood tests (Hb, Blood Group, Sugar, VDRL, HIV), and ultrasound',
      'Red sticker color-coding of High-Risk Pregnancies for priority tracking'
    ],
    documentsRequired: [
      'Mother and Child Protection (MCP) Card',
      'Aadhaar Card',
      'Previous antenatal checkup records'
    ],
    applicationProcess: 'Report to your nearest Sub-Centre, PHC, or District Hospital on the 9th day of any month.',
    officialPortalUrl: 'https://pmsma.mohfw.gov.in/',
    isPrototypeNotice: true
  },
  {
    id: 'SCHEME-VANDANA',
    name: 'Ayushman Vaya Vandana Yojana (Senior Citizen Health Care)',
    shortCode: 'VAYA-VANDANA',
    category: 'Senior Citizens',
    coverageAmount: 'Up to ₹5,00,000 exclusive coverage for seniors aged 70+',
    eligibility: [
      'All Indian citizens aged 70 years and above, irrespective of family income'
    ],
    benefits: [
      'Dedicated distinct top-up health coverage of ₹5 Lakh per year for senior citizens',
      'Exclusive benefit over and above existing family PM-JAY limits',
      'Cashless treatment for age-related morbidities, joint replacement, eye surgeries, and geriatric care'
    ],
    documentsRequired: [
      'Aadhaar Card with age verifying 70+ years',
      'Aadhaar-linked mobile for OTP verification'
    ],
    applicationProcess: 'Apply online through the Ayushman App / portal or visit your nearest Gram Panchayat / Urban Ayushman Helpdesk.',
    officialPortalUrl: 'https://beneficiary.nha.gov.in/',
    isPrototypeNotice: true
  },
  {
    id: 'SCHEME-JSY',
    name: 'Janani Suraksha Yojana (JSY)',
    shortCode: 'JSY',
    category: 'Maternal Health',
    coverageAmount: 'Direct Cash Incentive ₹1,400 (Rural) / ₹1,000 (Urban)',
    eligibility: [
      'All pregnant women delivering in government health centres or accredited private facilities'
    ],
    benefits: [
      'Direct Bank Transfer (DBT) incentive for promoting institutional deliveries',
      'Free transport via 102/108 ambulance from home to hospital and back',
      'Zero-expense delivery including C-section and free newborn care for 30 days'
    ],
    documentsRequired: [
      'MCP Card',
      'Bank Account passbook linked with Aadhaar (DBT enabled)',
      'Institutional Delivery Discharge Slip'
    ],
    applicationProcess: 'Assisted directly by local village ASHA / ANM upon registration of institutional delivery.',
    officialPortalUrl: 'https://nhm.gov.in/',
    isPrototypeNotice: true
  }
];
