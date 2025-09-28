import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaInput } from './create-area.input';
import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAreaInput extends PartialType(CreateAreaInput) {
  @Field({ nullable: true })
  @IsString()
  nombre?: string;
}
