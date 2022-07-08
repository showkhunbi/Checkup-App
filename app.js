const secrets = require("./secrets")
const request = require('request');
const nodemailer = require('nodemailer');

days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

var transporter = nodemailer.createTransport({
    host: secrets.emailHost,
    port: 465,
    secure: true,
    auth: {
        user: secrets.emailUser,
        pass: secrets.emailPassword
    }
});

const checkup = () => {
    date = new Date
    today = days[date.getDay()]
    request(`http://dataservice.accuweather.com/currentconditions/v1/${secrets.locationKey}?apikey=${secrets.APIKEY}`, {}, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        response = JSON.parse(body)
        weatherText = response[0].WeatherText

        var mailOptions = {
            from: 'johnson@openresume.ng',
            to: 'maximusjshokes@gmail.com',
            subject: `Happy ${today}, Checking up on you.`,
            text: `
            Hello Victoria, Good morning and Happy ${today},

            It is going to be ${weatherText} today at Moniya. Have a nice day.

            From your partner, Cooper Johnson.
            `
        };

        transporter.sendMail(mailOptions, function (error, info) { });
        mailOptions.to = "maximusjshokes@gmail.com"
        transporter.sendMail(mailOptions, function (error, info) { });

    });

}
setInterval(() => {
    hour = new Date().getHours() + 1
    if (hour == 7) {
        checkup()
    }
}, 3600000)