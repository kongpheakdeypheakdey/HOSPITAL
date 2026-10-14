export type Role = 'ADMIN' | 'MANAGER' | 'STAFF' | 'USER';

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: Role;
  avatar?: string | null;
  phone?: string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Department {
  id: number;
  name: string;
  nameKm?: string | null;
  code?: string | null;
  description?: string | null;
  descKm?: string | null;
  head?: string | null;
  beds: number;
  occupancy: number;
  status: string;
  icon?: string | null;
  image?: string | null;
  _count?: {
    doctors?: number;
    bedsList?: number;
  };
}

export interface Doctor {
  id: number;
  name: string;
  nameKm?: string | null;
  specialty: string;
  specialtyKm?: string | null;
  departmentId?: number | null;
  phone?: string | null;
  email?: string | null;
  experience?: string | null;
  languages?: string | null;
  availability?: string | null;
  status: 'active' | 'inactive' | 'on_leave';
  image?: string | null;
  bio?: string | null;
  department?: Department | null;
}

export interface Appointment {
  id: number;
  patientName: string;
  patientPhone: string;
  patientEmail?: string | null;
  dob?: string | null;
  gender?: string | null;
  departmentId?: number | null;
  doctorId?: number | null;
  appointmentDate: string;
  preferredTime?: string | null;
  reason?: string | null;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  userId?: number | null;
  doctor?: Doctor | null;
  department?: Department | null;
  createdAt?: string;
}

export interface Bed {
  id: number;
  bedNumber: string;
  wardName: string;
  departmentId?: number | null;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'CLEANING';
  patientName?: string | null;
  admittedAt?: string | null;
  department?: Department | null;
}

export interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED';
  replyMessage?: string | null;
  repliedAt?: string | null;
  createdAt?: string;
}

export interface News {
  id: number;
  title: string;
  titleKm?: string | null;
  category: string;
  categoryKm?: string | null;
  date: string;
  description: string;
  descKm?: string | null;
  content?: string | null;
  image?: string | null;
  author?: string | null;
  isPublished?: boolean;
}

export interface Partnership {
  id: number;
  name: string;
  nameKm?: string | null;
  type: string;
  country: string;
  icon?: string | null;
  image?: string | null;
  description: string;
  descKm?: string | null;
}

export interface AuditLog {
  id: number;
  userId?: number | null;
  action: string;
  entity?: string | null;
  entityId?: number | null;
  details?: string | null;
  ipAddress?: string | null;
  createdAt: string;
  user?: User | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: Pagination;
  errors?: any[];
}
