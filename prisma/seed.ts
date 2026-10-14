import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting SQLite database seeding for Luang Mè Hospital...');

  // 1. Clean existing records
  await prisma.auditLog.deleteMany();
  await prisma.rateLimitLog.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.bed.deleteMany();
  await prisma.contactInquiry.deleteMany();
  await prisma.news.deleteMany();
  await prisma.partnership.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.department.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const adminPassword = await bcrypt.hash('AdminPass123!', 10);
  const managerPassword = await bcrypt.hash('ManagerPass123!', 10);
  const staffPassword = await bcrypt.hash('StaffPass123!', 10);
  const userPassword = await bcrypt.hash('UserPass123!', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@luangme.gov.kh',
      passwordHash: adminPassword,
      fullName: 'Prof. Dr. Chea Vannak',
      role: 'ADMIN',
      phone: '012-888-999',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80',
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: 'manager@luangme.gov.kh',
      passwordHash: managerPassword,
      fullName: 'Dr. Sok Dara',
      role: 'MANAGER',
      phone: '012-777-888',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
    },
  });

  const staff = await prisma.user.create({
    data: {
      email: 'staff@luangme.gov.kh',
      passwordHash: staffPassword,
      fullName: 'Nurse Bopha Vanna',
      role: 'STAFF',
      phone: '012-666-777',
      avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78907?w=300&auto=format&fit=crop&q=80',
    },
  });

  const normalUser = await prisma.user.create({
    data: {
      email: 'user@gmail.com',
      passwordHash: userPassword,
      fullName: 'Sophea Keo',
      role: 'USER',
      phone: '012-345-678',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    },
  });

  console.log('✅ Created users: Admin, Manager, Staff, User');

  // 3. Create Departments
  const departmentsData = [
    {
      name: 'Outpatient Department (OPD)',
      nameKm: 'ផ្នែកពិគ្រោះជំងឺក្រៅ',
      code: 'OPD',
      head: 'Asst. Prof. Lam Kaovin',
      beds: 30,
      occupancy: 75,
      description: 'Provides medical consultations, diagnostic evaluations, and treatments for patients who do not require overnight hospitalization.',
      descKm: 'ផ្តល់សេវាពិគ្រោះ ពិនិត្យវិភាគរោគសញ្ញា និងព្យាបាលអ្នកជំងឺដែលមិនតម្រូវឱ្យសម្រាកគេងនៅមន្ទីរពេទ្យ។',
      image: '/image/departments/emergency-care.jpg',
    },
    {
      name: 'Emergency Department',
      nameKm: 'ផ្នែកសង្គ្រោះបន្ទាន់',
      code: 'EMERGENCY',
      head: 'Dr. Chuob Sambath',
      beds: 20,
      occupancy: 85,
      description: 'Delivers immediate 24/7 medical care for acute illnesses, severe trauma, and life-threatening conditions.',
      descKm: 'ផ្តល់ការសង្គ្រោះ និងព្យាបាលបន្ទាន់ ២៤ ម៉ោងលើ ២៤ ម៉ោង សម្រាប់ករណីគ្រោះថ្នាក់ចៃដន្យ ជំងឺធ្ងន់ធ្ងរ ឬស្ថានភាពគំរាមកំហែងដល់អាយុជីវិត។',
      image: '/image/departments/emergency-care.jpg',
    },
    {
      name: 'Medical Imaging & Radiology',
      nameKm: 'ផ្នែកវេជ្ជសាស្ត្ររូបភាព និងរោគវិនិច្ឆ័យដោយកាំរស្មី',
      code: 'RADIOLOGY',
      head: 'Dr. Kong Reasmey',
      beds: 15,
      occupancy: 60,
      description: 'Uses advanced imaging technologies (X-ray, CT scan, MRI, ultrasound) to accurately diagnose and monitor medical conditions.',
      descKm: 'ប្រើប្រាស់បច្ចេកវិទ្យារូបភាពទំនើបៗ (ដូចជា អ៊ិចរ៉េ អេកូ ស្កេន CT និង MRI) ដើម្បីធ្វើរោគវិនិច្ឆ័យ និងតាមដានស្ថានភាពជំងឺបានច្បាស់លាស់។',
      image: '/image/departments/medical-imaging-radiology.jpg',
    },
    {
      name: 'Oncology & Radiotherapy',
      nameKm: 'ផ្នែកជំងឺមហារីក និងព្យាបាលដោយកាំរស្មី',
      code: 'ONCOLOGY',
      head: 'Dr. Kang Sonnarin',
      beds: 40,
      occupancy: 72,
      description: 'Specializes in comprehensive cancer care, including systemic therapies, targeted radiation treatments, and supportive care.',
      descKm: 'ជំនាញក្នុងការថែទាំ និងព្យាបាលជំងឺមហារីកគ្រប់ជ្រុងជ្រោយ រួមមានការព្យាបាលដោយគីមី ការបាញ់កាំរស្មី និងការថែទាំលើកកម្ពស់គុណភាពជីវិត។',
      image: '/image/departments/oncology-radiotherapy.jpg',
    },
    {
      name: 'Laboratory Department',
      nameKm: 'ផ្នែកមន្ទីរពិសោធន៍ (ឡាបូ)',
      code: 'LAB',
      head: 'Mr. Penh Sakdo, M.Sc.',
      beds: 10,
      occupancy: 40,
      description: 'Performs clinical tests on blood, bodily fluids, and tissue samples to assist in precise disease diagnosis and management.',
      descKm: 'ធ្វើតេស្តវិភាគសំណាកឈាម ទឹករាវក្នុងរាងកាយ និងជាលិកា ដើម្បីជួយគ្រូពេទ្យធ្វើរោគវិនិច្ឆ័យ និងកំណត់វិធីព្យាបាលបានត្រឹមត្រូវ។',
      image: '/image/departments/laboratory-services.jpg',
    },
    {
      name: 'Anesthesia & Recovery',
      nameKm: 'ផ្នែកសណ្តំ និងបន្ទប់តាមដានក្រោយវះកាត់',
      code: 'ANESTHESIA',
      head: 'Dr. Chheang Kho',
      beds: 12,
      occupancy: 68,
      description: 'Administers sedation and pain control during surgical procedures and monitors patients closely as they wake up.',
      descKm: 'ផ្តល់ថ្នាំសន្លប់ ថ្នាំស្ពឹក និងការគ្រប់គ្រងការឈឺចាប់ពេលវះកាត់ ព្រមទាំងតាមដានសុខភាពអ្នកជំងឺយ៉ាងដិតដល់បន្ទាប់ពីភ្ញាក់ដឹងខ្លួនឡើងវិញ។',
      image: '/image/departments/icu.jpg',
    },
    {
      name: 'Gynecologic Oncology Surgery Department',
      nameKm: 'ផ្នែកវះកាត់មហារីករោគស្រ្តី',
      code: 'GYNECOLOGIC_ONCOLOGY',
      head: 'Dr. Chek Sokban',
      beds: 18,
      occupancy: 62,
      description: 'Specializes in the surgical diagnosis, staging, and treatment of cancers affecting the female reproductive system, including ovarian, cervical, uterine, vaginal, and vulvar malignancies.',
      descKm: null,
      image: '/image/departments/gynecology.png',
    },
    {
      name: 'Surgical Oncology Department',
      nameKm: 'ផ្នែកវះកាត់មហារីក',
      code: 'SURGICAL_ONCOLOGY',
      head: 'Dr. Chek Sokchea',
      beds: 30,
      occupancy: 90,
      description: 'Specializes in the surgical management and resection of solid malignant tumors, including diagnostic biopsies, tumor removals, and reconstructive cancer surgeries.',
      descKm: null,
      image: '/image/departments/surgical-1.jpg',
    },
    {
      name: 'Social Welfare, Health Insurance, and Patient Services Department',
      nameKm: 'ផ្នែកគាំពាសុខមាលភាពសង្គម ធានារ៉ាប់រង និងសេវាកម្ម',
      code: 'SOCIAL_SERVICES',
      head: 'Dr. Meas Thida',
      beds: 0,
      occupancy: 0,
      description: 'Coordinates patient administrative support, manages public health insurance schemes such as NSSF and Health Equity Funds, and connects vulnerable patients with financial and social welfare assistance.',
      descKm: null,
      image: '/image/departments/nssf.jpg',
    },
    {
      name: 'Pharmacy',
      nameKm: 'ឱសថស្ថាន',
      code: 'PHARMACY',
      head: 'Pharm. Nin Sreynich',
      beds: 0,
      occupancy: 0,
      description: 'Dispenses medications, provides medication counseling, and manages pharmaceutical supplies to ensure safe drug therapy.',
      descKm: 'ចែកចាយ និងផ្តល់ថ្នាំពេទ្យ ប្រឹក្សាយោបល់អំពីរបៀបប្រើប្រាស់ថ្នាំ និងធានានូវសុវត្ថិភាពខ្ពស់ក្នុងការប្រើប្រាស់ឱសថ។',
      image: '/image/departments/emergency-care.jpg',
    },
    {
      name: 'Endoscopy Department',
      nameKm: 'ផ្នែកឆ្លុះពិនិត្យ (ឆ្លុះក្រពះ ពោះវៀន)',
      code: 'ENDOSCOPY',
      head: 'Dr. Vong Vathanak',
      beds: 8,
      occupancy: 50,
      description: 'Uses specialized camera scopes to examine, biopsy, and treat disorders within the gastrointestinal tract and internal organs.',
      descKm: 'ប្រើប្រាស់ឧបករណ៍កាមេរ៉ាឆ្លុះដើម្បីពិនិត្យ យកជាលិកាធ្វើតេស្ត និងព្យាបាលបញ្ហាផ្សេងៗក្នុងប្រព័ន្ធរំលាយអាហារ ដូចជា ក្រពះ និងពោះវៀន។',
      image: '/image/departments/medical-imaging-radiology.jpg',
    },
    {
      name: 'Intensive Care Unit - ICU',
      nameKm: 'ផ្នែកថែទាំអ្នកជំងឺកម្រិតធ្ងន់ - ICU',
      code: 'ICU',
      head: 'Head: Dr. Chheang Kho',
      beds: 10,
      occupancy: 55,
      description: 'Provides continuous monitoring, advanced life-support systems, and specialized care for critically ill patients.',
      descKm: 'ផ្តល់ការតាមដានជាបន្តបន្ទាប់ និងឧបករណ៍ជួយរស់ទំនើប សម្រាប់អ្នកជំងឺដែលស្ថិតក្នុងស្ថានភាពធ្ងន់ធ្ងរ និងត្រូវការថែទាំពិសេស។',
      image: '/image/departments/icu.jpg',
    },
  ];

  const createdDepartments: any[] = [];
  for (const dept of departmentsData) {
    const created = await prisma.department.create({ data: dept });
    createdDepartments.push(created);
  }
  console.log(`✅ Created ${createdDepartments.length} departments`);

  // 4. Create Doctors
  const doctorsData = [
    {
      name: 'Asst. Prof. Lam Kaovin',
      nameKm: 'លោកសាស្ត្រ.ជំនួយ ឡាំ កោវិន',
      specialty: 'Deputy Head of Technical Office and Head of Outpatient Department',
      specialtyKm: 'អនុប្រធានការិយាល័យបច្ចេកទេស និងជានាយផ្នែកពិគ្រោះជំងឺក្រៅ',
      departmentId: createdDepartments.find((d) => d.code === 'OPD')?.id,
      status: 'active',
      image: '/image/pic1.jpg',
    },
    {
      name: 'Dr. Chheang Kho',
      nameKm: 'លោកវេជ្ជ.ឯកទេស ឈាង ឃោ',
      specialty: 'Head of Intensive Care Unit (ICU)',
      specialtyKm: 'នាយផ្នែកថែទាំអ្នកជំងឺកម្រិតធ្ងន់ (ICU)',
      departmentId: createdDepartments.find((d) => d.code === 'ICU')?.id,
      status: 'active',
      image: '/image/pic2.png',
    },
    {
      name: 'Dr. Kang Sonnarin',
      nameKm: 'លោកវេជ្ជ.ឯកទេស កាង សុន្នរិន',
      specialty: 'Head of Medical Oncology and Radiotherapy Department',
      specialtyKm: 'នាយផ្នែកជំងឺមហារីក និងព្យាបាលដោយកាំរស្មី',
      departmentId: createdDepartments.find((d) => d.code === 'ONCOLOGY')?.id,
      status: 'active',
      image: '/image/pic3.png',
    },
    {
      name: 'Dr. Chek Sokchea',
      nameKm: 'លោកវេជ្ជ.ឯកទេស ចឹក សុខជា',
      specialty: 'Head of Surgical Oncology Department',
      specialtyKm: 'នាយផ្នែកវះកាត់មហារីក',
      departmentId: createdDepartments.find((d) => d.code === 'SURGICAL_ONCOLOGY')?.id,
      status: 'active',
      image: '/image/pic4.png',
    },
    {
      name: 'Dr. Chek Sokban',
      nameKm: 'លោកវេជ្ជ.ឯកទេស ចឹក សុខបាន',
      specialty: 'Head of Gynecologic Oncology Surgery Department',
      specialtyKm: 'នាយផ្នែកវះកាត់មហារីករោគស្រ្តី',
      departmentId: createdDepartments.find((d) => d.code === 'GYNECOLOGIC_ONCOLOGY')?.id,
      status: 'active',
      image: '/image/pic5.png',
    },
    {
      name: 'Dr. Chuob Sambath',
      nameKm: 'លោកវេជ្ជ.ឯកទេស ជួប សម្បត្តិ',
      specialty: 'Head of Emergency Department',
      specialtyKm: 'នាយផ្នែកសង្គ្រោះបន្ទាន់',
      departmentId: createdDepartments.find((d) => d.code === 'EMERGENCY')?.id,
      status: 'active',
      image: '/image/pic6.png',
    },
    {
      name: 'Dr. Kong Reasmey',
      nameKm: 'លោកវេជ្ជ.ឯកទេស គង់ រស្មី',
      specialty: 'Head of Medical Imaging and Interventional Radiology Department',
      specialtyKm: 'នាយផ្នែករូបភាពវេជ្ជសាស្ត្រ និងអន្តរាគមន៍វិទ្យុសាស្រ្ត',
      departmentId: createdDepartments.find((d) => d.code === 'RADIOLOGY')?.id,
      status: 'active',
      image: '/image/pic7.png',
    },
    {
      name: 'Mr. Penh Sakdo.',
      nameKm: 'លោកអនុបណ្ឌិត ពេញ សាក់ក្ដូ',
      specialty: 'Head of Clinical Laboratory Department',
      specialtyKm: 'នាយផ្នែកមន្ទីរពិសោធន៍',
      departmentId: createdDepartments.find((d) => d.code === 'LAB')?.id,
      status: 'active',
      image: '/image/pic8.png',
    },
    {
      name: 'Pharm. Nin Sreynich',
      nameKm: 'លោកស្រីឱសថការី និន ស្រីនិច',
      specialty: 'Head of Pharmacy Department',
      specialtyKm: 'នាយផ្នែកឱសថស្ថាន',
      departmentId: createdDepartments.find((d) => d.code === 'PHARMACY')?.id,
      status: 'active',
      image: '/image/pic9.png',
    },
    {
      name: 'Dr. Vong Vathanak',
      nameKm: 'លោកវេជ្ជ.ឯកទេស វង្ស វឌ្ឍនៈ',
      specialty: 'Head of Endoscopy Department',
      specialtyKm: 'នាយផ្នែកអង់ដូស្គូពី',
      departmentId: createdDepartments.find((d) => d.code === 'ENDOSCOPY')?.id,
      status: 'active',
      image: '/image/pic10.png',
    },
    {
      name: 'Dr. Meas Thida',
      nameKm: 'លោកស្រីវេជ្ជ.ឯកទេស មាស ធីតា',
      specialty: 'Head of Social Welfare, Insurance, and Patient Services Department',
      specialtyKm: 'នាយផ្នែកគាំពាសុខមាលភាពសង្គម ធានារ៉ាប់រង និងសេវាកម្ម',
      departmentId: createdDepartments.find((d) => d.code === 'SOCIAL_SERVICES')?.id,
      status: 'active',
      image: '/image/pic11.png',
    },
    {
      name: 'Dr. San Kimseang',
      nameKm: 'លោកវេជ្ជ.ឯកទេស សាន គឹមស៊ាង',
      specialty: 'Deputy Head of Anatomical Pathology and Mortuary Unit',
      specialtyKm: 'នាយរងផ្នែក អ៊ុុយនីតេកាយវិភាគរោគវិទ្យា និងលោកា',
      departmentId: createdDepartments.find((d) => d.code === 'LAB')?.id,
      status: 'active',
      image: '/image/pic12.png',
    },
  ];

  const createdDoctors: any[] = [];
  for (const doc of doctorsData) {
    const created = await prisma.doctor.create({ data: doc });
    createdDoctors.push(created);
  }
  console.log(`✅ Created ${createdDoctors.length} doctors`);

  // 5. Create News Articles
  const newsData = [
    {
      title: 'Luang Mè Launches New Radiotherapy Center in Partnership with IAEA',
      titleKm: 'ហ្លួងម៉ែបើកបន្ទប់ព្យាបាលថ្មី ដោយកិច្ចសហការជាមួយ IAEA',
      category: 'Hospital News',
      categoryKm: 'ព័ត៌មានមន្ទីរពេទ្យ',
      date: 'Aug 14, 2025',
      description: 'A state-of-the-art radiotherapy center has been inaugurated, expanding our cancer treatment capabilities nationwide.',
      descKm: 'ការបើកសម្ពោធមជ្ឈមណ្ឌលចាំងរស្មីព្យាបាលជំងឺមហារីកថ្មី ក្នុងគោលបំណងពង្រីកសមត្ថភាពព្យាបាលជូនប្រជាពលរដ្ឋ។',
      content: 'Luang Mè Hospital proudly announces the inauguration of its advanced Radiotherapy Center built in technical collaboration with the International Atomic Energy Agency (IAEA)...',
      image: 'image/news/news-1.jpg',
      author: 'Luang Mè Communications',
    },
    {
      title: 'Free Cancer Screening Campaign for Phnom Penh Residents',
      titleKm: 'យុទ្ធនាការពិនិត្យជំងឺមហារីកដោយឥតគិតថ្លៃ សម្រាប់ប្រជាពលរដ្ឋរាជធានីភ្នំពេញ',
      category: 'Health Education',
      categoryKm: 'ការអប់រំសុខភាព',
      date: 'Jul 28, 2025',
      description: 'Over 500 residents received free early cancer screening as part of our community outreach program.',
      descKm: 'ប្រជាពលរដ្ឋជាង ៥០០នាក់ បានទទួលការពិនិត្យស្វែងរកជំងឺមហារីកដំណាក់កាលដំបូងដោយឥតគិតថ្លៃ។',
      content: 'As part of Luang Mè Hospital’s humanitarian mission, our oncology department conducted a three-day community health screening...',
      image: '',
      author: 'Dr. Sokha Lim',
    },
    {
      title: 'International Medical Training Exchange with Korea University Anam Hospital',
      titleKm: 'ការបណ្តុះបណ្តាលវេជ្ជសាស្ត្រអន្តរជាតិ ជាមួយ Korea University Anam Hospital',
      category: 'Events',
      categoryKm: 'ព្រឹត្តិការណ៍',
      date: 'Jul 10, 2025',
      description: 'Physicians from Luang Mè Hospital completed an advanced clinical training exchange program in Seoul.',
      descKm: 'ក្រុមគ្រូពេទ្យនៃមន្ទីរពេទ្យហ្លួងម៉ែ បានបញ្ចប់វគ្គបណ្តុះបណ្តាលផ្លាស់ប្តូរបទពិសោធន៍គ្លីនិកនៅទីក្រុងសេអ៊ូល។',
      content: 'Our clinical staff completed a specialized two-week medical exchange program with Korea University Anam Hospital...',
      image: '',
      author: 'Medical Training Board',
    },
  ];

  for (const n of newsData) {
    await prisma.news.create({ data: n });
  }
  console.log(`✅ Created ${newsData.length} news articles`);

  // 6. Create Partnerships
  const partnershipsData = [
    {
      name: 'International Atomic Energy Agency (IAEA)',
      nameKm: 'ភ្នាក់ងារថាមពលបរមាណូអន្តរជាតិ (IAEA)',
      type: 'UN Agency',
      country: 'International',
      icon: '⚛️',
      description: 'IAEA KAM6005 technical cooperation project for 2024-2027, supporting radiotherapy services and medical physics capacity.',
      descKm: 'កិច្ចសហការបំពាក់ឧបករណ៍ចាំងរស្មី ផ្ទេរបច្ចេកវិទ្យា និងបណ្តុះបណ្តាលធនធានមនុស្ស។',
      image: '/images/partnerships/international/IAEA-logo.jpg',
    },
    {
      name: 'Physicien Medical Sans Frontières',
      type: 'Medical Organization',
      country: 'International',
      icon: '🩺',
      description: 'International medical physics collaboration supporting specialist knowledge exchange and cancer care.',
      image: '/images/partnerships/international/Physicien Medical.png',
    },
    {
      name: 'Australian Aid: Australian Volunteer Program (AVI)',
      type: 'Volunteer Program',
      country: 'Australia',
      icon: '🇦🇺',
      description: 'Australian volunteer program supporting healthcare training, hospital services, and professional development.',
      image: '/images/partnerships/international/avi-logo.jpg',
    },
    {
      name: 'The Association of the Church of Jesus Christ of Latter-Day Saints (Donation)',
      type: 'Donation',
      country: 'International',
      icon: '🤝',
      description: 'Donation partnership supporting hospital services and patient care.',
      image: '/images/partnerships/international/donation-logo.jpg',
    },
    {
      name: 'Institut de Cancérologie de Strasbourg',
      type: 'Cancer Institute',
      country: 'France',
      icon: '🏥',
      description: 'International cancer care and medical collaboration with Institut de Cancérologie de Strasbourg.',
      image: '/images/partnerships/international/icans-logo.jpg',
    },
    {
      name: 'Institut Paoli-Calmettes Unicancer Marseille',
      type: 'Cancer Institute',
      country: 'France',
      icon: '🏥',
      description: 'Cancer care and professional collaboration with Institut Paoli-Calmettes, Unicancer Marseille.',
      image: '/images/partnerships/international/IPC-logo.jpg',
    },
    {
      name: 'Korean University Anam Hospital',
      type: 'Hospital',
      country: 'South Korea',
      icon: '🏥',
      description: 'Clinical exchange program, surgical consultation, and advanced telemedicine support.',
      image: '/images/partnerships/international/Korean University Anam Hospital.png',
    },
    {
      name: 'Yunan Cancer Hospital (The Third Affiliated Hospital of Kunming Medical University)',
      type: 'Cancer Hospital',
      country: 'China',
      icon: '🏥',
      description: 'Cancer care and clinical collaboration with the Third Affiliated Hospital of Kunming Medical University.',
      image: '/images/partnerships/international/Yunan Cancer Hospital.jpg',
    },
    {
      name: 'Norkot Tep Organization',
      nameKm: 'អង្គការណុកឃ្លាតេស',
      type: 'Organization',
      country: 'Cambodia',
      icon: '🤝',
      description: 'Community health and social development partnership supporting outreach, education, and patient support initiatives.',
      descKm: 'កិច្ចសហការសុខភាពសង្គម និងអភិវឌ្ឍន៍សង្គមក្នុងការគាំទ្រ សាធារណៈ និងការថែទាំអ្នកជំងឺ។',
      image: '/images/partnerships/national/Nokor Tep Organization.png',
    },
    {
      name: 'University of Health Sciences (UHS)',
      nameKm: 'សាកលវិទ្យាល័យវិទ្យាសាស្ត្រសុខាភិបាល',
      type: 'Academic',
      country: 'Cambodia',
      icon: '🎓',
      description: 'Primary teaching hospital affiliation for medical students, clinical residents, and post-graduate specialists.',
      descKm: 'មន្ទីរពេទ្យបង្អែកសម្រាប់និស្សិតវេជ្ជសាស្ត្រ និងគ្រូពេទ្យកម្មសិក្សា។',
      image: '/images/partnerships/national/UHS_Cambodia_logo.png',
    },
    {
      name: 'International University',
      nameKm: 'សាកលវិទ្យាល័យអន្តរជាតិ',
      type: 'Academic',
      country: 'Cambodia',
      icon: '🎓',
      description: 'Academic collaboration for healthcare training, clinical mentoring, and interprofessional education programs.',
      descKm: 'កិច្ចសហការបណ្តុះបណ្តាលសុខាភិបាល និងការបណ្តុះបណ្តាលដោយគ្រូពេទ្យដែលមានបទពិសោធន៍។',
      image: '/images/partnerships/national/mou_iu.png',
    },
    {
      name: 'Health Science Institute of RCAF',
      nameKm: 'វិទ្យាស្ថានវិទ្យាសាស្ត្រសុខាភិបាលនៃកងទ័ពជើងខ្មែរ',
      type: 'Academic',
      country: 'Cambodia',
      icon: '🩺',
      description: 'Training and professional development partnership for military-related health services and public health capacity building.',
      descKm: 'កិច្ចសហការបណ្តុះបណ្តាល និងសាកលវិទ្យាល័យសម្រាប់សេវាសុខាភិបាល និងសុខភាពសាធារណៈ។',
      image: '/images/partnerships/national/Health Science Institute.png',
    },
    {
      name: 'University of Puthisastra',
      nameKm: 'សាកលវិទ្យាល័យពុទ្ធិសាស្ត្រ',
      type: 'Academic',
      country: 'Cambodia',
      icon: '🎓',
      description: 'Medical and health sciences educational collaboration focused on service learning and clinical practice development.',
      descKm: 'កិច្ចសហការសម្រាប់ការអប់រំវេជ្ជសាស្ត្រ និងការអនុវត្តគ្លីនិកក្នុងការអប់រំសុខភាព។',
      image: '/images/partnerships/national/University of Puthisastra.jpg',
    },
    {
      name: 'CamTech University',
      nameKm: 'សាកលវិទ្យាល័យ CamTech',
      type: 'Academic',
      country: 'Cambodia',
      icon: '🎓',
      description: 'Technology-enabled healthcare education and applied research collaboration for future medical professionals.',
      descKm: 'កិច្ចសហការសម្រាប់ការអប់រំ និងស្រាវជ្រាវវិទ្យាសាស្ត្រ សម្រាប់អ្នកជំនាញថែទាំសុខភាព។',
      image: '/images/partnerships/national/CamTech University.jpg',
    },
  ];

  for (const p of partnershipsData) {
    await prisma.partnership.create({ data: p });
  }
  console.log(`✅ Created ${partnershipsData.length} partnerships`);

  // 7. Create Beds
  const wards = ['Emergency Ward', 'Oncology Ward', 'Surgical Ward', 'ICU Unit', 'General Ward'];
  let bedCount = 1;
  for (const ward of wards) {
    for (let i = 1; i <= 5; i++) {
      const isOccupied = (bedCount % 3 === 0);
      await prisma.bed.create({
        data: {
          bedNumber: `BED-${100 + bedCount}`,
          wardName: ward,
          departmentId: createdDepartments[bedCount % createdDepartments.length].id,
          status: isOccupied ? 'OCCUPIED' : 'AVAILABLE',
          patientName: isOccupied ? `Patient ${bedCount}` : null,
          admittedAt: isOccupied ? new Date(Date.now() - bedCount * 3600000 * 24) : null,
        },
      });
      bedCount++;
    }
  }
  console.log(`✅ Created ${bedCount - 1} bed records across wards`);

  // 8. Create Sample Appointments
  const sampleAppointments = [
    {
      patientName: 'Sophea Keo',
      patientPhone: '012-345-678',
      patientEmail: 'sophea@gmail.com',
      dob: new Date('1990-05-15'),
      gender: 'Female',
      departmentId: createdDepartments.find((d) => d.code === 'ONCOLOGY')?.id,
      doctorId: createdDoctors.find((d) => d.name === 'Dr. Kang Sonnarin')?.id,
      appointmentDate: new Date('2025-10-15T09:00:00Z'),
      preferredTime: '09:00 AM',
      reason: 'Follow-up consultation for oncology treatment plan.',
      status: 'CONFIRMED',
      userId: normalUser.id,
    },
    {
      patientName: 'Vanna Meas',
      patientPhone: '098-765-432',
      patientEmail: 'vanna@gmail.com',
      dob: new Date('1985-08-20'),
      gender: 'Male',
      departmentId: createdDepartments.find((d) => d.code === 'RADIOLOGY')?.id,
      doctorId: createdDoctors.find((d) => d.name === 'Dr. Kong Reasmey')?.id,
      appointmentDate: new Date('2025-10-16T10:30:00Z'),
      preferredTime: '10:30 AM',
      reason: 'Chest CT scan examination.',
      status: 'PENDING',
    },
    {
      patientName: 'Chanda Kim',
      patientPhone: '015-111-222',
      patientEmail: 'chanda@gmail.com',
      dob: new Date('1995-12-01'),
      gender: 'Female',
      departmentId: createdDepartments.find((d) => d.code === 'SURGICAL_ONCOLOGY')?.id,
      doctorId: createdDoctors.find((d) => d.name === 'Dr. Chek Sokchea')?.id,
      appointmentDate: new Date('2025-10-10T14:00:00Z'),
      preferredTime: '02:00 PM',
      reason: 'Pre-surgery evaluation.',
      status: 'COMPLETED',
    },
  ];

  for (const appt of sampleAppointments) {
    await prisma.appointment.create({ data: appt });
  }
  console.log(`✅ Created ${sampleAppointments.length} sample appointments`);

  // 9. Create Sample Contact Inquiries
  const sampleInquiries = [
    {
      name: 'Sophea Keo',
      email: 'sophea@gmail.com',
      phone: '012-345-678',
      subject: 'Appointment Inquiry for Radiotherapy',
      message: 'I would like to know the required documents before my first radiotherapy session.',
      status: 'UNREAD',
    },
    {
      name: 'Dara Ros',
      email: 'dara.ros@outlook.com',
      phone: '017-999-000',
      subject: 'Visiting Hours & Emergency Contact',
      message: 'Could you please provide the visiting hours for the Intensive Care Unit?',
      status: 'REPLIED',
      replyMessage: 'Visiting hours for ICU are 11:00 AM - 1:00 PM and 4:00 PM - 6:00 PM daily.',
      repliedAt: new Date(),
    },
  ];

  for (const inq of sampleInquiries) {
    await prisma.contactInquiry.create({ data: inq });
  }
  console.log(`✅ Created ${sampleInquiries.length} sample contact inquiries`);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Database seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
