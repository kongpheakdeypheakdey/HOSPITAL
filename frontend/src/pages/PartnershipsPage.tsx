import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/axios';
import { Partnership } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { CardSkeleton } from '../components/Loading';
import { EmptyState } from '../components/EmptyState';
import { Building2, Globe2, GraduationCap } from 'lucide-react';

const getPartnerTypeLabel = (type: string, isKhmer: boolean) => {
  const map: Record<string, { en: string; km: string }> = {
    'UN Agency': { en: 'UN Agency', km: 'អង្គភាពអន្តរជាតិ' },
    'Medical Organization': { en: 'Medical Organization', km: 'អង្គការពេទ្យ' },
    'Volunteer Program': { en: 'Volunteer Program', km: 'កម្មវិធីស្ម័គ្រចិត្ត' },
    Donation: { en: 'Donation', km: 'ការបរិច្ចាគ' },
    'Cancer Institute': { en: 'Cancer Institute', km: 'វិទ្យាស្ថានជំងឺមហារីក' },
    Hospital: { en: 'Hospital', km: 'មន្ទីរពេទ្យ' },
    Organization: { en: 'Organization', km: 'អង្គការ' },
    Academic: { en: 'Academic', km: 'សិក្សា' },
    'Medical School': { en: 'Medical School', km: 'វិទ្យាស្ថានវេជ្ជសាស្ត្រ' },
  };

  const value = map[type] ?? { en: type, km: type };
  return isKhmer ? value.km : value.en;
};

const getCountryLabel = (country: string, isKhmer: boolean) => {
  const map: Record<string, { en: string; km: string }> = {
    Cambodia: { en: 'Cambodia', km: 'កម្ពុជា' },
    International: { en: 'International', km: 'អន្តរជាតិ' },
    Australia: { en: 'Australia', km: 'អូស្ត្រាលី' },
    France: { en: 'France', km: 'បារាំង' },
    'South Korea': { en: 'South Korea', km: 'កូរ៉េ' },
    China: { en: 'China', km: 'ចិន' },
  };

  const value = map[country] ?? { en: country, km: country };
  return isKhmer ? value.km : value.en;
};

export const PartnershipsPage: React.FC = () => {
  const { isKhmer } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ['partnerships'],
    queryFn: async () => {
      const res = await api.get('/partnerships');
      return (res.data.data as Partnership[]) || [];
    },
  });

  const nationalPartners = (data ?? []).filter((part) => part.country === 'Cambodia');

  const internationalPartners = (data ?? []).filter((part) => part.country !== 'Cambodia');

  const renderCard = (part: Partnership) => (
    <div
      key={part.id}
      className="group rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,25,42,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,25,42,0.08)]"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          {part.image ? (
            <img src={part.image} alt={part.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-2xl">{part.icon || '🏥'}</span>
          )}
        </div>
        <span className="rounded-full bg-[#0F4C8A]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0F4C8A]">
          {getPartnerTypeLabel(part.type, isKhmer)}
        </span>
      </div>

      <div className="mb-3">
        <h3 className="text-lg font-bold text-[#0B1D2E] group-hover:text-[#0F4C8A]">
          {isKhmer && part.nameKm ? part.nameKm : part.name}
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          {getCountryLabel(part.country, isKhmer)}
        </p>
      </div>

      <p className="text-sm leading-7 text-slate-600">
        {isKhmer && part.descKm ? part.descKm : part.description}
      </p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#0F4C8A]/20 bg-[#0F4C8A]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F4C8A]">
          <Building2 className="h-3.5 w-3.5" />
          {isKhmer ? 'ដៃគូកិច្ចសហប្រតិបត្តិការទាំងអស់' : 'Our Partnerships'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D2E] font-serif">
          {isKhmer ? 'កិច្ចសហប្រតិបត្តិការក្នុង និងអន្តរជាតិ' : 'National and International Partnerships'}
        </h1>
        <p className="text-sm text-slate-600">
          {isKhmer
            ? 'មន្ទីរពេទ្យ ហ្លួងម៉ែ សហការជាមួយស្ថាប័នសាធារណៈ សាកលវិទ្យាល័យ និងអង្គការអន្តរជាតិ ដើម្បីបង្កើនគុណភាពសុខភាព និងការអប់រំវេជ្ជសាស្ត្រ។'
            : 'Luang Mè Hospital collaborates with academic institutions, healthcare organizations, and international partners to advance quality care and medical education.'}
        </p>
      </div>

      {isLoading ? (
        <CardSkeleton count={4} />
      ) : !data || data.length === 0 ? (
        <EmptyState title={isKhmer ? 'មិនមានទិន្នន័យដៃគូ' : 'No partnerships listed'} />
      ) : (
        <div className="space-y-10">
          <section className="rounded-[30px] border border-slate-200 bg-slate-50 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F4C8A]/10 text-[#0F4C8A]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#0B1D2E]">
                {isKhmer ? 'ដៃគូក្នុងប្រទេស' : 'National Partnerships'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {nationalPartners.length > 0 ? nationalPartners.map(renderCard) : <p className="text-slate-500">{isKhmer ? 'មិនមានដៃគូក្នុងประเทศ' : 'No national partnerships available.'}</p>}
            </div>
          </section>

          <section className="rounded-[30px] border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F4C8A]/10 text-[#0F4C8A]">
                <Globe2 className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#0B1D2E]">
                {isKhmer ? 'កិច្ចសហប្រតិបត្តិការអន្តរជាតិ' : 'International Partnerships'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {internationalPartners.length > 0 ? internationalPartners.map(renderCard) : <p className="text-slate-500">{isKhmer ? 'មិនមានដៃគូអន្តរជាតិ' : 'No international partnerships available.'}</p>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
