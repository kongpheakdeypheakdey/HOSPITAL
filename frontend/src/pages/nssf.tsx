import React, { useEffect, useState } from 'react';
import { Facebook, Linkedin, Twitter, Send, ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const socialLinks = [
  { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/share/18cm1Y6gjf/?mibextid=wwXIfr' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/shareArticle?mini=true&url=https://www.loungmehospital.com/social-services' },
  { label: 'X', icon: Twitter, href: 'https://twitter.com/intent/tweet?text=Check%20out%20the%20Social%20Services%20Department&url=https://www.loungmehospital.com/social-services' },
  { label: 'Telegram', icon: Send, href: 'https://t.me/share/url?url=https://www.loungmehospital.com/social-services&text=Check%20out%20the%20Social%20Services%20Department' },
];

type ServiceItem = { km: string; en: string };
type ServiceGroup = { titleKm: string; titleEn: string; items: ServiceItem[] };

const serviceGroups: ServiceGroup[] = [
  {
    titleKm: '១. សេវាសង្គមកិច្ចវេជ្ជសាស្ត្រ',
    titleEn: 'Social Welfare Services',
    items: [
      { km: 'ការវាយតម្លៃស្ថានភាពសេដ្ឋកិច្ច-សង្គមរបស់អ្នកជំងឺ', en: 'Psychosocial and Socioeconomic Assessment of Patients' },
      { km: 'ការជួយសម្របសម្រួល និងស្វែងរកមូលនិធិគាំទ្រថ្លៃព្យាបាលសម្រាប់អ្នកជំងឺក្រីក្រ និងងាយរងគ្រោះ', en: 'Facilitating financial assistance and charity support for underprivileged/vulnerable patients' },
      { km: 'ការប្រឹក្សាផ្នែកផ្លូវចិត្ត និងគាំទ្រអារម្មណ៍ដល់អ្នកជំងឺ និងក្រុមគ្រួសារ (ជាពិសេសអ្នកជំងឺរ៉ាំរ៉ៃ ឬមហារីក)', en: 'Psychological and emotional counseling for patients and families navigating critical illnesses' },
      { km: 'ការរៀបចំផែនការមុនពេលចេញពីមន្ទីរពេទ្យ និងការតភ្ជាប់សេវាសហគមន៍', en: 'Discharge planning and community resource referral/linkage' },
    ],
  },
  {
    titleKm: '២. សេវាធានារ៉ាប់រងសុខភាព',
    titleEn: 'Health Insurance Services',
    items: [
      { km: 'ការផ្ទៀងផ្ទាត់ និងសម្របសម្រួលរបបសន្តិសុខសង្គម (ប.ស.ស. / NSSF)', en: 'Verification and coordination of National Social Security Fund (NSSF) benefits' },
      { km: 'ការសម្របសម្រួលមូលនិធិសមធម៌សុខាភិបាល (ប័ណ្ណសមធម៌ / មូលនិធិក្រីក្រ - Health Equity Fund)', en: 'Processing Health Equity Fund (HEF) coverage for eligible impoverished citizens' },
      { km: 'ការផ្ទៀងផ្ទាត់ និងទាមទារសំណងធានារ៉ាប់រងសុខភាពឯកជន (ជាតិ និងអន្តរជាតិ)', en: 'Direct billing, pre-authorization, and claim processing with private health insurance providers' },
      { km: 'ការពិគ្រោះ និងពន្យល់អំពីអត្ថប្រយោជន៍ និងទំហំនៃការធានារ៉ាប់រង', en: 'Advising patients on coverage limits, exclusions, and co-payment requirements' },
    ],
  },
  {
    titleKm: '៣. សេវាបម្រើបម្រាស់ និងទំនាក់ទំនងអ្នកជំងឺ',
    titleEn: 'Patient Services',
    items: [
      { km: 'ការទទួលស្វាគមន៍ ការចុះឈ្មោះ និងការតម្រង់ទិសអ្នកជំងឺ', en: 'Patient reception, registration, and hospital navigation guidance' },
      { km: 'ការកក់ការណាត់ជួប និងការតាមដានការព្យាបាល', en: 'Appointment scheduling, coordination, and follow-up management' },
      { km: 'សេវាសម្របសម្រួលភាសា និងអ្នកបកប្រែវេជ្ជសាស្ត្រ', en: 'Medical translation and interpretation assistance for foreign/non-native speaking patients' },
      { km: 'ការទទួល និងដោះស្រាយមតិកែលម្អ ឬបណ្តឹងតវ៉ារបស់អ្នកជំងឺ', en: 'Patient advocacy, feedback management, and complaint resolution' },
      { km: 'ការគ្រប់គ្រងឯកសារវេជ្ជសាស្ត្រ និងការស្នើសុំរបាយការណ៍វេជ្ជសាស្ត្រ', en: 'Medical records request and medical report coordination for patients and families' },
    ],
  },
];

export const SocialServicesPage: React.FC = () => {
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
                ? 'ផ្នែកគាំពាសុខមាលភាពសង្គម ធានារ៉ាប់រង និងសេវាកម្ម'
                : 'Social Welfare, Health Insurance & Patient Services'}
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
              src="/image/departments/nssf.JPG"
              alt={isKhmer ? 'ផ្នែកគាំពាសុខមាលភាពសង្គម ធានារ៉ាប់រង និងសេវាកម្ម' : 'Social welfare, health insurance and patient services department'}
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
                  ? 'ផ្នែកគាំពាសុខមាលភាពសង្គម ធានារ៉ាប់រង និងសេវាកម្ម'
                  : 'Social Welfare, Insurance & Patient Services'}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Overview Section */}
      <section className="bg-white/55 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-14 space-y-10">
          <h3 className="text-2xl font-bold text-[#0B1D2E]">
            <span className="font-khmer block">សេវាកម្មសំខាន់ៗដែលយើងផ្តល់ជូន៖</span>
            <span className="block text-base font-semibold text-slate-500 mt-1">
              The key services we provide:
            </span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {serviceGroups.map((group) => (
              <div
                key={group.titleEn}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 h-full"
              >
                <h4 className="text-lg font-bold text-[#0F4C8A] mb-4">
                  <span className="font-khmer block">{group.titleKm}</span>
                  <span className="block text-sm font-semibold text-slate-500 mt-0.5">
                    {group.titleEn}
                  </span>
                </h4>
                <ul className="list-disc pl-5 text-gray-800 font-medium space-y-3">
                  {group.items.map((item) => (
                    <li key={item.en}>
                      <span className="font-khmer block text-base">{item.km}</span>
                      <span className="block text-sm font-normal text-slate-500 mt-0.5">
                        {item.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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

export default SocialServicesPage;
