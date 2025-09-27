import { PartialType } from '@nestjs/mapped-types';
import { CreateSalonDto } from './create-salon.dto';
import { IsString, IsMongoId } from 'class-validator';

export class UpdateSalonDto extends PartialType(CreateSalonDto) {
  @IsString()
  codigo?: string;

  @IsMongoId()
  area?: string;
}
