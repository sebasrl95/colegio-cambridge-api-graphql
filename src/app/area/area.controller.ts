import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaInput } from './dto/create-area.input';
import { UpdateAreaInput } from './dto/update-area.input';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  create(@Body() createAreaInput: CreateAreaInput) {
    return this.areaService.create(createAreaInput);
  }

  @Get()
  findAll() {
    return this.areaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaInput: UpdateAreaInput) {
    return this.areaService.update(id, updateAreaInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areaService.remove(id);
  }
}
