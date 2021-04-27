import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as Bluebird from 'Bluebird'
import { Admin, AdminAddModel, AdminViewModel } from '../models/admins'

export class AdminService {
    private readonly _saltRounds = 12
    private readonly _jwtSecret = 'jwtSecret'

    static get adminAttributes() {
        return ['id', 'email', 'role']
    }
    private static _admin
    static get admin() {
        return AdminService._admin
    }

    register({ email, password, role} : AdminAddModel) {
        console.log("got into register AdminService")
        console.log({email, password, role})
        bcrypt.hash(password, this._saltRounds)
            .then(hash => {
                return Admin.create({ email, password: hash , role})
                    .then(u => console.log("success")) 
                        //=> this.getAdminById(u!.id))
            })
    }

    login({ email, password, role }: AdminAddModel) {
        console.log(email)
        return Admin.findOne({ where: { email } }).then(u => {
            const { id, email } = u!
            console.log("comparing passwords")
            bcrypt.compare(password, u.password, function(err,res){
                if(err){
                    console.log("wrong password")
                    return
                }
                else{
                    console.log("correct password!")
                }
            })
            return { token: jwt.sign({ id, email, role }, this._jwtSecret) }
        })
    }

    verifyToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this._jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(false)
                    return
                }

                //AdminService._admin = Admin.findById(decoded['id'])
                //resolve(true)
                return
            })
        }) as Promise<boolean>
    }

    getAdminById(id: number) {
        console.log("problem here")
        return Admin.findById(id, {
            attributes: AdminService.adminAttributes
        }) as Bluebird<AdminViewModel>
    }
}