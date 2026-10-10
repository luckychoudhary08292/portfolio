import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Profile,
  SkillCategory,
  Certificate,
  Experience,
  Project,
  Testimonial,
  Inquiry,
  Subscriber,
} from './src/server/models.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://portfolio08292:portfolio136366@cluster0.xqhmhxd.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 6000,
      connectTimeoutMS: 6000,
    });
    console.log('✅ Connected to MongoDB successfully!');
    await seedInitialData();
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
  }
}

async function seedInitialData() {
  try {
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      await Profile.create({
        name: 'Lucky Choudhary',
        title: 'Software Engineering Student',
        heroQuote:
          'Passionate about architecting high-performance distributed systems, solving algorithmic challenges, and crafting reliable full-stack applications.',
        experienceYears: '2022 - 2026',
        projectsCompleted: '20+',
        problemsSolved: '450+',
        gpa: '8.8 / 10',
        degree: 'B.Tech in Computer Science & Engineering',
        university: 'University Institute of Technology',
        whyHireMeBio:
          'As an aspiring Software Engineer, I combine solid computer science fundamentals (Data Structures, Algorithms, OS, DBMS) with hands-on full-stack development. Ready to deliver immediate value as a Software Engineer Intern or Associate SWE.',
        email: 'contact.luckychoudhary@gmail.com',
        phone: '+91 7738443636',
        website: 'lucky-choudhary.dev',
        github: 'https://github.com/luckychoudhary',
        linkedin: 'https://linkedin.com/in/luckychoudhary',
        leetcode: 'https://leetcode.com/luckychoudhary',
        resumeUrl: '#',
        heroImage: '/src/assets/images/lucky_swe_portrait_1791616127280.jpg',
        whyHireMeImage: '/src/assets/images/lucky_swe_pointing_1791616138165.jpg',
      });
      console.log('🌱 Seeded default Profile for Lucky Choudhary');
    }

    const skillsCount = await SkillCategory.countDocuments();
    if (skillsCount === 0) {
      await SkillCategory.insertMany([
        {
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
          order: 1,
        },
        {
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
          order: 2,
        },
        {
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
          order: 3,
        },
        {
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
          order: 4,
        },
      ]);
      console.log('🌱 Seeded Skill Categories');
    }

    const certsCount = await Certificate.countDocuments();
    if (certsCount === 0) {
      await Certificate.insertMany([
        {
          title: 'AWS Certified Cloud Practitioner',
          issuer: 'Amazon Web Services (AWS)',
          issueDate: 'May 2024',
          credentialId: 'AWS-CCP-938210',
          verifyUrl: 'https://aws.amazon.com',
          badge: 'aws',
          image: '/src/assets/images/cert_aws_cloud_doc_1791619234289.jpg',
          skills: ['Cloud Architecture', 'AWS S3', 'EC2', 'IAM Security', 'VPC Networking'],
          order: 1,
        },
        {
          title: 'Meta Front-End Developer Specialization',
          issuer: 'Meta / Coursera',
          issueDate: 'Feb 2024',
          credentialId: 'META-FED-841920',
          verifyUrl: 'https://coursera.org',
          badge: 'meta',
          image: '/src/assets/images/cert_meta_frontend_1791619152140.jpg',
          skills: ['React', 'JavaScript ES6+', 'UI Architecture', 'Version Control'],
          order: 2,
        },
        {
          title: 'Google Cloud Computing Fundamentals',
          issuer: 'Google Cloud Platform',
          issueDate: 'Nov 2023',
          credentialId: 'GCP-CORE-74921',
          verifyUrl: 'https://cloud.google.com',
          badge: 'google',
          image: '/src/assets/images/cert_google_cloud_1791619162864.jpg',
          skills: ['Compute Engine', 'Cloud Run', 'GKE Containers', 'Cloud Storage'],
          order: 3,
        },
        {
          title: 'Problem Solving & 450+ LeetCode Milestone',
          issuer: 'LeetCode & HackerRank (5★)',
          issueDate: 'Continuous Achievement',
          credentialId: 'LC-450-SOLVED',
          verifyUrl: 'https://leetcode.com',
          badge: 'leetcode',
          image: '/src/assets/images/cert_leetcode_dsa_1791619172975.jpg',
          skills: ['Dynamic Programming', 'Graphs & Trees', 'Binary Search', 'Greedy Algorithmic Proofs'],
          order: 4,
        },
      ]);
      console.log('🌱 Seeded Certificates');
    }

    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      await Project.insertMany([
        {
          title: 'DevCollab - Real-Time Collaborative IDE',
          subtitle: 'DevCollab IDE',
          category: 'Full-Stack',
          tag: 'Full-Stack',
          image: '/src/assets/images/service_smart_home_mockup_1791610793006.jpg',
          description:
            'Browser-based distributed code editor with real-time operational transformation, multi-cursor presence, syntax highlighting for 20+ languages, and isolated Docker container execution.',
          githubUrl: 'https://github.com/luckychoudhary/devcollab-ide',
          liveUrl: '#',
          metrics: '< 35ms WebSocket Latency',
          techStack: ['React 19', 'TypeScript', 'Node.js', 'WebSockets', 'Docker', 'Tailwind'],
          deliverables: ['Real-Time OT Engine', 'Isolated Code Execution', 'Virtual Terminal'],
          order: 1,
          featured: true,
        },
        {
          title: 'Distributed Task Queue & Background Worker',
          subtitle: 'QueueEngine',
          category: 'Backend & Systems',
          tag: 'Backend & Systems',
          image: '/src/assets/images/blog_sugee_banking_1791610866547.jpg',
          description:
            'High-throughput asynchronous background job scheduler with Redis and Node.js. Features priority queues, exponential backoff retries, dead-letter alerts, and a real-time monitoring dashboard.',
          githubUrl: 'https://github.com/luckychoudhary/task-queue-worker',
          liveUrl: '#',
          metrics: '10,000+ Jobs / Sec • 99.9% Uptime',
          techStack: ['TypeScript', 'Node.js', 'Redis', 'Docker', 'MongoDB'],
          deliverables: ['Worker Cluster', 'Dead-Letter Pipeline', 'Prometheus Metrics'],
          order: 2,
          featured: true,
        },
        {
          title: 'SmartHire AI - ATS & Resume Intelligence',
          subtitle: 'SmartHire AI',
          category: 'AI & Web',
          tag: 'AI & Web',
          image: '/src/assets/images/portfolio_lirante_mockup_1791610877441.jpg',
          description:
            'Intelligent resume matching platform that extracts key competencies, evaluates technical projects against job criteria, and generates automated candidate fit analytics.',
          githubUrl: 'https://github.com/luckychoudhary/smarthire-ai',
          liveUrl: '#',
          metrics: '88% Accurate Skill Extraction',
          techStack: ['Python', 'FastAPI', 'React', 'MongoDB', 'Gemini API'],
          deliverables: ['Resume Parsing Pipeline', 'Semantic Fit Score', 'Recruiter Portal'],
          order: 3,
          featured: false,
        },
        {
          title: 'Cinetrade - Media Digital Asset Simulator',
          subtitle: 'Cinetrade',
          category: 'Cloud Native',
          tag: 'Cloud Native',
          image: '/src/assets/images/blog_cinetrade_mockup_1791610929497.jpg',
          description:
            'Real-time simulation platform for trading media box-office indices with virtual wallets, ledger integrity checks, live chart telemetry, and instant order book matching.',
          githubUrl: 'https://github.com/luckychoudhary/cinetrade-simulator',
          liveUrl: '#',
          metrics: '1,500+ Simulated Trades',
          techStack: ['Next.js', 'TypeScript', 'MongoDB', 'Chart.js', 'Tailwind'],
          deliverables: ['Virtual Order Book', 'Real-time Telemetry', 'Portfolio Analytics'],
          order: 4,
          featured: false,
        },
      ]);
      console.log('🌱 Seeded SWE Projects');
    }

    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.insertMany([
        {
          company: 'University Institute of Technology',
          location: 'India',
          period: 'Aug 2022 - June 2026 (Expected)',
          role: 'B.Tech in Computer Science & Engineering (GPA: 8.8 / 10)',
          description:
            'Rigorous foundational coursework in Data Structures, Algorithms, Operating Systems, Database Management Systems, and Object-Oriented Software Design.',
          type: 'education',
          activeColor: 'orange',
          order: 1,
        },
        {
          company: 'Sugee Tech Labs',
          location: 'Remote / Hybrid',
          period: 'June 2024 - Sep 2024',
          role: 'Software Engineer Intern',
          description:
            'Engineered backend RESTful services using Node.js, Express, and MongoDB. Implemented Redis caching layers that reduced median database lookup times by 35%.',
          type: 'work',
          activeColor: 'dark',
          order: 2,
        },
        {
          company: 'Google Developer Student Club',
          location: 'Campus Chapter',
          period: 'Sep 2023 - Present',
          role: 'Lead Technical Coordinator',
          description:
            'Organized coding bootcamps and workshops for 150+ student developers on Full-Stack JavaScript, Data Structures, and open-source GitHub collaboration.',
          type: 'leadership',
          activeColor: 'orange',
          order: 3,
        },
      ]);
      console.log('🌱 Seeded Experience & Education');
    }

    const testimonialsCount = await Testimonial.countDocuments();
    if (testimonialsCount === 0) {
      await Testimonial.insertMany([
        {
          name: 'Siddharth Mehta',
          role: 'Senior Engineering Manager',
          company: 'Sugee Tech Labs',
          avatar: '/src/assets/images/client_avatar_jayesh_1791610815588.jpg',
          rating: 5.0,
          relationship: 'Internship Mentor',
          content:
            'Lucky showed incredible grasp of system design and clean coding during his internship. He integrated our Redis caching pipeline and resolved bottlenecks independently. A fast learner ready for any high-growth engineering team.',
          order: 1,
        },
        {
          name: 'Dr. Arvind Sharma',
          role: 'Professor & Head of Computer Science',
          company: 'UIT',
          avatar: '/src/assets/images/client_avatar_jayesh_1791610815588.jpg',
          rating: 5.0,
          relationship: 'Academic Advisor',
          content:
            'Lucky ranks among the top problem solvers in our computer science batch. His discipline in algorithmic challenges and ability to build comprehensive full-stack applications sets him apart from his peers.',
          order: 2,
        },
        {
          name: 'Neha Kapoor',
          role: 'Lead Full-Stack Developer',
          company: 'National Hackathon Winner',
          avatar: '/src/assets/images/client_avatar_jayesh_1791610815588.jpg',
          rating: 5.0,
          relationship: 'Hackathon Partner',
          content:
            'Collaborating with Lucky on our hackathon project was a pleasure. He architected the entire backend API schema and deployed the Docker containers flawlessly in record time, earning us 1st place.',
          order: 3,
        },
      ]);
      console.log('🌱 Seeded Recommendations');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

// ==========================================
// API ROUTES
// ==========================================

// Aggregated Portfolio Data for Fast Initial Rendering
app.get('/api/portfolio', async (_req: Request, res: Response) => {
  try {
    const [profile, skills, certificates, projects, experiences, testimonials] =
      await Promise.all([
        Profile.findOne(),
        SkillCategory.find().sort({ order: 1 }),
        Certificate.find().sort({ order: 1 }),
        Project.find().sort({ order: 1 }),
        Experience.find().sort({ order: 1 }),
        Testimonial.find().sort({ order: 1 }),
      ]);

    res.json({
      success: true,
      data: {
        profile,
        skills,
        certificates,
        projects,
        experiences,
        testimonials,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch portfolio data' });
  }
});

// Profile Routes
app.get('/api/profile', async (_req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne();
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
});

app.put('/api/profile', async (req: Request, res: Response) => {
  try {
    const updated = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

// Skills Routes
app.get('/api/skills', async (_req: Request, res: Response) => {
  try {
    const skills = await SkillCategory.find().sort({ order: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch skills' });
  }
});

app.post('/api/skills', async (req: Request, res: Response) => {
  try {
    const newSkill = await SkillCategory.create(req.body);
    res.status(201).json({ success: true, data: newSkill });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to create skill category' });
  }
});

app.put('/api/skills/:id', async (req: Request, res: Response) => {
  try {
    const updated = await SkillCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to update skill' });
  }
});

app.delete('/api/skills/:id', async (req: Request, res: Response) => {
  try {
    await SkillCategory.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to delete skill' });
  }
});

// Certificates Routes
app.get('/api/certificates', async (_req: Request, res: Response) => {
  try {
    const certs = await Certificate.find().sort({ order: 1 });
    res.json({ success: true, data: certs });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch certificates' });
  }
});

app.post('/api/certificates', async (req: Request, res: Response) => {
  try {
    const newCert = await Certificate.create(req.body);
    res.status(201).json({ success: true, data: newCert });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to create certificate' });
  }
});

app.put('/api/certificates/:id', async (req: Request, res: Response) => {
  try {
    const updated = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to update certificate' });
  }
});

app.delete('/api/certificates/:id', async (req: Request, res: Response) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Certificate deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to delete certificate' });
  }
});

// Projects Routes
app.get('/api/projects', async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', async (req: Request, res: Response) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', async (req: Request, res: Response) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req: Request, res: Response) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to delete project' });
  }
});

// Experiences Routes
app.get('/api/experiences', async (_req: Request, res: Response) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch experiences' });
  }
});

app.post('/api/experiences', async (req: Request, res: Response) => {
  try {
    const newExp = await Experience.create(req.body);
    res.status(201).json({ success: true, data: newExp });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to create experience' });
  }
});

app.put('/api/experiences/:id', async (req: Request, res: Response) => {
  try {
    const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to update experience' });
  }
});

app.delete('/api/experiences/:id', async (req: Request, res: Response) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to delete experience' });
  }
});

// Testimonials Routes
app.get('/api/testimonials', async (_req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch testimonials' });
  }
});

// Client & Recruiter Inquiries
app.get('/api/inquiries', async (_req: Request, res: Response) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch inquiries' });
  }
});

app.post('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const newInquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, data: newInquiry });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to submit inquiry' });
  }
});

// Subscribers
app.get('/api/subscribers', async (_req: Request, res: Response) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json({ success: true, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch subscribers' });
  }
});

app.post('/api/subscribers', async (req: Request, res: Response) => {
  try {
    const { email, source } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }
    const subscriber = await Subscriber.findOneAndUpdate(
      { email },
      { email, source: source || 'website' },
      { upsert: true, new: true }
    );
    res.status(201).json({ success: true, data: subscriber });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to subscribe' });
  }
});

// ==========================================
// VITE MIDDLEWARE OR STATIC SERVING
// ==========================================
async function startServer() {
  await connectDB();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Portfolio Server running at http://localhost:${PORT}`);
  });
}

startServer();
