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
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { IdDto } from './dtos/id.dto';
import { IStationService } from 'src/bussiness/ports/input/services/i-station.service';
import { StationResponse } from './responses/station.response';
import { CreateStationDto } from './dtos/create-station.dto';
import { EditStationDto } from './dtos/edit-station.dto';

@Controller('station')
@UsePipes(VALIDATION_PIPE)
@UseFilters(BussinessExceptionFilter)
export class StationController {
  constructor(private readonly stationService: IStationService) {}

  @ApiOperation({ summary: 'Get all stations' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: StationResponse, isArray: true })
  @Get()
  async getAll(): Promise<Array<StationResponse>> {
    const stations = await this.stationService.getAll();
    return stations.map((station) => new StationResponse(station));
  }

  @ApiOperation({ summary: 'Get an station' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: StationResponse })
  @Get(':id')
  async getById(@Param() param: IdDto): Promise<StationResponse> {
    return new StationResponse(await this.stationService.getById(param.id));
  }

  @ApiOperation({ summary: 'Create an station' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateStationDto })
  @ApiOkResponse({ type: StationResponse })
  @Post()
  async create(@Body() dto: CreateStationDto): Promise<StationResponse> {
    return new StationResponse(await this.stationService.create(dto.toInput()));
  }

  @ApiOperation({ summary: 'Delete an station' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: StationResponse })
  @Delete(':id')
  async delete(@Param() param: IdDto): Promise<StationResponse> {
    return new StationResponse(await this.stationService.delete(param.id));
  }

  @ApiOperation({ summary: 'Edit an station' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: EditStationDto })
  @ApiOkResponse({ type: StationResponse })
  @Patch(':id')
  async edit(@Param() param: IdDto, @Body() dto: EditStationDto): Promise<StationResponse> {
    return new StationResponse(await this.stationService.edit(param.id, dto.toInput()));
  }
}
