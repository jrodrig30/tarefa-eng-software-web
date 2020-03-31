const port = 3000

const bodyParser = require('body-parser')
const express    = require('express')
const cors = require('cors')
const server     = express()
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '382734831473-m7hbiuad7ve6ihv20q8tmhqa53mrhcrp.apps.googleusercontent.com';
server.use(bodyParser.urlencoded({ extended: true}))
server.use(bodyParser.json())
server.use(cors())
server.use(function (req, res, next) {

    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.authorization,
                audience: CLIENT_ID
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            next();
        }catch (e) {
            console.log("Erro: ", e.toString())
            return res.sendStatus(401);
        }

    }


 verify().catch();



});

server.listen(process.env.PORT || port, function serverExec(params) {
    console.log('Listening on port ' + port);
})

module.exports = server
