import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock3, Eye, Newspaper } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const article = {
  title: 'His Excellency Professor Chheang Ra, Minister of Health, visits Luang Me Hospital to review its progress and meet patients.',
  titleKm: 'ឯកឧត្តមសាស្ត្រាចារ្យ ឈាង រ៉ា រដ្ឋមន្ត្រីក្រសួងសុខាភិបាល បានអញ្ជើញ​ចុះពិនិត្យវឌ្ឍនភាព មន្ទីរពេទ្យ ហ្លួង ម៉ែ និងសំណេះសំណាល សាកសួរ​សុខទុក្ខអ្នកជំងឺដែលមកទទួលសេវា និងអ្នកជំងឺដែលកំពុងសម្រាកព្យាបាលផងដែរ',
  date: 'ថ្ងៃទី១៩ ខែមិថុនា ឆ្នាំ២០២៥',
  category: 'Announcements',
  categoryKm: 'សេចក្តីជូនដំណឹង',
  image: '/image/news3/1.jpg',
};

const gallery = [
  '/image/news3/1.jpg',
  '/image/news3/2.jpg',
  '/image/news3/3.jpg',
  '/image/news3/4.jpg',
  '/image/news3/5.jpg',
  '/image/news3/6.jpg',
  '/image/news3/7.jpg',
  '/image/news3/8.jpg',
  '/image/news3/9.jpg',
  '/image/news3/10.jpg',
  '/image/news3/11.jpg',
  '/image/news3/12.jpg',
  '/image/news3/13.jpg',
  '/image/news3/14.jpg',
  '/image/news3/16.jpg',
  '/image/news3/18.jpg',
];

const bodyParagraphs = [
  'His Excellency Professor Chheang Ra, Minister of Health, visited Luang Me Hospital to review its progress.',
  'During the visit, he met and spoke with patients receiving hospital services and those currently staying for treatment.',
];

const bodyParagraphsKm = [
  'នាព្រឹកថ្ងៃព្រហស្បតិ៍ ៩រោច ខែជេស្ឋ ឆ្នាំម្សាញ់ សប្តស័ក ព.ស.២៥៦៩ ត្រូវនឹងថ្ងៃទី១៩ ខែមិថុនា ឆ្នាំ២០២៥ ឯកឧត្តមសាស្ត្រាចារ្យ ឈាង រ៉ា រដ្ឋមន្ត្រីក្រសួងសុខាភិបាល បានអញ្ជើញ​ចុះពិនិត្យវឌ្ឍនភាព មន្ទីរពេទ្យ ហ្លួង ម៉ែ និងសំណេះសំណាល សាកសួរ​សុខទុក្ខអ្នកជំងឺដែលមកទទួលសេវា និងអ្នកជំងឺដែលកំពុងសម្រាកព្យាបាលផងដែរ ។ ឆ្លៀតក្នុង​ឱកាសនេះ​ ឯកឧត្ដម​សាស្ត្រាចារ្យរដ្ឋមន្រ្តី បានផ្តល់ការណែនាំ ដល់ថ្នាក់ដឹកនាំ មន្ត្រីរាជការ​ និងបុគ្គលិក​ទាំងអស់​ ត្រូវបន្តបង្កើនសមត្ថភាព យកចិត្តទុកដាក់បម្រើសេវាឯកទេសផ្នែកជំងឺមហារីក ជូនដល់ប្រជាពលរដ្ឋដោយឈរលើគុណភាព ប្រសិទ្ធភាព សុវត្ថិភាព និងសមធម៌ ',
];

export const AnnouncementPageThree: React.FC = () => {
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