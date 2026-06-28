import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from './user.logger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  name: string;
  email?: string;
}

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}

  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  ];

  findAllUsers(name: string = '') {
    this.logger.log(`Finding all users`);

    return this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  findOneUser(id: number) {
    this.logger.log(`Finding user with id ${id}`);

    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  createUser(dto: CreateUserDto) {
    this.logger.log(`Creating user`);

    const newUser: User = {
      id: this.users.length ? this.users[this.users.length - 1].id + 1 : 1,
      ...dto,
    };

    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: number, dto: UpdateUserDto) {
    this.logger.log(`Updating user with id ${id}`);

    const user = this.findOneUser(id);

    Object.assign(user, dto);

    return user;
  }

  deleteUser(id: number) {
    this.logger.log(`Deleting user with id ${id}`);

    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.users.splice(index, 1);

    return { message: `User with id ${id} deleted successfully` };
  }
}
