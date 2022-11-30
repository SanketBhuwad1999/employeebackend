const dotenv = require('dotenv');
dotenv.config();
let database = process.env.DB_NAME;
const mysqlConnection = require('../config/dbconfig');
module.exports.getEmployees = (req, res) => {
    mysqlConnection.query(`select * from ${database}.employee`, (err, rows, fields) => {
        if (!err){
            res.send(rows)
        }
        else{
            res.send(err)
        }
    })
}

module.exports.addEmployee = (req, res) => {
    let sql = `insert into ${database}.employee set employee_id = ?, employee_name =? ,email_id=? ,department=? ,designation=?`;
    let {employee_id, employee_name, email_id, department, designation} = req.body;
    mysqlConnection.query(sql, [employee_id, employee_name, email_id, department, designation], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        }
        else {
            res.send(err)
        }
    })
}

module.exports.editEmployee = (req, res) => {
    let sql = `update ${database}.employee set employee_name =? ,email_id=? ,department=? ,designation=? where employee_id=?`;
    let { employee_id } = req.params;
    let { employee_name, email_id, department, designation } = req.body;
    mysqlConnection.query(sql, [employee_name, email_id, department, designation, employee_id], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        }
        else {
            res.send(err)
        }
    })
}

module.exports.deleteEmployee = (req, res) => {
    let sql = `delete from ${database}.employee where employee_id =?`;
    let { employee_id } = req.params;
    mysqlConnection.query(sql, [employee_id], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        }
        else {
            res.send(err)
        }
    })
}

module.exports.getEmployee = (req, res) => {
    let sql = `select * from ${database}.employee where employee_id=?`;
    let { employee_id } = req.params;
    mysqlConnection.query( sql, [employee_id],(err, rows, fields) => {
        if (!err){
            res.send(rows)
        }else{
            res.send(err)
        }
    })
}


