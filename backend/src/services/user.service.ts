import * as userModel from '../models/user.model'

export const getUsers = async () => {
    return userModel.getUsers();
}