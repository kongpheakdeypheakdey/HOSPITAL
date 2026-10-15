import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { HospitalLogo } from './HospitalLogo';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';

export const Header: React.FC = () => {
  const { lang, setLang, isKhmer } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', labelKm: 'ទំព័រដើម' },
    { path: '/about', label: 'About Us', labelKm: 'អំពីយើង' },
    { path: '/departments', label: 'Departments', labelKm: 'នាយកដ្ឋាន' },
    { path: '/doctors', label: 'Doctors', labelKm: 'គ្រូពេទ្យ' },
    { path: '/news', label: 'News & Events', labelKm: 'ព័ត៌មាន' },
    { path: '/partnerships', label: 'Partnerships', labelKm: 'ដៃគូ' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white text-slate-800 shadow-sm border-b border-slate-200 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden bg-white">
            <HospitalLogo className="h-full w-full object-contain" />
          </div>
          <div className="leading-none text-slate-800">
            <div className="text-lg sm:text-2xl font-extrabold tracking-tight uppercase whitespace-nowrap font-sans">
              LUANG MÈ HOSPITAL
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive(item.path)
                  ? 'bg-[#0f4c8a] text-white shadow-sm font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isKhmer ? item.labelKm : item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                lang === 'en' ? 'bg-[#0f4c8a] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('km')}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                lang === 'km' ? 'bg-[#0f4c8a] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ខ្មែរ
            </button>
          </div>

          {user && (
            <div className="flex items-center gap-3">
              <Link
                to="/admin"
                className="flex items-center gap-1 text-xs text-[#0f4c8a] hover:text-[#0d3f75] font-semibold transition-colors"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                {isKhmer ? 'ផ្ទាំងគ្រប់គ្រង' : 'Portal'}
              </Link>
              <button
                onClick={() => logout()}
                className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                {isKhmer ? 'ចាកចេញ' : 'Logout'}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? 'bg-[#0f4c8a] text-white font-semibold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {isKhmer ? item.labelKm : item.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-200" />
        </div>
      )}
    </header>
  );
};
