const router =  require('express').Router()

const todoRouter= require('./todo.route.js')

router.use('/todo', todoRouter)

module.exports=router