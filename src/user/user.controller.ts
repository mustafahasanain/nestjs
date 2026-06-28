import { Controller, Get, Query, Param, Body, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// @Get('all')          // GET /user/all
// @Get(':id')          // GET /user/ : id - dynamic segment
// @Post()              // POST /user
// @Put(':id')          // PUT /user/:id
// @Delete(':id')       // DELETE /user/:id

@Controller('user')
export class UserController {
  @Get()
  getUser(@Query('name') name?: string) {
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];

    if (name) {
      return users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    return users;
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return { id, name: 'John Doe' };
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return { data: createUserDto, message: 'User created successfully' };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return {
      id,
      data: { ...updateUserDto },
      message: 'User updated successfully',
    };
  }
}
