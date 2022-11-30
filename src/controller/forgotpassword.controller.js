const dotenv = require('dotenv');
dotenv.config();

let database = process.env.DB_NAME; 
const mysqlConnection = require('../config/dbconfig');
var nodemailer = require('nodemailer');
const md5 = require('md5')

//static folder


module.exports.updateUser = (req, res) => {
let { username } = req.body;
console.log(username);
var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

// API
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',
    auth: {
        user: 'bhuwadsanket@gmail.com',
        pass: 'nidwgdvqchiwywtm'
    },
    secureConnection: 'false',

    tls: {

        ciphers: 'SSLv3',

        rejectUnauthorized: false

    },
});

//defining port

var mailOptions = {
    from: 'bhuwadsanket@gmail.com',
    to: username,
    // cc: '...............',
    subject: "Otp for registration is: ",
    text: "Please verify your OTP. Your OTP is " + otp + " Don't Share With Anyone!!!"
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
        let sql = `update ${database}.user set otp=? where username=? `;
        // let { otp } = req.body;
    
        mysqlConnection.query(sql, [otp , username], (err, rows, fields) => {
            if (!err) {
                // console.log(rows)
                res.send(rows)
            }
            else {
                res.send(err)
            }
        })
    }
    
});

}



module.exports.updatepassword = (req, res) => {
    let sql = 'update relience.user set password=? where username=? ';
    let {username , password } = req.body;
    console.log(password);

    let hashPassword = md5(password);
    console.log((hashPassword));

    mysqlConnection.query(sql, [hashPassword , username], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        }
        else {
            res.send(err)
        }
    })
}