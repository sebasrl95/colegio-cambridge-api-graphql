import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOficinaInput } from './dto/create-oficina.input';
import { Oficina } from 'src/entities/oficina.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Area } from 'src/entities/area.schema';
import { UpdateOficinaInput } from './dto/update-oficina.input';

@Injectable()
export class OficinaService {
  constructor(
    @InjectModel(Oficina.name) private oficinaModel: Model<Oficina>,
    @InjectModel(Area.name) private areaModel: Model<Oficina>,
  ) {}

  async create(createOficinaInput: CreateOficinaInput): Promise<Oficina> {
    const findOficina = await this.findByCode(createOficinaInput.codigo);
    if (findOficina) {
      throw new HttpException(
        'Esta oficina ya se encuentra registrada',
        HttpStatus.CONFLICT,
      );
    }
    const oficina = new this.oficinaModel(createOficinaInput);
    const savedOficina = await oficina.save();
    await this.areaModel.findByIdAndUpdate(
      createOficinaInput.area,
      { $push: { oficinas: savedOficina._id } },
      { new: true },
    );

    return savedOficina.populate('area');
  }

  async findAll(): Promise<Oficina[]> {
    return this.oficinaModel
      .find()
      .populate('area')
      .populate('empleados')
      .exec();
  }

  async findOne(id: string): Promise<Oficina> {
    const r = await this.oficinaModel
      .findById(id)
      .populate('area')
      .populate('empleados')
      .exec();
    if (!r) throw new NotFoundException('Oficina no encontrada');
    return r;
  }

  async findByCode(codigo: string): Promise<Oficina | null> {
    return this.oficinaModel.findOne({ codigo }).exec();
  }

  async update(
    id: string,
    updateOficinaInput: UpdateOficinaInput,
  ): Promise<Oficina> {
    const oficina = await this.oficinaModel.findById(id);
    if (!oficina)
      throw new NotFoundException(`Oficina con id ${id} no encontrada`);

    if (
      updateOficinaInput.area &&
      oficina.area.toString() !== updateOficinaInput.area
    ) {
      await this.areaModel.findByIdAndUpdate(oficina.area, {
        $pull: { oficinas: oficina._id },
      });
      await this.areaModel.findByIdAndUpdate(updateOficinaInput.area, {
        $push: { oficinas: oficina._id },
      });
    }

    Object.assign(oficina, updateOficinaInput);
    return (await oficina.save()).populate('area');
  }

  async remove(id: string): Promise<Oficina> {
    const oficina = await this.oficinaModel.findByIdAndDelete(id);
    if (!oficina)
      throw new NotFoundException(`Oficina con id ${id} no encontrada`);

    await this.areaModel.findByIdAndUpdate(oficina.area, {
      $pull: { oficinas: oficina._id },
    });
    return oficina;
  }
}
