import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtService } from 'src/jwt/jwt.service';
import { LoginRequestDTO } from 'src/auth/dto/login.request.dto';
import { LoginResponseDTO } from 'src/auth/dto/login.response.dto';
import { UserInternalService } from 'src/user/service/user.internal.service';

@Injectable()
export class AuthExternalService {
  constructor(
    private readonly userInternalService: UserInternalService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  // done
  async login(dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    try {
      const user = await this.userInternalService.getByEmail(dto.email);
      await this.bcryptService.comparePassword(dto.password, user.password);
      const token = this.jwtService.signToken(user.userId, user.role);
      const response = new LoginResponseDTO({ token, role: user.role });
      return response;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
