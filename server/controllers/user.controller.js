const User = require('../model/user');
const bcrypt = require('bcryptjs');
const UserService = require('../service/http.service');
const config = require("../config");
const jwt = require("jsonwebtoken");
const QRCode = require('qrcode');

class UserController {

    static async getQrCode(_req, res) {
        try {
            let info = {
                id: 1,
                name: "John Doe",
                email: "johndoeAllPrime@gmail.com"
            }
            let stringdata = JSON.stringify(info)
            let QRCodeOnCodeForImage = await QRCode.toDataURL(stringdata)
            return res.json({
                code: QRCodeOnCodeForImage
            })
       } catch (error) {
            return console.log(error);
        }
    }

    static async createUser(req, res) {
        try {
            const { name, email, password, phone, address } = req.body
            if(!name && !email && !password && !phone && !address) {
                return res.status(401).json({
                    message: 'INVALID'
                });
            }
            else {
                let hashedPassword = bcrypt.hashSync(password, 10);
                const info = await UserService.post(req.body, User);
                info.password = hashedPassword;
                await info.save();
                return res.status(201).json({
                    info: info,
                    message: "created"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async loginUser(req, res) {
        try {
           if(!req.body.email && !req.body.password) {
               res.status(400).json({
                   message: 'Please enter your credentials'
               })
           }
           else {
               const info = await User.findOne({email:req.body.email })
               if(!info) {
                   res.status(400).json({
                       message: 'Invalid email or password',
                       code: 'NOT_FOUND_ERROR'
                   })
               }
               else {
                   const passwordIsValid = bcrypt.compareSync(req.body.password, info.password)
                   if(!passwordIsValid){
                       res.status(400).json({
                           message: 'Invalid email or password',
                           code: 'NOT_FOUND_ERROR'
                       })
                   }
                   
                   else {
                       const token = await jwt.sign({id:info.id, email:info.email, name:info.name}, config.secret);
                       let stringdata = JSON.stringify(info)
                       let QRCodeOnCodeForImage = await QRCode.toDataURL(stringdata)
                       res.status(200).json({
                           message: 'successful',
                           info: info,
                           token: token,
                           id: info.id,
                           code: 'OK',
                           qrcode: QRCodeOnCodeForImage
                       });
                   }
                   
               }
           }
        } catch (error) {
            return error
        }
    } 

    static async getUsers(_req, res) {
        try {
            const info = await UserService.get(User);
            return res.status(200).json({
                info: info
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getUser(req, res) {
        try {
            let { id } = req.params
            const info = await UserService.get(User, id);
            if(!info) {
                return res.status(404).json({
                    message: "Not found"
                })
            }
            return res.status(200).json({
                info: info
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteUser(req, res) {
        try {
            let { id } = req.params
            const info = await UserService.delete(User, id);
            if(!info) {
                return res.status(404).json({
                    message: "Not found"
                })
            }
            return res.status(200).json({
                info: info
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async updateUser(req, res) {
        let { id } = req.params
        const info = await UserService.put(User, id);
        try {
            if(!info) {
                return res.status(404).json({
                    message: "Not found"
                })
            }
            info.name = req.body.name || info.name
            info.email = req.body.email || info.email
            info.address = req.body.address || info.address
            info.phone = req.body.phone || info.phone
            await info.save()
            return res.status(200).json({
                info: info
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserController;

