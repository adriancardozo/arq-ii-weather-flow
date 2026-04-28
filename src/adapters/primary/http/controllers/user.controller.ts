import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { VALIDATION_PIPE } from 'src/infrastructure/validation/validation.pipe';
import { BussinessExceptionFilter } from './filters/bussiness-error.filter';
import { IUserService } from 'src/bussiness/ports/input/services/i-user.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserResponse } from './responses/user.response';
import { EditUserDto } from './dtos/edit-user.dto';
import { RegisterDto } from './dtos/register.dto';
import { IdDto } from './dtos/id.dto';

@Controller('user')
@UsePipes(VALIDATION_PIPE)
@UseFilters(BussinessExceptionFilter)
export class UserController {
  constructor(private readonly userService: IUserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserResponse })
  @Get()
  async getAll(): Promise<Array<UserResponse>> {
    const users = await this.userService.getAll();
    return users.map((user) => new UserResponse(user));
  }

  @ApiOperation({ summary: 'Get an user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserResponse })
  @Get(':id')
  async getById(@Param() param: IdDto): Promise<UserResponse> {
    return new UserResponse(await this.userService.getById(param.id));
  }

  @ApiOperation({ summary: 'Create an user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ type: UserResponse })
  @Post()
  async create(@Body() createUserDto: RegisterDto): Promise<UserResponse> {
    return new UserResponse(await this.userService.create(createUserDto.toInput()));
  }

  @ApiOperation({ summary: 'Delete an user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserResponse })
  @Delete(':id')
  async delete(@Param() param: IdDto): Promise<UserResponse> {
    return new UserResponse(await this.userService.delete(param.id));
  }

  @ApiOperation({ summary: 'Edit an user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: EditUserDto })
  @ApiOkResponse({ type: UserResponse })
  @Patch(':id')
  async edit(@Param() param: IdDto, @Body() dto: EditUserDto): Promise<UserResponse> {
    return new UserResponse(await this.userService.edit(param.id, dto.toInput()));
  }
}
