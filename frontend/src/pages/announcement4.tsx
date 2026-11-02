import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock3, Eye, Newspaper } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const article = {
  title: "National Assembly Commission 8 visits Luang Me Hospital with leaders from the Ministry of Health and the National Social Security Fund",
  titleKm: 'ប្រតិភូគណៈកម្មការទី៨ នៃរដ្ឋសភា ដឹកនាំដោយ លោកជំទាវ ឡោក ខេង ប្រធានគណៈកម្មការ រួមជាមួយថ្នាក់ដឹកនាំក្រសួងសុខាភិបាល និងថ្នាក់ដឹកនាំរបស់បេឡាជាតិសន្តិសុខសង្គម បានអញ្ជើញចុះមកធ្វើទស្សនកិច្ចនៅមន្ទីរពេទ្យ ហ្លួង ម៉ែ',
  date: 'ថ្ងៃទី ៦ ខែតុលា ឆ្នាំ២០២៦',
  category: 'Announcements',
  categoryKm: 'សេចក្តីជូនដំណឹង',
  image: '/image/news4/21.jpg',
};

const gallery = [
  '/image/news4/1.jpg',
  '/image/news4/2.jpg',
  '/image/news4/3.jpg',
  '/image/news4/5.jpg',
  '/image/news4/6.jpg',
  '/image/news4/7.jpg',
  '/image/news4/8.jpg',
  '/image/news4/9.jpg',
  '/image/news4/11.jpg',
  '/image/news4/12.jpg',
  '/image/news4/13.jpg',
  '/image/news4/14.jpg',
  '/image/news4/15.jpg',
  '/image/news4/16.jpg',
  '/image/news4/18.jpg',
  '/image/news4/19.jpg',
  '/image/news4/20.jpg',
  '/image/news4/21.jpg',
  '/image/news4/22.jpg',
  '/image/news4/23.jpg',
];

const bodyParagraphs = [
  'A delegation from Commission 8 of the National Assembly, led by Commission Chair Lok Kheng, visited Luang Me Hospital together with leaders from the Ministry of Health and the National Social Security Fund.',
  'The visit brought the delegations together at the hospital for an on-site visit. This article records the visit as announced by Luang Me Hospital.',
];

const bodyParagraphsKm = [
  'នារសៀលថ្ងៃពុធ ១៤រោច ខែកត្ដិក​ ឆ្នាំម្សាញ់ សប្តស័ក ព.ស.២៥៦៩ ត្រូវនឹងថ្ងៃទី១៩ ខែវិច្ឆិកា ឆ្នាំ២០២៥ ប្រតិភូគណៈកម្មការទី៨ នៃរដ្ឋសភា ដឹកនាំដោយ លោកជំទាវ ឡោក ខេង ប្រធានគណៈកម្មការ រួមជាមួយថ្នាក់ដឹកនាំក្រសួងសុខាភិបាល និងថ្នាក់ដឹកនាំរបស់បេឡាជាតិសន្តិសុខសង្គម បានអញ្ជើញចុះមកធ្វើទស្សនកិច្ចនៅមន្ទីរពេទ្យ ហ្លួង ម៉ែ ដើម្បីសួរសុខទុក្ខអ្នកជំងឺ ព្រមទាំងឈ្វេងយល់ពីវឌ្ឍនភាព បញ្ហាប្រឈម សំណូមពរ និងចក្ខុវិស័យ របស់មន្ទីរពេទ្យ ។',
];

export const AnnouncementPageFour: React.FC = () => {
  const { isKhmer } = useLanguage();
  const headline = isKhmer ? article.titleKm : article.title;
  const articleBody = isKhmer ? bodyParagraphsKm : bodyParagraphs;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12">
      <Link
        to="/news"
        className="glass glass-hover mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[#0F4C8A] hover:text-[#0B1D2E]"
      >
        <ArrowLeft className="h-4 w-4" />
        {isKhmer ? 'ត្រឡប់ទៅព័ត៌មាន' : 'Back to News'}
      </Link>

      <article className="glass-strong overflow-hidden rounded-3xl">
        <div className="relative h-64 overflow-hidden md:h-[420px]">
          <img src={article.image} alt={headline} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
          <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center justify-between gap-3 text-white md:inset-x-8 md:bottom-8">
            <span className="glass-blue rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {isKhmer ? article.categoryKm : article.category}
            </span>
            <span className="glass-blue inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm text-white">
              <CalendarDays className="h-4 w-4" />
              {article.date}
            </span>
          </div>
        </div>

        <div className="p-5 md:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5"><Newspaper className="h-4 w-4 text-[#0F4C8A]" />Loung Me Hospital</span>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5"><Eye className="h-4 w-4 text-[#D97706]" />{isKhmer ? 'ព័ត៌មានសាធារណៈ' : 'Public Update'}</span>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5"><Clock3 className="h-4 w-4 text-[#0F4C8A]" />{isKhmer ? 'អាន ២ នាទី' : '2 minutes read'}</span>
          </div>

          <h1 className="text-2xl font-bold leading-relaxed text-[#0B1D2E] md:text-3xl">{headline}</h1>

          <div className="glass mt-7 space-y-4 rounded-2xl p-5 text-base leading-8 text-slate-700 md:p-6">
            {articleBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <section className="mt-10" aria-labelledby="announcement-gallery-title">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id="announcement-gallery-title" className="text-xl font-bold text-[#0B1D2E]">
                {isKhmer ? 'រូបថត' : 'Gallery'}
              </h2>
              <span className="glass rounded-full px-3 py-1 text-sm text-slate-600">{gallery.length} {isKhmer ? 'រូបថត' : 'photos'}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {gallery.map((image, index) => (
                <div key={image} className="glass glass-hover overflow-hidden rounded-xl p-1.5">
                  <img
                    src={image}
                    alt={`${headline} ${index + 1}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
};