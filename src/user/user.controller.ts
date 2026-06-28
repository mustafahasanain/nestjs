import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  Post,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

// @Get('all')          // GET /user/all
// @Get(':id')          // GET /user/ : id - dynamic segment
// @Post()              // POST /user
// @Put(':id')          // PUT /user/:id
// @Delete(':id')       // DELETE /user/:id

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(@Query('name') name?: string): unknown {
    return this.userService.findAllUsers(name);

    // const users = [
    //   { id: 1, name: 'John Doe' },
    //   { id: 2, name: 'Jane Smith' },
    // ];

    // if (name) {
    //   return users.filter((user) =>
    //     user.name.toLowerCase().includes(name.toLowerCase()),
    //   );
    // }

    // return users;
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneUser(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
