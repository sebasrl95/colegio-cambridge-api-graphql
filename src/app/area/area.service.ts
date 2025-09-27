import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAreaInput } from './dto/create-area.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Area } from 'src/entities/area.schema';
import { UpdateAreaInput } from './dto/update-area.input';

@Injectable()
export class AreaService {
  constructor(@InjectModel(Area.name) private areaModel: Model<Area>) {}

  async create(createAreaInput: CreateAreaInput): Promise<Area> {
    const findArea = await this.findByName(createAreaInput.nombre);
    if (findArea) {
      throw new HttpException(
        'Esta área ya se encuentra registrada',
        HttpStatus.CONFLICT,
      );
    }

    const newArea = new this.areaModel(createAreaInput);
    return newArea.save();
  }

  async findAll(): Promise<Area[]> {
    return this.areaModel
      .find()
      .populate('oficinas')
      .populate('salones')
      .exec();
  }

  async findOne(id: string): Promise<Area> {
    const area = await this.areaModel
      .findById(id)
      .populate('oficinas')
      .populate('salones')
      .exec();
    if (!area) throw new NotFoundException('Área no encontrada');
    return area;
  }

  async findByName(nombre: string): Promise<Area | null> {
    return this.areaModel.findOne({ nombre }).exec();
  }

  async update(id: string, updateAreaInput: UpdateAreaInput): Promise<Area> {
    const area = await this.areaModel
      .findByIdAndUpdate(id, updateAreaInput, { new: true })
      .exec();
    if (!area) throw new NotFoundException('Área no encontrada');
    return area;
  }

  async remove(id: string): Promise<Area> {
    const area = await this.areaModel.findByIdAndDelete(id).exec();
    if (!area) throw new NotFoundException('Área no encontrada');
    return area;
  }
}
