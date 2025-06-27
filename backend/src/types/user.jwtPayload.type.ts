import { User } from "../generated/prisma";

export type UserJWTPayload = Pick<User, 'id' | 'email' | 'isActivate'>;