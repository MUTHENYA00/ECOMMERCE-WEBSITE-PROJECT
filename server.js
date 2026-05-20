const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');

let users = [];

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

try {
  users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
} catch (err) {
  users = [];
}

function saveUsers() {
  fs.writeFileSync(
    USERS_FILE,
    JSON.stringify(users, null, 2)
  );
}

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'signin.html'));
});

app.post('/signup', (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  const existingUser = users.find(
    u => u.email === email
  );

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'User already exists'
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password
  };

  users.push(newUser);

  saveUsers();

  res.json({
    success: true,
    message: 'Signup successful',
    user: {
      name,
      email
    }
  });
});

app.post('/login', (req, res) => {

  const { email } = req.body;

  let user = users.find(
    u => u.email === email
  );

  if (!user) {

    user = {
      id: Date.now(),
      name: 'Guest User',
      email,
      password: 'test'
    };

    users.push(user);

    saveUsers();
  }

  res.json({
    success: true,
    message: 'Login successful',
    user: {
      name: user.name,
      email: user.email
    }
  });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});