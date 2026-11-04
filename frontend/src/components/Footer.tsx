import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { HospitalLogo } from './HospitalLogo';
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { isKhmer } = useLanguage();

  return (
    <footer className="bg-gradient-to-r from-[#081f38] via-[#0d2d52] to-[#0f4c8a] text-white border-t border-white/10 pt-16 pb-8 shadow-[0_-12px_30px_rgba(15,76,138,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Hospital Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                <HospitalLogo className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-xs font-semibold text-emerald-400 font-khmer">
                  មន្ទីរពេទ្យ ហ្លួងម៉ែ
                </div>
                <div className="text-base font-extrabold tracking-tight text-white font-serif">
                  LUANG MÈ HOSPITAL
                </div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {isKhmer
                ? 'មន្ទីរពេទ្យ ហ្លួង ម៉ែ ជា​មន្ទីរពេទ្យងថ្នាក់ជាតិ​ ឯកទេសព្យាបាលជំងងឺមហារីក ដែលផ្ដល់ជូននូវសេវាព្យាបាល ថែទាំ និងពិនិត្យសុខភាព ទូទៅយ៉ាងទូលំទូលាយ ជាពិសេសផ្តោតសំខាន់ទៅលើការព្យាបាលជំងឺមហារីកគ្រប់េប្រភេទ ដោយបច្ចេកវិទ្យាទំនើប ជាមួយវេជ្ជបណ្ឌិត ឯកទេសដែលមានជំនាញវិជ្ជាជីវៈខ្ពស់ ផ្តល់នូវទំនុកចិត្ត និងក្តីសង្ឃឹម'
                : 'Luang Mae Hospital is a national specialized cancer hospital that provides comprehensive general healthcare, examination, and treatment services. It focuses particularly on treating all types of cancer using modern technology and highly skilled specialist doctors, delivering trust and hope.'}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <Heart className="w-4 h-4 fill-emerald-400" />
              <span>{isKhmer ? 'ទុក្ខរបស់អ្នកជំងឺ ជាទុក្ខរបស់គ្រូពេទ្យ' : 'Accredited Medical Institution'}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#0F4C8A] pl-3">
              {isKhmer ? 'តំណភ្ជាប់រហ័ស' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {isKhmer ? 'អំពីមន្ទីរពេទ្យ' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition-colors">
                  {isKhmer ? 'ផ្នែកព្យាបាល' : 'Medical Departments'}
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-white transition-colors">
                  {isKhmer ? 'ក្រុមវេជ្ជបណ្ឌិត' : 'Our Doctors'}
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-white transition-colors">
                  {isKhmer ? 'ព័ត៌មាន & ព្រឹត្តិការណ៍' : 'News & Announcements'}
                </Link>
              </li>
              <li>
                <Link to="/partnerships" className="hover:text-white transition-colors">
                  {isKhmer ? 'ដៃគូសហប្រតិបត្តិការ' : 'Partnerships'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Emergency */}
          <div>
            <div className="space-y-3 text-sm text-white/70">
              <div className="p-3.5 bg-red-950/40 rounded-xl border border-red-900/50 space-y-1">
                <div className="text-xs font-bold text-red-400 uppercase tracking-wide">
                  {isKhmer ? 'លេខទំនាក់ទំនងសេវាកម្ម' : 'Call Center'}
                </div>
                <div className="text-base font-bold text-white">010-228-965</div>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#0F4C8A] pl-3">
              {isKhmer ? 'ទីតាំង & ទំនាក់ទំនង' : 'Location & Contact'}
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>St. 109, Sangkat Preysor, Khan Dangkor, Phnom Penh Capital, Cambodia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>010-228-965</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>www.luangmehospital.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>Luang Mè Hospital.</p>
          <div className="flex items-center gap-6">
            <Link to="/emergency" className="hover:text-white transition-colors">
              
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
