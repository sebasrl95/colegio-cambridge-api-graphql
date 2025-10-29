import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum TipoEmpleado {
  profesor = 'profesor',
  administrativo = 'administrativo',
}

export enum TipoProfesor {
  planta = 'planta',
  contratista = 'contratista',
}

export type EmpleadoDocument = Empleado & Document;

@Schema({ collection: 'empleados' })
export class Empleado {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  documento: string;

  @Prop({ required: true, enum: ['profesor', 'administrativo'] })
  tipoEmpleado: string;

  @Prop({ required: false, enum: ['planta', 'contratista'] })
  tipoProfesor?: string;

  @Prop({ type: Types.ObjectId, ref: 'Area', required: true })
  area: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Oficina', required: true })
  oficina: Types.ObjectId;
}

export const EmpleadoSchema = SchemaFactory.createForClass(Empleado);
