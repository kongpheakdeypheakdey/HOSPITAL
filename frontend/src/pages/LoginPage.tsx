import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../components/Toast';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { HospitalLogo } from '../components/HospitalLogo';
import { LogIn, Lock, Mail, ShieldCheck, KeyRound } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { isKhmer } = useLanguage();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const demoAccounts = [
    { role: 'ADMIN', label: 'Admin (Director)', email: 'admin@luangme.gov.kh', pass: 'AdminPass123!' },
    { role: 'MANAGER', label: 'Manager (Clinical)', email: 'manager@luangme.gov.kh', pass: 'ManagerPass123!' },
    { role: 'STAFF', label: 'Staff (Nurse)', email: 'staff@luangme.gov.kh', pass: 'StaffPass123!' },
    { role: 'USER', label: 'Patient User', email: 'user@gmail.com', pass: 'UserPass123!' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toastError('Please fill in both email and password.');
      return;
    }

    try {
      setSubmitting(true);
      const user = await login(email, password);
      success(`Welcome back, ${user.fullName}!`);
      navigate('/admin');
    } catch (err: any) {
      toastError(err.message || 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
        {/* Brand Logo Header */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 mx-auto overflow-hidden">
            <HospitalLogo className="w-full h-full object-contain" />
          </div>
          <h2 className="text-xl font-bold text-[#0B1D2E] font-serif">
            {isKhmer ? 'ច្រកចូលរដ្ឋបាលមន្ទីរពេទ្យ' : 'Hospital Portal Login'}
          </h2>
          <p className="text-xs text-slate-500">
            {isKhmer ? 'បញ្ចូលព័ត៌មានគណនី ដើម្បីចូលប្រើប្រាស់ប្រព័ន្ធ' : 'Authorized medical staff & management access only'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label={isKhmer ? 'អាសយដ្ឋានអ៊ីមែល' : 'Email Address'}
            type="email"
            placeholder="admin@luangme.gov.kh"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label={isKhmer ? 'ពាក្យសម្ងាត់' : 'Password'}
            type="password"
            placeholder="••••••••"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full mt-2" isLoading={submitting} icon={LogIn}>
            {isKhmer ? 'ចូលរដ្ឋបាល' : 'Sign In'}
          </Button>
        </form>

        {/* Demo Accounts Quick-Fill Section */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <KeyRound className="w-3.5 h-3.5 text-[#0F4C8A]" />
            <span>{isKhmer ? 'គណនីសាកល្បង (Click to Auto-fill):' : 'Demo Test Accounts:'}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                type="button"
                onClick={() => fillDemo(acc.email, acc.pass)}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-[#0F4C8A] hover:bg-slate-50 text-left text-xs transition-colors"
              >
                <div className="font-bold text-[#0B1D2E]">{acc.label}</div>
                <div className="text-[10px] text-slate-500 truncate">{acc.email}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
