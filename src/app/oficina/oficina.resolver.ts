import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { OficinaService } from './oficina.service';
import { OficinaType } from './model/oficina.model';
import { CreateOficinaInput } from './dto/create-oficina.input';
import { UpdateOficinaInput } from './dto/update-oficina.input';

@Resolver(() => OficinaType)
export class OficinaResolver {
  constructor(private readonly oficinaService: OficinaService) {}

  @Query(() => [OficinaType])
  async oficinas() {
    return this.oficinaService.findAll();
  }

  @Query(() => OficinaType)
  async oficina(@Args('id', { type: () => ID }) id: string) {
    return this.oficinaService.findOne(id);
  }

  @Mutation(() => OficinaType)
  async createOficina(
    @Args('createOficinaInput') createOficinaInput: CreateOficinaInput,
  ) {
    return this.oficinaService.create(createOficinaInput);
  }

  @Mutation(() => OficinaType)
  async updateOficina(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateOficinaInput') updateOficinaInput: UpdateOficinaInput,
  ) {
    return this.oficinaService.update(id, updateOficinaInput);
  }

  @Mutation(() => OficinaType)
  async removeOficina(@Args('id', { type: () => ID }) id: string) {
    return this.oficinaService.remove(id);
  }
}
