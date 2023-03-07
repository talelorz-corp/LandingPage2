import { AgeRange } from "@prisma/client";
import { userRepository } from "../repository/UserRepository"

export async function updateProfile(
    userId: string, 
    data: {
        gender?: number, lastName?: string, firstName?: string,
        ageRange?: AgeRange, job?: string
    }){
        try{
            await userRepository.updateProfile(userId, data)
        } catch(e){
            throw e
        }
    }