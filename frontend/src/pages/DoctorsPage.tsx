import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../api/axios';
import { Doctor, Department } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Search } from '../components/Search';
import { Pagination } from '../components/Pagination';
import { CardSkeleton } from '../components/Loading';
import { EmptyState } from '../components/EmptyState';
import { Badge } from '../components/Badge';
import { useDebounce } from '../hooks/useDebounce';
import { Calendar, Phone, Mail, Clock, Globe } from 'lucide-react';

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

  // Fetch departments for filter dropdown
  const { data: departments } = useQuery({
    queryKey: ['departments-list'],
    queryFn: async () => {
      const res = await api.get('/departments');
      return res.data.data as Department[];
    },
  });

  // Fetch doctors list from API with search, filter, pagination
  const { data, isLoading, isError } = useQuery({
    queryKey: ['doctors', debouncedSearch, selectedDept, page],
    queryFn: async () => {
      const res = await api.get('/doctors', {
        params: {
          search: debouncedSearch,
          departmentId: selectedDept || undefined,
          page,
          limit: 12,
        },
      });

      const doctors = Array.isArray(res.data?.data) ? (res.data.data as Doctor[]) : [];

      return {
        doctors,
        pagination: res.data?.pagination || {
          page,
          limit: 12,
          total: doctors.length,
          totalPages: Math.max(1, Math.ceil(doctors.length / 12)),
        },
      };
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D2E] font-serif">
          {isKhmer ? 'ក្រុមគ្រូពេទ្យ និងវេជ្ជបណ្ឌិតឯកទេស' : 'Medical Specialists and Doctors'}
        </h1>
        <p className="text-sm text-slate-600">
          {isKhmer
            ? 'ស្វែងរក និងកក់ការណាត់ជួបជាមួយវេជ្ជបណ្ឌិតដែលមានបទពិសោធន៍ខ្ពស់របស់មន្ទីរពេទ្យ ហ្លួងម៉ែ។'
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
            placeholder={isKhmer ? 'ស្វែងរកតាមឈ្មោះ ឬឯកទេស...' : 'Search doctor name or specialty...'}
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
          <option value="">{isKhmer ? 'គ្រប់នាយកដ្ឋានទាំងអស់' : 'All Departments'}</option>
          {departments?.map((d) => (
            <option key={d.id} value={d.id}>
              {isKhmer && d.nameKm ? d.nameKm : d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Doctors Grid */}
      {isLoading ? (
        <CardSkeleton count={6} />
      ) : isError || !data || data.doctors.length === 0 ? (
        <EmptyState
          title={isKhmer ? 'មិនរកឃើញវេជ្ជបណ្ឌិត' : 'No doctors found'}
          description={isKhmer ? 'សូមផ្លាស់ប្តូរពាក្យស្វែងរក ឬជ្រើសរើសផ្នែកផ្សេង' : 'Try adjusting your search criteria.'}
        />
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.doctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={getDoctorImage(doc)}
                      alt={doc.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 group-hover:border-[#0F4C8A] transition-colors"
                    />
                    <div className="space-y-1">
                      <Badge variant="success" className="text-[10px]">
                        ✓ Available
                      </Badge>
                      <h3 className="text-base font-bold text-[#0B1D2E] group-hover:text-[#0F4C8A] transition-colors">
                        {isKhmer && doc.nameKm ? doc.nameKm : doc.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#0F4C8A]">
                        {isKhmer && doc.specialtyKm ? doc.specialtyKm : doc.specialty}
                      </p>
                      {doc.department && (
                        <p className="text-xs text-slate-500 font-medium">
                          {isKhmer && doc.department.nameKm ? doc.department.nameKm : doc.department.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    {doc.experience && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{isKhmer ? 'បទពិសោធន៍:' : 'Experience:'} {doc.experience}</span>
                      </div>
                    )}
                    {doc.languages && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                        <span>{isKhmer ? 'ភាសា:' : 'Languages:'} {doc.languages}</span>
                      </div>
                    )}
                    {doc.availability && (
                      <div className="flex items-center gap-2 font-semibold text-emerald-700">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isKhmer ? 'ថ្ងៃពិនិត្យ:' : 'Schedule:'} {doc.availability}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ))}
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
