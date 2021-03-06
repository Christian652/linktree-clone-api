import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { OperationLogsService } from './operationLogs.service';
import { Log } from './log.entity';
import { LogFiltersDto } from './dto/logFilters.dto';

@Controller('logs')
export class OperationLogsController {
  constructor(private operationLogsService: OperationLogsService) { }

  @Get()
  public async getOperationLogs(@Query() params: LogFiltersDto): Promise<Log[]> {
    const operationLogs = await this.operationLogsService.getAll(params);
    return operationLogs;
  }

  // @Get('/homeless')
  // public async getHomelessLogs(): Promise<Log[]> {
  //   const operationLogs = await this.operationLogsService.getHomelessLogs(params);
  //   return operationLogs;
  // }

  // @Get('/beneficiary')
  // public async getBeneficiaryLogs(): Promise<Log[]> {
  //   const operationLogs = await this.operationLogsService.getBeneficiaryLogs(params);
  //   return operationLogs;
  // }

  @Get(':id')
  public async getById(@Body('id', ParseIntPipe) id) {
    return await this.operationLogsService.findById(id);
  }
}
