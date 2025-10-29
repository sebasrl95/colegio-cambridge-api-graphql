import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmpleadoInput } from './dto/create-empleado.input';
import { InjectModel } from '@nestjs/mongoose';
import { Empleado, TipoEmpleado } from 'src/entities/empleado.schema';
import { Model } from 'mongoose';
import { UpdateEmpleadoInput } from './dto/update-empleado.input';
import { Area } from 'src/entities/area.schema';
import { Oficina } from 'src/entities/oficina.schema';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectModel(Empleado.name) private empleadoModel: Model<Empleado>,
    @InjectModel(Area.name) private areaModel: Model<Area>,
    @InjectModel(Oficina.name) private oficinaModel: Model<Oficina>,
  ) {}

  async create(createEmpleadoInput: CreateEmpleadoInput): Promise<Empleado> {
    const existing = await this.empleadoModel.findOne({
      documento: createEmpleadoInput.documento,
    });
    if (existing) {
      throw new ConflictException(
        `El documento ${createEmpleadoInput.documento} ya está registrado`,
      );
    }

    if (
      createEmpleadoInput.tipoEmpleado !== TipoEmpleado.profesor &&
      createEmpleadoInput.tipoEmpleado !== TipoEmpleado.administrativo
    ) {
      throw new BadRequestException('Tipo de empleado no válido');
    }

    if (
      createEmpleadoInput.tipoEmpleado === TipoEmpleado.profesor &&
      !createEmpleadoInput.tipoProfesor
    ) {
      throw new BadRequestException(
        'Debe especificar el tipoProfesor cuando el empleado es PROFESOR',
      );
    }

    const empleado = new this.empleadoModel(createEmpleadoInput);
    const empleadoDoc = await empleado.save();
    const savedEmpleado = await this.empleadoModel
      .findById(empleadoDoc._id)
      .populate('area')
      .populate('oficina')
      .exec();

    if (createEmpleadoInput.area) {
      await this.areaModel.findByIdAndUpdate(
        createEmpleadoInput.area,
        { $push: { empleados: empleadoDoc._id } },
        { new: true },
      );
    }

    if (createEmpleadoInput.oficina) {
      await this.oficinaModel.findByIdAndUpdate(
        createEmpleadoInput.oficina,
        { $push: { empleados: empleadoDoc._id } },
        { new: true },
      );
    }

    return savedEmpleado as Empleado;
  }

  async findAll(): Promise<Empleado[]> {
    return this.empleadoModel
      .find()
      .populate('area')
      .populate('oficina')
      .exec();
  }

  async findOne(id: string): Promise<Empleado> {
    const empleado = await this.empleadoModel
      .findById(id)
      .populate('area')
      .populate('oficina')
      .exec();

    if (!empleado) {
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);
    }
    return empleado;
  }

  async update(
    id: string,
    updateEmpleadoInput: UpdateEmpleadoInput,
  ): Promise<Empleado> {
    const empleado = await this.empleadoModel.findById(id);
    if (!empleado)
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);

    // Si cambia de área actualizo referencia
    if (
      updateEmpleadoInput.area &&
      empleado.area?.toString() !== updateEmpleadoInput.area
    ) {
      await this.areaModel.findByIdAndUpdate(empleado.area, {
        $pull: { empleados: empleado._id },
      });
      await this.areaModel.findByIdAndUpdate(updateEmpleadoInput.area, {
        $push: { empleados: empleado._id },
      });
    }

    // Si cambia de oficina actualizo referencia
    if (
      updateEmpleadoInput.oficina &&
      empleado.oficina?.toString() !== updateEmpleadoInput.oficina
    ) {
      await this.oficinaModel.findByIdAndUpdate(empleado.oficina, {
        $pull: { empleados: empleado._id },
      });
      await this.oficinaModel.findByIdAndUpdate(updateEmpleadoInput.oficina, {
        $push: { empleados: empleado._id },
      });
    }

    Object.assign(empleado, updateEmpleadoInput);
    const saved = await empleado.save();
    const populated = await this.empleadoModel
      .findById(saved._id)
      .populate('area')
      .populate('oficina')
      .exec();
    return populated as Empleado;
  }

  async remove(id: string): Promise<Empleado> {
    const empleado = await this.empleadoModel.findByIdAndDelete(id);
    if (!empleado)
      throw new NotFoundException(`Empleado con id ${id} no encontrado`);

    if (empleado.area) {
      await this.areaModel.findByIdAndUpdate(empleado.area, {
        $pull: { empleados: empleado._id },
      });
    }

    if (empleado.oficina) {
      await this.oficinaModel.findByIdAndUpdate(empleado.oficina, {
        $pull: { empleados: empleado._id },
      });
    }

    return empleado;
  }
}
