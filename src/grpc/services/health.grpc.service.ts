import { Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import {
    HealthCheckService,
    PrismaHealthIndicator,
} from '@nestjs/terminus';
import { DatabaseService } from '../../infra/database/database.service';

@Injectable()
export class HealthGrpcService {
    constructor(
        private health: HealthCheckService,
        private db: PrismaHealthIndicator,
        private databaseService: DatabaseService,
    ) {}

    @GrpcMethod('HealthService', 'Check')
    async check(data: any, metadata: Metadata): Promise<any> {
        const healthResult = await this.health.check([
            () => this.db.pingCheck('database', this.databaseService as any),
        ]);

        const services: { [key: string]: string } = {};
        
        if (healthResult.details) {
            for (const [key, value] of Object.entries(healthResult.details)) {
                services[key] = (value as any).status || 'unknown';
            }
        }

        return {
            status: healthResult.status,
            services,
        };
    }
}
