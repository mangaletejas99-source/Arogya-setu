import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, UserRole, MOCK_USERS, DEMO_CREDENTIALS } from '../../context/AuthContext';
import { Shield, KeyRound, User, ArrowRight, CheckCircle2, Stethoscope, Building2, BriefcaseBusiness, AlertTriangle } from 'lucide-react';

const roleConfig: Record<UserRole, { title: string; subtitle: string; button: string; icon: any; description: string; idLabel: string }> = {
  citizen: {
    title: 'Citizen / Patient',
    subtitle: 'Access your health records, appointments, schemes, diagnostics and health services.',
    button: 'Login as Citizen',
    icon: User,
    description: 'Patient ID / ABHA ID',
    idLabel: 'PAT-1001',
  },
  doctor: {
    title: 'Doctor / Hospital',
    subtitle: 'Access patient records, appointments, referrals, diagnostics and clinical services.',
    button: 'Login as Doctor / Hospital',
    icon: Stethoscope,
    description: 'Doctor/Hospital ID',
    idLabel: 'DOC-1001',
  },
  government: {
    title: 'Government / Health Official',
    subtitle: 'Monitor facilities, healthcare indicators, referrals, medicine availability and public-health services.',
    button: 'Login as Government Official',
    icon: Building2,
    description: 'Official ID',
    idLabel: 'GOV-1001',
  },
  healthWorker: {
    title: 'Health Worker',
    subtitle: 'Field reporting, follow-up, emergency coordination and rural care support.',
    button: 'Login as Health Worker',
    icon: BriefcaseBusiness,
    description: 'Health Worker ID',
    idLabel: 'ASHA-1001',
  },
  facility: {
    title: 'Facility / Hospital Admin',
    subtitle: 'Review readiness, bed occupancy, medicine stock and hospital operations.',
    button: 'Login as Facility Admin',
    icon: Building2,
    description: 'Facility ID',
    idLabel: 'FAC-1001',
  },
};

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');
  const [identifier, setIdentifier] = useState(DEMO_CREDENTIALS.citizen.id);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.citizen.password);
  const [error, setError] = useState('');

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setIdentifier(DEMO_CREDENTIALS[role].id);
    setPassword(DEMO_CREDENTIALS[role].password);
    setError('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(selectedRole, identifier, password);
    if (!ok) {
      setError('Invalid credentials. Use the demo ID and password shown for the selected role.');
      return;
    }

    if (selectedRole === 'citizen') navigate('/citizen/dashboard');
    else if (selectedRole === 'doctor') navigate('/doctor/dashboard');
    else if (selectedRole === 'healthWorker') navigate('/health-worker/dashboard');
    else if (selectedRole === 'facility') navigate('/facility/dashboard');
    else if (selectedRole === 'government') navigate('/government/dashboard');
  };

  const config = roleConfig[selectedRole];
  const Icon = config.icon;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-6 text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-white border border-gov-gray-200 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gov-navy shadow-sm">
          <Shield className="w-3.5 h-3.5 text-gov-saffron" />
          AROGYA SETU
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gov-navy tracking-tight">Integrated Digital Public Health Platform</h1>
        <p className="text-xs text-gov-gray-600">Government-inspired prototype for healthcare access and service coordination.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="bg-gradient-to-br from-gov-navy via-[#0c3f6b] to-[#113d5f] text-white rounded-2xl overflow-hidden shadow-xl border border-slate-700/60">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">Prototype / Demo</div>
                <div className="text-3xl font-black tracking-tight mt-1">AROGYA SETU</div>
              </div>
              <div className="rounded-full border border-amber-300/40 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase text-amber-200">
                Secure access portal
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-inner">
              <img
                src="/images/healthcare/placeholder-healthcare.svg"
                alt="Healthcare workers supporting patient care"
                className="h-56 w-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm text-slate-200 leading-relaxed">
                Prototype / Demo — Real government authentication and health databases are not connected.
              </p>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Government-inspired prototype for healthcare access and service coordination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(['citizen', 'doctor', 'government'] as UserRole[]).map((role) => {
                const item = roleConfig[role];
                const ItemIcon = item.icon;
                const active = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleChange(role)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      active ? 'border-amber-300 bg-amber-400/10 shadow-md' : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <ItemIcon className="w-5 h-5 text-amber-300" />
                      {active && <CheckCircle2 className="w-4 h-4 text-amber-300" />}
                    </div>
                    <div className="mt-3 text-[11px] font-bold uppercase tracking-wide text-white">{item.title}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gov-gray-200 shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            <div className="border-b border-gov-gray-200 pb-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gov-saffron">Login Type</div>
              <h2 className="mt-2 text-2xl font-bold text-gov-navy">{config.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{config.subtitle}</p>
            </div>

            <div className="space-y-3">
              {(['citizen', 'doctor', 'government'] as UserRole[]).map((role) => {
                const item = roleConfig[role];
                const ItemIcon = item.icon;
                const active = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleChange(role)}
                    className={`w-full rounded-xl border p-3 text-left transition-colors ${
                      active ? 'border-gov-navy bg-gov-navy text-white' : 'border-gov-gray-200 bg-slate-50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`rounded-lg p-2 ${active ? 'bg-white/10 text-white' : 'bg-white text-gov-navy'}`}>
                          <ItemIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">{item.title}</div>
                          <div className={`text-[11px] ${active ? 'text-slate-200' : 'text-slate-500'}`}>{item.subtitle}</div>
                        </div>
                      </div>
                      {active && <ArrowRight className="w-4 h-4" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1.5">
                  {config.description}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-gov-gray-300 rounded-lg focus:ring-2 focus:ring-gov-navy/20 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-gov-gray-300 rounded-lg focus:ring-2 focus:ring-gov-navy/20 focus:outline-none text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-lg px-3 py-2 text-xs font-medium flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-2 text-[11px] text-slate-600">
                <button type="button" className="text-gov-navy hover:underline font-semibold">Forgot Password?</button>
                <button type="button" onClick={() => setSelectedRole('citizen')} className="text-gov-navy hover:underline font-semibold">Back to Login Types</button>
              </div>

              <button
                type="submit"
                className="w-full bg-gov-navy hover:bg-gov-navyLight text-white rounded-lg py-3 font-bold uppercase tracking-wide text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-900 leading-relaxed">
              <div className="font-bold uppercase tracking-wide">Demo Login – No real authentication service is connected.</div>
              <div className="mt-1">Citizen: PAT-1001 / demo123</div>
              <div>Doctor: DOC-1001 / demo123</div>
              <div>Government: GOV-1001 / demo123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
