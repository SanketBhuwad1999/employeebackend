const express = require('express');
const router = express.Router();

const EmployeeController = require('../controller/employee.controller')
router.get('/getEmployee', EmployeeController.getEmployees);
router.post('/addEmployee', EmployeeController.addEmployee);
router.get('/details/:employee_id', EmployeeController.getEmployee)
router.put('/editEmployee/:employee_id', EmployeeController.editEmployee);
router.delete('/deleteEmployee/:employee_id', EmployeeController.deleteEmployee);

module.exports = router;