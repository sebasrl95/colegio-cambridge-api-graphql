import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Response successfully from the status of API',
  })
  getRunningMessage(): { status: string; message: string } {
    return this.appService.getRunningMessage();
  }
}
