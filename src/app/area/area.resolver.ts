import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { AreaService } from './area.service';
import { AreaType } from './model/area.model';
import { CreateAreaInput } from './dto/create-area.input';
import { UpdateAreaInput } from './dto/update-area.input';

@Resolver(() => AreaType)
export class AreaResolver {
  constructor(private areaService: AreaService) {}

  @Query(() => [AreaType])
  async areas() {
    return this.areaService.findAll();
  }

  @Query(() => AreaType)
  async area(@Args('id', { type: () => ID }) id: string) {
    return this.areaService.findOne(id);
  }

  @Query(() => AreaType)
  async areaByName(@Args('name') name: string) {
    return this.areaService.findByName(name);
  }

  @Mutation(() => AreaType)
  async crearArea(@Args('createAreaInput') createAreaInput: CreateAreaInput) {
    return this.areaService.create(createAreaInput);
  }

  @Mutation(() => AreaType)
  async actualizarArea(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateAreaInput') updateAreaInput: UpdateAreaInput,
  ) {
    return this.areaService.update(id, updateAreaInput);
  }

  @Mutation(() => Boolean)
  async eliminarArea(@Args('id', { type: () => ID }) id: string) {
    await this.areaService.remove(id);
    return true;
  }
}
