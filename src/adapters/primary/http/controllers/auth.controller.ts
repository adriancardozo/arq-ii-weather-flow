import { Body, Controller, Post, UseFilters, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { TokenResponse } from './responses/token.response';
import { RegisterDto } from './dtos/register.dto';
import { IAuthService } from 'src/bussiness/ports/input/services/i-auth.service';
import { VALIDATION_PIPE } from 'src/infrastructure/validation/validation.pipe';
import { BussinessExceptionFilter } from './filters/bussiness-error.filter';

@Controller('auth')
@UsePipes(VALIDATION_PIPE)
@UseFilters(BussinessExceptionFilter)
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  @ApiOperation({ summary: 'Register' })
  @ApiOkResponse({ type: TokenResponse })
  @ApiBody({ type: RegisterDto })
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<TokenResponse> {
    return new TokenResponse(await this.authService.register(registerDto.toInput()));
  }
}
