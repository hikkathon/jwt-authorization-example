import { prisma } from '../config/database';
import { User } from '../generated/prisma';

export class UserRepository {
	async findAllUsers(): Promise<User[]> {
		return prisma.user.findMany();
	}

	async createUser(email: string, password: string): Promise<User> {
		return prisma.user.create({
			data: { email, password },
		});
	}

	async getUserById(id: number): Promise<User | null> {
		return prisma.user.findUnique({ where: { id } });
	}

	async getUserByEmail(email: string): Promise<User | null> {
		return prisma.user.findUnique({ where: { email } });
	}

	async getUserActivationLink(link: string): Promise<User | null> {
		return prisma.user.findUnique({ where: { activateLink: link } });
	}

	async updateUser(id: number, data: User): Promise<User> {
		return prisma.user.update({
			where: { id },
			data: data,
		});
	}
	async deleteUser(id: number): Promise<User> {
		return prisma.user.delete({ where: { id } });
	}
}
