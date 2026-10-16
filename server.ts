import express from 'express';
import type { Request, Response } from 'express';
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
  SkillLibrary,
  Inquiry,
  Subscriber,
} from './src/server/models.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// CORS Support for Admin Panel & External Clients
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (_req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const rawUri =
  process.env.MONGODB_URI ||
  'mongodb+srv://portfolio08292:portfolio136366@cluster0.xqhmhxd.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_URI = rawUri.trim().replace(/^["']|["']$/g, '');

let isConnecting = false;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  if (isConnecting) return;
  try {
    isConnecting = true;
    console.log('Connecting to MongoDB at:', MONGODB_URI.replace(/:[^:@]+@/, ':***@'));
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    });
    console.log('✅ Connected to MongoDB successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
  } finally {
    isConnecting = false;
  }
}

// Seeding removed: Database collections are managed dynamically via MongoDB Atlas and Admin Panel.

// ==========================================
// API ROUTES (ALL 7 ACTIVE COLLECTIONS + ADMIN PANEL)
// ==========================================

// Aggregated Portfolio Data for Fast Initial Rendering
app.get('/api/portfolio', async (_req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected (state: ' + mongoose.connection.readyState + '), reconnecting...');
      await connectDB();
    }

    const [profile, skills, certificates, projects, experiences] =
      await Promise.all([
        Profile.findOne().lean(),
        SkillCategory.find().sort({ order: 1 }).lean(),
        Certificate.find().sort({ order: 1 }).lean(),
        Project.find().sort({ order: 1 }).lean(),
        Experience.find().sort({ order: 1 }).lean(),
      ]);

    const normalizedExperiences = experiences.map((exp: any) => {
      const title = exp.title || exp.role || '';
      const subtitle = exp.subtitle || exp.company || '';
      const date = exp.date || exp.period || '';
      const place = exp.place || exp.location || '';
      const order = typeof exp.order === 'number' ? exp.order : 0;

      return {
        ...exp,
        id: exp._id ? String(exp._id) : exp.id,
        title,
        subtitle,
        date,
        place,
        order,
        // Automatic backward fallback compatibility
        role: title,
        company: subtitle,
        period: date,
        location: place,
      };
    });

    const normalizedProfile = profile
      ? {
          ...profile,
          github: profile.github || 'https://github.com/luckychoudhary',
          linkedin: profile.linkedin || 'https://linkedin.com/in/lucky-choudhary08292',
          leetcode: profile.leetcode || 'https://leetcode.com/luckychoudhary',
          twitter: profile.twitter || 'https://twitter.com/luckychoudhary',
          email: profile.email || 'luckychoudhary08292@gmail.com',
        }
      : null;

    res.json({
      success: true,
      data: {
        profile: normalizedProfile,
        skills,
        certificates,
        projects,
        experiences: normalizedExperiences,
      },
    });
  } catch (error) {
    console.error('Error in /api/portfolio:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch portfolio data', details: String(error) });
  }
});

// ------------------------------------------
// 1. Profile Routes (/api/profile & /api/profiles)
// ------------------------------------------
const getProfileHandler = async (_req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne();
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
};

const updateProfileHandler = async (req: Request, res: Response) => {
  try {
    const updatePayload = { ...req.body };
    // Support common aliases from different admin panels
    if (updatePayload.gmail && !updatePayload.email) {
      updatePayload.email = updatePayload.gmail;
    }
    if (updatePayload.linkdin && !updatePayload.linkedin) {
      updatePayload.linkedin = updatePayload.linkdin;
    }
    if (updatePayload.x && !updatePayload.twitter) {
      updatePayload.twitter = updatePayload.x;
    }

    const updated = await Profile.findOneAndUpdate({}, updatePayload, { new: true, upsert: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
};

app.get('/api/profile', getProfileHandler);
app.get('/api/profiles', getProfileHandler);
app.put('/api/profile', updateProfileHandler);
app.put('/api/profiles', updateProfileHandler);
app.post('/api/profile', updateProfileHandler);
app.post('/api/profiles', updateProfileHandler);

// ------------------------------------------
// 2. Certificates Routes (/api/certificates)
// ------------------------------------------
app.get('/api/certificates', async (req: Request, res: Response) => {
  try {
    const filter: Record<string, any> = {};
    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }
    const certs = await Certificate.find(filter).sort({ order: 1 });
    res.json({ success: true, data: certs });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch certificates' });
  }
});

app.get('/api/certificates/:id', async (req: Request, res: Response) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ success: false, error: 'Certificate not found' });
    res.json({ success: true, data: cert });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch certificate' });
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
    if (!updated) return res.status(404).json({ success: false, error: 'Certificate not found' });
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

// ------------------------------------------
// 3. Projects Routes (/api/projects)
// ------------------------------------------
app.get('/api/projects', async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch projects' });
  }
});

app.get('/api/projects/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch project' });
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
    if (!updated) return res.status(404).json({ success: false, error: 'Project not found' });
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

// ------------------------------------------
// 4. Skills / SkillCategories Routes (/api/skillcategories & /api/skills)
// ------------------------------------------
const getSkillsHandler = async (_req: Request, res: Response) => {
  try {
    const skills = await SkillCategory.find().sort({ order: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch skills' });
  }
};

const getSkillByIdHandler = async (req: Request, res: Response) => {
  try {
    const skill = await SkillCategory.findById(req.params.id);
    if (!skill) return res.status(404).json({ success: false, error: 'Skill category not found' });
    res.json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch skill category' });
  }
};

const createSkillHandler = async (req: Request, res: Response) => {
  try {
    const newSkill = await SkillCategory.create(req.body);
    res.status(201).json({ success: true, data: newSkill });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to create skill category' });
  }
};

const updateSkillHandler = async (req: Request, res: Response) => {
  try {
    const updated = await SkillCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: 'Skill category not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to update skill category' });
  }
};

const deleteSkillHandler = async (req: Request, res: Response) => {
  try {
    await SkillCategory.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Skill category deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to delete skill category' });
  }
};

app.get('/api/skillcategories', getSkillsHandler);
app.get('/api/skills', getSkillsHandler);
app.get('/api/skillcategories/:id', getSkillByIdHandler);
app.get('/api/skills/:id', getSkillByIdHandler);
app.post('/api/skillcategories', createSkillHandler);
app.post('/api/skills', createSkillHandler);
app.put('/api/skillcategories/:id', updateSkillHandler);
app.put('/api/skills/:id', updateSkillHandler);
app.delete('/api/skillcategories/:id', deleteSkillHandler);
app.delete('/api/skills/:id', deleteSkillHandler);

// ------------------------------------------
// 5. Experiences Routes (/api/experiences)
// ------------------------------------------
const normalizeExperienceItem = (exp: any) => {
  if (!exp) return null;
  const obj = exp.toObject ? exp.toObject() : exp;
  const title = obj.title || obj.role || '';
  const subtitle = obj.subtitle || obj.company || '';
  const date = obj.date || obj.period || '';
  const place = obj.place || obj.location || '';
  const order = typeof obj.order === 'number' ? obj.order : 0;

  return {
    ...obj,
    id: obj._id ? String(obj._id) : obj.id,
    title,
    subtitle,
    date,
    place,
    order,
    // Automatic fallback compatibility with existing database records:
    role: title,
    company: subtitle,
    period: date,
    location: place,
  };
};

app.get('/api/experiences', async (_req: Request, res: Response) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 }).lean();
    const normalized = experiences.map(normalizeExperienceItem);
    res.json({ success: true, data: normalized });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch experiences' });
  }
});

app.get('/api/experiences/:id', async (req: Request, res: Response) => {
  try {
    const exp = await Experience.findById(req.params.id).lean();
    if (!exp) return res.status(404).json({ success: false, error: 'Experience not found' });
    res.json({ success: true, data: normalizeExperienceItem(exp) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch experience' });
  }
});

app.post('/api/experiences', async (req: Request, res: Response) => {
  try {
    const { title, subtitle, date, place, order, role, company, period, location, description, type } = req.body;
    const finalTitle = title || role || '';
    const finalSubtitle = subtitle || company || '';
    const finalDate = date || period || '';
    const finalPlace = place || location || '';
    const finalOrder = typeof order === 'number' ? order : 0;

    const newExp = await Experience.create({
      title: finalTitle,
      subtitle: finalSubtitle,
      date: finalDate,
      place: finalPlace,
      order: finalOrder,
      role: finalTitle,
      company: finalSubtitle,
      period: finalDate,
      location: finalPlace,
      description: description || '',
      type: type || 'work',
    });
    res.status(201).json({ success: true, data: normalizeExperienceItem(newExp) });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to create experience', details: String(error) });
  }
});

app.put('/api/experiences/:id', async (req: Request, res: Response) => {
  try {
    const { title, subtitle, date, place, order, role, company, period, location, description, type } = req.body;
    const updatePayload: any = { ...req.body };

    if (title !== undefined || role !== undefined) {
      const val = title || role || '';
      updatePayload.title = val;
      updatePayload.role = val;
    }
    if (subtitle !== undefined || company !== undefined) {
      const val = subtitle || company || '';
      updatePayload.subtitle = val;
      updatePayload.company = val;
    }
    if (date !== undefined || period !== undefined) {
      const val = date || period || '';
      updatePayload.date = val;
      updatePayload.period = val;
    }
    if (place !== undefined || location !== undefined) {
      const val = place || location || '';
      updatePayload.place = val;
      updatePayload.location = val;
    }
    if (typeof order === 'number') {
      updatePayload.order = order;
    }

    const updated = await Experience.findByIdAndUpdate(req.params.id, updatePayload, { new: true }).lean();
    if (!updated) return res.status(404).json({ success: false, error: 'Experience not found' });
    res.json({ success: true, data: normalizeExperienceItem(updated) });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to update experience', details: String(error) });
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

// ------------------------------------------
// 6. Skill Library Routes (/api/skilllibrary & /api/skilllibraries)
// ------------------------------------------
const DEFAULT_SKILL_LIBRARY = [
  { name: 'TypeScript', category: 'Languages', badge: 'ts', color: '#3178c6' },
  { name: 'JavaScript', category: 'Languages', badge: 'js', color: '#f7df1e' },
  { name: 'Python', category: 'Languages', badge: 'py', color: '#3776ab' },
  { name: 'Java', category: 'Languages', badge: 'java', color: '#007396' },
  { name: 'C++', category: 'Languages', badge: 'cpp', color: '#00599c' },
  { name: 'Go', category: 'Languages', badge: 'go', color: '#00add8' },
  { name: 'Rust', category: 'Languages', badge: 'rust', color: '#dea584' },
  { name: 'SQL', category: 'Languages', badge: 'sql', color: '#e38c00' },
  { name: 'HTML5', category: 'Frontend', badge: 'html', color: '#e34f26' },
  { name: 'CSS3', category: 'Frontend', badge: 'css', color: '#1572b6' },
  { name: 'React', category: 'Frontend', badge: 'react', color: '#61dafb' },
  { name: 'Next.js', category: 'Frontend', badge: 'next', color: '#000000' },
  { name: 'Vue.js', category: 'Frontend', badge: 'vue', color: '#4fc08d' },
  { name: 'Tailwind CSS', category: 'Frontend', badge: 'tailwind', color: '#06b6d4' },
  { name: 'Redux Toolkit', category: 'Frontend', badge: 'redux', color: '#764abc' },
  { name: 'Node.js', category: 'Backend', badge: 'node', color: '#339933' },
  { name: 'Express.js', category: 'Backend', badge: 'express', color: '#000000' },
  { name: 'FastAPI', category: 'Backend', badge: 'fastapi', color: '#009688' },
  { name: 'Spring Boot', category: 'Backend', badge: 'spring', color: '#6db33f' },
  { name: 'GraphQL', category: 'Backend', badge: 'graphql', color: '#e10098' },
  { name: 'WebSockets', category: 'Backend', badge: 'ws', color: '#ff6422' },
  { name: 'MongoDB', category: 'Databases', badge: 'mongo', color: '#47a248' },
  { name: 'PostgreSQL', category: 'Databases', badge: 'postgres', color: '#4169e1' },
  { name: 'MySQL', category: 'Databases', badge: 'mysql', color: '#4479a1' },
  { name: 'Redis', category: 'Databases', badge: 'redis', color: '#dc382d' },
  { name: 'Elasticsearch', category: 'Databases', badge: 'elastic', color: '#005571' },
  { name: 'AWS', category: 'Cloud & DevOps', badge: 'aws', color: '#ff9900' },
  { name: 'Google Cloud (GCP)', category: 'Cloud & DevOps', badge: 'gcp', color: '#4285f4' },
  { name: 'Docker', category: 'Cloud & DevOps', badge: 'docker', color: '#2496ed' },
  { name: 'Kubernetes', category: 'Cloud & DevOps', badge: 'k8s', color: '#326ce5' },
  { name: 'Terraform', category: 'Cloud & DevOps', badge: 'tf', color: '#844fba' },
  { name: 'GitHub Actions', category: 'Cloud & DevOps', badge: 'gha', color: '#2088ff' },
  { name: 'Linux / Bash', category: 'Cloud & DevOps', badge: 'linux', color: '#fcc624' },
  { name: 'Nginx', category: 'Cloud & DevOps', badge: 'nginx', color: '#009639' },
  { name: 'Git', category: 'Tools', badge: 'git', color: '#f05032' },
  { name: 'Kafka', category: 'Tools', badge: 'kafka', color: '#231f20' },
  { name: 'PyTorch', category: 'AI & Data Science', badge: 'pytorch', color: '#ee4c2c' },
  { name: 'TensorFlow', category: 'AI & Data Science', badge: 'tf', color: '#ff6f00' },
  { name: 'Pandas', category: 'AI & Data Science', badge: 'pandas', color: '#150458' },
  { name: 'NumPy', category: 'AI & Data Science', badge: 'numpy', color: '#013243' },
];

const getSkillLibraryHandler = async (req: Request, res: Response) => {
  try {
    const filter: Record<string, any> = {};
    if (req.query.category && req.query.category !== 'All') {
      filter.category = req.query.category;
    }
    let skills = await SkillLibrary.find(filter).sort({ name: 1 });
    // Seed default if database collection is empty
    if (skills.length === 0 && (!req.query.category || req.query.category === 'All')) {
      await SkillLibrary.insertMany(DEFAULT_SKILL_LIBRARY);
      skills = await SkillLibrary.find().sort({ name: 1 });
    }
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch skill library' });
  }
};

app.get('/api/skilllibrary', getSkillLibraryHandler);
app.get('/api/skilllibraries', getSkillLibraryHandler);

app.post('/api/skilllibrary', async (req: Request, res: Response) => {
  try {
    const item = await SkillLibrary.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to create skill' });
  }
});

app.put('/api/skilllibrary/:id', async (req: Request, res: Response) => {
  try {
    const updated = await SkillLibrary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: 'Skill not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to update skill' });
  }
});

app.delete('/api/skilllibrary/:id', async (req: Request, res: Response) => {
  try {
    await SkillLibrary.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to delete skill' });
  }
});

// ------------------------------------------
// 7. Client & Recruiter Inquiries (/api/inquiries)
// ------------------------------------------
app.get('/api/inquiries', async (_req: Request, res: Response) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch inquiries' });
  }
});

app.get('/api/inquiries/:id', async (req: Request, res: Response) => {
  try {
    const item = await Inquiry.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Inquiry not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch inquiry' });
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

app.put('/api/inquiries/:id', async (req: Request, res: Response) => {
  try {
    const updated = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: 'Inquiry not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to update inquiry' });
  }
});

app.patch('/api/inquiries/:id', async (req: Request, res: Response) => {
  try {
    const updated = await Inquiry.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: 'Inquiry not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to update inquiry' });
  }
});

app.delete('/api/inquiries/:id', async (req: Request, res: Response) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to delete inquiry' });
  }
});

// ------------------------------------------
// 8. Subscribers Routes (/api/subscribers)
// ------------------------------------------
app.get('/api/subscribers', async (_req: Request, res: Response) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json({ success: true, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch subscribers' });
  }
});

app.get('/api/subscribers/:id', async (req: Request, res: Response) => {
  try {
    const sub = await Subscriber.findById(req.params.id);
    if (!sub) return res.status(404).json({ success: false, error: 'Subscriber not found' });
    res.json({ success: true, data: sub });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch subscriber' });
  }
});

app.post('/api/subscribers', async (req: Request, res: Response) => {
  try {
    const { email, status } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }
    const subscriber = await Subscriber.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { email: email.toLowerCase().trim(), status: status || 'active' },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json({ success: true, data: subscriber });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to subscribe' });
  }
});

app.put('/api/subscribers/:id', async (req: Request, res: Response) => {
  try {
    const updated = await Subscriber.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, error: 'Subscriber not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to update subscriber' });
  }
});

app.delete('/api/subscribers/:id', async (req: Request, res: Response) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Subscriber deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to delete subscriber' });
  }
});

// ==========================================
// 9. Database Diagnostics & Backup Endpoints
// ==========================================

// Real-time Database Stats across all active collections (excluding testimonials)
app.get('/api/stats', async (_req: Request, res: Response) => {
  try {
    const [
      certCount,
      projCount,
      skillCatCount,
      skillLibCount,
      profileCount,
      expCount,
      inqCount,
      subCount,
    ] = await Promise.all([
      Certificate.countDocuments(),
      Project.countDocuments(),
      SkillCategory.countDocuments(),
      SkillLibrary.countDocuments(),
      Profile.countDocuments(),
      Experience.countDocuments(),
      Inquiry.countDocuments(),
      Subscriber.countDocuments(),
    ]);

    res.json({
      success: true,
      data: {
        certificates: certCount,
        projects: projCount,
        skillCategories: skillCatCount,
        skillLibrary: skillLibCount,
        profiles: profileCount,
        experiences: expCount,
        inquiries: inqCount,
        subscribers: subCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch database statistics' });
  }
});

// Full Database Backup Export as Single JSON File (All 7 active collections)
app.get('/api/export-all', async (_req: Request, res: Response) => {
  try {
    const [
      profiles,
      skillcategories,
      certificates,
      projects,
      experiences,
      skilllibraries,
      inquiries,
      subscribers,
    ] = await Promise.all([
      Profile.find().lean(),
      SkillCategory.find().lean(),
      Certificate.find().lean(),
      Project.find().lean(),
      Experience.find().lean(),
      SkillLibrary.find().lean(),
      Inquiry.find().lean(),
      Subscriber.find().lean(),
    ]);

    const backupData = {
      exportTimestamp: new Date().toISOString(),
      cluster: 'Cluster0 MongoDB Atlas',
      collections: {
        profiles,
        skillcategories,
        certificates,
        projects,
        experiences,
        skilllibraries,
        inquiries,
        subscribers,
      },
      counts: {
        profiles: profiles.length,
        skillcategories: skillcategories.length,
        certificates: certificates.length,
        projects: projects.length,
        experiences: experiences.length,
        skilllibraries: skilllibraries.length,
        inquiries: inquiries.length,
        subscribers: subscribers.length,
      },
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=portfolio-backup-${Date.now()}.json`);
    res.json(backupData);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to export database backup', details: String(error) });
  }
});

// Live Database Health Monitoring
app.get('/api/status', async (_req: Request, res: Response) => {
  const startTime = Date.now();
  const readyState = mongoose.connection.readyState;
  let latencyMs = -1;
  let isHealthy = readyState === 1;

  if (isHealthy && mongoose.connection.db) {
    try {
      await mongoose.connection.db.admin().ping();
      latencyMs = Date.now() - startTime;
    } catch {
      isHealthy = false;
    }
  }

  res.json({
    status: isHealthy ? 'healthy' : readyState === 2 ? 'connecting' : 'disconnected',
    readyState,
    latencyMs,
    timestamp: new Date().toISOString(),
    database: mongoose.connection.name || 'portfolio',
  });
});

// Force Reconnect
app.post('/api/reconnect', async (_req: Request, res: Response) => {
  try {
    await connectDB();
    res.json({
      success: true,
      readyState: mongoose.connection.readyState,
      message: mongoose.connection.readyState === 1 ? 'Successfully connected to MongoDB cluster' : 'Reconnecting...',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
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
