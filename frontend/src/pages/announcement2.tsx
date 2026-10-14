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
  Newspaper,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const article = {
  title: 'Luang Me Hospital Launches a New Community Health Outreach Campaign Across Phnom Penh',
  titleKm: 'លោកជំទាវ​បណ្ឌិត ពេជ ចន្ទមុន្នី ហ៊ុនម៉ាណែត បានឆ្លៀតឱកាសយ៉ាងមមាញឹក និងចំណាយពេលវេលាដ៏មានតម្លៃ ក្នុងការ​អញ្ជើញជាអធិបតីភាព ដ៏ខ្ពង់ខ្ពស់បំផុត ក្នុងពិធី «ប្រគល់-ទទួល ដី ទំហំ ៧ ១៧៦ ម៉ែត្រការ៉េ» របស់ អង្គការនគរទេព ជូនដល់ មន្ទីរពេទ្យ ហ្លួង ម៉ែ',
  date: 'ថ្ងៃទី៨ ខែធ្នូ ឆ្នាំ២០២៥',
  category: 'Announcements',
  categoryKm: 'សេចក្តីជូនដំណឹង',
  readTime: '5 minutes read',
  image: '/image/news2/17.jpg',
  author: 'Loung Me Hospital',
};

const gallery = [
  '/image/news2/1.jpg',
  '/image/news2/5.jpg',
  '/image/news2/9.jpg',
  '/image/news2/10.jpg',
  '/image/news2/11.jpg',
  '/image/news2/18.jpg',
  '/image/news2/19.jpg',
  '/image/news2/20.jpg',
  '/image/news2/21.jpg',
  '/image/news2/22.jpg',
    '/image/news2/23.jpg',

];

const bodyParagraphs = [
  'Luang Me Hospital is expanding its community outreach program to improve access to preventive care, early diagnosis, and patient education for families across Phnom Penh.',
  'This initiative includes free screening, public health counseling, and specialist consultations designed to close the gap between hospital care and community wellness.',
  'By bringing trusted medical services closer to local residents, the hospital aims to reduce late-stage disease complications and strengthen the public health system through early intervention and awareness.',
  'Residents are encouraged to attend scheduled outreach sessions and take advantage of the hospital’s preventive care services and professional guidance.',
];

const bodyParagraphsKm = [
  'នារសៀលថ្ងៃចន្ទ ៣រោច ខែមិគសិរ ឆ្នាំម្សាញ់ សប្តស័ក ព.ស.២៥៦៩ ត្រូវនឹង​ថ្ងៃទី៨ ខែធ្នូ ឆ្នាំ២០២៥ មន្ទីរពេទ្យ ហ្លួង ម៉ែ មានកិត្តិយស​ដ៏ឧត្តុងឧត្តមបំផុត ដែលលោកជំទាវ​បណ្ឌិត ពេជ ចន្ទមុន្នី ហ៊ុនម៉ាណែត បានឆ្លៀតឱកាសយ៉ាងមមាញឹក និងចំណាយពេលវេលាដ៏មានតម្លៃ ក្នុងការ​អញ្ជើញជាអធិបតីភាព ដ៏ខ្ពង់ខ្ពស់បំផុត ក្នុងពិធី «ប្រគល់-ទទួល ដី ទំហំ ៧ ១៧៦ ម៉ែត្រការ៉េ» របស់ អង្គការនគរទេព ជូនដល់ មន្ទីរពេទ្យ ហ្លួង ម៉ែ ។',
];

const ShareButton = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M15 8a3 3 0 1 0-2.83-4H12a3 3 0 0 0 0 6h.17A3 3 0 0 0 15 8Z" />
    <path d="M6 14a3 3 0 1 0-2.83-4H3a3 3 0 0 0 0 6h.17A3 3 0 0 0 6 14Z" />
    <path d="M18 20a3 3 0 1 0-2.83-4H15a3 3 0 0 0 0 6h.17A3 3 0 0 0 18 20Z" />
    <path d="m8.5 11.5 7-4" />
    <path d="m8.5 16 7 4" />
  </svg>
);

export const AnnouncementPageTwo: React.FC = () => {
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
                    {isKhmer ? 'រូបថតនំរី' : 'Gallery'}
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

        </div>
      </div>
    </>
  );
};

export default AnnouncementPageTwo;
