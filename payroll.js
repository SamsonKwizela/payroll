
document.addEventListener("DOMContentLoaded", function() {
    const submitPayroll = document.getElementById('submit_payroll');
    
    submitPayroll.addEventListener('click', function(event) {
        event.preventDefault();

        const employeeName = document.getElementById('employee_name').value.trim();
        const hoursWorked = parseFloat(document.getElementById('hours_worked').value);
        const hourlyWage = parseFloat(document.getElementById('hourly_wage').value);

        if (!employeeName || isNaN(hoursWorked) || isNaN(hourlyWage)) {
            alert("Please fill in all fields with valid data.");
            return;
        }

        const totalPay = calculatePay(hoursWorked, hourlyWage);

        alert(`Payroll for ${employeeName} has been processed. Total Pay: $${totalPay}`);

        // Example SQL query (sent to the server-side, e.g., PHP or Node.js)
        const sqlQuery = `
            INSERT INTO payroll (employee_name, hours_worked, hourly_wage, total_pay)
            VALUES ('${employeeName}', ${hoursWorked}, ${hourlyWage}, ${totalPay});
        `;
        
        console.log(sqlQuery);
        // In a real scenario, you would send this query to a back-end server (e.g., using fetch or AJAX)
    });

    function calculatePay(hours, wage) {
        return hours * wage;
    }
});


const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'payroll_db'
});

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Route to handle payroll submission
app.post('/submitPayroll', (req, res) => {
    const { employeeName, hoursWorked, hourlyWage, totalPay } = req.body;

    const sql = `
        INSERT INTO payroll (employee_name, hours_worked, hourly_wage, total_pay)
        VALUES (?, ?, ?, ?);
    `;

    connection.query(sql, [employeeName, hoursWorked, hourlyWage, totalPay], (err, result) => {
        if (err) {
            console.error('Error inserting payroll data:', err);
            return res.status(500).send('Server error');
        }
        res.send('Payroll submitted successfully');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

submitPayroll.addEventListener('click', function(event) {
    event.preventDefault();

    const employeeName = document.getElementById('employee_name').value.trim();
    const hoursWorked = parseFloat(document.getElementById('hours_worked').value);
    const hourlyWage = parseFloat(document.getElementById('hourly_wage').value);
    const totalPay = calculatePay(hoursWorked, hourlyWage);

    // Validate data...
    
    fetch('/submitPayroll', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            employeeName: employeeName,
            hoursWorked: hoursWorked,
            hourlyWage: hourlyWage,
            totalPay: totalPay
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
        alert(`Payroll for ${employeeName} has been submitted.`);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Error submitting payroll");
    });
});
