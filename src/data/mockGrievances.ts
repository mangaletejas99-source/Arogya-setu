export type GrievanceStatus = 'Submitted' | 'Under Review' | 'Assigned' | 'Resolved';

export interface GrievanceRecord {
  id: string;
  category: 'Medicine Non-Availability' | 'Staff Behaviour & Absence' | 'Facility Infrastructure' | 'Scheme Cashless Issue' | 'Long Queue / Delay' | 'Other';
  facilityName: string;
  district: string;
  complainantName: string;
  mobile: string;
  submissionDate: string;
  description: string;
  status: GrievanceStatus;
  assignedOfficer: string;
  resolutionDate?: string;
  officialRemarks?: string;
}

export const MOCK_GRIEVANCES: GrievanceRecord[] = [
  {
    id: 'AS-GRV-2026-8492',
    category: 'Medicine Non-Availability',
    facilityName: 'Primary Health Centre – Trimbakeshwar',
    district: 'Nashik',
    complainantName: 'Ramesh D. Jadhav',
    mobile: '+91 98220 14829',
    submissionDate: '2026-09-14',
    description: 'Anti-rabies injection stock was marked unavailable at Trimbakeshwar PHC pharmacy on Monday afternoon.',
    status: 'Resolved',
    assignedOfficer: 'District Health Officer (DHO) Nashik',
    resolutionDate: '2026-09-16',
    officialRemarks: 'Emergency buffer stock of 50 vials dispatched from District Civil Hospital Nashik central warehouse. Pharmacist sensitized to maintain minimum re-order level.'
  },
  {
    id: 'AS-GRV-2026-9011',
    category: 'Scheme Cashless Issue',
    facilityName: 'Rural Hospital – Sakri (Dhule)',
    district: 'Dhule',
    complainantName: 'Kailash Sonawane',
    mobile: '+91 94229 11092',
    submissionDate: '2026-09-18',
    description: 'Hospital desk requested private payment for ultrasound scan despite active MJPJAY beneficiary card verification.',
    status: 'Under Review',
    assignedOfficer: 'Divisional Quality Assurance Cell, Dhule',
    officialRemarks: 'Notice issued to Sonography empanelled operator. Clarification hearing scheduled for 21 Sep 2026.'
  }
];
