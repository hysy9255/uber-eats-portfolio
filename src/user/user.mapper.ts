import { Injectable } from '@nestjs/common';
import { AddUserData } from 'src/user/types/add-user-data';
import { SharedService } from 'src/shared/shared.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { ReadUserData } from './types/read-user-data';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdateUserData } from './types/update-user-data';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserMapper {
  constructor(
    private readonly sharedService: SharedService,
    private readonly bcryptService: BcryptService,
  ) {}

  async createUserRequestDtoToAddUserData(
    dto: CreateUserDTO,
  ): Promise<AddUserData> {
    const cud = new AddUserData();
    cud.userId = this.sharedService.generateId();
    cud.email = dto.email;
    cud.password = await this.bcryptService.hashPassword(dto.password);
    cud.role = dto.role;
    cud.name = `${dto.firstName} ${dto.lastName}`;
    cud.phoneNumber = dto.phoneNumber;
    cud.profileImgUrl = dto.profileImgUrl;

    return cud;
  }

  updateUser(user: ReadUserData, dto: UpdateUserDTO): UpdateUserData {
    const uud = new UpdateUserData();
    uud.userId = user.userId;
    uud.email = dto.email ?? user.email;
    uud.name = dto.firstName ?? user.name;
    uud.password = dto.password ?? user.password;
    uud.phoneNumber = dto.phoneNumber ?? user.phoneNumber;
    uud.profileImgUrl = dto.profileImgUrl ?? user.profileImgUrl;
    uud.role = dto.role ?? user.role;

    return uud;
  }

  readUserDataToUserResponseDto(user: ReadUserData): UserDTO {
    const urd = new UserDTO();
    urd.userId = user.userId;
    urd.email = user.email;
    urd.name = user.name;
    urd.phoneNumber = user.phoneNumber;
    urd.profileImgUrl = user.profileImgUrl;
    urd.role = user.role;

    return urd;
  }
}
