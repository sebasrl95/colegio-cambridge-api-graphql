import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class AreaType {
  @Field(() => ID)
  id: string;

  @Field()
  nombre: string;
}
