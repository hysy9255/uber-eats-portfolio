import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtService } from 'src/jwt/jwt.service';
import { LoginRequestDTO } from 'src/auth/dto/login.request.dto';
import { LoginResponseDTO } from 'src/auth/dto/login.response.dto';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async login(dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    try {
      const user = await this.userRepository.findOneByEmail(dto.email);
      if (!user) throw new Error('User Not found');
      await this.bcryptService.comparePassword(dto.password, user.password);
      const token = this.jwtService.signToken(user.userId, user.role);
      return new LoginResponseDTO({ token, role: user.role });
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
