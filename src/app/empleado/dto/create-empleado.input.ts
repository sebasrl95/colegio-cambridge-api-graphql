import { InputType, Field } from '@nestjs/graphql';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { TipoEmpleado, TipoProfesor } from 'src/entities/empleado.schema';

@InputType()
export class CreateEmpleadoInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  documento: string;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  area: string;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  oficina: string;

  @Field()
  @IsEnum(TipoEmpleado)
  tipoEmpleado: TipoEmpleado;

  @Field(() => TipoProfesor, { nullable: true })
  @ValidateIf(
    (empleado: CreateEmpleadoInput) =>
      empleado.tipoEmpleado === TipoEmpleado.profesor,
  )
  @IsEnum(TipoProfesor)
  tipoProfesor?: TipoProfesor;
}
