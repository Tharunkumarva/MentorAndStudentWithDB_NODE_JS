const app = require('./index');
const config =require('./utils/config')
const {info} = require('./utils/logger')


app.listen(config.PORT,()=>{
    info(`server running on port ${config.PORT}`)
})