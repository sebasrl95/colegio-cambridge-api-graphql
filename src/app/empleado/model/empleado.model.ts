import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { AreaType } from 'src/app/area/model/area.model';
import { OficinaType } from 'src/app/oficina/model/oficina.model';
import { TipoEmpleado, TipoProfesor } from 'src/entities/empleado.schema';

registerEnumType(TipoEmpleado, { name: 'TipoEmpleado' });
registerEnumType(TipoProfesor, { name: 'TipoProfesor' });

@ObjectType()
export class EmpleadoType {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;

  @Field()
  documento: string;

  @Field(() => AreaType, { nullable: true })
  area: AreaType;

  @Field(() => OficinaType, { nullable: true })
  oficina: OficinaType;

  @Field(() => TipoEmpleado)
  tipoEmpleado: TipoEmpleado;

  @Field(() => TipoProfesor, { nullable: true })
  tipoProfesor?: TipoProfesor;
}
