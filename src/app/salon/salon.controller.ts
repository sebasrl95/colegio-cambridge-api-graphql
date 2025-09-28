import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalonService } from './salon.service';
import { CreateSalonInput } from './dto/create-salon.input';
import { UpdateSalonInput } from './dto/update-salon.input';

@Controller('salon')
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  @Post()
  create(@Body() createSalonInput: CreateSalonInput) {
    return this.salonService.create(createSalonInput);
  }

  @Get()
  findAll() {
    return this.salonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salonService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalonDto: UpdateSalonInput) {
    return this.salonService.update(id, updateSalonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salonService.remove(id);
  }
}
