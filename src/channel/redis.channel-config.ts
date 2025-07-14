import { ChannelConfig } from '@nestjstools/messaging';

export class RedisChannelConfig extends ChannelConfig {
  public readonly connection: Connection;
  public readonly queue: string;
  public readonly keyPrefix?: string;

  constructor({
    name,
    connection,
    queue,
    enableConsumer,
    avoidErrorsForNotExistedHandlers,
    middlewares,
    normalizer,
    keyPrefix,
  }: RedisChannelConfig) {
    super(
      name,
      avoidErrorsForNotExistedHandlers,
      middlewares,
      enableConsumer,
      normalizer,
    );
    this.connection = connection;
    this.queue = queue;
    this.keyPrefix = keyPrefix;
  }
}

interface Connection {
  host: string;
  port: number;
  password?: string;
  db?: number;
}
