import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as Bluebird from 'Bluebird'
import { TravelAgencyAdmin, TravelAgencyAdminLoginModel, TravelAgencyAdminAddModel, TravelAgencyAdminViewModel } from '../models/travelAgencyAdmin'

export class TravelAgencyAdminService {
    private readonly _saltRounds = 12
    private readonly _jwtSecret = 'jwtSecret'

    static get adminAttributes() {
        return ['id', 'email', 'role', 'name', 'travel_agency_name','mobile_number','license','provisions','about',
        'rating','address','location','mobile_number1','mobile_number2','email1','email2','website','whatsapp','facebook',
        'instagram','logo','profile_picture','payment_method']
    }
    private static _travelagencyadmin
    static get travelagencyadmin() {
        return TravelAgencyAdminService._travelagencyadmin
    }

    register({ email, password, role, name, travel_agency_name,mobile_number,license,provisions,about,
    rating,address,location,mobile_number1,mobile_number2,email1,email2,website,whatsapp,facebook,
    instagram,logo,profile_picture,payment_method} : TravelAgencyAdminAddModel) {
        console.log("got into register AdminService")
        bcrypt.hash(password, this._saltRounds)
            .then(hash => {
                return TravelAgencyAdmin.create({ email, password: hash , role, name, travel_agency_name,mobile_number,license,provisions,about,
                    rating,address,location,mobile_number1,mobile_number2,email1,email2,website,whatsapp,facebook,
                    instagram,logo,profile_picture,payment_method})
                    .then(u => console.log("success")) 
                        //=> this.getAdminById(u!.id))
            })
    }

    login({ email, password }: TravelAgencyAdminLoginModel) {
        console.log(email)
        return TravelAgencyAdmin.findOne({ where: { email } }).then(u => {
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

                TravelAgencyAdminService._travelagencyadmin = TravelAgencyAdmin.findById(decoded['id'])
                resolve(true)
                return
            })
        }) as Promise<boolean>
    }

    getAdminById(id: number) {
        return TravelAgencyAdmin.findById(id, {
            attributes: TravelAgencyAdminService.adminAttributes
        }) as Bluebird<TravelAgencyAdminViewModel>
    }
}