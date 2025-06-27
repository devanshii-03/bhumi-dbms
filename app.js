import { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import path from 'path'
import * as db from './database.js'

import { getLogins,getLogin,createLog, checkLog,
  getEvents,getEvent,createEvent, deleteEvent, 
  getVolunteers, getVolunteer, createVolunteer, deleteVolunteer,
  getInventories, getInventory, createInventory, deleteInventory,
  getFeedbacks, getFeedback, createFeedback, deleteFeedback 
 } from './database.js'

 import session from 'express-session';


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'your-secret-key', // Secret key used for session encryption
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using HTTPS
}));

// const express = require('express')
// const router = express.Router()
// const db = require('./database.js')

// router.post('/submit-form', (req,res) => {
//   const formData = req.body
//   db.query('insert into event set ?', formData, (error,results) => {
//     if(error) {
//       console.error(error)
//       res.status(500).send('Internal Server Error')
//     }
//     else {
//       console.log('Data inserted successfully')
//       res.status(200).send('Data inserted successfully')
//     }
//   })
// })

// export default router

// app.get("/login", async (req, res) => {
//     const logins = await getLogins()
//     res.send(logins)
// })

// app.get("/login/:logid", async (req, res) => {
//     const id = req.params.logid
//     const log = await getLogin(id)
//     res.send(log)
// })

// app.post('/login', async (req, res) => {
//   const { username, pass } = req.body;
//   try {
//     const exists = await checkLog(username, pass)
//     if (exists) {
//       return res.json({ redirect: '/volIndex.html'})
//     }
//     else {
//       return res.status(409).json({ message: "Login Failed! User does not exist" })
//     }
//   } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' })
//   }
// });

app.post('/login', async (req, res) => {
  // Assuming authentication is successful
  const { username, pass } = req.body;
  const id = await checkLog(username, pass)
  req.session.username = username; // Store username in session
  req.session.admin = id.isAdmin; // Set admin flag for demonstration
  res.json({ "redirect": "/volIndex.html" }); // Redirect to volIndex.html upon successful login
});


// Example of using session for authorization
app.get('/admin/dashboard', (req, res) => {
  if (req.session && req.session.admin) {
    res.send('Welcome to the admin dashboard');
  } else {
    res.status(403).send('Unauthorized');
  }
});

// Example of destroying session upon logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Logout successful');
    }
  });
});

// app.post("/register", async (req, res) => {
//   const {username, pass} = req.body
//   try {
//     const crlog = await createLog(username,pass)
//     res.send(crlog)
//   } catch (error) {
//     console.error("Failed to create login:", error)
//       res.status(500).send("An error occurred while creating the login")
//   }
    
// })

app.post('/addevent', async (req, res) => {
  const { ename, edate, evenue, edetails } = req.body;
  try {
    const eid = await createEvent(ename, edate, evenue, edetails);
    if (eid > 0) {
      // Correct redirection syntax
      return res.redirect("/volIndex.html");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error, failed to create event' });
  }
});

// app.delete('/events/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const result = await deleteEvent(id);
//     if (result) {
//       res.json({ message: result });
//     } else {
//       res.status(404).json({ error: 'Event not found' }); // ID does not match any record
//     }
//   } catch (error) {
//     console.error('Error deleting event:', error); // Log specific error details
//     res.status(500).json({ error: 'Failed to delete event.' });
//   }
// });

function isAdmin(req, res, next) {
  if (req.session && req.session.admin) {
    next(); // User is admin, proceed to next middleware
  } else {
    res.status(403).json({ error: 'Unauthorized' }); // User is not admin, return 403 Forbidden
  }
}

app.delete('/events/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
console.log(isAdmin.res)
  try {
    const result = await deleteEvent(id);
    res.json({ message: result });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event.' });
  }
});


app.get("/getInventoryNames", async (req, res) => {
  const inventories = await db.getInventoryNames()
  res.send(inventories)
})

app.post('/addinventory', async (req, res) => {
  const { iname, iquantity, cost } = req.body;
  try {
    const invid = await createInventory(iname, iquantity, cost)
    if(invid)
      return res.redirect('/volIndex.html')
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error, failed to create event' })
  }
})

app.post('/issueinventory', async (req, res) => {
  const { iname, subquantity, igiven } = req.body;
  try {
    const invid = await db.issueInventory(iname, subquantity, igiven)
    return res.redirect('/volIndex.html')
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error, failed to create event' })
  }
})

app.post('/addvolunteers', async (req, res) => {
  const { vname, vemail, vpno } = req.body;
  try {
    const volID = await createVolunteer(vname, vemail, vpno)
    if(volID)
      return res.redirect('/volIndex.html')
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error, failed to create event' })
  }
})

app.post('/addfeedback', async (req, res) => {
  const { name, role, date, exp } = req.body;
  try {
    const fid = await createFeedback(name, role, date, exp)
    return res.redirect('/index.html')
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error, failed to create event' })
  }
})

app.get('/invstats', async (req, res) => {
  try {
    const inv = await db.sumOfInventory();
    const events = await db.sumOfEvents();
    const cost = await db.costperyear();
    res.json({
      inv,
      events,
      cost
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/indexstats', async (req, res) => {
  try {
    const events = await db.sumOfEvents();
    const vols = await db.sumOfVolunteers();
    res.json({
      events,
      vols
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/events', async (req, res) => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/volunteer-count', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT COUNT(*) AS count FROM volunteers');
    connection.release();
    res.json({ count: rows[0].count });
  } catch (error) {
    console.error('Error fetching volunteer count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/inventory', async (req, res) => {
  try {
    const inv = await getInventories();
    res.json(inv);
  } catch (error) {
    console.error('Error fetching inventory list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/volunteers', async (req, res) => {
  try {
    const vol = await getVolunteers();
    res.json(vol);
  } catch (error) {
    console.error('Error fetching volunteer list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})