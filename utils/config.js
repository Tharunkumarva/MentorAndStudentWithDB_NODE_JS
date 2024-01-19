require('dotenv').config();

const MOGODB_URI =process.env.MOGODB_URI
const PORT = process.env.PORT

module.exports ={
    MOGODB_URI,
    PORT
}