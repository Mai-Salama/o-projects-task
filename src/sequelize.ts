const dbConfig = require("./db.config")
const Sequelize = require('sequelize')


export const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: "mysql",
    host: dbConfig.HOST,
    port:3306,
    logging: false,
    pool:{
        max: dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// sequelize.query("CREATE DATABASE `<expressapp>`;").then(data => {
//     console.log("database created successfully")
// }).catch(err =>{
//     console.error("error creating the database", err)
// })

sequelize.authenticate().then(()=>{
    console.log("database connected")
}).catch(err =>{
    console.error("error ya Mai", err)
})