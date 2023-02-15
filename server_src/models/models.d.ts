import {Prisma, User, Post} from '@prisma/client'

declare type UserCreateInput = Prisma.UserCreateInput
declare type PostCreateInput = Prisma.PostCreateInput
declare type PostCreateDto = {
    userId: string,
    content: string,
}
declare type User = User
declare type Post = Post
