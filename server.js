const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// CORS Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Temporary database
let users = [];

// Serve frontend files
app.use(express.static(path.join(__dirname)));

// HOME PAGE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// SIGNIN PAGE
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'signin.html'));
});


// SIGNUP ROUTE
app.post('/signup', (req, res) => {
  console.log('Signup request received');
  console.log('Request body:', req.body);
  
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.log('Missing fields - name:', name, 'email:', email, 'password:', password ? 'present' : 'missing');
    return res.status(400).send('Name, email, and password are required.');
  }

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    console.log('User already exists:', email);
    return res.status(409).send('User already exists');
  }

  users.push({ name, email, password });

  console.log('User registered successfully:', { name, email });
  console.log('Current users:', users);

  res.send('Signup successful!');
});


// LOGIN ROUTE
app.post('/login', (req, res) => {
  console.log('Login request received');
  console.log('Request body:', req.body);
  
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Missing fields - email:', email, 'password:', password ? 'present' : 'missing');
    return res.status(400).send('Email and password are required.');
  }

  console.log('Login attempt for email:', email);

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    console.log('Login failed - Invalid credentials for email:', email);
    return res.status(401).send('Invalid email or password');
  }

  console.log('Login successful for:', email);
  res.send(`Login successful! Welcome, ${user.name}`);
});

// 404 fallback
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});