-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "avatar" TEXT,
    "phone" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nameKm" TEXT,
    "code" TEXT,
    "description" TEXT,
    "descKm" TEXT,
    "head" TEXT,
    "beds" INTEGER NOT NULL DEFAULT 20,
    "occupancy" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'open',
    "icon" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nameKm" TEXT,
    "specialty" TEXT NOT NULL,
    "specialtyKm" TEXT,
    "departmentId" INTEGER,
    "phone" TEXT,
    "email" TEXT,
    "experience" TEXT,
    "languages" TEXT,
    "availability" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "image" TEXT,
    "bio" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Doctor_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientName" TEXT NOT NULL,
    "patientPhone" TEXT NOT NULL,
    "patientEmail" TEXT,
    "dob" DATETIME,
    "gender" TEXT,
    "departmentId" INTEGER,
    "doctorId" INTEGER,
    "appointmentDate" DATETIME NOT NULL,
    "preferredTime" TEXT,
    "reason" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "userId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Appointment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bed" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bedNumber" TEXT NOT NULL,
    "wardName" TEXT NOT NULL,
    "departmentId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "patientName" TEXT,
    "admittedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Bed_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContactInquiry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNREAD',
    "replyMessage" TEXT,
    "repliedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "News" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "titleKm" TEXT,
    "category" TEXT NOT NULL DEFAULT 'Hospital News',
    "categoryKm" TEXT,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descKm" TEXT,
    "content" TEXT,
    "image" TEXT,
    "author" TEXT DEFAULT 'Luang Mè Communications',
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Partnership" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nameKm" TEXT,
    "type" TEXT NOT NULL DEFAULT 'Academic',
    "country" TEXT NOT NULL DEFAULT 'International',
    "icon" TEXT,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "descKm" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RateLimitLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ipAddress" TEXT NOT NULL,
    "userId" INTEGER,
    "endpoint" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RateLimitLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "action" TEXT NOT NULL,
    "entity" TEXT,
    "entityId" INTEGER,
    "details" TEXT,
    "ipAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_code_key" ON "Department"("code");

-- CreateIndex
CREATE INDEX "Department_name_idx" ON "Department"("name");

-- CreateIndex
CREATE INDEX "Doctor_name_idx" ON "Doctor"("name");

-- CreateIndex
CREATE INDEX "Doctor_specialty_idx" ON "Doctor"("specialty");

-- CreateIndex
CREATE INDEX "Doctor_departmentId_idx" ON "Doctor"("departmentId");

-- CreateIndex
CREATE INDEX "Appointment_patientName_idx" ON "Appointment"("patientName");

-- CreateIndex
CREATE INDEX "Appointment_patientPhone_idx" ON "Appointment"("patientPhone");

-- CreateIndex
CREATE INDEX "Appointment_status_idx" ON "Appointment"("status");

-- CreateIndex
CREATE INDEX "Appointment_appointmentDate_idx" ON "Appointment"("appointmentDate");

-- CreateIndex
CREATE UNIQUE INDEX "Bed_bedNumber_key" ON "Bed"("bedNumber");

-- CreateIndex
CREATE INDEX "Bed_bedNumber_idx" ON "Bed"("bedNumber");

-- CreateIndex
CREATE INDEX "Bed_status_idx" ON "Bed"("status");

-- CreateIndex
CREATE INDEX "Bed_wardName_idx" ON "Bed"("wardName");

-- CreateIndex
CREATE INDEX "ContactInquiry_email_idx" ON "ContactInquiry"("email");

-- CreateIndex
CREATE INDEX "ContactInquiry_status_idx" ON "ContactInquiry"("status");

-- CreateIndex
CREATE INDEX "News_title_idx" ON "News"("title");

-- CreateIndex
CREATE INDEX "News_category_idx" ON "News"("category");

-- CreateIndex
CREATE INDEX "Partnership_name_idx" ON "Partnership"("name");

-- CreateIndex
CREATE INDEX "Partnership_type_idx" ON "Partnership"("type");

-- CreateIndex
CREATE INDEX "RateLimitLog_ipAddress_idx" ON "RateLimitLog"("ipAddress");

-- CreateIndex
CREATE INDEX "RateLimitLog_createdAt_idx" ON "RateLimitLog"("createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");
