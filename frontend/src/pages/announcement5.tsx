import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock3, Eye, Newspaper } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const article = {
  title: 'Her Majesty the Queen Mother of the Cambodian Nation graciously donates supplies and financial support to Luang Me Hospital',
  titleKm: 'សម្តេចព្រះមហាក្សត្រី ព្រះវររាជមាតាជាតិខ្មែរ ជាទីគោរព​សក្ការៈ​ដ៏ខ្ពង់ខ្ពស់បំផុត ដែលព្រះអង្គសព្វព្រះរាជហឫទ័យ​ប្រោសព្រះរាជទាន​នូវព្រះរាជអំណោយដ៏ថ្លៃថ្លា ជា សារ៉ុង ចំនួន ២០០, កន្សែងត្រជាក់ ចំនួន ៦ កេស, ទឹកបរិសុទ្ធ ប្រូវីដា ចំនួន ១០០ កេស និងថវិកា ចំនួន ២០លាន រៀល',
  date: 'ថ្ងៃទី ១២ ខែសីហា ឆ្នាំ២០២៥',
  category: 'Announcements',
  categoryKm: 'សេចក្តីជូនដំណឹង',
  image: '/image/news5/1.jpg',
};

const gallery = [
  '/image/news5/1.jpg',
  '/image/news5/2.jpg',
  '/image/news5/3.jpg',
  '/image/news5/4.jpg',
  '/image/news5/5.jpg',
  '/image/news5/6.jpg',
  '/image/news5/7.jpg',
  '/image/news5/8.jpg',
  '/image/news5/9.jpg',
  '/image/news5/10.jpg',
  '/image/news5/11.jpg',
  '/image/news5/12.jpg',
  '/image/news5/14.jpg',
  '/image/news5/15.jpg',
  '/image/news5/16.jpg',
];

const bodyParagraphs = [
  'Her Majesty the Queen Mother of the Cambodian Nation graciously presented a royal donation to Luang Me Hospital.',
  'The donation included 200 sampots, six cases of cooling towels, 100 cases of Brodua drinking water, and 20 million riel.',
];

const bodyParagraphsKm = [
  'សម្តេចព្រះមហាក្សត្រី ព្រះវររាជមាតាជាតិខ្មែរ ព្រះអង្គសព្វព្រះរាជហឫទ័យប្រោសព្រះរាជទានព្រះរាជអំណោយដ៏ថ្លៃថ្លាដល់មន្ទីរពេទ្យ ហ្លួង ម៉ែ។',
  'ព្រះរាជអំណោយរួមមាន សារ៉ុងចំនួន ២០០ កន្សែងត្រជាក់ចំនួន ៦ កេស ទឹកបរិសុទ្ធ ប្រូវីដា ចំនួន ១០០ កេស និងថវិកាចំនួន ២០ លានរៀល។',
];

export const AnnouncementPageFive: React.FC = () => {
  const { isKhmer } = useLanguage();
  const headline = isKhmer ? article.titleKm : article.title;
  const articleBody = isKhmer ? bodyParagraphsKm : bodyParagraphs;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12">
      <Link to="/news" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#0F4C8A] hover:text-[#0B1D2E]">
        <ArrowLeft className="h-4 w-4" />
        {isKhmer ? 'ត្រឡប់ទៅព័ត៌មាន' : 'Back to News'}
      </Link>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-64 overflow-hidden bg-slate-100 md:h-[420px]">
          <img src={article.image} alt={headline} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center justify-between gap-3 text-white md:inset-x-8 md:bottom-8">
            <span className="rounded-full bg-[#D97706] px-3 py-1 text-xs font-semibold uppercase">
              {isKhmer ? article.categoryKm : article.category}
            </span>
            <span className="inline-flex items-center gap-2 text-sm">
              <CalendarDays className="h-4 w-4" />
              {article.date}
            </span>
          </div>
        </div>

        <div className="p-5 md:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2"><Newspaper className="h-4 w-4 text-[#0F4C8A]" />Loung Me Hospital</span>
            <span className="inline-flex items-center gap-2"><Eye className="h-4 w-4 text-[#D97706]" />{isKhmer ? 'ព័ត៌មានសាធារណៈ' : 'Public Update'}</span>
            <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{isKhmer ? 'អាន ២ នាទី' : '2 minutes read'}</span>
          </div>

          <h1 className="text-2xl font-bold leading-relaxed text-[#0B1D2E] md:text-3xl">{headline}</h1>

          <div className="mt-7 space-y-4 text-base leading-8 text-slate-700">
            {articleBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <section className="mt-10" aria-labelledby="announcement-gallery-title">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 id="announcement-gallery-title" className="text-xl font-bold text-[#0B1D2E]">
                {isKhmer ? 'រូបថត' : 'Gallery'}
              </h2>
              <span className="text-sm text-slate-500">{gallery.length} {isKhmer ? 'រូបថត' : 'photos'}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {gallery.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`${headline} ${index + 1}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-lg border border-slate-200 bg-slate-100 object-cover"
                />
              ))}
            </div>
          </section>
        </div>
      </article>
    </main>
  );
};