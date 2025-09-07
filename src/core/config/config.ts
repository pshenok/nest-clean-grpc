import { Injectable } from '@nestjs/common';
import { AbstractConfig } from './config.abstract';

@Injectable()
export class Config extends AbstractConfig {
    public env = this.getString('NODE_ENV', 'development');
    public tz = this.getString('TZ', 'UTC');

    public web = {
        host: this.getString('WEB_HOST', 'localhost'),
        port: this.getNumber('WEB_PORT', 3000),
        bodyLimit: this.getNumber('BODY_LIMIT', 10485760),
    };

    public grpc = {
        host: this.getString('GRPC_HOST', 'localhost'),
        port: this.getNumber('GRPC_PORT', 5000),
    };

    public db = {
        url: this.getString('DATABASE_URL'),
    };

    public logger = {
        loggingType: this.getString('LOGGING_TYPE', 'json'),
        pm2: this.getBoolean('IS_PM2', false),
    };
}
