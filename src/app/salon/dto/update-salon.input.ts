import { PartialType } from '@nestjs/mapped-types';
import { CreateSalonInput } from './create-salon.input';
import { IsString, IsMongoId } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateSalonInput extends PartialType(CreateSalonInput) {
  @Field({ nullable: true })
  @IsString()
  codigo?: string;

  @Field({ nullable: true })
  @IsMongoId()
  area?: string;
}
