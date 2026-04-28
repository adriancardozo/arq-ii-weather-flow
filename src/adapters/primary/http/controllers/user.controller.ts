import { Body, Controller, Delete, Patch, Request, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { VALIDATION_PIPE } from 'src/infrastructure/validation/validation.pipe';
import { BussinessExceptionFilter } from './filters/bussiness-error.filter';
import { IUserService } from 'src/bussiness/ports/input/services/i-user.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserResponse } from './responses/user.response';
import type { UserRequest } from './types/user-request.type';
import { EditUserDto } from './dtos/edit-user.dto';

@Controller('user')
@UsePipes(VALIDATION_PIPE)
@UseFilters(BussinessExceptionFilter)
export class UserController {
  constructor(private readonly userService: IUserService) {}

  @ApiOperation({ summary: ' Edit user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: EditUserDto })
  @ApiOkResponse({ type: UserResponse })
  @Patch()
  async edit(@Request() { user }: UserRequest, @Body() editDto: EditUserDto) {
    return new UserResponse(await this.userService.edit(user.id, editDto.toInput()));
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserResponse })
  @Delete()
  async delete(@Request() { user }: UserRequest) {
    return new UserResponse(await this.userService.delete(user.id));
  }
}
