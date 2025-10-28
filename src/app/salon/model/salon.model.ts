import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AreaType } from 'src/app/area/model/area.model';
@ObjectType()
export class SalonType {
  @Field(() => ID)
  id: string;

  @Field()
  codigo: string;

  @Field(() => AreaType, { nullable: true })
  area: AreaType;
}
