import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery as useQueryReact } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../components/Toast';
import { api } from '../api/axios';
import { Appointment, Doctor, Department, Bed, ContactInquiry, User, AuditLog } from '../types';
import { Search } from '../components/Search';
import { Pagination } from '../components/Pagination';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { HospitalLogo } from '../components/HospitalLogo';
import { Modal } from '../components/Modal';
import { DeleteConfirmDialog } from '../components/Dialog';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';
import { TableSkeleton } from '../components/Loading';
import { EmptyState } from '../components/EmptyState';
import {
  LayoutDashboard,
  Calendar,
  Stethoscope,
  Building2,
  BedDouble,
  MessageSquare,
  Users,
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  XCircle,
  LogOut,
  Send,
  Eye,
} from 'lucide-react';

const doctorImageList = [
  '/image/dr1.jpg',
  '/image/dr2.jpg',
  '/image/dr3.jpg',
  '/image/dr4.jpg',
  '/image/dr5.jpg',
  '/image/dr6.jpg',
  '/image/dr7.jpg',
];

const getDoctorImage = (doctor: { id?: number; image?: string | null; name?: string }) => {
  if (doctor.image && !doctor.image.startsWith('http')) {
    return doctor.image;
  }

  const doctorIndex = Number(doctor.id ?? 0) || 1;
  const imageIndex = ((doctorIndex - 1) % doctorImageList.length + doctorImageList.length) % doctorImageList.length;
  return doctorImageList[imageIndex] ?? doctorImageList[0];
};

export const AdminPage: React.FC = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const { isKhmer } = useLanguage();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'doctors' | 'departments' | 'beds' | 'inquiries' | 'users' | 'audit'>('overview');

  // Appointments State
  const [apptSearch, setApptSearch] = useState('');
  const [apptStatus, setApptStatus] = useState('');
  const [apptPage, setApptPage] = useState(1);
  const [deleteApptId, setDeleteApptId] = useState<number | null>(null);

  // Doctors State
  const [docSearch, setDocSearch] = useState('');
  const [docPage, setDocPage] = useState(1);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Doctor | null>(null);
  const [deleteDocId, setDeleteDocId] = useState<number | null>(null);

  // Doctor Form Inputs
  const [docName, setDocName] = useState('');
  const [docSpec, setDocSpec] = useState('');
  const [docDeptId, setDocDeptId] = useState('');
  const [docExp, setDocExp] = useState('');
  const [docLang, setDocLang] = useState('');

  // Inquiry Reply Modal
  const [replyInq, setReplyInq] = useState<ContactInquiry | null>(null);
  const [replyText, setReplyText] = useState('');

  // Protect Admin Route
  if (!authLoading && !user) {
    navigate('/login');
    return null;
  }

  // --- API QUERIES ---
  const { data: dashboardData, isLoading: dashLoading } = useQueryReact({
    queryKey: ['dashboard-summary'],
    queryFn: async () => {
      const res = await api.get('/dashboard');
      return res.data.data;
    },
    enabled: !!user,
  });

  const { data: apptData, isLoading: apptLoading } = useQueryReact({
    queryKey: ['admin-appointments', apptSearch, apptStatus, apptPage],
    queryFn: async () => {
      const res = await api.get('/appointments', {
        params: { search: apptSearch, status: apptStatus, page: apptPage, limit: 10 },
      });
      return {
        items: res.data.data as Appointment[],
        pagination: res.data.pagination,
      };
    },
    enabled: !!user && activeTab === 'appointments',
  });

  const { data: docData, isLoading: docLoading } = useQueryReact({
    queryKey: ['admin-doctors', docSearch, docPage],
    queryFn: async () => {
      const res = await api.get('/doctors', {
        params: { search: docSearch, page: docPage, limit: 10 },
      });
      return {
        items: res.data.data as Doctor[],
        pagination: res.data.pagination,
      };
    },
    enabled: !!user && (activeTab === 'doctors' || isDocModalOpen),
  });

  const { data: deptsData } = useQueryReact({
    queryKey: ['admin-departments'],
    queryFn: async () => {
      const res = await api.get('/departments');
      return res.data.data as Department[];
    },
    enabled: !!user,
  });

  const { data: bedsData } = useQueryReact({
    queryKey: ['admin-beds'],
    queryFn: async () => {
      const res = await api.get('/beds');
      return {
        items: res.data.data as Bed[],
        summary: res.data.summary,
      };
    },
    enabled: !!user && activeTab === 'beds',
  });

  const { data: inquiriesData } = useQueryReact({
    queryKey: ['admin-inquiries'],
    queryFn: async () => {
      const res = await api.get('/contacts');
      return res.data.data as ContactInquiry[];
    },
    enabled: !!user && activeTab === 'inquiries',
  });

  const { data: usersData } = useQueryReact({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await api.get('/users');
      return res.data.data as User[];
    },
    enabled: !!user && activeTab === 'users',
  });

  const { data: auditData } = useQueryReact({
    queryKey: ['admin-audit'],
    queryFn: async () => {
      const res = await api.get('/audit-logs');
      return res.data.data as AuditLog[];
    },
    enabled: !!user && activeTab === 'audit',
  });

  // --- ACTIONS ---
  const handleUpdateApptStatus = async (id: number, status: string) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      success(`Appointment status updated to ${status}`);
      queryClient.invalidateQueries({ queryKey: ['admin-appointments'] });
    } catch {
      toastError('Failed to update appointment status');
    }
  };

  const handleDeleteAppt = async () => {
    if (!deleteApptId) return;
    try {
      await api.delete(`/appointments/${deleteApptId}`);
      success('Appointment deleted successfully');
      setDeleteApptId(null);
      queryClient.invalidateQueries({ queryKey: ['admin-appointments'] });
    } catch {
      toastError('Failed to delete appointment');
    }
  };

  const handleSaveDoctor = async () => {
    if (!docName || !docSpec) {
      toastError('Please fill in doctor name and specialty');
      return;
    }
    try {
      const payload = {
        name: docName,
        specialty: docSpec,
        departmentId: docDeptId ? parseInt(docDeptId, 10) : undefined,
        experience: docExp,
        languages: docLang,
      };

      if (editingDoc) {
        await api.put(`/doctors/${editingDoc.id}`, payload);
        success('Doctor record updated successfully');
      } else {
        await api.post('/doctors', payload);
        success('New doctor added successfully');
      }

      setIsDocModalOpen(false);
      setEditingDoc(null);
      setDocName('');
      setDocSpec('');
      queryClient.invalidateQueries({ queryKey: ['admin-doctors'] });
    } catch {
      toastError('Failed to save doctor record');
    }
  };

  const handleDeleteDoctor = async () => {
    if (!deleteDocId) return;
    try {
      await api.delete(`/doctors/${deleteDocId}`);
      success('Doctor record deleted');
      setDeleteDocId(null);
      queryClient.invalidateQueries({ queryKey: ['admin-doctors'] });
    } catch {
      toastError('Failed to delete doctor');
    }
  };

  const handleReplyInquiry = async () => {
    if (!replyInq || !replyText) return;
    try {
      await api.post(`/contacts/${replyInq.id}/reply`, { replyMessage: replyText });
      success('Reply sent successfully');
      setReplyInq(null);
      setReplyText('');
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
    } catch {
      toastError('Failed to send reply');
    }
  };

  const handleToggleBedStatus = async (bed: Bed) => {
    const newStatus = bed.status === 'AVAILABLE' ? 'OCCUPIED' : 'AVAILABLE';
    try {
      await api.put(`/beds/${bed.id}`, {
        status: newStatus,
        patientName: newStatus === 'OCCUPIED' ? 'Admitted Patient' : null,
      });
      success(`Bed ${bed.bedNumber} marked as ${newStatus}`);
      queryClient.invalidateQueries({ queryKey: ['admin-beds'] });
    } catch {
      toastError('Failed to update bed status');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#0B1D2E] text-white py-4 px-6 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 overflow-hidden flex items-center justify-center">
            <HospitalLogo className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-base font-bold font-serif">LUANG MÈ HOSPITAL ADMIN</div>
            <div className="text-xs text-emerald-400 font-semibold">Hospital Operations & Management</div>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img src={user.avatar} alt={user.fullName} className="w-9 h-9 rounded-full object-cover border" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold">
                  {user.fullName.charAt(0)}
                </div>
              )}
              <div className="hidden sm:block text-right">
                <div className="text-sm font-bold">{user.fullName}</div>
                <Badge variant="info" className="text-[9px]">
                  {user.role}
                </Badge>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => logout().then(() => navigate('/login'))}
              icon={LogOut}
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
            >
              Logout
            </Button>
          </div>
        )}
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-1 bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm space-y-1 h-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'overview' ? 'bg-[#0F4C8A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'appointments' ? 'bg-[#0F4C8A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointments</span>
          </button>

          <button
            onClick={() => setActiveTab('doctors')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'doctors' ? 'bg-[#0F4C8A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Doctors</span>
          </button>

          <button
            onClick={() => setActiveTab('departments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'departments' ? 'bg-[#0F4C8A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Departments</span>
          </button>

          <button
            onClick={() => setActiveTab('beds')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'beds' ? 'bg-[#0F4C8A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <BedDouble className="w-4 h-4" />
            <span>Ward Beds</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'inquiries' ? 'bg-[#0F4C8A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquiries</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'users' ? 'bg-[#0F4C8A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Users & Roles</span>
          </button>

          {user?.role === 'ADMIN' && (
            <button
              onClick={() => setActiveTab('audit')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'audit' ? 'bg-[#0F4C8A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Audit Logs</span>
            </button>
          )}
        </aside>

        {/* Tab Content Panel */}
        <main className="lg:col-span-4 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Total Appointments</div>
                  <div className="text-2xl font-bold text-[#0B1D2E]">{dashboardData?.metrics?.totalPatients || 0}</div>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Active Doctors</div>
                  <div className="text-2xl font-bold text-[#0F4C8A]">{dashboardData?.metrics?.activeDoctors || 0}</div>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Bed Occupancy Rate</div>
                  <div className="text-2xl font-bold text-emerald-600">{dashboardData?.metrics?.bedOccupancyRate || 78}%</div>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Unread Inquiries</div>
                  <div className="text-2xl font-bold text-amber-600">{dashboardData?.metrics?.unreadInquiries || 0}</div>
                </div>
              </div>

              {/* Department Occupancy Status */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#0B1D2E]">Department Bed Capacity & Occupancy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboardData?.departments?.map((dept: Department) => (
                    <div key={dept.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                      <div className="flex justify-between items-center text-xs font-bold text-[#0B1D2E]">
                        <span>{dept.name}</span>
                        <span>{dept.occupancy}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#0F4C8A] h-full rounded-full transition-all"
                          style={{ width: `${dept.occupancy}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-[#0B1D2E]">Appointments Manager</h3>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Search value={apptSearch} onChange={setApptSearch} placeholder="Search patient..." />
                  <select
                    value={apptStatus}
                    onChange={(e) => setApptStatus(e.target.value)}
                    className="text-xs font-medium rounded-xl border border-slate-200 bg-white px-3 py-2.5"
                  >
                    <option value="">All Statuses</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>

              {apptLoading ? (
                <TableSkeleton />
              ) : !apptData || apptData.items.length === 0 ? (
                <EmptyState title="No appointments found" />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Patient</th>
                        <th className="p-3">Doctor / Dept</th>
                        <th className="p-3">Date & Time</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {apptData.items.map((appt) => (
                        <tr key={appt.id} className="hover:bg-slate-50/50">
                          <td className="p-3">
                            <div className="font-bold text-[#0B1D2E]">{appt.patientName}</div>
                            <div className="text-slate-400">{appt.patientPhone}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium text-slate-800">{appt.doctor?.name || 'Any Available'}</div>
                            <div className="text-slate-400">{appt.department?.name}</div>
                          </td>
                          <td className="p-3 font-medium text-slate-700">
                            {new Date(appt.appointmentDate).toLocaleDateString()}
                            <div className="text-slate-400">{appt.preferredTime}</div>
                          </td>
                          <td className="p-3">
                            <select
                              value={appt.status}
                              onChange={(e) => handleUpdateApptStatus(appt.id, e.target.value)}
                              className="text-xs font-bold rounded-lg border px-2 py-1 bg-white"
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setDeleteApptId(appt.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {apptData.pagination && (
                    <Pagination
                      page={apptData.pagination.page}
                      totalPages={apptData.pagination.totalPages}
                      total={apptData.pagination.total}
                      limit={apptData.pagination.limit}
                      onPageChange={setApptPage}
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DOCTORS */}
          {activeTab === 'doctors' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-[#0B1D2E]">Doctor Records Manager</h3>
                <Button
                  onClick={() => {
                    setEditingDoc(null);
                    setDocName('');
                    setDocSpec('');
                    setIsDocModalOpen(true);
                  }}
                  icon={Plus}
                >
                  Add Doctor
                </Button>
              </div>

              {docLoading ? (
                <TableSkeleton />
              ) : !docData || docData.items.length === 0 ? (
                <EmptyState title="No doctor records found" />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b">
                      <tr>
                        <th className="p-3">Doctor</th>
                        <th className="p-3">Specialty</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {docData.items.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50/50">
                          <td className="p-3 font-bold text-[#0B1D2E] flex items-center gap-3">
                            <img
                              src={getDoctorImage(doc)}
                              alt=""
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span>{doc.name}</span>
                          </td>
                          <td className="p-3 font-medium text-slate-700">{doc.specialty}</td>
                          <td className="p-3 text-slate-500">{doc.department?.name || 'General'}</td>
                          <td className="p-3">
                            <Badge variant={doc.status === 'active' ? 'success' : 'neutral'}>
                              {doc.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-right space-x-1">
                            <button
                              onClick={() => {
                                setEditingDoc(doc);
                                setDocName(doc.name);
                                setDocSpec(doc.specialty);
                                setIsDocModalOpen(true);
                              }}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteDocId(doc.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DEPARTMENTS */}
          {activeTab === 'departments' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#0B1D2E]">Departments Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {deptsData?.map((dept) => (
                  <div key={dept.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 space-y-2">
                    <div className="flex justify-between items-center font-bold text-sm text-[#0B1D2E]">
                      <span>{dept.name}</span>
                      <Badge variant="info">{dept.beds} Beds</Badge>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{dept.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BEDS */}
          {activeTab === 'beds' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#0B1D2E]">Ward Bed Occupancy Manager</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {bedsData?.items.map((bed) => (
                  <div
                    key={bed.id}
                    className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                      bed.status === 'OCCUPIED'
                        ? 'bg-red-50 border-red-200 text-red-900'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    }`}
                  >
                    <div className="flex justify-between font-bold">
                      <span>{bed.bedNumber}</span>
                      <span>{bed.status}</span>
                    </div>
                    <div className="text-[11px] opacity-80">{bed.wardName}</div>
                    <button
                      onClick={() => handleToggleBedStatus(bed)}
                      className="w-full py-1 rounded-lg text-[10px] font-bold border bg-white shadow-xs hover:bg-slate-100"
                    >
                      Toggle Status
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#0B1D2E]">Contact Inquiries Inbox</h3>
              <div className="divide-y divide-slate-100">
                {inquiriesData?.map((inq) => (
                  <div key={inq.id} className="py-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-sm text-[#0B1D2E]">{inq.name}</span>
                        <span className="text-xs text-slate-400 ml-2">({inq.email})</span>
                        <div className="text-xs font-semibold text-[#0F4C8A] mt-0.5">{inq.subject}</div>
                      </div>
                      <Badge variant={inq.status === 'REPLIED' ? 'success' : 'warning'}>
                        {inq.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">{inq.message}</p>
                    {inq.replyMessage && (
                      <div className="text-xs text-emerald-800 bg-emerald-50 p-3 rounded-xl font-medium border border-emerald-100">
                        <strong>Reply:</strong> {inq.replyMessage}
                      </div>
                    )}
                    {inq.status !== 'REPLIED' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setReplyInq(inq);
                          setReplyText('');
                        }}
                      >
                        Reply
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: USERS */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#0B1D2E]">User Accounts & Roles</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="p-3">User</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {usersData?.map((u) => (
                      <tr key={u.id}>
                        <td className="p-3 font-bold">{u.fullName}</td>
                        <td className="p-3 text-slate-600">{u.email}</td>
                        <td className="p-3">
                          <Badge variant="info">{u.role}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: AUDIT LOGS */}
          {activeTab === 'audit' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#0B1D2E]">System Audit Trail</h3>
              <div className="space-y-2 text-xs">
                {auditData?.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                    <div>
                      <span className="font-bold text-[#0F4C8A]">{log.action}</span> - {log.details}
                    </div>
                    <span className="text-slate-400">{new Date(log.createdAt).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Delete Appointment Dialog */}
      <DeleteConfirmDialog
        isOpen={deleteApptId !== null}
        onClose={() => setDeleteApptId(null)}
        onConfirm={handleDeleteAppt}
      />

      {/* Delete Doctor Dialog */}
      <DeleteConfirmDialog
        isOpen={deleteDocId !== null}
        onClose={() => setDeleteDocId(null)}
        onConfirm={handleDeleteDoctor}
      />

      {/* Doctor Modal */}
      <Modal isOpen={isDocModalOpen} onClose={() => setIsDocModalOpen(false)} title="Doctor Record">
        <div className="space-y-4">
          <Input label="Doctor Full Name" value={docName} onChange={(e) => setDocName(e.target.value)} />
          <Input label="Specialty" value={docSpec} onChange={(e) => setDocSpec(e.target.value)} />
          <Select
            label="Department"
            value={docDeptId}
            onChange={(e) => setDocDeptId(e.target.value)}
            options={deptsData?.map((d) => ({ value: d.id, label: d.name })) || []}
          />
          <Input label="Experience" value={docExp} onChange={(e) => setDocExp(e.target.value)} />
          <Input label="Languages" value={docLang} onChange={(e) => setDocLang(e.target.value)} />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsDocModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDoctor}>Save</Button>
          </div>
        </div>
      </Modal>

      {/* Reply Inquiry Modal */}
      <Modal isOpen={replyInq !== null} onClose={() => setReplyInq(null)} title="Reply to Inquiry">
        <div className="space-y-4">
          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
            <strong>Original Message:</strong> {replyInq?.message}
          </div>
          <Textarea
            label="Reply Message"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your response to the patient..."
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setReplyInq(null)}>
              Cancel
            </Button>
            <Button onClick={handleReplyInquiry} icon={Send}>
              Send Reply
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
