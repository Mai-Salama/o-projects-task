import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as Bluebird from 'Bluebird'
import { VenueAdmin, VenueAdminLoginModel, VenueAdminAddModel, VenueAdminViewModel } from '../models/venueAdmins'

export class VenueAdminService {
    private readonly _saltRounds = 12
    private readonly _jwtSecret = 'jwtSecret'

    static get adminAttributes() {
        return ['id', 'email', 'role', 'name', 'mobile_number', 'venue_name', 'profile_picture']
    }
    private static _venueadmin
    static get venueadmin() {
        return VenueAdminService._venueadmin
    }

    register({ email, password, role, name, mobile_number, venue_name, profile_picture, admin_header} : VenueAdminAddModel) {
        console.log("got into register AdminService")
        // check token
        const verified = jwt.verify(admin_header, this._jwtSecret)
        console.log(verified['role'])
        if(verified['role'] == "Admin"){
            console.log("Admin access")
        }
        else{
            console.log("Deny access")
        }
        //console.log({email, password, role, name, mobile_number, venue_name, profile_picture})
        bcrypt.hash(password, this._saltRounds)
            .then(hash => {
                return VenueAdmin.create({ email, password: hash , role, name, mobile_number, venue_name, profile_picture})
                    .then(u => console.log("success")) 
                        //=> this.getAdminById(u!.id))
            })
    }

    login({ email, password }: VenueAdminLoginModel) {
        console.log(email)
        return VenueAdmin.findOne({ where: { email } }).then(u => {
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
            return { token: jwt.sign({ id, email }, this._jwtSecret) }
        })
    }

    verifyToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this._jwtSecret, (err, decoded) => {
                if (err) {
                    resolve(false)
                    return
                }

                VenueAdminService._venueadmin = VenueAdmin.findById(decoded['id'])
                resolve(true)
                return
            })
        }) as Promise<boolean>
    }

    getAdminById(id: number) {
        return VenueAdmin.findById(id, {
            attributes: VenueAdminService.adminAttributes
        }) as Bluebird<VenueAdminViewModel>
    }
}