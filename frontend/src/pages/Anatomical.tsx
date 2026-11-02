import React, { useEffect, useState } from 'react';
import { Facebook, Linkedin, Twitter, Send, ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const socialLinks = [
  { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/share/18cm1Y6gjf/?mibextid=wwXIfr' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/shareArticle?mini=true&url=https://www.loungmehospital.com/pathology' },
  { label: 'X', icon: Twitter, href: 'https://twitter.com/intent/tweet?text=Check%20out%20the%20Anatomic%20Pathology%20Department&url=https://www.loungmehospital.com/pathology' },
  { label: 'Telegram', icon: Send, href: 'https://t.me/share/url?url=https://www.loungmehospital.com/pathology&text=Check%20out%20the%20Anatomic%20Pathology%20Department' },
];

const services = [
  { km: 'សេវាវិភាគកោសិកាមហារីកមាត់ស្បូន (LBC): ស្វែងរកកោសិកាមហារីកដំណាក់កាលដំបូង', en: 'Liquid-Based Cytology (LBC): Screening for early-stage and precancerous cervical lesions' },
  { km: 'សេវាវិភាគជាលិកា និងដុំសាច់ (Biopsy & Surgical Pathology): ពិនិត្យដុំសាច់តូច និងធំ ដើម្បីកំណត់ថាតើជាសាច់ស្លូត ឬកាច', en: 'Biopsy and surgical pathology: Histopathological evaluation to differentiate benign from malignant tumors' },
  { km: 'សេវាវិភាគអ៊ីមុយណូគីមីសាស្ត្រ (IHC Panel): កំណត់ប្រភពកោសិកាមហារីកច្បាស់លាស់', en: 'Immunohistochemistry (IHC) panels: Precise tumor typing and cancer origin identification' },
];

export const AnatomicalPathologyPage: React.FC = () => {
  const { isKhmer } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div>
      {/* 1. Hero / Header Section */}
      <section className="bg-[#F3F4F6]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-6 py-12">
          {/* Left column */}
          <div className="space-y-5">
            <p className={`text-xs font-medium uppercase tracking-wider text-gray-500 ${isKhmer ? 'font-khmer' : ''}`}>
              <span>{isKhmer ? 'ព័ត៌មានពិសេស' : 'Featured'}</span>
              <span className="mx-1.5">|</span>
              <span>{isKhmer ? 'ការណែនាំ' : 'Instructions'}</span>
              <span className="mx-1.5">|</span>
              <span>{isKhmer ? 'ព័ត៌មាន' : 'News'}</span>
              <span className="mx-1.5">•</span>
              <span>{isKhmer ? '០៩ តុលា ២០២៦' : 'Oct 9, 2026'}</span>
            </p>

            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#0B1D2E] ${
                isKhmer ? 'font-khmer' : 'uppercase'
              }`}
            >
              {isKhmer
                ? 'ផ្នែកវិភាគសាច់ និងកោសិកាវិទ្យា'
                : 'Anatomic Pathology & Cytopathology'}
            </h1>

            <p className={`text-base sm:text-lg text-gray-600 ${isKhmer ? 'font-khmer' : ''}`}>
              {isKhmer ? 'ទិដ្ឋភាពទូទៅនៃសេវាកម្មឯកទេស។' : 'Overview of Specialised Services.'}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-slate-200/70 text-slate-600 flex items-center justify-center hover:bg-[#0F4C8A] hover:text-white transition-colors duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right column — hero card */}
          <div className="relative rounded-3xl overflow-hidden glass">
            <img
              src="/image/departments/lab1.JPG"
              alt={isKhmer ? 'ផ្នែកវិភាគសាច់ និងកោសិកាវិទ្យា' : 'Anatomic pathology and cytopathology department'}
              className="w-full h-[320px] sm:h-[380px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55" />

            {/* Top header */}
            <div className="absolute top-0 inset-x-0 p-5">
              <h2
                className={`text-white text-lg sm:text-xl font-bold drop-shadow-md leading-snug ${
                  isKhmer ? 'font-khmer' : ''
                }`}
              >
                {isKhmer
                  ? 'ផ្នែកវិភាគសាច់ និងកោសិកាវិទ្យា'
                  : 'Anatomic Pathology & Cytopathology'}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Overview Section */}
      <section className="bg-white/55 backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto px-6 py-14">
          {/* Left — list */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#0B1D2E]">
              <span className="font-khmer block">សេវាកម្មសំខាន់ៗដែលយើងផ្តល់ជូន៖</span>
              <span className="block text-base font-semibold text-slate-500 mt-1">
                The key services we provide:
              </span>
            </h3>
            <ul className="list-disc pl-6 text-gray-800 text-lg font-medium space-y-4">
              {services.map((service) => (
                <li key={service.en}>
                  <span className="font-khmer block">{service.km}</span>
                  <span className="block text-sm font-normal text-slate-500 mt-0.5">
                    {service.en}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — supportive photography */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 min-h-[320px]">
            <img
              src="/image/departments/lab.JPG"
              alt={isKhmer ? 'វេជ្ជបណ្ឌិតរោគវិទ្យាកំពុងពិនិត្យជាលិកាក្រោមមីក្រូទស្សន៍' : 'Pathologist examining tissue samples under a microscope'}
              className="w-full h-full min-h-[320px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Scroll to top */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={isKhmer ? 'ទៅកំពូល' : 'Scroll to top'}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl bg-[#0F4C8A] text-white shadow-lg flex items-center justify-center hover:bg-[#0B1D2E] transition-colors"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default AnatomicalPathologyPage;
