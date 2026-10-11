export interface SkillCategoryItem {
  id: string;
  category: string;
  description: string;
  image: string;
  iconName?: string;
  items: Array<{
    name: string;
    level: string;
    highlight?: boolean;
    badge?: string;
  }>;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verifyUrl: string;
  badge?: string;
  image: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  period: string;
  role: string;
  description: string;
  type: 'education' | 'work' | 'leadership';
  activeColor: 'orange' | 'dark';
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  image: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  metrics?: string;
  techStack: string[];
  deliverables?: string[];
  featured?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  relationship: string;
  content: string;
}

export const projectCategories = [
  'All',
  'Full-Stack',
  'Backend & Systems',
  'AI & Web',
  'Cloud Native',
];

export const defaultProfile = {
  name: 'Lucky',
  title: 'Software Engineer',
  heroQuote:
    'Im Lucky Choudhary — a creator who builds faster than he speaks. I turn ideas into real engineering projects, from robotics prototypes to learning platforms that empower students.',
  experienceYears: '4 Year',
  projectsCompleted: '3+',
  problemsSolved: '57+',
  gpa: '8.8 / 10',
  degree: 'B.Tech in Computer Science & Engineering',
  university: 'Sage University Indore',
  whyHireMeBio:
    'I’m a strong fit because I combine analytical skills with fast learning. In my capstone project, I led a team of four to build an automated attendance system using facial recognition, which improved tracking accuracy by 40% and reduced administrative overhead.',
  email: 'contact.luckychoudhary@gmail.com',
  phone: '+91 9165165035',
  website: 'Portfolio-jcrea.com',
  github: 'https://github.com/luckychoudhary08292',
  linkedin: 'https://www.linkedin.com/in/lucky-choudhary-991043301/',
  leetcode: 'https://leetcode.com/u/owIXklov9L/',
  resumeUrl: '#',
  heroImage: '/src/assets/images/lucky_swe_portrait_1791616127280.jpg',
  whyHireMeImage: '/src/assets/images/lucky_swe_pointing_1791616138165.jpg',
};

export const defaultSkills: SkillCategoryItem[] = [
  {
    id: 'skills-1',
    category: 'Programming Languages',
    description: 'Core languages utilized for data structures, algorithmic systems, and application logic.',
    image: '/src/assets/images/blog_music_player_1791610853630.jpg',
    items: [
      { name: 'TypeScript', level: 'Advanced', badge: 'ts' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', badge: 'js' },
      { name: 'Python', level: 'Proficient', badge: 'python' },
      { name: 'C++', level: 'DSA & Competitions', badge: 'cpp' },
      { name: 'Java', level: 'OOP & Systems', badge: 'java' },
      { name: 'SQL', level: 'Relational DBs', badge: 'sql' },
    ],
  },
  {
    id: 'skills-2',
    category: 'Frontend Engineering',
    description: 'Component architecture, reactive state management, and modern responsive user interfaces.',
    image: '/src/assets/images/service_smart_home_mockup_1791610793006.jpg',
    items: [
      { name: 'React 19', level: 'Advanced', badge: 'react' },
      { name: 'Next.js', level: 'Proficient', badge: 'nextjs' },
      { name: 'Tailwind CSS', level: 'Advanced', badge: 'tailwind' },
      { name: 'Redux Toolkit', level: 'State Mgmt', badge: 'redux' },
      { name: 'HTML5 & Modern CSS', level: 'Semantic Standards', badge: 'html' },
      { name: 'Framer Motion', level: 'Micro-Interactions', badge: 'motion' },
    ],
  },
  {
    id: 'skills-3',
    category: 'Backend & System Design',
    description: 'Scalable server-side architectures, RESTful APIs, and secure authentication pipelines.',
    image: '/src/assets/images/blog_sugee_banking_1791610866547.jpg',
    items: [
      { name: 'Node.js', level: 'Advanced', badge: 'node' },
      { name: 'Express.js', level: 'Advanced', badge: 'express' },
      { name: 'REST APIs & GraphQL', level: 'API Design', badge: 'api' },
      { name: 'WebSockets', level: 'Real-Time Sync', badge: 'ws' },
      { name: 'JWT & OAuth 2.0', level: 'Security', badge: 'auth' },
      { name: 'Microservices', level: 'Architecture', badge: 'micro' },
    ],
  },
  {
    id: 'skills-4',
    category: 'Databases & Cloud Tools',
    description: 'High-performance databases, containerization, cloud hosting, and version control.',
    image: '/src/assets/images/blog_cinetrade_mockup_1791610929497.jpg',
    items: [
      { name: 'MongoDB', level: 'Advanced', badge: 'mongodb' },
      { name: 'PostgreSQL', level: 'Proficient', badge: 'postgres' },
      { name: 'Redis', level: 'Caching & Queues', badge: 'redis' },
      { name: 'Docker', level: 'Containers', badge: 'docker' },
      { name: 'Git & GitHub', level: 'CI/CD & Workflows', badge: 'git' },
      { name: 'AWS & Cloud Run', level: 'Cloud Deployment', badge: 'aws' },
    ],
  },
];

export const defaultCertificates: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: 'May 2024',
    credentialId: 'AWS-CCP-938210',
    verifyUrl: 'https://aws.amazon.com',
    badge: 'aws',
    image: '/src/assets/images/cert_aws_cloud_doc_1791619234289.jpg',
    skills: ['Cloud Architecture', 'AWS S3', 'EC2', 'IAM Security', 'VPC Networking'],
  },
  {
    id: 'cert-2',
    title: 'Meta Front-End Developer Specialization',
    issuer: 'Meta / Coursera',
    issueDate: 'Feb 2024',
    credentialId: 'META-FED-841920',
    verifyUrl: 'https://coursera.org',
    badge: 'meta',
    image: '/src/assets/images/cert_meta_frontend_1791619152140.jpg',
    skills: ['React', 'JavaScript ES6+', 'UI Architecture', 'Version Control'],
  },
  {
    id: 'cert-3',
    title: 'Google Cloud Computing Fundamentals',
    issuer: 'Google Cloud Platform',
    issueDate: 'Nov 2023',
    credentialId: 'GCP-CORE-74921',
    verifyUrl: 'https://cloud.google.com',
    badge: 'google',
    image: '/src/assets/images/cert_google_cloud_1791619162864.jpg',
    skills: ['Compute Engine', 'Cloud Run', 'GKE Containers', 'Cloud Storage'],
  },
  {
    id: 'cert-4',
    title: 'Problem Solving & 450+ LeetCode Milestone',
    issuer: 'LeetCode & HackerRank (5★)',
    issueDate: 'Continuous Achievement',
    credentialId: 'LC-450-SOLVED',
    verifyUrl: 'https://leetcode.com',
    badge: 'leetcode',
    image: '/src/assets/images/cert_leetcode_dsa_1791619172975.jpg',
    skills: ['Dynamic Programming', 'Graphs & Trees', 'Binary Search', 'Greedy Algorithmic Proofs'],
  },
];

export const defaultExperiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'Govt. Excellence Bal Vinay Mandir',
    location: 'Indore',
    period: '2022',
    role: 'Student',
    description: 'MY higher Secondary Studies',
    type: 'education',
    activeColor: 'orange',
  },
  {
    id: 'exp-2',
    company: 'Sugee Tech Labs',
    location: 'Remote / Hybrid',
    period: 'June 2024 - Sep 2024',
    role: 'Software Engineer Intern',
    description: 'Engineered backend RESTful services using Node.js, Express, and MongoDB. Implemented Redis caching layers that reduced median database lookup times by 35%.',
    type: 'work',
    activeColor: 'dark',
  },
  {
    id: 'exp-3',
    company: 'Google Developer Student Club',
    location: 'Campus Chapter',
    period: 'Sep 2023 - Present',
    role: 'Lead Technical Coordinator',
    description: 'Organized coding bootcamps and workshops for 150+ student developers on Full-Stack JavaScript, Data Structures, and open-source GitHub collaboration.',
    type: 'leadership',
    activeColor: 'orange',
  },
];

export const defaultProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Progress Path',
    subtitle: 'Full-Stack Student Learning Platform',
    category: 'Full-Stack',
    tag: 'Full-Stack',
    image: '/src/assets/images/service_smart_home_mockup_1791610793006.jpg',
    description: 'Automated learning tracking platform with real-time progress analytics, milestone roadmaps, and student mastery metrics.',
    githubUrl: 'https://github.com/luckychoudhary08292',
    liveUrl: '#',
    metrics: '< 35ms Latency • Real-Time Sync',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    deliverables: ['Real-Time Progress Engine', 'Mastery Analytics', 'Interactive Roadmap'],
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Distributed Task Queue & Background Worker',
    subtitle: 'QueueEngine',
    category: 'Backend & Systems',
    tag: 'Backend & Systems',
    image: '/src/assets/images/blog_sugee_banking_1791610866547.jpg',
    description:
      'High-throughput asynchronous background job scheduler with Redis and Node.js. Features priority queues, exponential backoff retries, dead-letter alerts, and a real-time monitoring dashboard.',
    githubUrl: 'https://github.com/luckychoudhary08292/task-queue-worker',
    liveUrl: '#',
    metrics: '10,000+ Jobs / Sec • 99.9% Uptime',
    techStack: ['TypeScript', 'Node.js', 'Redis', 'Docker', 'MongoDB'],
    deliverables: ['Worker Cluster', 'Dead-Letter Pipeline', 'Prometheus Metrics'],
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'SmartHire AI - ATS & Resume Intelligence',
    subtitle: 'SmartHire AI',
    category: 'AI & Web',
    tag: 'AI & Web',
    image: '/src/assets/images/portfolio_lirante_mockup_1791610877441.jpg',
    description:
      'Intelligent resume matching platform that extracts key competencies, evaluates technical projects against job criteria, and generates automated candidate fit analytics.',
    githubUrl: 'https://github.com/luckychoudhary08292/smarthire-ai',
    liveUrl: '#',
    metrics: '94% Match Accuracy • 3.2s Processing',
    techStack: ['React', 'Python FastAPI', 'Node.js', 'NLP', 'Tailwind'],
    deliverables: ['Automated Resume Parser', 'Candidate Scorecard', 'Recruiter Dashboard'],
    featured: true,
  },
];

export const defaultTestimonials: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Jayesh Patil',
    role: 'CEO',
    company: 'Lirante',
    avatar: '/src/assets/images/client_avatar_jayesh_1791610815588.jpg',
    rating: 5,
    relationship: 'Internship Mentor',
    content:
      'Collaborating with Lucky on our project was a pleasure. He architected the entire backend API schema and deployed the Docker containers flawlessly in record time, delivering high-performance results.',
  },
  {
    id: 'test-2',
    name: 'Jayesh Patil',
    role: 'CEO',
    company: 'Lirante',
    avatar: '/src/assets/images/client_avatar_jayesh_1791610815588.jpg',
    rating: 5,
    relationship: 'Tech Mentor',
    content:
      'Lucky shows remarkable passion and depth in computer science fundamentals. His ability to quickly assimilate complex distributed system concepts and convert them into clean code is truly outstanding.',
  },
  {
    id: 'test-3',
    name: 'Jayesh Patil',
    role: 'CEO',
    company: 'Lirante',
    avatar: '/src/assets/images/client_avatar_jayesh_1791610815588.jpg',
    rating: 5,
    relationship: 'Hackathon Lead',
    content:
      'Lucky led the engineering efforts with exceptional focus. His proactive problem-solving attitude and clean architectural patterns made him stand out among student developers.',
  },
];
