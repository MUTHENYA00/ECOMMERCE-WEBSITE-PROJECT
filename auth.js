const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;


/* ---------------- MIDDLEWARE ---------------- */

// read form data
app.use(express.urlencoded({ extended: true }));

// read json
app.use(express.json());

// serve frontend files
app.use(express.static(__dirname));


/* ---------------- TEMP DATABASE ---------------- */

let users = [];


/* ---------------- HOME ROUTE ---------------- */

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


/* ---------------- SIGNIN PAGE ---------------- */

app.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, "signin.html"));
});


/* ---------------- SIGNUP ---------------- */

app.post("/signup", (req, res) => {

    const { name, email, password } = req.body;

    console.log("SIGNUP RECEIVED:");
    console.log(name, email, password);


    // check if user already exists
    const existingUser = users.find(
        user => user.email === email
    );

    if (existingUser) {

        return res.send(`
            <h2>User already exists</h2>
            <a href="/signin.html">Go Back</a>
        `);

    }


    // save user
    users.push({
        name,
        email,
        password
    });

    console.log("CURRENT USERS:");
    console.log(users);


    res.send(`
        <h2>Signup successful!</h2>
        <a href="/signin.html">Login Now</a>
    `);

});


/* ---------------- LOGIN ---------------- */

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    console.log("LOGIN ATTEMPT:");
    console.log(email, password);


    // check user
    const user = users.find(
        user =>
            user.email === email &&
            user.password === password
    );


    if (!user) {

        return res.send(`
            <h2>Invalid email or password</h2>
            <a href="/signin.html">Try Again</a>
        `);

    }


    res.send(`
        <h1>Welcome ${user.name}</h1>
        <p>Login successful!</p>

        <a href="/">Go to Homepage</a>
    `);

});


/* ---------------- VIEW USERS ---------------- */

app.get("/users", (req, res) => {

    res.json(users);

});


/* ---------------- SERVER ---------------- */

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});