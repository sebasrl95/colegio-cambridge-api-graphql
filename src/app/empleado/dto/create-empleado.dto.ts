import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { TipoEmpleado, TipoProfesor } from 'src/entities/empleado.schema';

export class CreateEmpleadoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsMongoId()
  @IsNotEmpty()
  area: string;

  @IsMongoId()
  @IsNotEmpty()
  oficina: string;

  @IsEnum(TipoEmpleado)
  tipoEmpleado: TipoEmpleado;

  @ValidateIf(
    (empleado: CreateEmpleadoDto) =>
      empleado.tipoEmpleado === TipoEmpleado.PROFESOR,
  )
  @IsEnum(TipoProfesor)
  tipoProfesor?: TipoProfesor;
}
