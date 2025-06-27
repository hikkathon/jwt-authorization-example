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

	async getActivationLink(link: string) {
		return this.userRepo.getUserActivationLink(link);
	}

	async create(email: string, passwordHash: string) {
		return this.userRepo.createUser(email, passwordHash);
	}

	async update(userId: number, user: User) {
		return this.userRepo.updateUser(userId, user);
	}
}
