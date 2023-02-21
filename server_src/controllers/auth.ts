import { User } from '../models/models';
import {userRepository} from '../repository/UserRepository'

export enum E_LOGIN_PROVIDERS {
    KAKAO = 1000,
    GOOGLE = 1001,
    TWITTER = 1002,
}

const providers = {
    1000 : "KAKAO",
    1001 : "GOOGLE",
    1002 : "TWITTER"
}

export async function DoSNSLogin(authId: string, provider: E_LOGIN_PROVIDERS) : Promise<{success: boolean, user?: User}>{
    const foundUser = await userRepository.getUserSNS({
        snsId: authId,
        provider: providers[provider]
    })
    if(foundUser){
        return {
            success: true,
            user: foundUser,
        }
    }
    return {
        success: false
    }
}

export async function DoSNSSignUp(firstName: string, lastName: string, userId: string, snsId: string, provider: E_LOGIN_PROVIDERS): Promise<{success: boolean, user?: User}>{
    try{
        console.log("provider: ", provider)
        const createdUser = await userRepository.createUser({
            firstName: firstName,
            lastName: lastName,
            userId: userId,
            snsId: snsId.toString(),
            provider: providers[provider],
        })
        if(createdUser) {
            return {
                success: true,
                user: createdUser
            }
        }
    }
    catch(e){
        //console.log(e)
    }

    return {
        success : false
    }
}
