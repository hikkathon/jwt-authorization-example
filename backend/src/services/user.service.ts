import { User } from '../generated/prisma';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
	constructor(private readonly userRepo: UserRepository) {}

	async getAllUsers() {
		return this.userRepo.findAllUsers();
	}

	async getByEmail(email: string) {
		return this.userRepo.getUserByEmail(email);
	}

	async create(email: string, passwordHash: string) {
		return this.userRepo.createUser(email, passwordHash);
	}

	async getByActivationLink(activationLink: string) {
		return this.userRepo.getUserByActivationLink(activationLink);
	}

	async update(userId: number, user: User) {
		return this.userRepo.updateUser(userId, user);
	}

	async getByUuId(userId: string) {
		return this.userRepo.getUserByUuId(userId);
	}
}
