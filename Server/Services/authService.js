import bcrypt from "bcryptjs"
import UserModel from "../Models/userModels.js"
import { GraphQLError } from "graphql"
import jwt from "jsonwebtoken"
export const register = async (_, args) => {
    try{
        const {email} = args
        const isThere = await UserModel.findOne({email})
        
        if (isThere){
            throw new GraphQLError("User already exits")
        }
        const {password} = args
        const singnedPass = await encrypt(password)

        const user = new UserModel({
            ...args,
            password: singnedPass
        })
        await user.save()
        const token = jwt.sign({
            email: args.email,
            userName: args.userName,
            password: args.password
        }, process.env.JWT_TOKEN)
        return {
            token
        }
    }catch (error){
        throw new GraphQLError(error.message)
    }
}


export const login = async (_, args) => {
    try {
        const { email, password } = args
        const isThere = await UserModel.findOne({ email });
        if (!isThere) {
            throw new GraphQLError("User is not exists")
        }
        
        const isPasswordCorrect = bcrypt.compareSync(password, isThere.password)
        if (!isPasswordCorrect) {
            throw new GraphQLError("Wrong Credentials")
        }
        const token = jwt.sign({
            email: isThere.email,
            userName: isThere.userName
        }, process.env.JWT_TOKEN)
        return {
            token
        }
    } catch (error) {
        
        throw new GraphQLError(error.message)
    }
}
const encrypt = async (password) => {
    const hashSalt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, hashSalt)
}