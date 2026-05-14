const express = require("express");
const app = express();
const PORT = 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Temporary database
let users = [];

// Serve frontend files
app.use(express.static(__dirname));


// SIGNUP ROUTE
app.post("/signup", (req, res) => {
    const { email, password } = req.body;

    users.push({ email, password });

    console.log("User registered:", users);

    res.send("User registered successfully!");
});


// LOGIN ROUTE
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    console.log("Login attempt:", email, password);

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.send("Invalid email or password");
    }

    res.send("Login successful!");
});


// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});