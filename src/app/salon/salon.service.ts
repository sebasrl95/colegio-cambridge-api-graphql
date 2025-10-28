import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSalonInput } from './dto/create-salon.input';
import { UpdateSalonInput } from './dto/update-salon.input';
import { Salon } from 'src/entities/salon.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Area } from 'src/entities/area.schema';

@Injectable()
export class SalonService {
  constructor(
    @InjectModel(Salon.name) private readonly salonModel: Model<Salon>,
    @InjectModel(Area.name) private areaModel: Model<Area>,
  ) {}

  async create(createSalonInput: CreateSalonInput): Promise<Salon> {
    const existing = await this.salonModel.findOne({
      codigo: createSalonInput.codigo,
    });

    if (existing) {
      throw new ConflictException(
        `El salón con código ${createSalonInput.codigo} ya existe`,
      );
    }

    const salon = new this.salonModel(createSalonInput);
    const savedSalon = await (await salon.save()).populate('area');

    await this.areaModel.findByIdAndUpdate(
      createSalonInput.area,
      { $push: { salones: savedSalon._id } },
      { new: true },
    );

    return savedSalon;
  }

  async findAll(): Promise<Salon[]> {
    return this.salonModel.find().populate('area').exec();
  }

  async findOne(id: string): Promise<Salon> {
    const salon = await this.salonModel.findById(id).populate('area').exec();
    if (!salon) {
      throw new NotFoundException(`Salón con id ${id} no encontrado`);
    }
    return salon;
  }

  async update(id: string, updateSalonInput: UpdateSalonInput): Promise<Salon> {
    const salon = await this.salonModel.findById(id);
    if (!salon) throw new NotFoundException(`Salón con id ${id} no encontrado`);

    if (
      updateSalonInput.area &&
      salon.area.toString() !== updateSalonInput.area
    ) {
      await this.areaModel.findByIdAndUpdate(salon.area, {
        $pull: { salones: salon._id },
      });
      await this.areaModel.findByIdAndUpdate(updateSalonInput.area, {
        $push: { salones: salon._id },
      });
    }

    Object.assign(salon, updateSalonInput);
    return (await salon.save()).populate('area');
  }

  async remove(id: string): Promise<Salon> {
    const salon = await this.salonModel.findByIdAndDelete(id);
    if (!salon) throw new NotFoundException(`Salón con id ${id} no encontrado`);

    await this.areaModel.findByIdAndUpdate(salon.area, {
      $pull: { salones: salon._id },
    });
    return salon;
  }
}
