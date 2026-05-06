import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { CreateUserDTO } from 'src/user/dto/request/create-user.dto';
import { ReadUserData } from '../types/read-user-data';
import { UpdateUserDTO } from '../dto/request/update-user.dto';
import { UpdateUserData } from '../types/update-user-data';
import { UserDTO } from '../dto/response/user.dto';
import { CreateUserData } from '../types/create-user-data';

@Injectable()
export class UserMapper {
  constructor(
    private readonly sharedService: SharedService,
    private readonly bcryptService: BcryptService,
  ) {}

  async dtoToCreateData(dto: CreateUserDTO): Promise<CreateUserData> {
    return new CreateUserData({
      userId: this.sharedService.generateId(),
      ...dto,
      name: `${dto.firstName} ${dto.lastName}`,
      password: await this.bcryptService.hashPassword(dto.password),
    });
  }

  async dtoToUpdateData(
    user: ReadUserData,
    dto: UpdateUserDTO,
  ): Promise<UpdateUserData> {
    return new UpdateUserData({
      userId: user.userId,
      ...dto,
      password: dto.password
        ? await this.bcryptService.hashPassword(dto.password)
        : user.password,
    });
  }

  readDataToDTO(data: ReadUserData): UserDTO {
    return new UserDTO({ ...data });
  }
}
