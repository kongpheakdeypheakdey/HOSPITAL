import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/axios';
import { useLanguage } from '../contexts/LanguageContext';
import { ShieldAlert, PhoneCall, BedDouble, AlertCircle, Ambulance, Clock, CheckCircle2 } from 'lucide-react';

export const EmergencyPage: React.FC = () => {
  const { isKhmer } = useLanguage();

  const { data: bedSummary } = useQuery({
    queryKey: ['beds-summary'],
    queryFn: async () => {
      const res = await api.get('/beds');
      return res.data.summary;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden space-y-6">
        <div className="flex items-center gap-3 text-red-200 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-5 h-5 animate-bounce" />
          <span>{isKhmer ? 'សេវាសង្គ្រោះបន្ទាន់ ២៤ម៉ោង / ៧ថ្ងៃ' : '24/7 National Emergency Trauma Response'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-serif leading-tight">
          {isKhmer ? 'ហៅទូរស័ព្ទសង្គ្រោះបន្ទាន់ភ្លាមៗ' : 'Immediate Emergency Care'}
        </h1>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="tel:010228965"
            className="px-8 py-4 bg-white text-red-700 hover:bg-slate-100 rounded-2xl font-extrabold text-xl sm:text-2xl shadow-lg flex items-center gap-3 transition-transform hover:scale-105"
          >
            <PhoneCall className="w-6 h-6" />
            <span>010-228-965</span>
          </a>
        </div>
      </div>

      {/* Real-time Ward Bed Status */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#0B1D2E] flex items-center gap-2">
              <BedDouble className="w-5 h-5 text-[#0F4C8A]" />
              {isKhmer ? 'ស្ថានភាពគ្រែអ្នកជំងឺពេលនេះ' : 'Live Hospital Bed Occupancy Status'}
            </h2>
            <p className="text-xs text-slate-500">
              {isKhmer ? 'បច្ចុប្បន្នភាពគ្រែសង្គ្រោះបន្ទាន់ និងគ្រែព្យាបាល' : 'Real-time monitoring of available emergency & ICU beds.'}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              {bedSummary?.availableBeds || 6} {isKhmer ? 'គ្រែទំនេរ' : 'Beds Available'}
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200">
              {bedSummary?.occupiedBeds || 19} {isKhmer ? 'គ្រែមានអ្នកជំងឺ' : 'Beds Occupied'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="text-2xl font-bold text-[#0B1D2E]">{bedSummary?.totalBeds || 25}</div>
            <div className="text-xs text-slate-500 font-medium">{isKhmer ? 'គ្រែសរុប' : 'Total Capacity'}</div>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
            <div className="text-2xl font-bold text-emerald-700">{bedSummary?.availableBeds || 6}</div>
            <div className="text-xs text-emerald-600 font-medium">{isKhmer ? 'គ្រែទំនេរ' : 'Available Right Now'}</div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="text-2xl font-bold text-[#0F4C8A]">{bedSummary?.occupancyRate || 76}%</div>
            <div className="text-xs text-slate-500 font-medium">{isKhmer ? 'អត្រាប្រើប្រាស់' : 'Occupancy Rate'}</div>
          </div>
        </div>
      </div>

      {/* Emergency Action Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#0B1D2E] font-serif text-center">
          {isKhmer ? 'ជំហានឆ្លើយតបសង្គ្រោះបន្ទាន់' : 'Emergency Triage & Response Steps'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="text-base font-bold text-[#0B1D2E]">
              {isKhmer ? 'ហៅទូរស័ព្ទមកក្រុមសង្គ្រោះ' : 'Call Emergency Hotline'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isKhmer
                ? 'ផ្តល់ព័ត៌មានទីតាំងច្បាស់លាស់ ស្ថានភាពអ្នកជំងឺ និងលេខទូរស័ព្ទទាក់ទង។'
                : 'State your exact location, patient condition, and contact number clearly.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F4C8A]/10 text-[#0F4C8A] flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="text-base font-bold text-[#0B1D2E]">
              {isKhmer ? 'ការរៀបចំរថយន្តសង្គ្រោះ' : 'Ambulance Dispatch'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isKhmer
                ? 'រថយន្តសង្គ្រោះបន្ទាន់ ជាមួយគ្រូពេទ្យសង្គ្រោះ នឹងចេញដំណើរភ្លាមៗ។'
                : 'Mobile intensive ambulance unit is dispatched immediately with life-support gear.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="text-base font-bold text-[#0B1D2E]">
              {isKhmer ? 'ការទទួលព្យាបាលភ្លាមៗ' : 'Immediate ER Admission'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isKhmer
                ? 'ក្រុមគ្រូពេទ្យត្រៀមខ្លួនជាស្រេចនៅបន្ទប់សង្គ្រោះបន្ទាន់ ER។'
                : 'Multi-disciplinary trauma team ready at ER bay upon arrival.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
