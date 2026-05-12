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
        { message: '입력하신 기존 비밀번호가 틀립니다' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
