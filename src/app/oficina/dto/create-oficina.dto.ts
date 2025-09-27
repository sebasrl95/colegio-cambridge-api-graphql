import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateOficinaDto {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsMongoId()
  @IsNotEmpty()
  area: string;
}
