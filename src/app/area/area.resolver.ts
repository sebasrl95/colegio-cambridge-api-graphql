import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AreaService } from './area.service';
import { AreaType } from './models/area.model';
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
  async area(@Args('id') id: string) {
    return this.areaService.findOne(id);
  }

  @Query(() => AreaType)
  async areaByName(@Args('name') name: string) {
    return this.areaService.findByName(name);
  }

  @Mutation(() => AreaType)
  async crearArea(@Args('data') data: CreateAreaInput) {
    return this.areaService.create(data);
  }

  @Mutation(() => AreaType)
  async actualizarArea(
    @Args('id') id: string,
    @Args('data') data: UpdateAreaInput,
  ) {
    return this.areaService.update(id, data);
  }

  @Mutation(() => Boolean)
  async eliminarArea(@Args('id') id: string) {
    await this.areaService.remove(id);
    return true;
  }
}
