import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const PAGE_SIZE = 8;

const kmNumberMap: Record<string, string> = {
  '0': '០',
  '1': '១',
  '2': '២',
  '3': '៣',
  '4': '៤',
  '5': '៥',
  '6': '៦',
  '7': '៧',
  '8': '៨',
  '9': '៩',
};

const toKhmerNumber = (value: number | string) =>
  String(value)
    .split('')
    .map((ch) => kmNumberMap[ch] ?? ch)
    .join('');

const newsItems = [
  {
    title: 'សម្តេចមហាបវរធិបតី ហ៊ុន ម៉ាណែត នាយករដ្ឋមន្ត្រី​នៃព្រះរាជាណាចក្រ​កម្ពុជា ដែលបានឆ្លៀតឱកាសយ៉ាងមមាញឹក និងចំណាយពេលវេលាដ៏មានតម្លៃ ផ្តល់​កិត្តិយស​ដ៏ឧត្តុង្គឧត្តមអញ្ជើញជាអធិបតីភាពដ៏ខ្ពង់ខ្ពស់បំផុតចូលរួមពិធីសម្ពោធ និងកាត់ខ្សែបូរ ​ដាក់ឱ្យ​ប្រើប្រាស់​ជាផ្លូវការ មន្ទីរពេទ្យ ហ្លួង ម៉ែ និងក៏ស្របពេលខួបគម្រប់ ២ឆ្នាំ​ នៃការ​បើកដំណើរការ​មន្ទីរពេទ្យផងដែរ',
    titleEn: 'The Prime Minister H.E. Hun Manet attends the official inauguration and grand opening ceremony of Luang Me Hospital in celebration of its second anniversary.',
    excerpt: 'សម្តេចមហាបវរធិបតី ហ៊ុន ម៉ាណែត នាយករដ្ឋមន្ត្រី​នៃព្រះរាជាណាចក្រ​កម្ពុជា ដែលបានឆ្លៀតឱកាសយ៉ាងមមាញឹក និងចំណាយពេលវេលាដ៏មានតម្លៃ ផ្តល់​កិត្តិយស​ដ៏ឧត្តុង្គឧត្តមអញ្ជើញជាអធិបតីភាពដ៏ខ្ពង់ខ្ពស់បំផុតចូលរួមពិធីសម្ពោធ និងកាត់ខ្សែបូរ ​ដាក់ឱ្យ​ប្រើប្រាស់​ជាផ្លូវការ មន្ទីរពេទ្យ ហ្លួង ម៉ែ និងក៏ស្របពេលខួបគម្រប់ ២ឆ្នាំ​ នៃការ​បើកដំណើរការ​មន្ទីរពេទ្យផងដែរ',
    excerptEn: 'The Prime Minister attended the official opening ceremony of Luang Me Hospital and celebrated the hospital’s second anniversary with a distinguished and meaningful visit.',
    date: 'ថ្ងៃទី១៦ ខែកញ្ញា ឆ្នាំ២០២៦',
    category: 'conference',
    image: '/image/news/new11.jpg',
    route: '/announcements',
  },
  {
    title: 'លោកជំទាវ​បណ្ឌិត ពេជ ចន្ទមុន្នី ហ៊ុនម៉ាណែត បានឆ្លៀតឱកាសយ៉ាងមមាញឹក និងចំណាយពេលវេលាដ៏មានតម្លៃ ក្នុងការ​អញ្ជើញជាអធិបតីភាព ដ៏ខ្ពង់ខ្ពស់បំផុត ក្នុងពិធី «ប្រគល់-ទទួល ដី ទំហំ ៧ ១៧៦ ម៉ែត្រការ៉េ» របស់ អង្គការនគរទេព ជូនដល់ មន្ទីរពេទ្យ ហ្លួង ម៉ែ ',
    titleEn: 'Senior officials and leaders attend the land handover ceremony for the 7,176-square-meter donation to Luang Me Hospital.',
    excerpt: 'លោកជំទាវ​បណ្ឌិត ពេជ ចន្ទមុន្នី ហ៊ុនម៉ាណែត បានឆ្លៀតឱកាសយ៉ាងមមាញឹក និងចំណាយពេលវេលាដ៏មានតម្លៃ ក្នុងការ​អញ្ជើញជាអធិបតីភាព ដ៏ខ្ពង់ខ្ពស់បំផុត ក្នុងពិធី «ប្រគល់-ទទួល ដី ទំហំ ៧ ១៧៦ ម៉ែត្រការ៉េ» របស់ អង្គការនគរទេព ជូនដល់ មន្ទីរពេទ្យ ហ្លួង ម៉ែ ',
    excerptEn: 'The ceremony marked a major donation and expansion milestone for Luang Me Hospital, with national and institutional leaders in attendance.',
    date: 'ថ្ងៃទី៨ ខែធ្នូ ឆ្នាំ2025',
    category: 'conference',
    image: '/image/news2/17.jpg',
    route: '/announcements2',
  },
  {
    title: 'ឯកឧត្តមសាស្ត្រាចារ្យ ឈាង រ៉ា រដ្ឋមន្ត្រីក្រសួងសុខាភិបាល បានអញ្ជើញ​ចុះពិនិត្យវឌ្ឍនភាព មន្ទីរពេទ្យ ហ្លួង ម៉ែ និងសំណេះសំណាល សាកសួរ​សុខទុក្ខអ្នកជំងឺដែលមកទទួលសេវា និងអ្នកជំងឺដែលកំពុងសម្រាកព្យាបាលផងដែរ',
    titleEn: 'Minister of Health inspects Luang Me Hospital and meets with patients receiving care and recovery services.',
    excerpt: 'ឯកឧត្តមសាស្ត្រាចារ្យ ឈាង រ៉ា រដ្ឋមន្ត្រីក្រសួងសុខាភិបាល បានអញ្ជើញ​ចុះពិនិត្យវឌ្ឍនភាព មន្ទីរពេទ្យ ហ្លួង ម៉ែ និងសំណេះសំណាល សាកសួរ​សុខទុក្ខអ្នកជំងឺដែលមកទទួលសេវា និងអ្នកជំងឺដែលកំពុងសម្រាកព្យាបាលផងដែរ',
    excerptEn: 'The Minister of Health visited the hospital, reviewed patient services, and spoke with patients and families receiving ongoing care.',
    date: 'ថ្ងៃទី១៩ ខែមិថុនា ឆ្នាំ២០២៥',
    category: 'humanity',
    image: '/image/news3/1.jpg',
    route: '/announcements3',
  },
  {
    title: 'ប្រតិភូគណៈកម្មការទី៨ នៃរដ្ឋសភា ដឹកនាំដោយ លោកជំទាវ ឡោក ខេង ប្រធានគណៈកម្មការ រួមជាមួយថ្នាក់ដឹកនាំក្រសួងសុខាភិបាល និងថ្នាក់ដឹកនាំរបស់បេឡាជាតិសន្តិសុខសង្គម បានអញ្ជើញចុះមកធ្វើទស្សនកិច្ចនៅមន្ទីរពេទ្យ ហ្លួង ម៉ែ ',
    titleEn: 'Parliamentary delegation visits Luang Me Hospital to review services and strengthen public health cooperation.',
    excerpt: 'ប្រតិភូគណៈកម្មការទី៨ នៃរដ្ឋសភា ដឹកនាំដោយ លោកជំទាវ ឡោក ខេង ប្រធានគណៈកម្មការ រួមជាមួយថ្នាក់ដឹកនាំក្រសួងសុខាភិបាល និងថ្នាក់ដឹកនាំរបស់បេឡាជាតិសន្តិសុខសង្គម បានអញ្ជើញចុះមកធ្វើទស្សនកិច្ចនៅមន្ទីរពេទ្យ ហ្លួង ម៉ែ ',
    excerptEn: 'A delegation from the National Assembly visited the hospital and discussed healthcare progress and social welfare coordination.',
    date: 'ថ្ងៃទី ៦ ខែតុលា ឆ្នាំ2026',
    category: 'humanity',
    image: '/image/news4/21.jpg',
    route: '/announcements4',
  },
  {
    title: 'សម្តេចព្រះមហាក្សត្រី ព្រះវររាជមាតាជាតិខ្មែរ ជាទីគោរព​សក្ការៈ​ដ៏ខ្ពង់ខ្ពស់បំផុត ដែលព្រះអង្គសព្វព្រះរាជហឫទ័យ​ប្រោសព្រះរាជទាន​នូវព្រះរាជអំណោយដ៏ថ្លៃថ្លា ជា សារ៉ុង ចំនួន ២០០, កន្សែងត្រជាក់ ចំនួន ៦ កេស, ទឹកបរិសុទ្ធ ប្រូវីដា ចំនួន ១០០ កេស និងថវិកា ចំនួន ២០លាន រៀល ',
    titleEn: 'The Queen Mother of Cambodia donates medical supplies and financial support to strengthen care at Luang Me Hospital.',
    excerpt: 'សម្តេចព្រះមហាក្សត្រី ព្រះវររាជមាតាជាតិខ្មែរ ជាទីគោរព​សក្ការៈ​ដ៏ខ្ពង់ខ្ពស់បំផុត ដែលព្រះអង្គសព្វព្រះរាជហឫទ័យ​ប្រោសព្រះរាជទាន​នូវព្រះរាជអំណោយដ៏ថ្លៃថ្លា ជា សារ៉ុង ចំនួន ២០០, កន្សែងត្រជាក់ ចំនួន ៦ កេស, ទឹកបរិសុទ្ធ ប្រូវីដា ចំនួន ១០០ កេស និងថវិកា ចំនួន ២០លាន រៀល ',
    excerptEn: 'The Royal generous donation includes medical essentials and financial support for the hospital’s patient care and services.',
    date: 'ថ្ងៃទី 12 ខែសីហា ឆ្នាំ2025',
    category: 'humanity',
    image: '/image/news5/1.jpg',
    route: '/announcements5',
  },
];

export const NewsPage: React.FC = () => {
  const { isKhmer } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { key: 'all', label: isKhmer ? 'ទាំងអស់' : 'All' },
    { key: 'conference', label: isKhmer ? 'កិច្ចប្រជុំ' : 'Conference' },
    { key: 'humanity', label: isKhmer ? 'មនុស្សធម៌' : 'Humanity' },
    { key: 'training', label: isKhmer ? 'បណ្តុះបណ្តាល' : 'Training' },
  ];

  const filteredNews = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return newsItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const haystack = `${item.title} ${item.excerpt}`.toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const visibleNews = filteredNews.slice(startIndex, startIndex + PAGE_SIZE);

  const renderPageNumbers = () => {
    const pages: Array<number | 'ellipsis'> = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i += 1) pages.push(i);
    } else {
      const start = Math.max(1, safePage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);

      for (let i = start; i <= end; i += 1) pages.push(i);

      if (start > 1) pages.unshift('ellipsis');
      if (end < totalPages) pages.push('ellipsis');
      if (pages[0] !== 1) pages.unshift(1);
      if (pages[pages.length - 1] !== totalPages) pages.push(totalPages);
    }

    const uniquePages: Array<number | 'ellipsis'> = [];
    pages.forEach((page) => {
      if (page === 'ellipsis' && uniquePages[uniquePages.length - 1] === 'ellipsis') return;
      uniquePages.push(page);
    });

    return uniquePages;
  };

  const pageNumbers = renderPageNumbers();

  const handlePageChange = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Battambang:wght@400;700&family=Inter:wght@400;500;600;700;800&family=Kantumruy+Pro:wght@400;500;600;700&display=swap');

        body {
          background: #f8fafc;
          color: #0f172a;
          font-family: 'Battambang', 'Arial', sans-serif;
        }

        .k-header {
          font-family: 'Kantumruy Pro', 'Battambang', sans-serif;
        }

        .k-body {
          font-family: 'Battambang', 'Arial', sans-serif;
        }

        .k-latin {
          font-family: 'Inter', sans-serif;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}
      </style>
      <div className="min-h-screen bg-[#f8fafc] text-slate-900">
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-block h-7 w-1.5 rounded-full bg-[#1e3a8a]" />
            <h1 className="k-header text-3xl font-bold text-slate-900 sm:text-4xl">
              {isKhmer ? 'ព័ត៌មានទូទៅ' : 'News & Updates'}{' '}
              <span className="k-latin text-base font-semibold tracking-[0.12em] text-[#1e3a8a]">
                {isKhmer ? '| News & Updates' : '| ព័ត៌មានទូទៅ'}
              </span>
            </h1>
          </div>

          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm font-medium text-slate-500">
              {isKhmer
                ? `ព័ត៌មានទូទៅសរុប ${toKhmerNumber(filteredNews.length)} / Total News: ${filteredNews.length}`
                : `Total News: ${filteredNews.length} / ${toKhmerNumber(filteredNews.length)} បទ`}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category.key);
                    setCurrentPage(1);
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category.key
                      ? 'bg-[#1e3a8a] text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {visibleNews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
              <div className="k-header text-2xl text-slate-700">
                {isKhmer ? 'គ្មានព័ត៌មានដែលត្រូវគ្នា' : 'No matching news found'}
              </div>
              <p className="mt-3 text-sm">
                {isKhmer
                  ? 'សូមព្យាយាមស្វែងរកពាក្យផ្សេង ឬជ្រើសរើសប្រភេទមួយទៀត។'
                  : 'Please try a different keyword or choose another category.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visibleNews.map((article) => (
                <Link
                  key={`${article.title}-${article.date}`}
                  to={article.route ?? '/announcements'}
                  className="news-card block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-soft"
                >
                  <article className="h-full">
                    <div className="overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-48 w-full object-cover transition duration-500 hover:scale-105 sm:h-52"
                      />
                    </div>

                    <div className="p-4">
                      <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#1e3a8a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        <span>{article.date}</span>
                      </div>

                      <h2 className="k-header line-clamp-2 text-lg font-bold leading-snug text-slate-900">
                        {isKhmer ? article.title : article.titleEn ?? article.title}
                      </h2>
                      <p className="line-clamp-2 mt-3 text-sm leading-6 text-slate-500">
                        {isKhmer ? article.excerpt : article.excerptEn ?? article.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <nav className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-soft">
              <button
                type="button"
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage === 1}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 ${safePage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                aria-label="Previous page"
              >
                {'<' }
              </button>

              {pageNumbers.map((page, index) => {
                if (page === 'ellipsis') {
                  return (
                    <span key={`ellipsis-${index}`} className="flex h-10 w-10 items-center justify-center text-base font-medium text-slate-500">
                      •••
                    </span>
                  );
                }

                const isActive = page === safePage;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-base font-medium ${
                      isActive
                        ? 'border-[#1e3a8a] bg-[#1e3a8a] text-white shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {toKhmerNumber(page)}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => handlePageChange(safePage + 1)}
                disabled={safePage === totalPages}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 ${safePage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                aria-label="Next page"
              >
                {'>'}
              </button>
            </nav>
          </div>
        </main>

        <footer className="border-t border-slate-200 bg-white/60 py-6">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-600 sm:px-6 lg:px-8">
            {isKhmer
              ? '© ២០២៦ រក្សាសិទ្ធិគ្រប់យ៉ាងដោយ មន្ទីរពេទ្យ ហ្លួង ម៉ែ (LUANG MÈ HOSPITAL)'
              : '© 2026 All rights reserved by Luang Mè Hospital (LUANG MÈ HOSPITAL)'}
          </div>
        </footer>
      </div>
    </>
  );
};
