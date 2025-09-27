import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateSalonDto {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsMongoId()
  @IsNotEmpty()
  area: string;
}
