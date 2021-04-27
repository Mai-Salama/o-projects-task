import { Router } from 'express'
import { validationResult } from 'express-validator'
import { AdminService } from '../services/admin.service'
import { AdminAddModel, Admin } from '../models/admins'



export const userRouter = Router()
const userService = new AdminService()

userRouter.post('/register', (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(422).json(errors.array())
    const email = req.body.email
    const password = req.body.password
    const role = req.body.role
    //const payload = matchedData({email, password, role}) as AdminAddModel
    const user = userService.register({email,password,role})

    return user
})

userRouter.post('/login', (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty())
        return res.status(422).json(errors.array())
    
    const email = req.body.email
    const password = req.body.password
    const role = "Admin"
    //const payload = matchedData({email}) as AdminAddModel
    const token = userService.login({email, password,role})
    res.header('token', token)
    console.log("set the header")
    return token.then(t => res.json(t))
})