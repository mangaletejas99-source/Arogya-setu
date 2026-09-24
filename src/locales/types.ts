export type Language = 'en' | 'mr' | 'hi';

export interface Translations {
  // Utility & Header
  skipToMain: string;
  screenReader: string;
  accessibility: string;
  sitemap: string;
  help: string;
  contact: string;
  prototypeNotice: string;
  govtHeaderSubtitle: string;
  portalTitle: string;
  portalSubtitle: string;
  searchPlaceholder: string;
  login: string;
  logout: string;
  
  // Navigation
  navHome: string;
  navAbout: string;
  navServices: string;
  navFacilities: string;
  navDigitalHealth: string;
  navSchemes: string;
  navProgrammes: string;
  navNotices: string;
  navGrievance: string;
  navHelp: string;

  // Roles
  roleCitizen: string;
  roleHealthWorker: string;
  roleDoctor: string;
  roleFacility: string;
  roleGovt: string;
  switchRole: string;

  // Home Page
  announcementTitle: string;
  serviceSearchTitle: string;
  serviceSearchSub: string;
  citizenServicesTitle: string;
  digitalHealthTitle: string;
  programmesTitle: string;
  dashboardTitle: string;
  noticesTitle: string;
  schemesTitle: string;
  awarenessTitle: string;
  importantLinksTitle: string;

  // Citizen Dashboard
  welcome: string;
  abhaId: string;
  profileCompletion: string;
  upcomingAppointment: string;
  queuePosition: string;
  pendingTest: string;
  latestPrescription: string;
  followUpDue: string;
  notifications: string;

  // Services
  findFacility: string;
  findDoctor: string;
  bookAppointment: string;
  teleconsultation: string;
  healthRecords: string;
  digitalTriage: string;
  medicineAvailability: string;
  diagnosticServices: string;
  emergencyHelp: string;
  referralTracking: string;
  healthSchemes: string;
  aiAssistant: string;

  // Triage & Severity
  triageTitle: string;
  severityNormal: string;
  severityUrgent: string;
  severityEmergency: string;
  emergencyAlert: string;
  immediateCare: string;

  // Statuses
  available: string;
  lowStock: string;
  outOfStock: string;
  pending: string;
  completed: string;
  inProgress: string;

  // Offline & Connectivity
  onlineStatus: string;
  offlineStatus: string;
  syncPending: string;
  syncNow: string;
  syncCompleted: string;

  // Footer & Legal
  privacyPolicy: string;
  termsOfUse: string;
  disclaimer: string;
  copyrightNotice: string;
  lastUpdated: string;
}
