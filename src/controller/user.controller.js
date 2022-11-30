const dotenv = require('dotenv');
dotenv.config();

let database = process.env.DB_NAME; 
const mysqlConnection = require('../config/dbconfig');
const md5 = require('md5')

module.exports.getUser = (req, res) => {
    mysqlConnection.query(`select * from ${database}.user`, (err, rows, fields) => {
        if (!err){
            res.send(rows)
        }
        else{
            res.send(err)
        }
    })
}

module.exports.createUser = (req, res) => {
    let sql = `insert into ${database}.user set fullname =? , username =? ,password=?`;
    let { fullname , username, password } = req.body;
    let hashPassword = md5(password);
    console.log(md5(hashPassword));

    mysqlConnection.query(sql, [fullname , username, hashPassword], (err, rows, fields) => {
        if (!err) {
        
            res.send(rows)
        }
        else {
           
            res.send(err)
        }
    })
}

module.exports.deleteUser = (req, res) => {
    let sql = `delete from ${database}.user where id =?`;
    let { id } = req.params;
    mysqlConnection.query(sql, [id], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        }
        else {
            res.send(err)
        }
    })
}

module.exports.login = (req, res) => {
    let sql = `select * from ${database}.user where username =? and password=?`;
    let { username, password } = req.body;

    let hashPassword = md5(password);
    console.log(md5(hashPassword));

    mysqlConnection.query(sql, [ username, hashPassword], (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.send(rows)
        }
        else {
            res.send(err)
        }
    })
}