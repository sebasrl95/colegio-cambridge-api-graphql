import { IsNotEmpty, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAreaInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
