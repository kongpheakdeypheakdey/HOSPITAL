import React, { useMemo, useState } from 'react';
import { Department } from '../types';
import { departments } from '../data/catalog';
import { useLanguage } from '../contexts/LanguageContext';
import { Search } from '../components/Search';
import { EmptyState } from '../components/EmptyState';
import { UserCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const departmentImageMap: Record<string, string> = {
  OPD: '/image/departments/opd.jpg',
  EMERGENCY: '/image/departments/ED.JPG',
  RADIOLOGY: '/image/departments/Radiology.JPG',
  ONCOLOGY: '/image/departments/linac1.jpg',
  LAB: '/image/departments/lab.JPG',
  ANESTHESIA: '/image/departments/recovery-room.jpg',
  GYNECOLOGY: '/image/departments/gynecology.png',
  SURGERY: '/image/departments/surgical-1.jpg',
  ICU: '/image/departments/ICU.jpg',
  PHARMACY: '/image/departments/pharmacy.jpg',
  SOCIAL_SERVICES: '/image/departments/nssf.JPG',
  ENDOSCOPY: '/image/departments/endoscpy.jpg',
  REHABILITATION: '/image/departments/ICU.jpg',

};

const getDepartmentImage = (dept: Department) => {
  const code = dept.code ?? '';
  return departmentImageMap[code] ?? dept.image ?? '/image/departments/emergency-care.jpg';
};

const getDepartmentName = (dept: Department, isKhmer: boolean) => {
  const normalizedName = dept.name?.toLowerCase() ?? '';
  if (normalizedName.includes('rehabilitation services') || normalizedName.includes('intensive care unit')) {
    return isKhmer ? 'ផ្នែកប្រពោធនកម្ម' : 'Intensive Care Unit - ICU';
  }

  if (isKhmer && dept.nameKm) return dept.nameKm;
  return dept.name || 'Department';
};

const getDepartmentDescription = (dept: Department, isKhmer: boolean) => {
  const normalizedName = dept.name?.toLowerCase() ?? '';
  if (normalizedName.includes('rehabilitation services') || normalizedName.includes('intensive care unit')) {
    return isKhmer
      ? 'ផ្តល់ការតាមដានជាបន្តបន្ទាប់ និងឧបករណ៍ជួយរស់ទំនើប សម្រាប់អ្នកជំងឺដែលស្ថិតក្នុងស្ថានភាពធ្ងន់ធ្ងរ និងត្រូវការថែទាំពិសេស។'
      : 'Provides continuous monitoring, advanced life-support systems, and specialized care for critically ill patients.';
  }

  if (isKhmer && dept.descKm) return dept.descKm;
  return dept.description || 'Department information is currently unavailable.';
};

export const DepartmentsPage: React.FC = () => {
  const { isKhmer } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const departmentsToRender = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return [...departments]
      .sort((a, b) => {
        const getPriority = (dept: Department) => {
          const label = `${dept.name ?? ''} ${dept.nameKm ?? ''}`.toLowerCase();
          return label.includes('oncology') || label.includes('radiotherapy') ? -1 : 0;
        };

        return getPriority(a) - getPriority(b);
      })
      .filter((dept) => {
        if (!normalizedQuery) return true;

        const searchableText = [
          dept.name,
          dept.nameKm,
          dept.description,
          dept.descKm,
          dept.head,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      });
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D2E] font-serif">
          {isKhmer ? 'ផ្នែកព្យាបាលទាំងអស់' : 'Medical Departments'}
        </h1>
        <p className="text-sm text-slate-600">
          {isKhmer
            ? 'មន្ទីរពេទ្យ ហ្លួងម៉ែ មានផ្នែកព្យាបាលឯកទេសជាច្រើន ប្រកបដោយសម្ភារៈទំនើប និងគ្រូពេទ្យជំនាញ'
            : 'Comprehensive clinical specialties equipped with modern diagnostic & treatment technology.'}
        </p>
      </div>

      {/* Search Filter Bar */}
      <div className="max-w-md mx-auto">
        <Search
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={isKhmer ? 'ស្វែងរកផ្នែកព្យាបាល...' : 'Search department by name or service...'}
        />
      </div>

      {/* Content */}
      {departmentsToRender.length === 0 ? (
        <EmptyState
          title={isKhmer ? 'មិនរកឃើញផ្នែកព្យាបាល' : 'No departments found'}
          description={isKhmer ? 'សូមសាកល្បងស្វែងរកពាក្យគន្លឹះផ្សេងទៀត' : 'Try searching with a different term.'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {departmentsToRender.map((dept) => (
            <div
              key={dept.id}
              className="glass rounded-3xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={getDepartmentImage(dept)}
                  alt={getDepartmentName(dept, isKhmer)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-4 flex-1">
                <div>
                  <h3 className="text-lg font-bold text-[#0B1D2E] group-hover:text-[#0F4C8A] transition-colors">
                    {getDepartmentName(dept, isKhmer)}
                  </h3>
                  {dept.head && (
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {isKhmer ? 'ប្រធានផ្នែក:' : 'Head:'} {dept.head}
                    </p>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {getDepartmentDescription(dept, isKhmer)}
                </p>
                <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-slate-500">
                  <UserCheck className="w-4 h-4 text-[#0F4C8A]" />
                  <span>
                    {dept._count?.doctors ?? 1} {isKhmer ? 'គ្រូពេទ្យ' : 'Doctors'}
                  </span>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
                <Link
                  to={
                    dept.code === 'ONCOLOGY'
                      ? '/oncology'
                      : dept.code === 'GYNECOLOGIC_ONCOLOGY'
                      ? '/gynecologic'
                      : dept.code === 'SURGICAL_ONCOLOGY'
                      ? '/surgery'
                      : dept.code === 'OPD'
                      ? '/opd'
                      : dept.code === 'EMERGENCY'
                      ? '/emergency'
                      : dept.code === 'RADIOLOGY'
                      ? '/radiology'
                      : dept.code === 'LAB'
                      ? '/laboratory'
                      : dept.code === 'ANATOMICAL_PATHOLOGY'
                      ? '/pathology'
                      : dept.code === 'ENDOSCOPY'
                      ? '/endoscopy'
                      : dept.code === 'ICU'
                      ? '/icu'
                      : dept.code === 'PHARMACY'
                      ? '/pharmacy'
                      : dept.code === 'SOCIAL_SERVICES'
                      ? '/social-services'
                      : `/doctors?departmentId=${dept.id}`
                  }
                  className="text-xs font-bold text-[#0F4C8A] hover:underline flex items-center gap-1"
                >
                  <span>
                    {dept.code === 'ONCOLOGY' || dept.code === 'GYNECOLOGIC_ONCOLOGY' || dept.code === 'SURGICAL_ONCOLOGY' || dept.code === 'OPD' || dept.code === 'EMERGENCY' || dept.code === 'RADIOLOGY' || dept.code === 'LAB' || dept.code === 'ANATOMICAL_PATHOLOGY' || dept.code === 'ENDOSCOPY' || dept.code === 'ICU' || dept.code === 'PHARMACY' || dept.code === 'SOCIAL_SERVICES'
                      ? isKhmer
                        ? 'មើលផ្នែក'
                        : 'View Department'
                      : isKhmer
                      ? 'មើលគ្រូពេទ្យក្នុងផ្នែកនេះ'
                      : 'View Specialists'}
                  </span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
