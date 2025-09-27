import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaDto } from './create-area.dto';
import { IsString } from 'class-validator';

export class UpdateAreaDto extends PartialType(CreateAreaDto) {
  @IsString()
  nombre?: string;
}
