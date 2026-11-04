import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  ArrowRight,
  PhoneCall,
  Stethoscope,
  Ambulance,
  ScanLine,
  Radiation,
  FlaskConical,
  Syringe,
  Baby,
  Scissors,
  Activity,
  Pill,
  Microscope,
  HeartPulse,
} from 'lucide-react';

const heroSlides = [
  '/image/cover.JPG',
  '/image/cover1.JPG',
  '/image/cover2.JPG',
];

const HERO_INTERVAL = 6000;

export const HomePage: React.FC = () => {
  const { isKhmer } = useLanguage();

  // Auto-rotating hero cover slideshow (crossfade + Ken Burns zoom).
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const id = window.setInterval(
      () => setActiveSlide((i) => (i + 1) % heroSlides.length),
      HERO_INTERVAL,
    );
    return () => window.clearInterval(id);
  }, []);

  const featuredDepartments = [
    {
      title: isKhmer ? 'ផ្នែកពិគ្រោះជំងឺក្រៅ (OPD)' : 'Outpatient Department (OPD)',
      desc: isKhmer
        ? 'ផ្តល់សេវាពិគ្រោះ ពិនិត្យវិភាគរោគសញ្ញា និងព្យាបាលអ្នកជំងឺដែលមិនតម្រូវឱ្យសម្រាកគេងនៅមន្ទីរពេទ្យ'
        : 'Provides medical consultations, diagnostic evaluations, and treatments for patients who do not require overnight hospitalization.',
      icon: Stethoscope,
      color: 'bg-[#EAF4FF] text-[#0F4C8A] border-[#C7DEF9]',
    },
    {
      title: isKhmer ? 'ផ្នែកសង្គ្រោះបន្ទាន់' : 'Emergency Department',
      desc: isKhmer
        ? 'ផ្តល់ការសង្គ្រោះ និងព្យាបាលបន្ទាន់ ២៤ ម៉ោងលើ ២៤ ម៉ោង សម្រាប់ករណីគ្រោះថ្នាក់ចៃដន្យ ជំងឺធ្ងន់ធ្ងរ ឬស្ថានភាពគំរាមកំហែងដល់អាយុជីវិត'
        : 'Delivers immediate 24/7 medical care for acute illnesses, severe trauma, and life-threatening conditions.',
      icon: Ambulance,
      color: 'bg-[#FFF1F1] text-[#B42318] border-[#FECACA]',
    },
    {
      title: isKhmer ? 'ផ្នែករូបភាពវេជ្ជសាស្ត្រ និងអន្តរាគមន៍វិទ្យុសាស្រ្ត' : 'Medical Imaging & Radiology',
      desc: isKhmer
        ? 'ប្រើប្រាស់បច្ចេកវិទ្យារូបភាពទំនើបៗ (ដូចជា អ៊ិចរ៉េ អេកូ ស្កេន CT និង MRI) ដើម្បីធ្វើរោគវិនិច្ឆ័យ និងតាមដានស្ថានភាពជំងឺបានច្បាស់លាស់។'
        : 'Uses advanced imaging technologies (X-ray, CT scan, MRI, ultrasound) to accurately diagnose and monitor medical conditions.',
      icon: ScanLine,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      title: isKhmer ? 'ផ្នែកជំងឺមហារីក និងព្យាបាលដោយកាំរស្មី' : 'Oncology & Radiotherapy',
      desc: isKhmer
        ? 'ជំនាញក្នុងការថែទាំ និងព្យាបាលជំងឺមហារីកគ្រប់ជ្រុងជ្រោយ រួមមានការព្យាបាលដោយគីមី ការបាញ់កាំរស្មី និងការថែទាំលើកកម្ពស់គុណភាពជីវិត'
        : 'Specializes in comprehensive cancer care, including systemic therapies, targeted radiation treatments, and supportive care.',
      icon: Radiation,
      color: 'bg-violet-50 text-violet-600 border-violet-200',
    },
    {
      title: isKhmer ? 'ផ្នែកមន្ទីរពិសោធន៍ (ឡាបូ)' : 'Laboratory Department',
      desc: isKhmer
        ? 'ធ្វើតេស្តវិភាគសំណាកឈាម ទឹករាវក្នុងរាងកាយ និងជាលិកា ដើម្បីជួយគ្រូពេទ្យធ្វើរោគវិនិច្ឆ័យ និងកំណត់វិធីព្យាបាលបានត្រឹមត្រូវ'
        : 'Performs clinical tests on blood, bodily fluids, and tissue samples to assist in precise disease diagnosis and management.',
      icon: FlaskConical,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      title: isKhmer ? 'ផ្នែកសណ្តំ និងបន្ទប់តាមដានក្រោយវះកាត់' : 'Anesthesia & Recovery',
      desc: isKhmer
        ? 'ផ្តល់ថ្នាំសន្លប់ ថ្នាំស្ពឹក និងការគ្រប់គ្រងការឈឺចាប់ពេលវះកាត់ ព្រមទាំងតាមដានសុខភាពអ្នកជំងឺយ៉ាងដិតដល់បន្ទាប់ពីភ្ញាក់ដឹងខ្លួនឡើងវិញ។'
        : 'Administers sedation and pain control during surgical procedures and monitors patients closely as they wake up.',
      icon: Syringe,
      color: 'bg-sky-50 text-sky-600 border-sky-200',
    },
    {
      title: isKhmer ? 'ផ្នែករោគស្ត្រី' : 'Gynecology Department',
      desc: isKhmer
        ? 'ផ្តោតលើការថែទាំសុខភាពបន្តពូជរបស់ស្ត្រី ការពិនិត្យសុខភាពទូទៅ និងការព្យាបាលជំងឺផ្សេងៗដែលពាក់ព័ន្ធនឹងប្រព័ន្ធរោគស្ត្រី'
        : 'Focuses on female reproductive health, routine gynecological screenings, and surgical or medical treatment of pelvic conditions.',
      icon: Baby,
      color: 'bg-pink-50 text-pink-600 border-pink-200',
    },
    {
      title: isKhmer ? 'ផ្នែកវះកាត់' : 'Surgical Department',
      desc: isKhmer
        ? 'ទទួលបន្ទុកធ្វើការវះកាត់តាមការគ្រោងទុក និងការវះកាត់បន្ទាន់លើឯកទេសជាច្រើន ដោយប្រើបច្ចេកទេសវះកាត់ចោះ ឬវះកាត់បើកចំហ'
        : 'Performs elective and urgent operative procedures across multiple specialties using minimally invasive and open techniques.',
      icon: Scissors,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    },
    {
      title: isKhmer ? 'ផ្នែកសង្គ្រោះបន្ទាន់កម្រិតធ្ងន់ (អាយ.ស៊ី.យូ)' : 'Intensive Care Unit (ICU)',
      desc: isKhmer
        ? 'ផ្តល់ការតាមដានស្ថានភាពសុខភាព ២៤ ម៉ោងជាប្រចាំ ជាមួយឧបករណ៍ទ្រទ្រង់ជីវិតទំនើបៗ សម្រាប់អ្នកជំងឺដែលមានស្ថានភាពធ្ងន់ធ្ងរបំផុត។'
        : 'Offers continuous monitoring, advanced life-support systems, and specialized care for critically ill patients.',
      icon: Activity,
      color: 'bg-red-50 text-red-600 border-red-200',
    },
    {
      title: isKhmer ? 'ឱសថស្ថាន' : 'Pharmacy',
      desc: isKhmer
        ? 'ចែកចាយ និងផ្តល់ថ្នាំពេទ្យ ប្រឹក្សាយោបល់អំពីរបៀបប្រើប្រាស់ថ្នាំ និងធានានូវសុវត្ថិភាពខ្ពស់ក្នុងការប្រើប្រាស់ឱសថ'
        : 'Dispenses medications, provides medication counseling, and manages pharmaceutical supplies to ensure safe drug therapy.',
      icon: Pill,
      color: 'bg-[#F5F6F8] text-[#1E293B] border-[#E2E8F0]',
    },
    {
      title: isKhmer ? 'ផ្នែកអង់ដូស្គូពី' : 'Endoscopy Department',
      desc: isKhmer
        ? 'ប្រើប្រាស់ឧបករណ៍កាមេរ៉ាឆ្លុះដើម្បីពិនិត្យ យកជាលិកាធ្វើតេស្ត និងព្យាបាលបញ្ហាផ្សេងៗក្នុងប្រព័ន្ធរំលាយអាហារ ដូចជា ក្រពះ និងពោះវៀន'
        : 'Uses specialized camera scopes to examine, biopsy, and treat disorders within the gastrointestinal tract and internal organs.',
      icon: Microscope,
      color: 'bg-teal-50 text-teal-600 border-teal-200',
    },
    {
      title: isKhmer ? 'ផ្នែកប្រពោធនកម្ម' : 'Intensive Care Unit',
      desc: isKhmer
        ? 'ផ្តល់ការតាមដានជាបន្តបន្ទាប់ និងឧបករណ៍ជួយរស់ទំនើប សម្រាប់អ្នកជំងឺដែលស្ថិតក្នុងស្ថានភាពធ្ងន់ធ្ងរ និងត្រូវការថែទាំពិសេស'
        : 'Provides continuous monitoring, advanced life-support systems, and specialized care for critically ill patients.',
      icon: HeartPulse,
      color: 'bg-lime-50 text-lime-700 border-lime-200',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="relative aspect-[16/9] max-h-[80vh] w-full">
          {/* Auto-rotating cover slideshow — each slide crossfades and slowly zooms */}
          {heroSlides.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={isKhmer ? 'មន្ទីរពេទ្យ ហ្លួង ម៉ែ' : 'Luang Mè Hospital'}
              aria-hidden={i !== activeSlide}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
                i === activeSlide ? 'opacity-100 animate-kenburns' : 'opacity-0'
              }`}
            />
          ))}
          {/* Light, clean gradient — darkens only the lower-left for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-transparent to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
            <div className="max-w-3xl">
              <h1
                className={`mt-8 mb-4 text-4xl font-extrabold text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.0)] sm:text-5xl md:text-6xl ${
                  isKhmer ? 'font-khmer leading-relaxed' : 'tracking-tight leading-[1.05]'
                }`}
                style={isKhmer ? { wordSpacing: '0.1em', letterSpacing: '0.01em' } : undefined}
              >
                <span className="block">{isKhmer ? 'មន្ទីរពេទ្យថ្នាក់ជាតិ' : 'The National'}</span>
                <span className="mt-3 block">{isKhmer ? 'ឯកទេសព្យាបាលជំងឺមហារីក' : 'Cancer Hospital'}</span>
              </h1>

              {/* Call-to-action buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/doctors"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F4C8A] px-6 py-3.5 text-sm font-bold text-white shadow-[0_18px_35px_rgba(15,76,138,0.45)] transition-all duration-200 hover:bg-[#0D3F75] hover:shadow-[0_18px_40px_rgba(15,76,138,0.6)]"
                >
                  {isKhmer ? 'ជួបគ្រូពេទ្យរបស់យើង' : 'Meet Our Doctors'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:010228965"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                >
                  <PhoneCall className="h-4 w-4" />
                  {isKhmer ? 'ទូរស័ព្ទ ០១០ ២២៨ ៩៦៥' : 'Call 010 228 965'}
                </a>
              </div>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-5 right-4 z-20 flex items-center gap-2 sm:right-6 lg:right-8">
            {heroSlides.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveSlide(i)}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === activeSlide}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeSlide ? 'w-7 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Featured Medical Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1D2E] font-serif">
            {isKhmer ? 'ផ្នែកនៃមន្ទីរពេទ្យ ហ្លួង ម៉ែ' : 'DEPARTMENT OF LUANG MÈ HOSPITAL'}
          </h2>
          <p className="text-sm text-slate-600">
            {isKhmer
              ? 'ផ្តល់ជូនសេវាព្យាបាលឯកទេស ជាមួយបរិក្ខារវេជ្ជសាស្ត្រទំនើប និងគ្រូពេទ្យជំនាញ'
              : 'Specialized healthcare services delivered by experienced doctors using advanced medical equipment.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDepartments.map((dept, idx) => {
            const IconComp = dept.icon;
            return (
              <div
                key={idx}
                className="glass rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${dept.color}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1D2E] group-hover:text-[#0F4C8A] transition-colors">
                    {dept.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{dept.desc}</p>
                </div>
                <Link
                  to="/departments"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C8A] hover:underline pt-2"
                >
                  <span>{isKhmer ? 'ស្វែងយល់បន្ថែម' : 'Learn More'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1D2E] font-serif">
            {isKhmer ? 'ថ្នាក់ដឹកនាំនៃមន្ទីរពេទ្យ ហ្លួង ម៉ែ' : 'Our Directors of Luang Mè Hospital'}
          </h2>
          <p className="text-sm text-slate-600">
            {isKhmer
              ? 'បម្រើការថែទាំជំនាញ និងនាំផ្លូវកន្លែងនេះដល់ការគាំទ្រគុណភាពសុខភាព'
              : 'A dedicated leadership team guiding the hospital with clinical excellence, patient trust, and compassionate care.'}
          </p>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-3 md:gap-8">
          {[
            {
              name: 'Assistant Professor SOU SYPHANNA',
              khName: 'លោកសាស្ត្រ.ជំនួយ ស៊ូ ស៊ីផាណ្ណា',
              role: isKhmer ? 'នាយកមន្ទីរពេទ្យ' : 'Hospital Director',
              image: '/image/dr1.jpg',
            },
            {
              name: 'Assistant Professor TOUCH SOCHEAT',
              khName: 'លោកសាស្ត្រ.ជំនួយ ទូច សុជាតិ',
              role: isKhmer ? 'នាយករង' : 'Deputy Hospital Director',
              image: '/image/dr2.jpg',
            },
            {
              name: 'Assistant Professor THAY MENGKRY',
              khName: 'លោកសាស្ត្រ.ជំនួយ ថាយ ម៉េងគ្រី',
              role: isKhmer ? 'នាយករង' : 'Deputy Hospital Director',
              image: '/image/dr4.jpg',
            },
            {
              name: 'Doctor Specialist CHHUN SOKHA',
              khName: 'លោកវេជ្ជ.ឯកទេស ឈុន សុខា',
              role: isKhmer ? 'នាយករង' : 'Deputy Hospital Director',
              image: '/image/dr3.jpg',
            },
            {
              name: 'Doctor Specialist SEAP BELL',
              khName: 'លោកវេជ្ជ.ឯកទេស សៀប បែល',
              role: isKhmer ? 'ប្រធានការិយាល័យបច្ចេកទេស' : 'Chief of Technical Office ',
              image: '/image/dr5.jpg',
            },
            {
              name: 'Mr. UN CHANKOSOL',
              khName: 'លោក អ៊ុន ច័ន្ទកុសល្យ',
              role: isKhmer ? 'ប្រធានការិយាល័យរដ្ឋបាល និងធនធានមនុស្ស' : 'Head of Administration and Human Resources Office',
              image: '/image/dr7.jpg',

             
            },
            {
              name: 'Mrs. MA LATY',
              khName: 'លោកស្រី ម៉ា ឡាទី',
              role: isKhmer ? 'ប្រធានការិយាល័យហិរញ្ញវត្ថុ' : 'Head of Finance Office',
              image: '/image/dr6.jpg',
            },
          ].map((director, index) => (
            <div
              key={director.name}
              className={index === 0 ? 'md:col-span-3 flex justify-center' : ''}
            >
              <div className="h-[350px] w-[250px] overflow-hidden rounded-lg glass transition-all hover:shadow-md">
                <div className="h-[240px] w-full overflow-hidden">
                  <img
                    src={director.image}
                    alt={director.name}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="flex h-[110px] flex-col justify-center gap-2 px-3 py-3 text-center text-[#243E9A]">
                  <h3 className="text-lg font-bold">{isKhmer ? director.khName : director.name}</h3>
                  <p className="text-sm font-medium">{director.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full px-0 py-4">
          <div className="w-full">
            <div className="relative h-[420px] w-full bg-slate-200">
              <iframe
                title="Luang Mè Hospital Map"
                src="https://www.google.com/maps?q=Luang%20Me%20Hospital%20Phnom%20Penh&z=14&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="bg-gradient-to-br from-[#f4faff] to-white px-4 py-8 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#0F4C8A] mb-2">
                    {isKhmer ? 'ទីតាំង' : 'Location'}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1D2E] font-sans leading-tight">
                    {isKhmer ? 'មន្ទីរពេទ្យ ហ្លួង ម៉ែ' : 'Luang Mè Hospital'}
                  </h3>
                </div>

                <a
                  href="https://maps.app.goo.gl/EvoGywqRGCXcnHCP8"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center justify-center rounded-xl bg-[#0F4C8A] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0D3F75]"
                >
                  {isKhmer ? 'មើលផែនទី' : 'Open Map'}
                </a>
              </div>
            </div>
          </div>
      </section>

      {/* Hospital Leadership Message */}
    </div>
  );
};
