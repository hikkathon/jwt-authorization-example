import {ActivateLink} from '../generated/prisma';
import {prisma} from '../config/database';

export const createLink = async (user_uuid: string): Promise<ActivateLink> => {
    return prisma.activateLink.create({
        data: {user_uuid},
    });
};

export const getLinkById = async (user_uuid: string): Promise<ActivateLink | null> => {
    return prisma.activateLink.findUnique({where: {user_uuid}});
};

export const deleteLink = async (user_uuid: string): Promise<ActivateLink> => {
    return prisma.activateLink.delete({where: {user_uuid}});
};