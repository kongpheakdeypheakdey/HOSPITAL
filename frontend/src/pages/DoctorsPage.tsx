import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Doctor } from '../types';
import { doctors as allDoctors, departments } from '../data/catalog';
import { useLanguage } from '../contexts/LanguageContext';
import { Search } from '../components/Search';
import { Pagination } from '../components/Pagination';
import { EmptyState } from '../components/EmptyState';
import { useDebounce } from '../hooks/useDebounce';
import { Calendar, Clock, Globe } from 'lucide-react';

const doctorImageList = [
  '/image/dr1.jpg',
  '/image/dr2.jpg',
  '/image/dr3.jpg',
  '/image/dr4.jpg',
  '/image/dr5.jpg',
  '/image/dr6.jpg',
  '/image/dr7.jpg',
];

const getDoctorImage = (doctor: Doctor) => {
  if (doctor.image && !doctor.image.startsWith('http')) {
    return doctor.image;
  }

  const doctorIndex = Number(doctor.id ?? 0) || 1;
  const imageIndex = ((doctorIndex - 1) % doctorImageList.length + doctorImageList.length) % doctorImageList.length;
  return doctorImageList[imageIndex] ?? doctorImageList[0];
};

export const DoctorsPage: React.FC = () => {
  const { isKhmer } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialDeptId = searchParams.get('departmentId') || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState(initialDeptId);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filter and paginate the static doctors list on the client.
  const data = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    const filtered = allDoctors.filter((doc) => {
      if (selectedDept && String(doc.departmentId ?? '') !== String(selectedDept)) {
        return false;
      }
      if (!query) return true;

      const searchableText = [
        doc.name,
        doc.nameKm,
        doc.specialty,
        doc.specialtyKm,
        doc.department?.name,
        doc.department?.nameKm,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });

    const limit = 12;
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * limit;

    return {
      doctors: filtered.slice(start, start + limit),
      pagination: { page: currentPage, limit, total, totalPages },
    };
  }, [debouncedSearch, selectedDept, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D2E] font-serif">
          {isKhmer ? 'ក្រុមគ្រូពេទ្យ និងវេជ្ជបណ្ឌិតឯកទេស' : 'Medical Specialists and Doctors'}
        </h1>
        <p className="text-sm text-slate-600">
          {isKhmer
            ? 'ស្វែងរក និងកក់ការណាត់ជួបជាមួយវេជ្ជបណ្ឌិតដែលមានបទពិសោធន៍ខ្ពស់របស់មន្ទីរពេទ្យ ហ្លួង ម៉ែ'
            : 'Find and schedule a consultation with our experienced clinical specialists.'}
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 max-w-3xl mx-auto">
        <div className="flex-1 w-full">
          <Search
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val);
              setPage(1);
            }}
            placeholder={isKhmer ? 'ស្វែងរក...' : 'Search doctor name or specialty...'}
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => {
            setSelectedDept(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-64 text-sm font-medium rounded-xl border border-slate-200 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#0F4C8A]"
        >
          <option value="">{isKhmer ? 'ផ្នែកទាំងអស់' : 'All Departments'}</option>
          {departments?.map((d) => (
            <option key={d.id} value={d.id}>
              {isKhmer && d.nameKm ? d.nameKm : d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Doctors Grid */}
      {data.doctors.length === 0 ? (
        <EmptyState
          title={isKhmer ? 'មិនរកឃើញវេជ្ជបណ្ឌិត' : 'No doctors found'}
          description={isKhmer ? 'សូមផ្លាស់ប្តូរពាក្យស្វែងរក ឬជ្រើសរើសផ្នែកផ្សេង' : 'Try adjusting your search criteria.'}
        />
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.doctors.map((doc) => {
              const hasDetails = doc.experience || doc.languages || doc.availability;
              return (
                <div
                  key={doc.id}
                  className="group flex flex-col overflow-hidden rounded-2xl glass transition-all duration-300 hover:-translate-y-1 hover:border-[#0F4C8A]/30 hover:shadow-xl hover:shadow-slate-200"
                >
                  {/* Department band */}
                  {doc.department && (
                    <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-[#0F4C8A]" />
                      <p className={`text-sm font-bold leading-snug text-[#0F4C8A] ${isKhmer ? 'font-khmer' : ''}`}>
                        {isKhmer && doc.department.nameKm ? doc.department.nameKm : doc.department.name}
                      </p>
                    </div>
                  )}

                  {/* Doctor body */}
                  <div className="flex flex-1 flex-col items-center px-6 py-7 text-center">
                    <div className="relative">
                      <img
                        src={getDoctorImage(doc)}
                        alt={doc.name}
                        className="aspect-[4/5] w-32 rounded-xl object-cover object-top shadow-sm ring-1 ring-slate-200 transition-all duration-300 group-hover:ring-[#0F4C8A]/30"
                      />
                    </div>
                    <h3 className={`mt-5 text-lg font-bold text-[#0B1D2E] transition-colors group-hover:text-[#0F4C8A] ${isKhmer ? 'font-khmer' : ''}`}>
                      {isKhmer && doc.nameKm ? doc.nameKm : doc.name}
                    </h3>
                    <p className={`mt-1.5 max-w-xs text-sm leading-relaxed text-slate-500 ${isKhmer ? 'font-khmer' : ''}`}>
                      {isKhmer && doc.specialtyKm ? doc.specialtyKm : doc.specialty}
                    </p>

                    {hasDetails && (
                      <div className="mt-5 w-full space-y-2 border-t border-slate-100 pt-4 text-left text-xs text-slate-600">
                        {doc.experience && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                            <span>{isKhmer ? 'បទពិសោធន៍:' : 'Experience:'} {doc.experience}</span>
                          </div>
                        )}
                        {doc.languages && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                            <span>{isKhmer ? 'ភាសា:' : 'Languages:'} {doc.languages}</span>
                          </div>
                        )}
                        {doc.availability && (
                          <div className="flex items-center gap-2 font-semibold text-emerald-700">
                            <Calendar className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                            <span>{isKhmer ? 'ថ្ងៃពិនិត្យ:' : 'Schedule:'} {doc.availability}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {data.pagination && (
            <Pagination
              page={data.pagination.page}
              totalPages={data.pagination.totalPages}
              total={data.pagination.total}
              limit={data.pagination.limit}
              onPageChange={setPage}
            />
          )}
        </div>
      )}
    </div>
  );
};
