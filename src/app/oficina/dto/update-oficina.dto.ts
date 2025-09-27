import { PartialType } from '@nestjs/mapped-types';
import { CreateOficinaDto } from './create-oficina.dto';
import { IsMongoId, IsString } from 'class-validator';

export class UpdateOficinaDto extends PartialType(CreateOficinaDto) {
  @IsString()
  codigo?: string;

  @IsMongoId()
  area?: string;
}
