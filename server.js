const express = require("express");
const cors = require('cors');
const app = express();
const mysqlConnection = require("./src/config/dbconfig");
const port = 5000;

app.use(express.json());
app.use(cors());

const EmployeeRoutes = require('./src/routes/employee.routes')
const USerRoutes = require('./src/routes/user.routes')  
const forgotpassword = require('./src/routes/forgotpassword.routes')

mysqlConnection.connect((err) => {
  if (err) {
    console.log("Error in Connection", err);
  } else {
    console.log("Mysql Connection is Established");
  }
});

 app.use('/employee', EmployeeRoutes);
 app.use('/user', USerRoutes);  
 app.use('/otp', forgotpassword);

app.listen(port, () => {
  console.log(`Server is Running at ${port}`);
});
