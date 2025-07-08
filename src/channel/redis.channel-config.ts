import { ChannelConfig } from '@nestjstools/messaging';
import { ConnectionOptions } from 'bullmq';

export class RedisChannelConfig extends ChannelConfig {
  public readonly connection: ConnectionOptions;
  public readonly queue: string;

  constructor({
    name,
    connection,
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
    this.connection = connection;
    this.queue = queue;
  }
}
