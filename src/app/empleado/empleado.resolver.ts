import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { EmpleadoService } from './empleado.service';
import { EmpleadoType } from './model/empleado.model'; // Lo definiremos abajo
import { CreateEmpleadoInput } from './dto/create-empleado.input';
import { UpdateEmpleadoInput } from './dto/update-empleado.input';

@Resolver(() => EmpleadoType)
export class EmpleadoResolver {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Query(() => [EmpleadoType], { name: 'empleados' })
  findAll() {
    return this.empleadoService.findAll();
  }

  @Query(() => EmpleadoType, { name: 'empleado' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.empleadoService.findOne(id);
  }

  @Mutation(() => EmpleadoType)
  createEmpleado(
    @Args('createEmpleadoInput') createEmpleadoInput: CreateEmpleadoInput,
  ) {
    return this.empleadoService.create(createEmpleadoInput);
  }

  @Mutation(() => EmpleadoType)
  updateEmpleado(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateEmpleadoInput') updateEmpleadoInput: UpdateEmpleadoInput,
  ) {
    return this.empleadoService.update(id, updateEmpleadoInput);
  }

  @Mutation(() => EmpleadoType)
  removeEmpleado(@Args('id', { type: () => ID }) id: string) {
    return this.empleadoService.remove(id);
  }
}
