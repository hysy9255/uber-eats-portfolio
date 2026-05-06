import { Injectable } from '@nestjs/common';
import { DeleteUserDTO } from '../dto/request/delete-user.dto';
import { UserRepository } from '../repository/user.repository';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UserDTO } from '../dto/response/user.dto';
import { CheckEmailAvailabilityResponseDTO } from '../dto/response/check-email-availability.response.dto';
import { UpdateUserDTO } from '../dto/request/update-user.dto';
import { UpdatePasswordDTO } from '../dto/request/update-password.dto';
import { CheckEmailAvailabilityQueryDTO } from '../dto/request/check-email-availability.query.dto';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userMapper: UserMapper,
    private readonly bcryptService: BcryptService,
  ) {}

  async checkEmailAvailability(
    dto: CheckEmailAvailabilityQueryDTO,
  ): Promise<CheckEmailAvailabilityResponseDTO> {
    const user = await this.userRepo.findOneByEmail(dto.email);
    const response = new CheckEmailAvailabilityResponseDTO();
    response.available = !user;
    return response;
  }

  async getUser(userId: string): Promise<UserDTO> {
    const user = await this.userRepo.findOneById(userId);
    if (!user) throw new Error('User Not found');
    return this.userMapper.readDataToDTO(user);
  }

  async updateUser(userId: string, dto: UpdateUserDTO) {
    const user = await this.userRepo.findOneById(userId);
    if (!user) throw new Error('User Not found');
    const updateUserData = await this.userMapper.dtoToUpdateData(user, dto);
    await this.userRepo.updateUser(updateUserData);
  }

  async updatePassword(userId: string, dto: UpdatePasswordDTO) {
    const user = await this.userRepo.findOneById(userId);
    if (!user) throw new Error('User Not found');
    await this.bcryptService.comparePassword(dto.password, user.password);
    const password = await this.bcryptService.hashPassword(dto.newPassword);
    const updateUserData = await this.userMapper.dtoToUpdateData(user, {
      password,
    });
    await this.userRepo.updateUser(updateUserData);
  }

  async deleteMe(userId: string, dto: DeleteUserDTO) {
    const user = await this.userRepo.findOneById(userId);
    if (!user) throw new Error('User Not found');
    await this.bcryptService.comparePassword(dto.password, user.password);
    await this.userRepo.deleteUser(userId);
  }
}
