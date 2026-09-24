export interface HealthFacility {
  id: string;
  name: string;
  level: 'Sub-Centre' | 'PHC' | 'Rural Hospital' | 'District Hospital' | 'Medical College';
  district: string;
  taluka: string;
  beds: number;
  emergencyAvailable: boolean;
  icuAvailable: boolean;
  distanceKm: number;
  phone: string;
  address: string;
  activeOpdCount: number;
  currentWaitMinutes: number;
  services: string[];
}

export const MOCK_FACILITIES: HealthFacility[] = [
  {
    id: 'FAC-NSK-01',
    name: 'District Civil Hospital, Nashik',
    level: 'District Hospital',
    district: 'Nashik',
    taluka: 'Nashik City',
    beds: 500,
    emergencyAvailable: true,
    icuAvailable: true,
    distanceKm: 4.2,
    phone: '0253-2571201',
    address: 'Near Old Agra Road, Shalimar, Nashik - 422001',
    activeOpdCount: 480,
    currentWaitMinutes: 35,
    services: ['Emergency 24x7', 'ICU & Trauma Care', 'Dialysis', 'Blood Bank', 'CT Scan & MRI', 'Maternal & NICU', 'Specialist Surgery']
  },
  {
    id: 'FAC-TRM-02',
    name: 'Primary Health Centre – Trimbakeshwar',
    level: 'PHC',
    district: 'Nashik',
    taluka: 'Trimbakeshwar',
    beds: 12,
    emergencyAvailable: true,
    icuAvailable: false,
    distanceKm: 28.5,
    phone: '02594-233140',
    address: 'Main Road, Near Bus Stand, Trimbak - 422212',
    activeOpdCount: 84,
    currentWaitMinutes: 15,
    services: ['General OPD', 'Routine Deliveries', 'Immunisation', 'Basic Lab (Blood/Urine)', 'Essential Pharmacy', 'Teleconsultation Node']
  },
  {
    id: 'FAC-DHL-03',
    name: 'Rural Hospital – Sakri (Dhule)',
    level: 'Rural Hospital',
    district: 'Dhule',
    taluka: 'Sakri',
    beds: 30,
    emergencyAvailable: true,
    icuAvailable: false,
    distanceKm: 85.0,
    phone: '02568-242201',
    address: 'National Highway 6, Sakri, Dist. Dhule - 424304',
    activeOpdCount: 142,
    currentWaitMinutes: 20,
    services: ['General Medicine', 'Obstetric Care', 'X-Ray & Ultrasound', 'Emergency Stabilization', 'Ambulance 108 Base']
  },
  {
    id: 'FAC-JLG-04',
    name: 'Community Health Centre – Erandol',
    level: 'Rural Hospital',
    district: 'Jalgaon',
    taluka: 'Erandol',
    beds: 30,
    emergencyAvailable: true,
    icuAvailable: false,
    distanceKm: 120.0,
    phone: '02588-244112',
    address: 'Subhash Chowk, Erandol, Dist. Jalgaon - 425109',
    activeOpdCount: 110,
    currentWaitMinutes: 25,
    services: ['General OPD', 'Maternity Ward', 'Microscopy Centre', 'Pediatric Care', 'Minor OT']
  },
  {
    id: 'FAC-PUN-05',
    name: 'Sassoon General Hospital & BJ Medical College',
    level: 'Medical College',
    district: 'Pune',
    taluka: 'Pune City',
    beds: 1296,
    emergencyAvailable: true,
    icuAvailable: true,
    distanceKm: 210.0,
    phone: '020-26128000',
    address: 'Station Road, Near Pune Railway Station, Pune - 411001',
    activeOpdCount: 1250,
    currentWaitMinutes: 45,
    services: ['Super-Specialty Tertiary Care', 'Organ Transplant', 'Advanced Oncology', 'Level 1 Trauma Centre', 'Burn Unit']
  },
  {
    id: 'FAC-SUB-06',
    name: 'Health & Wellness Sub-Centre – Anjaneri',
    level: 'Sub-Centre',
    district: 'Nashik',
    taluka: 'Trimbakeshwar',
    beds: 2,
    emergencyAvailable: false,
    icuAvailable: false,
    distanceKm: 22.0,
    phone: '02594-230012',
    address: 'Village Anjaneri, Trimbak Road, Nashik - 422213',
    activeOpdCount: 22,
    currentWaitMinutes: 5,
    services: ['ASHA / ANM Field Operations', 'Maternal Health (ANC)', 'Child Immunisation', 'Non-Communicable Disease (NCD) Screening', 'NCD Drug Dispensing']
  }
];
