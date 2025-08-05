import { Injectable } from '@nestjs/common';
import { LoginInput } from '../dto/login-input';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  signToken(userId: string) {
    return jwt.sign({ id: userId }, 'this.privateKey');
  }

  verifyToken(token: string) {
    return jwt.verify(token, 'this.privateKey');
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(plainPassword: string, hashedPassword: string) {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    if (!match) {
      throw new Error('Invalid credentials');
    }
  }

  async login({ email, password }: LoginInput) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Invalid credentials');
    }

    const token = this.signToken(user.userId);

    return { token };
  }
}
