import { Injectable } from '@nestjs/common';
import { DeleteUserDTO } from '../dto/delete-user.dto';
import { UserRepository } from '../repository/user.repository';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UserDTO } from '../dto/user.dto';
import { CheckEmailAvailabilityResponseDTO } from '../dto/availability/check-email-availability.response.dto';
import { UserMapper } from '../user.mapper';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UpdatePasswordDTO } from '../dto/update-password.dto';
import { CheckEmailAvailabilityQueryDTO } from '../dto/availability/check-email-availability.query.dto';

@Injectable()
export class UserExternalService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
    private readonly bcryptService: BcryptService,
  ) {}

  // done
  async checkEmailAvailability(
    dto: CheckEmailAvailabilityQueryDTO,
  ): Promise<CheckEmailAvailabilityResponseDTO> {
    const exists = await this.userRepository.existsByEmail(dto.email);
    const response = new CheckEmailAvailabilityResponseDTO();
    response.available = !exists;
    return response;
  }

  // done
  async getUser(userId: string): Promise<UserDTO> {
    const user = await this.userRepository.getUserById(userId);
    const response = this.userMapper.readUserDataToUserResponseDto(user);
    return response;
  }

  // done
  async updateUser(userId: string, dto: UpdateUserDTO) {
    const user = await this.userRepository.getUserById(userId);
    const updateUserData = this.userMapper.updateUser(user, dto);
    await this.userRepository.updateUser(updateUserData);
  }

  // done
  async updatePassword(userId: string, dto: UpdatePasswordDTO) {
    const user = await this.userRepository.getUserById(userId);
    await this.bcryptService.comparePassword(dto.password, user.password);
    const password = await this.bcryptService.hashPassword(dto.newPassword);
    const updateUserData = this.userMapper.updateUser(user, { password });
    await this.userRepository.updateUser(updateUserData);
  }

  // done
  async deleteMe(userId: string, dto: DeleteUserDTO) {
    const user = await this.userRepository.getUserById(userId);
    await this.bcryptService.comparePassword(dto.password, user.password);
    await this.userRepository.deleteUser(userId);
  }
}
