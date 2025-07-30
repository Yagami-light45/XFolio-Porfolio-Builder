// server.js

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator'); 

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://x-folio-porfolio-builder.vercel.app/' : 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


// --- MongoDB Connection ---
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1); 
  }
};


// Mongoose Schema 
const portfolioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true }, 
  name: { type: String, required: true },
  profession: String,
  bio: String,
  email: String,
  linkedin: String,
  github: String,
  image: String,
  skills: [String],
  experience: [{
    title: String,
    company: String,
    duration: String,
    description: String
  }],
  projects: [{
    title: String,
    link: String,
    techStack: String,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    duration: String,
    description: String
  }],
  createdAt: { type: Date, default: Date.now }
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

const createUniqueUsername = async (name) => {
  let username = name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  const existingPortfolio = await Portfolio.findOne({ username });
  
  if (existingPortfolio) {
    username = `${username}${Math.floor(1000 + Math.random() * 9000)}`;
  }
  
  return username;
};

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'Server is running!',
    time: new Date().toISOString()
  });
});

// Create a new portfolio
app.post(
  '/api/portfolios', 
  [

    body('name').trim().notEmpty().withMessage('Name is required.').escape(),
    body('profession').trim().escape(),
    body('bio').trim().escape(),
    body('email').optional({ checkFalsy: true }).isEmail().withMessage('Please provide a valid email.').normalizeEmail(),
    body('linkedin').optional({ checkFalsy: true }).isURL().withMessage('Please provide a valid LinkedIn URL.'),
    body('github').optional({ checkFalsy: true }).isURL().withMessage('Please provide a valid GitHub URL.'),
    body('skills.*').trim().escape(),
    body('experience.*.title').trim().escape(),
    body('experience.*.company').trim().escape(),
    body('experience.*.duration').trim().escape(),
    body('experience.*.description').trim().escape(),
    body('projects.*.title').trim().escape(),
    body('projects.*.link').optional({ checkFalsy: true }).isURL(),
    body('projects.*.techStack').trim().escape(),
    body('projects.*.description').trim().escape(),
    body('education.*.institution').trim().escape(),
    body('education.*.degree').trim().escape(),
    body('education.*.duration').trim().escape(),
    body('education.*.description').trim().escape(),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation failed", errors: errors.array() });
    }

    try {
      const portfolioData = req.body;
      const username = await createUniqueUsername(portfolioData.name);  
      
      const newPortfolio = new Portfolio({
        ...portfolioData,
        username: username
      });

      await newPortfolio.save();
   
      res.status(201).json({
        message: 'Portfolio created successfully!',
        username: username
      });
      
    } catch (error) {
      console.error('Error creating portfolio:', error);
      if (error.code === 11000) {
        return res.status(409).json({ message: 'A portfolio with this key already exists.' });
      }
      res.status(500).json({ message: 'Failed to create portfolio due to a server error.' });
    }
  }
);

app.get('/api/portfolios/:username', async (req, res) => {
  try {
    const { username } = req.params;
  
    const portfolio = await Portfolio.findOne({ username });
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
 
    res.status(200).json(portfolio);
    
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ message: 'Failed to fetch portfolio' });
  }
});


const startServer = async () => {
  await connectDB(); 
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};
  console.log('NODE_ENV:', process.env.NODE_ENV);
process.on('SIGINT', async () => {
  console.log('\n🔄 Shutting down server...');
  await mongoose.connection.close();
  process.exit(0);
});

startServer();