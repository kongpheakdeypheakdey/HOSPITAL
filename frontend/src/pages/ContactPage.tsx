import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '../api/axios';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../components/Toast';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const ContactPage: React.FC = () => {
  const { isKhmer } = useLanguage();
  const { success, error: toastError } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      setSubmitting(true);
      const res = await api.post('/contacts', values);
      if (res.data.success) {
        success('Your message has been sent successfully!');
        setSubmitted(true);
        reset();
      }
    } catch (err: any) {
      toastError(err.message || 'Failed to send message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1D2E] font-serif">
          {isKhmer ? 'ទំនាក់ទំនងមកកាន់មន្ទីរពេទ្យ' : 'Contact Luang Mè Hospital'}
        </h1>
        <p className="text-sm text-slate-600">
          {isKhmer
            ? 'មានចម្ងល់ ឬត្រូវការព័ត៌មានបន្ថែម? សូមផ្ញើសារមកកាន់យើងខ្ញុំ ឬទាក់ទងតាមលេខទូរស័ព្ទខាងក្រោម។'
            : 'Have questions or require information? Reach out to our hospital administration team.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info Sidebar */}
        <div className="bg-gradient-to-br from-[#081f38] via-[#0c2d54] to-[#0f4c8a] text-white rounded-3xl p-8 space-y-8 flex flex-col justify-between shadow-[0_25px_60px_rgba(15,76,138,0.22)]">
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-serif border-l-2 border-sky-300 pl-3">
              {isKhmer ? 'ព័ត៌មានទំនាក់ទំនង' : 'Hospital Details'}
            </h3>

            <ul className="space-y-6 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-300 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">{isKhmer ? 'អាសយដ្ឋាន' : 'Address'}</div>
                  <p className="text-xs text-white/70 mt-0.5">
                    123 Monivong Blvd, Khan Chamkarmon, Phnom Penh, Kingdom of Cambodia
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-300 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">{isKhmer ? 'ទូរស័ព្ទ' : 'Phone Numbers'}</div>
                  <p className="text-xs text-white/70 mt-0.5">
                    OPD: 023-001-100 <br />
                    Emergency: 010-228-965
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-sky-300 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">{isKhmer ? 'វិបសាយ' : 'Website'}</div>
                  <p className="text-xs text-white/70 mt-0.5">www.luangmehospital.com</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-sky-300 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">{isKhmer ? 'ម៉ោងធ្វើការ' : 'Operating Hours'}</div>
                  <p className="text-xs text-white/70 mt-0.5">
                    Emergency: 24/7 Always Open <br />
                    OPD Consultation: Mon - Fri (7:30 AM - 5:00 PM)
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-white/10 text-xs text-white/50">
            {isKhmer ? 'មន្ទីរពេទ្យ ហ្លួងម៉ែ រាជធានីភ្នំពេញ' : 'Luang Mè National Hospital, Phnom Penh'}
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          {submitted ? (
            <div className="text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1D2E]">
                {isKhmer ? 'សាររបស់អ្នកត្រូវបានផ្ញើរួចរាល់!' : 'Thank You for Contacting Us'}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {isKhmer
                  ? 'ក្រុមការងារយើងខ្ញុំបានទទួលសាររបស់អ្នកហើយ ហើយនឹងឆ្លើយតបក្នុងពេលឆាប់ៗ។'
                  : 'We have received your message and our communications team will respond shortly.'}
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline">
                {isKhmer ? 'ផ្ញើសារផ្សេងទៀត' : 'Send Another Message'}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h3 className="text-lg font-bold text-[#0B1D2E]">
                {isKhmer ? 'ទម្រង់ផ្ញើសារសាកសួរ' : 'Send an Inquiry'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label={isKhmer ? 'ឈ្មោះពេញ' : 'Your Full Name'}
                  placeholder="e.g. Sophea Keo"
                  required
                  error={errors.name?.message}
                  {...register('name')}
                />

                <Input
                  label={isKhmer ? 'អាសយដ្ឋានអ៊ីមែល' : 'Email Address'}
                  placeholder="e.g. name@domain.com"
                  required
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label={isKhmer ? 'លេខទូរស័ព្ទ (ជម្រើស)' : 'Phone Number (Optional)'}
                  placeholder="e.g. 012-345-678"
                  {...register('phone')}
                />

                <Input
                  label={isKhmer ? 'ប្រធានបទ' : 'Subject'}
                  placeholder="e.g. Appointment Inquiry"
                  required
                  error={errors.subject?.message}
                  {...register('subject')}
                />
              </div>

              <Textarea
                label={isKhmer ? 'ខ្លឹមសារសារ' : 'Message'}
                placeholder={isKhmer ? 'សរសេរប្រធានបទ ឬសំណួររបស់អ្នកនៅទីនេះ...' : 'Type your question or feedback here...'}
                required
                error={errors.message?.message}
                {...register('message')}
              />

              <div className="flex justify-end">
                <Button type="submit" isLoading={submitting} icon={Send}>
                  {isKhmer ? 'ផ្ញើសារ' : 'Send Message'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
