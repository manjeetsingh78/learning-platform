// const express = require('express');
// const router = express.Router();
// const { db } = require('../config/firebase');

// // Sign Up Route
// router.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Validate input
//     if (!username || !email || !password) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({ error: 'Password must be at least 6 characters' });
//     }

//     // Check if email already exists
//     const usersRef = db.ref('users');
//     const snapshot = await usersRef.once('value');
//     const users = snapshot.val();

//     if (users) {
//       const existingUser = Object.values(users).find(user => user.email === email);
//       if (existingUser) {
//         return res.status(400).json({ 
//           error: 'Email already registered. Please login instead.' 
//         });
//       }
//     }

//     // Create new user
//     const userId = 'user_' + Date.now();
//     const newUser = {
//       username,
//       email,
//       password, // NOTE: In production, hash the password using bcrypt!
//       createdAt: new Date().toISOString()
//     };

//     await usersRef.child(userId).set(newUser);

//     res.status(201).json({ 
//       message: 'Account created successfully!',
//       userId 
//     });

//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ error: 'Error creating account' });
//   }
// });

// // Login Route
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     // Find user by email
//     const usersRef = db.ref('users');
//     const snapshot = await usersRef.once('value');
//     const users = snapshot.val();

//     if (!users) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const userEntry = Object.entries(users).find(([id, user]) => user.email === email);

//     if (!userEntry) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const [userId, user] = userEntry;

//     // Check password (in production, use bcrypt.compare())
//     if (user.password !== password) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Return user data (exclude password)
//     const { password: _, ...userWithoutPassword } = user;

//     res.status(200).json({ 
//       message: 'Login successful',
//       user: {
//         id: userId,
//         ...userWithoutPassword
//       }
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Error logging in' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// Sign Up Route
router.post('/signup', async (req, res) => {

  //  Log incoming signup request
  console.log(" Signup request received for:", req.body.email);

  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      console.log(" Signup failed — Missing fields");
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      console.log(" Weak password attempt for:", email);
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if email already exists
    const usersRef = db.ref('users');
    const snapshot = await usersRef.once('value');
    const users = snapshot.val();

    if (users) {
      const existingUser = Object.values(users).find(user => user.email === email);
      if (existingUser) {
        console.log(" Duplicate signup attempt:", email);
        return res.status(400).json({ 
          error: 'Email already registered. Please login instead.' 
        });
      }
    }

    // Create new user
    const userId = 'user_' + Date.now();
    const newUser = {
      username,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    await usersRef.child(userId).set(newUser);

    console.log(" Signup success for:", email);

    res.status(201).json({ 
      message: 'Account created successfully!',
      userId 
    });

  } catch (error) {
    console.error(' Signup error:', error);
    res.status(500).json({ error: 'Error creating account' });
  }
});


// Login Route
router.post('/login', async (req, res) => {

  //  Log login attempts
  console.log(" Login request received for:", req.body.email);

  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log(" Login failed — empty fields");
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const usersRef = db.ref('users');
    const snapshot = await usersRef.once('value');
    const users = snapshot.val();

    if (!users) {
      console.log(" No users found — login failed:", email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const userEntry = Object.entries(users).find(([id, user]) => user.email === email);

    if (!userEntry) {
      console.log(" Login failed — email not found:", email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const [userId, user] = userEntry;

    if (user.password !== password) {
      console.log(" Login failed — wrong password:", email);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log("✔ Login success for:", email);

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ 
      message: 'Login successful',
      user: {
        id: userId,
        ...userWithoutPassword
      }
    });

  } catch (error) {
    console.error(' Login error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
