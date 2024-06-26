import { Module } from '@nestjs/common';
import { ConfigModule as BaseConfigModule } from '@nestjs/config';
import { nestConfig } from '@app/configs/nest.config';
import * as Joi from 'joi';
import { rabbitConfig } from '@app/configs/rabbit.config';
import { couchdbConfig } from '@app/configs/couchdb.config';

@Module({
    imports: [
        BaseConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [nestConfig, rabbitConfig, couchdbConfig],
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid('development', 'production').default('production'),
                HOST: Joi.string().default('0.0.0.0'),
                PORT: Joi.number().default(3000),
                DATABASE_URL: Joi.string().required(),
                RABBIT_RMQ_URL: Joi.string().required(),
                RABBIT_HTTP_URL: Joi.string().required(),
            }),
        }),
    ],
})
export class ConfigModule {}
