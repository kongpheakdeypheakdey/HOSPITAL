import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Eye,
  Facebook,
  Link2,
  Mail,
  MessageSquareShare,
  Newspaper,
  Send,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const article = {
  title: 'Samdech Moha Borvor Thipadei Hun Manet, Prime Minister of the Kingdom of Cambodia, who spared his busy and valuable time to highly honor and preside over the official inauguration and ribbon-cutting ceremony of the Luang Mae Hospital, which also coincides with the 2nd anniversary of the hospital.',
  titleKm: 'សម្តេចមហាបវរធិបតី ហ៊ុន ម៉ាណែត នាយករដ្ឋមន្ត្រី​នៃព្រះរាជាណាចក្រ​កម្ពុជា ដែលបានឆ្លៀតឱកាសយ៉ាងមមាញឹក និងចំណាយពេលវេលាដ៏មានតម្លៃ ផ្តល់​កិត្តិយស​ដ៏ឧត្តុង្គឧត្តមអញ្ជើញជាអធិបតីភាពដ៏ខ្ពង់ខ្ពស់បំផុតចូលរួមពិធីសម្ពោធ និងកាត់ខ្សែបូរ ​ដាក់ឱ្យ​ប្រើប្រាស់​ជាផ្លូវការ មន្ទីរពេទ្យ ហ្លួង ម៉ែ និងក៏ស្របពេលខួបគម្រប់ ២ឆ្នាំ​ នៃការ​បើកដំណើរការ​មន្ទីរពេទ្យផងដែរ',
  date: 'ថ្ងៃទី ២ ខែតុលា ឆ្នាំ ២០២៦',
  category: 'Announcements',
  categoryKm: 'សេចក្តីជូនដំណឹង',
  readTime: '4 minutes read',
  image: 'image/news/new11.jpg',
  author: 'Loung Me Hospital',
};

const gallery = [
  'image/news/new2.jpg',
  '/image/news/new5.jpg',
  '/image/news/new9.jpg',
  '/image/news/new10.jpg',
  '/image/news/new11.jpg',
  '/image/news/linac.jpg',
  '/image/news/maskmo.jpg',
  '/image/news/dr1.jpg',
  '/image/news/dr2.jpg',
   '/image/news/dr3.jpg',
    '/image/news/dr5.jpg',
    '/image/news/dr6.jpg',
    '/image/news/new1.jpg',
    '/image/news/new21.jpg',
    '/image/news/24.jpg',
    '/image/news/25.jpg',
    '/image/news/26.jpg',
    '/image/news/27.jpg',
    '/image/news/28.jpg',
    '/image/news/29.jpg',
    '/image/news/30.jpg',


];

const bodyParagraphs = [
  'Luang Me Hospital is pleased to announce a monthly health check-up program for residents across Phnom Penh. This initiative is designed to make preventive care more accessible, support early detection, and help families stay informed about their health.',
  'The program includes routine screening, specialist consultation, and health guidance for individuals who want to better understand their current medical condition. We encourage residents to register early and attend the scheduled sessions through the hospital’s health outreach plan.',
  'Early screening is one of the most effective ways to reduce serious health risks and improve long-term treatment outcomes. By offering this service to the wider community, we aim to improve public health awareness and strengthen trust in preventive medicine.',
  'We invite all residents, especially adults and those with a family history of chronic illness, to take part in this important initiative. Through timely screening and better education, we can work together to protect lives and improve community wellness.',
];

const bodyParagraphsKm = [
  'យើងខ្ញុំទាំងអស់គ្នាជាថ្នាក់ដឹកនាំ មន្ត្រីរាជការ បុគ្គលិកទាំងអស់របស់មន្ទីរពេទ្យ ហ្លួង ម៉ែ តី ហ៊ុន ម៉ាណែត នាយករដ្ឋមន្ត្រី​នៃព្រះរាជាណាចក្រ​កម្ពុជា ដែលបានឆ្លៀតឱកាសយ៉ាងមមាញឹក និងចំណាយពេលវេលាដ៏មានតម្លៃ ផ្តល់​កិត្តិយស​ដ៏ឧត្តុង្គឧត្តមអញ្ជើញជាអធិបតីភាពដ៏ខ្ពង់ខ្ពស់បំផុតចូលរួមពិធីសម្ពោធ និងកាត់ខ្សែបូរ ​ដាក់ឱ្យ​ប្រើប្រាស់​ជាផ្លូវការ មន្ទីរពេទ្យ ហ្លួង ម៉ែ និងក៏ស្របពេលខួបគម្រប់ ២ឆ្នាំ​ នៃការ​បើកដំណើរការ​មន្ទីរពេទ្យផងដែរ ',
  'យើងខ្ញុំទាំងអស់គ្នា សូមលើកហត្ថប្រណមបួងសួងដល់គុណបុណ្យព្រះរតនត្រ័យ វត្ថុស័ក្តិសិទ្ធិទាំងឡាយក្នុងលោក សូមជួយថែរក្សាការពារ ប្រោសប្រទាន សព្ទសាធុការពរជ័យ សិរីមង្គល វិបុលសុខ មហាប្រសើរគ្រប់ប្រការជូន សម្តេចធិបតី និងលោកជំទាវបណ្ឌិត ព្រមទាំងបុត្រា បុត្រី សូមប្រកបដោយព្រះពុទ្ធពរទាំងបួនប្រការគឺ អាយុ វណ្ណៈ សុខៈ និងពលៈ កុំបីឃ្លៀងឃ្លាតឡើយ ',
  'ថ្ងៃពុធ ៥កើត ខែភទ្របទ ឆ្នាំមមី អដ្ឋស័ក ព.ស.២៥៧០ ត្រូវនឹងថ្ងៃទី១៦ ខែកញ្ញា ឆ្នាំ២០២៦ ',
];

export const NewsArticlePage: React.FC = () => {
  const { isKhmer } = useLanguage();

  const headline = isKhmer ? article.titleKm : article.title;
  const category = isKhmer ? article.categoryKm : article.category;
  const articleBody = isKhmer ? bodyParagraphsKm : bodyParagraphs;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Kantumruy+Pro:wght@400;500;600;700&display=swap');

        .khmer-news-body {
          font-family: 'Kantumruy Pro', sans-serif;
        }

        .khmer-news-title {
          font-family: 'Battambang', 'Kantumruy Pro', sans-serif;
        }
        .khmer-news-article p {
          margin-bottom: 1rem;
          line-height: 1.9;
          color: #334155;
        }

        .khmer-news-article img {
          display: block;
          width: 100%;
          border-radius: 1.25rem;
          object-fit: cover;
        }
      `}</style>

      <div className="khmer-news-body max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-6 flex items-center gap-3 text-sm text-slate-600">
          <Link to="/news" className="inline-flex items-center gap-2 font-medium text-[#0F4C8A] hover:text-[#0B1D2E]">
            <ArrowLeft className="h-4 w-4" />
            {isKhmer ? 'ត្រឡប់ទៅព័ត៌មាន' : 'Back to News'}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,2.2fr)_minmax(300px,0.8fr)]">
          <article className="khmer-news-article overflow-hidden rounded-[30px] bg-white shadow-[0_18px_55px_rgba(15,25,42,0.08)] border border-slate-100">
            <div className="relative h-[260px] md:h-[420px] overflow-hidden">
              <img src={article.image} alt={headline} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-[#111827]/10 to-transparent" />
              <div className="absolute left-5 bottom-5 right-5 flex flex-wrap items-center justify-between gap-3 text-white">
                <span className="rounded-full bg-[#D97706]/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
                  {category}
                </span>
                <div className="flex items-center gap-5 text-xs text-white/90">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {article.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-5 pb-8 pt-7 md:px-8 md:pb-10 md:pt-8">
              <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                  <Newspaper className="h-3.5 w-3.5 text-[#0F4C8A]" />
                  {article.author}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                  <Eye className="h-3.5 w-3.5 text-[#D97706]" />
                  {isKhmer ? 'ចំណាត់ថ្នាក់' : 'Public Update'}
                </span>
              </div>

              <h1 className="khmer-news-title text-3xl font-bold leading-tight text-[#0B1D2E] md:text-[2.5rem]">
                {headline}
              </h1>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CalendarDays className="h-4 w-4 text-[#0F4C8A]" />
                  <span>{article.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  {[
                    { label: isKhmer ? 'ចែករំលែក' : 'Share', icon: ShareButton },
                    { label: 'Facebook', icon: Facebook },
                    { label: 'Email', icon: Mail },
                    { label: 'Copy link', icon: Link2 },
                  ].map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-[#0F4C8A] hover:text-[#0F4C8A]"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 space-y-5 text-base md:text-lg text-slate-700">
                {articleBody.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50 p-3 md:p-4">
                <img src={article.image} alt={headline} className="h-[220px] w-full object-cover md:h-[360px]" />
              </div>

              <div className="mt-10">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="khmer-news-title text-2xl font-bold text-[#0B1D2E]">
                    {isKhmer ? 'រូបថតនំរោង' : 'Gallery'}
                  </h2>
                  <span className="text-sm text-slate-500">{gallery.length} photos</span>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {gallery.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <img src={image} alt={`${headline} gallery ${index + 1}`} className="h-40 w-full object-cover md:h-52" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-[28px] bg-[#0B1D2E] p-5 text-white shadow-[0_18px_55px_rgba(15,25,42,0.12)]">
              <h3 className="khmer-news-title text-4xl font-extrabold leading-tight text-white">
                {isKhmer ? 'សេវាព័ត៌មាន' : 'Health Updates'}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {isKhmer
                  ? 'ស្វែងរកព័ត៌មានថ្មីៗ ព្រឹត្តិការណ៍ និងការផ្តល់ព័ត៌មានសុខភាពពីមន្ទីរពេទ្យរបស់យើង។'
                  : 'Stay connected with the latest health news, hospital events, and preventive care updates from our care team.'}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Cancer care', 'Wellness', 'Check-up', 'Community'].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

const ShareButton = ({ className }: { className?: string }) => (
  <MessageSquareShare className={className} />
);
