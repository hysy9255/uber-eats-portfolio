import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
  async comparePassword(plainPassword: string, hashedPassword: string) {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    if (!match) {
      throw new HttpException(
        { message: 'Incorrect Password' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
