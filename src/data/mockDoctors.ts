export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialty: string;
  facilityId: string;
  facilityName: string;
  roomNo: string;
  opdTimings: string;
  experienceYears: number;
  availableDays: string[];
  teleconsultationActive: boolean;
  languages: string[];
}

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'DOC-PATIL-01',
    name: 'Dr. Ananya Patil',
    qualification: 'MBBS, MD (General Medicine)',
    specialty: 'General Medicine & Diabetology',
    facilityId: 'FAC-NSK-01',
    facilityName: 'District Civil Hospital, Nashik',
    roomNo: 'OPD Room 4',
    opdTimings: '09:00 AM - 01:30 PM',
    experienceYears: 14,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    teleconsultationActive: true,
    languages: ['Marathi', 'Hindi', 'English']
  },
  {
    id: 'DOC-DESH-02',
    name: 'Dr. Rahul Deshmukh',
    qualification: 'MBBS, MS (Orthopaedics)',
    specialty: 'Orthopaedics & Joint Care',
    facilityId: 'FAC-NSK-01',
    facilityName: 'District Civil Hospital, Nashik',
    roomNo: 'OPD Room 11',
    opdTimings: '09:30 AM - 01:00 PM',
    experienceYears: 18,
    availableDays: ['Mon', 'Wed', 'Fri'],
    teleconsultationActive: false,
    languages: ['Marathi', 'English']
  },
  {
    id: 'DOC-KULK-03',
    name: 'Dr. Neha Kulkarni',
    qualification: 'MBBS, MD (Obstetrics & Gynaecology)',
    specialty: 'Obstetrics & High-Risk Pregnancy',
    facilityId: 'FAC-NSK-01',
    facilityName: 'District Civil Hospital, Nashik',
    roomNo: 'MCH Wing Room 2',
    opdTimings: '09:00 AM - 02:00 PM',
    experienceYears: 11,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    teleconsultationActive: true,
    languages: ['Marathi', 'Hindi', 'English']
  },
  {
    id: 'DOC-SHET-04',
    name: 'Dr. Vikramaditya Shetty',
    qualification: 'MBBS, DNB (Paediatrics)',
    specialty: 'Paediatrics & Neonatology',
    facilityId: 'FAC-TRM-02',
    facilityName: 'Primary Health Centre – Trimbakeshwar',
    roomNo: 'Room 2',
    opdTimings: '09:00 AM - 01:00 PM',
    experienceYears: 8,
    availableDays: ['Tue', 'Thu', 'Sat'],
    teleconsultationActive: true,
    languages: ['Marathi', 'Hindi', 'English']
  },
  {
    id: 'DOC-JADH-05',
    name: 'Dr. Meenal Jadhav',
    qualification: 'MBBS, Medical Officer',
    specialty: 'General Public Health & Preventive Care',
    facilityId: 'FAC-TRM-02',
    facilityName: 'Primary Health Centre – Trimbakeshwar',
    roomNo: 'Room 1',
    opdTimings: '08:30 AM - 01:30 PM',
    experienceYears: 6,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    teleconsultationActive: true,
    languages: ['Marathi', 'Hindi']
  },
  {
    id: 'DOC-CHAV-06',
    name: 'Dr. Prashant Chavan',
    qualification: 'MBBS, MD, DM (Cardiology)',
    specialty: 'Cardiology & Heart Failure',
    facilityId: 'FAC-PUN-05',
    facilityName: 'Sassoon General Hospital & BJ Medical College',
    roomNo: 'Super-Specialty Block 3',
    opdTimings: '10:00 AM - 03:00 PM',
    experienceYears: 20,
    availableDays: ['Mon', 'Wed', 'Fri'],
    teleconsultationActive: true,
    languages: ['Marathi', 'Hindi', 'English']
  }
];
