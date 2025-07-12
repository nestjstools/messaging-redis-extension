import { ChannelConfig } from '@nestjstools/messaging';

export class RedisChannelConfig extends ChannelConfig {
  public readonly connectionOptions: ConnectionOptions;
  public readonly queue: string;

  constructor({
    name,
    connectionOptions,
    queue,
    enableConsumer,
    avoidErrorsForNotExistedHandlers,
    middlewares,
    normalizer,
  }: RedisChannelConfig) {
    super(
      name,
      avoidErrorsForNotExistedHandlers,
      middlewares,
      enableConsumer,
      normalizer,
    );
    this.connectionOptions = connectionOptions;
    this.queue = queue;
  }
}

interface ConnectionOptions {
  redis: {
    host: string;
    port: number;
    password?: string;
    db?: number;
  };
  prefix?: string;
}
