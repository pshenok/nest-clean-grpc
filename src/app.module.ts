import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { DomainModule } from './domain/domain.module';
import { CoreModule } from './core/core.module';
import { InfraModule } from './infra/infra.module';
import { GrpcModule } from './grpc/grpc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CoreModule,
    InfraModule,
    DomainModule,
    ApiModule,
    GrpcModule,
  ],
})
export class AppModule {}
