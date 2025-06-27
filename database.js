import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getLogins() {
    const [rows] = await pool.query(`select * from login`)
    return rows
}

export async function getLogin(id) {
    const [rows] = await pool.query(`
    select * from login
    where logid = ?`, [id])
    return rows[0]
}

export async function createLog(username, pass) {
    const [result] = await pool.query(`
    INSERT INTO login (username, pass)
    VALUES (?, ?)
    `, [username, pass])
    const id = result.insertId
    return id
  }

// export async function checkLog(username, pass) {
//     const [rows] = await pool.query(
//         "SELECT COUNT(*) AS count FROM login WHERE username = ? AND pass = ?", 
//         [username, pass]
//     );
//     return rows[0].count > 0; // returns true if user exists, false otherwise
// }

export async function checkLog(username, pass) {
    const [rows] = await pool.query(
        "SELECT * FROM login WHERE username = ? AND pass = ?", 
        [username, pass]
    );
    if (rows.length > 0) {
        const user = rows[0];
        const isAdmin = user.isAdmin === 1;
        return { user, isAdmin };
    }
    return null; // User not found
}


// const result = await checkLog('devanshinikam03@gmail.com', 'dev@nshi')
// console.log(result)

export async function getEvents() {
    const [rows] = await pool.query(`select * from event where eid <> 3`)
    return rows
}

export async function getEvent(id) {
    const [rows] = await pool.query(`
    select * from event
    where eid = ?`, [id])
    return rows[0]
}

export async function sumOfEvents() {
    const [[{ 'count(*)': sumOfEvents }]] = await pool.query(`select count(*) from event`)
    return sumOfEvents
}

export async function createEvent(ename, edate, evenue, edetails) {
    const [result] = await pool.query(`
    INSERT INTO event (ename, edate, evenue, edetails)
    VALUES (?, ?, ?, ?)`, [ename, edate, evenue, edetails])
    const id = result.insertId
    return id
    //return getEvent(id)
}

export async function deleteEvent(id) {
    try {
        const [result] = await pool.query('DELETE FROM event WHERE eid = ?', [id])
        if (result.affectedRows === 0) {
            throw new Error(`Event with ID ${id} not found`)
        }
      return `Event with ID ${id} deleted successfully`
    } 
    catch (error) {
        console.error('Error deleting event:', error);
        throw new Error(`Error deleting event: ${error.message}`)
    }
}

export async function getFeedbacks() {
    const [rows] = await pool.query(`select * from feedback`)
    return rows
}

export async function getFeedback(id) {
    const [rows] = await pool.query(`
    select * from feedback
    where fid = ?`, [id])
    return rows[0]
}

export async function sumOfFeedbacks() {
    const [[{ 'count(*)': sumOfFeedbacks }]] = await pool.query(`select count(*) from feedback`)
    return sumOfFeedbacks[0]
}

export async function createFeedback(fname, frole, fevent_date, fdetails ) {
    const [result] = await pool.query(`
    INSERT INTO feedback (fname, frole, fdetails, fevent_date )
    VALUES (?, ?, ?, ?)`, [fname, frole, fdetails, fevent_date])
    const id = result.insertId
    return id
}

export async function deleteFeedback(id) {
    try {
        const [result] = await pool.query('DELETE FROM feedback WHERE fid = ?', [id])
        if (result.affectedRows === 0) {
            throw new Error(`Event with ID ${id} not found`)
        }
    return `Event with ID ${id} deleted successfully`
    } 
    catch (error) {
        throw new Error(`Error deleting event: ${error.message}`)
    }
}

export async function getVolunteers() {
    const [rows] = await pool.query(`select * from volunteer`)
    return rows
}

export async function getVolunteer(id) {
    const [rows] = await pool.query(`
    select * from volunteer
    where volID = ?`, [id])
    return rows[0]
}

export async function sumOfVolunteers() {
    const [[{ 'count(*)': sumOfVolunteers }]] = await pool.query(`select count(*) from volunteer`)
    return sumOfVolunteers
}

export async function createVolunteer(vname, vemail, vpno) {
    const [result] = await pool.query(`
    INSERT INTO volunteer (vname, vemail, vpno)
    VALUES (?, ?, ?)`, [vname, vemail, vpno])
    const id = result.insertId
    return id
}

export async function deleteVolunteer(id) {
    try {
        const [result] = await pool.query('DELETE FROM volunteer WHERE volID = ?', [id])
        if (result.affectedRows === 0) {
            throw new Error(`Event with ID ${id} not found`)
        }
    return `Event with ID ${id} deleted successfully`
    } 
    catch (error) {
        throw new Error(`Error deleting event: ${error.message}`)
    }
}

export async function getInventories() {
    const [rows] = await pool.query(`select * from inventory`)
    return rows
}

// const result = await getInventories()
// console.log(result)

export async function getInventoryNames() {
    const [rows] = await pool.query(`select iname from inventory`)
    return rows
}
//.map(row => row.iname)

// const result = await getInventoryNames()
// console.log(result)

export async function getInventory(id) {
    const [rows] = await pool.query(`
    select * from inventory
    where invid = ?`, [id])
    return rows[0]
}

export async function sumOfInventory() {
    const [[{ 'count(*)': sumOfInventory }]] = await pool.query(`select count(*) from inventory`)
    return sumOfInventory
}

export async function costperyear() {
    const [[{ 'SUM(cost)': costperyear }]] = await pool.query(`
    SELECT SUM(cost)
    FROM inventory
    WHERE yearadded = YEAR(CURRENT_DATE())`)
    return costperyear
}

export async function createInventory(iname, iquantity, cost) {
    const [result] = await pool.query(`
    INSERT INTO inventory (iname, iquantity, cost, yearadded)
    VALUES (?, ?, ?, YEAR(CURRENT_DATE()))`, [iname, iquantity, cost])
    const id = result.insertId
    return id
}

export async function issueInventory(iname, subquantity, igiven) {
    const [result] = await pool.query(`
    UPDATE inventory 
    SET 
        iquantity = iquantity - ?,
        igiven = ?
    WHERE iname = ?`, 
    [subquantity, igiven, iname])
    const id = result.insertId
    console.log(id)
    return id
}

export async function deleteInventory(id) {
try {
    const [result] = await pool.query('DELETE FROM inventory WHERE invid = ?', [id])
    if (result.affectedRows === 0) {
        throw new Error(`Event with ID ${id} not found`)
    }
  return `Event with ID ${id} deleted successfully`
} 
catch (error) {
    throw new Error(`Error deleting event: ${error.message}`)
}
}

// const result = await createInventory('Fevicol', '30','','300')
// console.log(result)

// const result = await getInventories()
// console.log(result)

// const result = await createFeedback('Devanshi', 'Volunteer','Truely, time well spent, met lovely people', 1,'devanshi@gmail.com','17/04/24','17:00')
// console.log(result)

// const result = await deleteInventory(4)
// console.log(result)

//    const result = await createEvent('Bird Conservation','14/04/24','Wagholi, Pune','Time : 10:00 a.m. Join us in preparing for summer, witness the construction process of bird food and water feeders and learn how you can contribute to bird conservation efforts. Bring along plastic bowls and bottles, glue, sticks, coconut husks, screws and rope')
//    console.log(result)