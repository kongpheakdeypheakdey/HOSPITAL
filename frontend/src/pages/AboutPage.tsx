import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Activity,
  Building2,
  CalendarRange,
  HeartPulse,
  Landmark,
  Stethoscope,
  Users,
  Wallet,
  ShieldCheck,
  Hospital,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { isKhmer } = useLanguage();

  const historyTimeline = [
    {
      year: isKhmer ? 'ឆ្នាំ ២០១៩' : 'March 2019',
      title: isKhmer ? 'បង្កើតឡើងក្នុងនាម «នគរទេព»' : 'Established as Nokor Tep',
      description: isKhmer
        ? 'ដំបូងឡើយជាមន្ទីរពេទ្យមិនមែនរដ្ឋាភិបាល (NGO) ផ្ដោតលើការថែទាំសុខភាពស្ត្រី។'
        : 'Initially established as "Nokor Tep," an NGO hospital focused on women’s care.',
    },
    {
      year: isKhmer ? 'ឆ្នាំ ២០២១' : 'March 2021',
      title: isKhmer ? 'ទិញដោយរាជរដ្ឋាភិបាលក្នុងកំឡុង COVID-19' : 'Government acquisition during COVID-19',
      description: isKhmer
        ? 'ត្រូវបានទិញដោយរាជរដ្ឋាភិបាលកម្ពុជា ដើម្បីធ្វើជាមណ្ឌលព្យាបាលជំងឺកូវីដ-១៩ ដ៏សំខាន់មួយរបស់ប្រទេស រហូតដល់ខែកុម្ភៈ ឆ្នាំ ២០២២។'
        : 'Acquired by the Cambodian government and operated as a primary COVID-19 treatment facility until February 2022.',
    },
    {
      year: isKhmer ? 'ឆ្នាំ ២០២២' : 'September 2022',
      title: isKhmer ? 'មជ្ឈមណ្ឌលព្យាបាលជំងឺមហារីកសាធារណៈ' : 'National cancer treatment center',
      description: isKhmer
        ? 'ត្រូវបានរាជរដ្ឋាភិបាលចាត់តាំងជាមន្ទីរពេទ្យសាធារណៈដំបូងគេបង្អស់របស់ប្រទេស ដែលឯកទេសខាងការព្យាបាលជំងឺមហារីក។'
        : 'Officially appointed by the government as Cambodia’s first public hospital specialized in cancer treatment.',
    },
    {
      year: isKhmer ? 'ទំហំ និងហេដ្ឋារចនាសម្ព័ន្ធ' : 'Facility scale',
      title: isKhmer ? 'មន្ទីរពេទ្យលើផ្ទៃដី ១,៤ ហិកតា' : '1.4-hectare hospital campus',
      description: isKhmer
        ? 'ស្ថិតលើផ្ទៃដីទំហំ ១,៤ ហិកតា មានកម្ពស់ ៥ ជាន់ (រួមទាំងជាន់ក្រោមដី ១ ជាន់សម្រាប់ចំណតរថយន្ត) និងមានសមត្ថភាពផ្ទុកគ្រែសម្រាកព្យាបាល (IPD) ចំនួន ២០០ គ្រែ។'
        : 'Situated on 1.4 hectares of land across 5 floors, including 1 basement for parking, with a planned capacity of 200 inpatient beds.',
    },
  ];

  const staffing = [
    { label: isKhmer ? 'គិលានុបដ្ឋាក/យិកា និងឆ្មប' : 'Nurses & Midwives', value: '136' },
    { label: isKhmer ? 'វេជ្ជបណ្ឌិត' : 'Doctors', value: '72' },
    { label: isKhmer ? 'អ្នកបច្ចេកទេសមន្ទីរពិសោធន៍' : 'Lab Technicians', value: '15' },
    { label: isKhmer ? 'ឱសថការី' : 'Pharmacists', value: '14' },
    { label: isKhmer ? 'អ្នកបច្ចេកទេសរូបភាពវេជ្ជសាស្ត្រ' : 'Radiologic Technologists', value: '12' },
    { label: isKhmer ? 'អ្នកបច្ចេកទេសវិទ្យុសកម្មមហារីក' : 'Radio-onco Technologists', value: '6' },
    { label: isKhmer ? 'រូបវិទ្យាវេជ្ជសាស្ត្រ' : 'Medical Physicists', value: '4' },
    { label: isKhmer ? 'បុគ្គលិកមិនមែនវេជ្ជសាស្ត្រ' : 'Non-Medical Staff', value: '82' },
  ];

  const paymentMethods = [
    { label: 'NSSF', value: '60.13%' },
    { label: 'H-EQIP', value: '23.09%' },
    { label: isKhmer ? 'បង់ប្រាក់ផ្ទាល់ខ្លួន' : 'Out-of-pocket', value: '16.54%' },
    { label: isKhmer ? 'ការលើកលែងផ្សេងៗ' : 'Exceptions', value: '0.25%' },
  ];

  const nationalPartners = [
    { name: 'Nokor Tep Organization', nameKm: 'អង្គការនគរទេព', logo: '/image/national/Nokor%20Tep%20Organization.png' },
    { name: 'University of Health Science', nameKm: 'សាកលវិទ្យាល័យវិទ្យាសាស្ត្រសុខាភិបាល', logo: '/image/national/UHS_Cambodia_logo.png' },
    { name: 'International University', nameKm: 'សាកលវិទ្យាល័យអន្តរជាតិ', logo: '/image/national/mou_iu.png' },
    { name: 'Health Science Institute of RCAF', nameKm: 'វិទ្យាស្ថានវិទ្យាសាស្ត្រសុខាភិបាល ខ.ភ.ម', logo: '/image/national/Health%20Science%20Institute.png' },
    { name: 'University of Puthisastra', nameKm: 'សាកលវិទ្យាល័យពុទ្ធិសាស្ត្រ', logo: '/image/national/University%20of%20Puthisastra.jpg' },
    { name: 'CamTech University', nameKm: 'សាកលវិទ្យាល័យខេមធិច', logo: '/image/national/CamTech%20University.jpg' },
  ];

  const internationalPartners = [
    {
      name: 'International Atomic Energy Agency (IAEA)-KAM6005 for 2024-2027',
      nameKm: 'International Atomic Energy Agency (IAEA)-KAM6005 for 2024-2027',
      logo: '/image/international/IAEA-logo.jpg',
      detail: 'for training and technical support',
    },
    {
      name: 'Physicien Medical Sans Frontières',
      nameKm: 'Physicien Medical Sans Frontières',
      logo: '/image/international/Physicien Medical.png',
      detail: 'for physicist training, Radiation therapy and hand-on training.',
    },
    {
      name: 'Australian AID: Australian Volunteer Program (AVI)',
      nameKm: 'Australian AID: Australian Volunteer Program (AVI)',
      logo: 'image/international/avi-logo.jpg',
      detail: 'or Australian Volunteers-Experts for Radiotherapy and Infection Prevention-Control.',
    },
    {
      name: 'The Association of the Church of Jesus Christ of Latter-Day Saints (Donation)',
      nameKm: 'The Association of the Church of Jesus Christ of Latter-Day Saints (Donation)',
      logo: '/image/international/donation-logo.jpg',
      detail: ['CT-Scan worth USD67,950', 'Mammogram worth USD52,500'],
    },
    {
      name: 'Institut de Cancerologie de Strasbourg',
      nameKm: 'Institut de Cancerologie de Strasbourg',
      logo: '/image/international/icans-logo.jpg',
      detail: 'for HR & Technical Cooperation',
    },
    {
      name: 'INSTITUT PAOLI CALMETTES unicancer Marseille',
      nameKm: 'INSTITUT PAOLI CALMETTES unicancer Marseille',
      logo: '/image/international/IPC-logo.jpg',
      detail: 'for HR & Technical Cooperation',
    },
    {
      name: 'Korean University Anam Hospital',
      nameKm: 'Korean University Anam Hospital',
      logo: '/image/international/Korean University Anam Hospital.png',
      detail: 'for Human Resources',
    },
    {
      name: 'Yunan Cancer Hospital (The Third Affiliated Hospital of Kunming Medical University)',
      nameKm: 'Yunan Cancer Hospital (The Third Affiliated Hospital of Kunming Medical University)',
      logo: '/image/international/Yunan Cancer Hospital.jpg',
      detail: 'Employee training and joint research projects',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F4C8A]/10 text-[#0F4C8A] text-xs font-semibold">
          <Building2 className="w-4 h-4" />
          <span>{isKhmer ? 'ប្រវត្តិ និងអំពីមន្ទីរពេទ្យ' : 'About the Hospital'}</span>
        </div>

        <div className="flex justify-center">
          <img src="/image/logo.png" alt="Luang Mè Hospital logo" className="h-20 w-20 object-contain drop-shadow-sm" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D2E] font-serif">
          {isKhmer ? 'អំពី មន្ទីរពេទ្យ ហ្លួងម៉ែ' : 'About Luang Mè Hospital'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {isKhmer
            ? 'មន្ទីរពេទ្យនេះត្រូវបានបង្កើតឡើងក្នុងបណ្តុំសេវាថែទាំសុខភាពមូលដ្ឋាន និងបានក្លាយជាមជ្ឈមណ្ឌលព្យាបាលជំងឺមហារីកសាធារណៈដំបូងគេបង្អស់របស់កម្ពុជា។'
            : 'A public specialist cancer hospital and national healthcare center built on a strong humanitarian foundation and dedicated to high-quality, patient-centered care.'}
        </p>
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <CalendarRange className="w-6 h-6 text-[#0F4C8A]" />
          <h2 className="text-2xl font-bold text-[#0B1D2E]">
            {isKhmer ? 'ទិដ្ឋភាពទូទៅ និងប្រវត្តិ' : 'Overview & History'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {historyTimeline.map((item) => (
            <div key={item.year} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-bold uppercase tracking-[0.12em] text-[#0F4C8A]">{item.year}</div>
              <h3 className="mt-3 text-xl font-bold text-[#0B1D2E]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <Building2 className="w-6 h-6 text-[#0F4C8A]" />
          <h2 className="text-2xl font-bold text-[#0B1D2E]">
            {isKhmer ? 'ភាពជាដៃគូ' : 'Partnerships'}
          </h2>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#0B1D2E]">
              {isKhmer ? 'កិច្ចសហប្រតិបត្តិការក្នុង' : 'National MoUs'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nationalPartners.map((partner) => (
                <div key={partner.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <img src={partner.logo} alt={partner.name} className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-sm" />
                    <div className="min-w-0">
                      <div className="text-sm font-bold leading-snug text-[#0B1D2E]">{isKhmer ? partner.nameKm : partner.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-[#0B1D2E]">
              {isKhmer ? 'កិច្ចសហប្រតិបត្តិការអន្តរជាតិ' : 'International Partnerships'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {internationalPartners.map((partner) => (
                <div key={partner.name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
                  <div className="mb-3 flex items-center gap-3">
                    <img src={partner.logo} alt={partner.name} className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-sm" />
                    <div className="min-w-0 text-sm font-bold leading-snug text-[#0B1D2E]">{isKhmer ? partner.nameKm : partner.name}</div>
                  </div>
                  {Array.isArray(partner.detail) ? (
                    <ul className="space-y-1 text-xs leading-relaxed text-slate-600">
                      {partner.detail.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs leading-relaxed text-slate-600">{partner.detail}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
