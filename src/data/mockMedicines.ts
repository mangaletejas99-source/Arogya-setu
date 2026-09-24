export type StockStatus = 'Available' | 'Low Stock' | 'Out of Stock';

export interface MedicineInventory {
  id: string;
  name: string;
  genericName: string;
  dosageForm: 'Tablet' | 'Syrup' | 'Injection' | 'Inhaler' | 'Sachet';
  category: 'Essential NCD' | 'Antibiotic' | 'Maternal & Child' | 'Emergency & Analgesic' | 'Respiratory';
  facilityId: string;
  facilityName: string;
  distanceKm: number;
  availableQuantity: number;
  thresholdLevel: number;
  unit: string;
  stockStatus: StockStatus;
  batchExpiry: string;
  lastUpdated: string;
}

export const MOCK_MEDICINES: MedicineInventory[] = [
  {
    id: 'MED-01',
    name: 'Tab. Metformin 500mg',
    genericName: 'Metformin Hydrochloride IP',
    dosageForm: 'Tablet',
    category: 'Essential NCD',
    facilityId: 'FAC-NSK-01',
    facilityName: 'District Civil Hospital, Nashik',
    distanceKm: 4.2,
    availableQuantity: 14500,
    thresholdLevel: 2000,
    unit: 'Tablets',
    stockStatus: 'Available',
    batchExpiry: 'Dec 2027',
    lastUpdated: '19 Sep 2026, 08:00 AM'
  },
  {
    id: 'MED-02',
    name: 'Tab. Metformin 500mg',
    genericName: 'Metformin Hydrochloride IP',
    dosageForm: 'Tablet',
    category: 'Essential NCD',
    facilityId: 'FAC-TRM-02',
    facilityName: 'Primary Health Centre – Trimbakeshwar',
    distanceKm: 28.5,
    availableQuantity: 320,
    thresholdLevel: 500,
    unit: 'Tablets',
    stockStatus: 'Low Stock',
    batchExpiry: 'Oct 2027',
    lastUpdated: '18 Sep 2026, 04:30 PM'
  },
  {
    id: 'MED-03',
    name: 'Tab. Amlodipine 5mg',
    genericName: 'Amlodipine Besylate IP',
    dosageForm: 'Tablet',
    category: 'Essential NCD',
    facilityId: 'FAC-NSK-01',
    facilityName: 'District Civil Hospital, Nashik',
    distanceKm: 4.2,
    availableQuantity: 8900,
    thresholdLevel: 1500,
    unit: 'Tablets',
    stockStatus: 'Available',
    batchExpiry: 'Jan 2028',
    lastUpdated: '19 Sep 2026, 08:00 AM'
  },
  {
    id: 'MED-04',
    name: 'Tab. Paracetamol 650mg',
    genericName: 'Paracetamol IP',
    dosageForm: 'Tablet',
    category: 'Emergency & Analgesic',
    facilityId: 'FAC-TRM-02',
    facilityName: 'Primary Health Centre – Trimbakeshwar',
    distanceKm: 28.5,
    availableQuantity: 2800,
    thresholdLevel: 1000,
    unit: 'Tablets',
    stockStatus: 'Available',
    batchExpiry: 'Aug 2028',
    lastUpdated: '19 Sep 2026, 09:00 AM'
  },
  {
    id: 'MED-05',
    name: 'Oral Rehydration Salts (ORS) Sachet 21.8g',
    genericName: 'WHO Standard ORS Formula',
    dosageForm: 'Sachet',
    category: 'Maternal & Child',
    facilityId: 'FAC-SUB-06',
    facilityName: 'Health & Wellness Sub-Centre – Anjaneri',
    distanceKm: 22.0,
    availableQuantity: 450,
    thresholdLevel: 100,
    unit: 'Sachets',
    stockStatus: 'Available',
    batchExpiry: 'May 2027',
    lastUpdated: '19 Sep 2026, 07:30 AM'
  },
  {
    id: 'MED-06',
    name: 'Tab. Iron & Folic Acid (IFA - Red)',
    genericName: 'Dried Ferrous Sulphate + Folic Acid IP',
    dosageForm: 'Tablet',
    category: 'Maternal & Child',
    facilityId: 'FAC-SUB-06',
    facilityName: 'Health & Wellness Sub-Centre – Anjaneri',
    distanceKm: 22.0,
    availableQuantity: 1200,
    thresholdLevel: 300,
    unit: 'Tablets',
    stockStatus: 'Available',
    batchExpiry: 'Mar 2028',
    lastUpdated: '18 Sep 2026, 05:00 PM'
  },
  {
    id: 'MED-07',
    name: 'Inj. Rabies Antiserum 1000 IU',
    genericName: 'Equine Rabies Immunoglobulin IP',
    dosageForm: 'Injection',
    category: 'Emergency & Analgesic',
    facilityId: 'FAC-TRM-02',
    facilityName: 'Primary Health Centre – Trimbakeshwar',
    distanceKm: 28.5,
    availableQuantity: 0,
    thresholdLevel: 10,
    unit: 'Vials',
    stockStatus: 'Out of Stock',
    batchExpiry: 'Nov 2026',
    lastUpdated: '19 Sep 2026, 08:30 AM'
  },
  {
    id: 'MED-08',
    name: 'Inj. Rabies Antiserum 1000 IU',
    genericName: 'Equine Rabies Immunoglobulin IP',
    dosageForm: 'Injection',
    category: 'Emergency & Analgesic',
    facilityId: 'FAC-NSK-01',
    facilityName: 'District Civil Hospital, Nashik',
    distanceKm: 4.2,
    availableQuantity: 48,
    thresholdLevel: 15,
    unit: 'Vials',
    stockStatus: 'Available',
    batchExpiry: 'Feb 2027',
    lastUpdated: '19 Sep 2026, 08:00 AM'
  },
  {
    id: 'MED-09',
    name: 'Salbutamol Inhaler 100mcg',
    genericName: 'Salbutamol Inhalation Aerosol IP',
    dosageForm: 'Inhaler',
    category: 'Respiratory',
    facilityId: 'FAC-DHL-03',
    facilityName: 'Rural Hospital – Sakri (Dhule)',
    distanceKm: 85.0,
    availableQuantity: 15,
    thresholdLevel: 25,
    unit: 'Canisters',
    stockStatus: 'Low Stock',
    batchExpiry: 'Oct 2027',
    lastUpdated: '17 Sep 2026, 03:00 PM'
  }
];
