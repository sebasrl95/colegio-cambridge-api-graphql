import { InputType, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateSalonInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  area: string;
}
