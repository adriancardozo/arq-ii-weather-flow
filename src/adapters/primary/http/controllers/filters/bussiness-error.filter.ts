import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { BussinessError } from 'src/bussiness/errors/bussiness.error';
import { UserAlreadyExistsError } from 'src/bussiness/errors/user-already-exists.error';

@Catch(BussinessError)
export class BussinessExceptionFilter implements ExceptionFilter {
  private readonly baseFilter: BaseExceptionFilter;

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    this.baseFilter = new BaseExceptionFilter(this.httpAdapterHost.httpAdapter);
  }

  catch(exception: BussinessError, host: ArgumentsHost) {
    try {
      if (exception instanceof UserAlreadyExistsError) throw new BadRequestException(exception.message);
      throw new InternalServerErrorException();
    } catch (error) {
      this.baseFilter.catch(error, host);
    }
  }
}
