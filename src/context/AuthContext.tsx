import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserRole = 'citizen' | 'healthWorker' | 'doctor' | 'facility' | 'government';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  designation: string;
  facilityOrLocation: string;
  phone: string;
  identifier: string; // ABHA ID, Medical Reg No, Facility ID, etc.
}

export const MOCK_USERS: Record<UserRole, UserProfile> = {
  citizen: {
    id: 'CIT-7821',
    name: 'Ramesh D. Jadhav',
    role: 'citizen',
    designation: 'Resident / Patient',
    facilityOrLocation: 'Trimbakeshwar, Dist. Nashik',
    phone: '+91 98220 14829',
    identifier: '91-4829-1048-2910 (ABHA)',
  },
  healthWorker: {
    id: 'ASHA-402',
    name: 'Sunita Tai Gaikwad',
    role: 'healthWorker',
    designation: 'Accredited Social Health Activist (ASHA)',
    facilityOrLocation: 'Sub-Centre Anjaneri, PHC Trimbak',
    phone: '+91 94231 87291',
    identifier: 'HW-MH-NSK-0492',
  },
  doctor: {
    id: 'DOC-1088',
    name: 'Dr. Ananya Patil',
    role: 'doctor',
    designation: 'Senior Medical Officer (MD General Medicine)',
    facilityOrLocation: 'District Civil Hospital, Nashik',
    phone: '+91 98200 45123',
    identifier: 'MCI-2012-08-19284',
  },
  facility: {
    id: 'FAC-901',
    name: 'Dr. R. K. Deshmukh',
    role: 'facility',
    designation: 'Civil Surgeon & Medical Superintendent',
    facilityOrLocation: 'District Civil Hospital, Nashik (500 Bedded)',
    phone: '+91 253 2571201',
    identifier: 'NIN-401928-DH',
  },
  government: {
    id: 'GOV-001',
    name: 'Dr. Suresh Shinde, IAS',
    role: 'government',
    designation: 'Director of Health Services & Public Health Commissioner',
    facilityOrLocation: 'Directorate of Health Services, Mumbai, Maharashtra',
    phone: '+91 22 22620249',
    identifier: 'GOV-MH-PHD-001',
  },
};

export const DEMO_CREDENTIALS: Record<UserRole, { id: string; password: string }> = {
  citizen: { id: 'PAT-1001', password: 'demo123' },
  healthWorker: { id: 'ASHA-1001', password: 'demo123' },
  doctor: { id: 'DOC-1001', password: 'demo123' },
  facility: { id: 'FAC-1001', password: 'demo123' },
  government: { id: 'GOV-1001', password: 'demo123' },
};

interface AuthContextType {
  user: UserProfile;
  role: UserRole;
  switchRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: (role: UserRole, identifier?: string, password?: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_STORAGE_KEY = 'arogya_setu_auth_session_v1';
const ROLE_STORAGE_KEY = 'arogya_setu_role_v1';

const getStoredRole = (): UserRole => {
  if (typeof window === 'undefined') return 'citizen';
  const role = window.localStorage.getItem(ROLE_STORAGE_KEY) as UserRole | null;
  return role && role in MOCK_USERS ? role : 'citizen';
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(getStoredRole);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(ROLE_STORAGE_KEY, role);
  }, [role]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(AUTH_STORAGE_KEY, String(isAuthenticated));
  }, [isAuthenticated]);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
  };

  const login = (newRole: UserRole, identifier?: string, password?: string) => {
    const credentials = DEMO_CREDENTIALS[newRole];
    if (credentials) {
      const enteredId = (identifier ?? '').trim();
      const enteredPassword = (password ?? '').trim();
      const valid = enteredId === credentials.id && enteredPassword === credentials.password;
      if (!valid && typeof identifier === 'string' && typeof password === 'string') {
        return false;
      }
    }

    setRole(newRole);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole('citizen');
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      window.localStorage.removeItem(ROLE_STORAGE_KEY);
    }
  };

  const user = MOCK_USERS[role];

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        switchRole,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
