import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
import { Department, Doctor } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../components/Toast';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { Calendar, CheckCircle2, Clock, User, Phone, Mail, FileText } from 'lucide-react';

const appointmentFormSchema = z.object({
  patientName: z.string().min(2, 'Patient full name is required'),
  patientPhone: z.string().min(8, 'Please enter a valid phone number'),
  patientEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  dob: z.string().optional(),
  gender: z.string().min(1, 'Please select gender'),
  departmentId: z.string().min(1, 'Please select a medical department'),
  doctorId: z.string().optional(),
  appointmentDate: z.string().min(1, 'Please select appointment date'),
  preferredTime: z.string().min(1, 'Please select preferred time slot'),
  reason: z.string().min(5, 'Please briefly describe your medical concern'),
});

type FormValues = z.infer<typeof appointmentFormSchema>;

export const AppointmentPage: React.FC = () => {
  const { isKhmer } = useLanguage();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [submittedAppointment, setSubmittedAppointment] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  const defaultDoctorId = searchParams.get('doctorId') || '';
  const defaultDeptId = searchParams.get('departmentId') || '';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      gender: 'Male',
      departmentId: defaultDeptId,
      doctorId: defaultDoctorId,
      preferredTime: '09:00 AM',
      reason: '',
    },
  });

  const selectedDepartmentId = watch('departmentId');

  // Fetch departments
  const { data: departments } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const res = await api.get('/departments');
      return res.data.data as Department[];
    },
  });

  // Fetch doctors filtered by selected department
  const { data: doctors } = useQuery({
    queryKey: ['doctors-filtered', selectedDepartmentId],
    queryFn: async () => {
      const res = await api.get('/doctors', {
        params: { departmentId: selectedDepartmentId || undefined },
      });
      return res.data.data as Doctor[];
    },
    enabled: true,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
      const payload = {
        patientName: values.patientName,
        patientPhone: values.patientPhone,
        patientEmail: values.patientEmail || undefined,
        dob: values.dob || undefined,
        gender: values.gender,
        departmentId: parseInt(values.departmentId, 10),
        doctorId: values.doctorId ? parseInt(values.doctorId, 10) : undefined,
        appointmentDate: values.appointmentDate,
        preferredTime: values.preferredTime,
        reason: values.reason,
      };

      const res = await api.post('/appointments', payload);
      if (res.data.success) {
        success('Appointment booked successfully!');
        setSubmittedAppointment(res.data.data);
      }
    } catch (err: any) {
      toastError(err.message || 'Failed to submit appointment booking.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-[#0B1D2E] font-serif">
          {isKhmer ? 'កក់ការណាត់ជួបពិនិត្យជំងឺ' : 'Book a Medical Appointment'}
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          {isKhmer
            ? 'សូមបំពេញព័ត៌មានខាងក្រោម ដើម្បីកក់ការណាត់ជួបជាមួយគ្រូពេទ្យជំនាញនៃមន្ទីរពេទ្យ ហ្លួងម៉ែ។'
            : 'Fill out the form below to schedule a consultation with our medical specialists.'}
        </p>
      </div>

      {submittedAppointment ? (
        /* Confirmation Screen */
        <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-md text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#0B1D2E]">
              {isKhmer ? 'កក់ការណាត់ជួបរួចរាល់!' : 'Appointment Booking Confirmed'}
            </h2>
            <p className="text-sm text-slate-600">
              {isKhmer
                ? 'យើងខ្ញុំបានទទួលសំណើរបស់អ្នកហើយ។ ក្រុមការងារយើងនឹងទាក់ទងបញ្ជាក់ផ្លូវការក្នុងពេលឆាប់ៗ។'
                : 'Your appointment request has been submitted. Our hospital staff will contact you shortly.'}
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 text-left space-y-3 border border-slate-100 max-w-md mx-auto text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">{isKhmer ? 'កូដណាត់ជួប:' : 'Reference ID:'}</span>
              <span className="font-bold text-[#0F4C8A]">#APT-{submittedAppointment.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{isKhmer ? 'ឈ្មោះអ្នកជំងឺ:' : 'Patient Name:'}</span>
              <span className="font-semibold text-slate-800">{submittedAppointment.patientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{isKhmer ? 'ថ្ងៃណាត់ជួប:' : 'Date:'}</span>
              <span className="font-semibold text-slate-800">
                {new Date(submittedAppointment.appointmentDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{isKhmer ? 'ម៉ោង preferred:' : 'Time Slot:'}</span>
              <span className="font-semibold text-slate-800">{submittedAppointment.preferredTime}</span>
            </div>
          </div>

          <Button onClick={() => setSubmittedAppointment(null)} variant="outline">
            {isKhmer ? 'កក់ការណាត់ជួបថ្មី' : 'Book Another Appointment'}
          </Button>
        </div>
      ) : (
        /* Form */
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label={isKhmer ? 'ឈ្មោះអ្នកជំងឺ' : 'Patient Full Name'}
              placeholder="e.g. Sophea Keo"
              icon={User}
              required
              error={errors.patientName?.message}
              {...register('patientName')}
            />

            <Input
              label={isKhmer ? 'លេខទូរស័ព្ទ' : 'Phone Number'}
              placeholder="e.g. 012-345-678"
              icon={Phone}
              required
              error={errors.patientPhone?.message}
              {...register('patientPhone')}
            />

            <Input
              label={isKhmer ? 'អ៊ីមែល (ជម្រើស)' : 'Email Address (Optional)'}
              placeholder="e.g. patient@gmail.com"
              icon={Mail}
              error={errors.patientEmail?.message}
              {...register('patientEmail')}
            />

            <Select
              label={isKhmer ? 'ភេទ' : 'Gender'}
              required
              error={errors.gender?.message}
              options={[
                { value: 'Male', label: isKhmer ? 'ប្រុស (Male)' : 'Male' },
                { value: 'Female', label: isKhmer ? 'ស្រី (Female)' : 'Female' },
              ]}
              {...register('gender')}
            />

            <Select
              label={isKhmer ? 'ជ្រើសរើសនាយកដ្ឋាន' : 'Select Department'}
              required
              error={errors.departmentId?.message}
              placeholder={isKhmer ? '-- ជ្រើសរើសនាយកដ្ឋាន --' : '-- Select Department --'}
              options={
                departments?.map((d) => ({
                  value: d.id,
                  label: isKhmer && d.nameKm ? d.nameKm : d.name,
                })) || []
              }
              {...register('departmentId')}
            />

            <Select
              label={isKhmer ? 'ជ្រើសរើសគ្រូពេទ្យ (ជម្រើស)' : 'Select Specialist Doctor (Optional)'}
              placeholder={isKhmer ? '-- គ្រូពេទ្យណាមួយ --' : '-- Any Available Doctor --'}
              options={
                doctors?.map((doc) => ({
                  value: doc.id,
                  label: `${isKhmer && doc.nameKm ? doc.nameKm : doc.name} (${doc.specialty})`,
                })) || []
              }
              {...register('doctorId')}
            />

            <Input
              type="date"
              label={isKhmer ? 'ថ្ងៃណាត់ជួប' : 'Preferred Date'}
              icon={Calendar}
              required
              error={errors.appointmentDate?.message}
              {...register('appointmentDate')}
            />

            <Select
              label={isKhmer ? 'ម៉ោងណាត់ជួប' : 'Preferred Time Slot'}
              required
              error={errors.preferredTime?.message}
              options={[
                { value: '08:30 AM', label: '08:30 AM' },
                { value: '09:30 AM', label: '09:30 AM' },
                { value: '10:30 AM', label: '10:30 AM' },
                { value: '02:00 PM', label: '02:00 PM' },
                { value: '03:30 PM', label: '03:30 PM' },
              ]}
              {...register('preferredTime')}
            />
          </div>

          <Textarea
            label={isKhmer ? 'មូលហេតុ ឬរោគសញ្ញា' : 'Reason for Visit / Medical Notes'}
            placeholder={isKhmer ? 'រៀបរាប់ពីអាការៈ ឬមូលហេតុនៃការពិនិត្យ...' : 'Describe your symptoms or reason for visit...'}
            required
            error={errors.reason?.message}
            {...register('reason')}
          />

          <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
            >
              {isKhmer ? 'បោះបង់' : 'Cancel'}
            </Button>
            <Button type="submit" isLoading={submitting}>
              {isKhmer ? 'បញ្ជូនការកក់' : 'Submit Appointment'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
