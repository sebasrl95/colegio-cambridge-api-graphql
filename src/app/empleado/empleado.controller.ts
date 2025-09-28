import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoInput } from './dto/create-empleado.input';
import { UpdateEmpleadoInput } from './dto/update-empleado.input';

@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Post()
  create(@Body() createEmpleadoInput: CreateEmpleadoInput) {
    return this.empleadoService.create(createEmpleadoInput);
  }

  @Get()
  findAll() {
    return this.empleadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleadoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmpleadoInput: UpdateEmpleadoInput,
  ) {
    return this.empleadoService.update(id, updateEmpleadoInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empleadoService.remove(id);
  }
}
