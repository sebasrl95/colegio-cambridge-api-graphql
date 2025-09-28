import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OficinaService } from './oficina.service';
import { CreateOficinaInput } from './dto/create-oficina.input';
import { UpdateOficinaInput } from './dto/update-oficina.input';

@Controller('oficina')
export class OficinaController {
  constructor(private readonly oficinaService: OficinaService) {}

  @Post()
  create(@Body() createOficinaInput: CreateOficinaInput) {
    return this.oficinaService.create(createOficinaInput);
  }

  @Get()
  findAll() {
    return this.oficinaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oficinaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOficinaInput: UpdateOficinaInput,
  ) {
    return this.oficinaService.update(id, updateOficinaInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oficinaService.remove(id);
  }
}
