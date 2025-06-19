import {User} from '../generated/prisma';
import {prisma} from '../config/database';
import ApiError from "../exceptions/api.error";

export const createUser = async (email: string, password_hash: string): Promise<User> => {
    return prisma.user.create({
        data: {email, password_hash},
    });
};

export const getUsers = async (): Promise<User[]> => {
    return prisma.user.findMany();
};

export const getUserById = async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({where: {id}});
};

export const getUserByUuId = async (uuid: string): Promise<User | null> => {
    return prisma.user.findUnique({where: {uuid}});
};

export const getUserByActivationLink = async (activate_link: string): Promise<User | null> => {
    return prisma.user.findUnique({where: {activate_link}});
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({where: {email}});
};

export const updateUser = async (id: number, data: User): Promise<User> => {
    return prisma.user.update({
        where: {id},
        data: data,
    });
};

export const deleteUser = async (id: number): Promise<User> => {
    return prisma.user.delete({where: {id}});
};