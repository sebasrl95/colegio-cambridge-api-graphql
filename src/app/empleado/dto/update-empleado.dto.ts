import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpleadoDto } from './create-empleado.dto';
import {
  IsString,
  IsMongoId,
  IsNotEmpty,
  IsEnum,
  ValidateIf,
} from 'class-validator';
import { TipoEmpleado, TipoProfesor } from 'src/entities/empleado.schema';

export class UpdateEmpleadoDto extends PartialType(CreateEmpleadoDto) {
  @IsString()
  nombre?: string;

  @IsString()
  documento?: string;

  @IsMongoId()
  @IsNotEmpty()
  area?: string;

  @IsMongoId()
  @IsNotEmpty()
  oficina?: string;

  @IsEnum(TipoEmpleado)
  tipoEmpleado?: TipoEmpleado;

  @ValidateIf(
    (empleado: CreateEmpleadoDto) =>
      empleado.tipoEmpleado === TipoEmpleado.PROFESOR,
  )
  @IsEnum(TipoProfesor)
  tipoProfesor?: TipoProfesor;
}
