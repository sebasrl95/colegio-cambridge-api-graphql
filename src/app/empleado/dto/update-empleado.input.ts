import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpleadoInput } from './create-empleado.input';
import {
  IsString,
  IsMongoId,
  IsNotEmpty,
  IsEnum,
  ValidateIf,
} from 'class-validator';
import { TipoEmpleado, TipoProfesor } from 'src/entities/empleado.schema';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateEmpleadoInput extends PartialType(CreateEmpleadoInput) {
  @Field({ nullable: true })
  @IsString()
  nombre?: string;

  @Field({ nullable: true })
  @IsString()
  documento?: string;

  @Field({ nullable: true })
  @IsMongoId()
  @IsNotEmpty()
  area?: string;

  @Field({ nullable: true })
  @IsMongoId()
  @IsNotEmpty()
  oficina?: string;

  @Field({ nullable: true })
  @IsEnum(TipoEmpleado)
  tipoEmpleado?: TipoEmpleado;

  @Field(() => TipoProfesor, { nullable: true })
  @ValidateIf(
    (empleado: CreateEmpleadoInput) =>
      empleado.tipoEmpleado === TipoEmpleado.profesor,
  )
  @IsEnum(TipoProfesor)
  tipoProfesor?: TipoProfesor;
}
