import { PartialType } from '@nestjs/mapped-types';
import { CreateOficinaInput } from './create-oficina.input';
import { IsMongoId, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateOficinaInput extends PartialType(CreateOficinaInput) {
  @Field({ nullable: true })
  @IsString()
  codigo?: string;

  @Field({ nullable: true })
  @IsMongoId()
  area?: string;
}
