import { Channel } from '@nestjstools/messaging';
import { RedisChannelConfig } from './redis.channel-config';
import { Queue } from 'bullmq';

export class RedisChannel extends Channel<RedisChannelConfig> {
  public readonly config: RedisChannelConfig;
  public readonly queue: Queue;

  constructor(config: RedisChannelConfig) {
    super(config);
    this.queue = new Queue(config.queue, {
      connection: {
        host: config.connection.host,
        port: config.connection.port,
        password: config.connection.password,
        db: config.connection.db,
      },
      prefix: config.connection.keyPrefix,
    });
  }
}
