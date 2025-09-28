import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AreaType } from 'src/app/area/model/area.model';
import { EmpleadoType } from 'src/app/empleado/model/empleado.model';

@ObjectType()
export class OficinaType {
  @Field(() => ID)
  id: string;

  @Field()
  codigo: string;

  @Field(() => AreaType)
  area: AreaType;

  @Field(() => [EmpleadoType])
  empleados: EmpleadoType[];
}
