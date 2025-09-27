import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Area, AreaSchema } from '../../entities/area.schema';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { AreaResolver } from './area.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Area.name, schema: AreaSchema }]),
  ],
  controllers: [AreaController],
  providers: [AreaService, AreaResolver],
  exports: [AreaService, AreaResolver],
})
export class AreaModule {}
