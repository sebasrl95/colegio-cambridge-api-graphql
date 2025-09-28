import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AreaModule } from './area/area.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { OficinaModule } from './oficina/oficina.module';
import { SalonModule } from './salon/salon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from '../config/mongo.config';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: mongoConfig,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      playground: true,
    }),
    AreaModule,
    EmpleadoModule,
    OficinaModule,
    SalonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
