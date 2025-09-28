import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SalonService } from './salon.service';
import { SalonType } from './model/salon.model';
import { CreateSalonInput } from './dto/create-salon.input';
import { UpdateSalonInput } from './dto/update-salon.input';

@Resolver(() => SalonType)
export class SalonResolver {
  constructor(private readonly salonService: SalonService) {}

  @Query(() => [SalonType])
  async salones() {
    return this.salonService.findAll();
  }

  @Query(() => SalonType)
  async salon(@Args('id', { type: () => ID }) id: string) {
    return this.salonService.findOne(id);
  }

  @Mutation(() => SalonType)
  async createSalon(
    @Args('createSalonInput') createSalonInput: CreateSalonInput,
  ) {
    return this.salonService.create(createSalonInput);
  }

  @Mutation(() => SalonType)
  async updateSalon(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateSalonInput') updateSalonInput: UpdateSalonInput,
  ) {
    return this.salonService.update(id, updateSalonInput);
  }

  @Mutation(() => SalonType)
  async removeSalon(@Args('id', { type: () => String }) id: string) {
    return this.salonService.remove(id);
  }
}
