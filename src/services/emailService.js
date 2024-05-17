require('dotenv').config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, //true for 465, false for others ports
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        }, 
    });
    let infor = await transporter.sendMail({
        from: '"KienNgD" <nguyenduckien077@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend),
    })
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if(dataSend.language === 'vi') {
        result = 
            `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare.vn</p>
            <p>Thông tin lịch khám bệnh: </p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
            <p>Nếu thông tin là đúng vui lòng click vào link bên dưới để hoàn tất thủ tục</p>
            <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
            </div>
            <div>Xin chân thành cảm ơn !!!</div>
            `
    }
    if(dataSend.language === 'en') {
        result = 
            `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>You receive this email because you booked an online medical appointment with BookingCare.vn</p>
            <p>Information about appointment schedule: </p>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Doctor: ${dataSend.doctorName}</b></div>
            <p>If the aboce information is true, please click on the link below to complete the procedure</p>
            <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
            </div>
            <div>Sincerely thank!</div>
            `
    }
    return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if(dataSend.language === 'vi') {
        result = 
            `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare.vn</p>
            <p>Thông tin lịch đơn thuốc/ hóa đơn được gửi trong file đính kèm </p>
            
            <div>Xin chân thành cảm ơn !!!</div>
            `
    }
    if(dataSend.language === 'en') {
        result = 
            `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>You receive this email because you booked an online medical appointment with BookingCare.vn</p>
            <p>Information about prescription: </p>
            
            <div>Sincerely thank!</div>
            `
    }
    return result;
}

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            //create resauble transporter object using default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, //true for 465, false for others ports
                auth: {
                  user: process.env.EMAIL_APP,
                  pass: process.env.EMAIL_APP_PASSWORD,
                },
            });
            
            //send mail with defined transport object
            let infor = await transporter.sendMail({
                from: '"KienNgD" <nguyenduckien077@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch khám", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    }
                ]
            })
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}

