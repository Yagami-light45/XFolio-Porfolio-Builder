// Load environment variables (like database connection string)
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(express.json());

// Connect to MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1); 
  }
};

const portfolioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, 
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

// ROUTES
app.post('/api/portfolios', async (req, res) => {
  try {
    const portfolioData = req.body;
    
    if (!portfolioData.name) {
      return res.status(400).json({ message: 'Name is required' });
    }    
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
    res.status(500).json({ message: 'Failed to create portfolio' });
  }
});

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

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'Server is running!',
    time: new Date().toISOString()
  });
});

const startServer = async () => {
  await connectDB(); 
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

process.on('SIGINT', async () => {
  console.log('\n🔄 Shutting down server...');
  await mongoose.connection.close();
  
  process.exit(0);
});

startServer();