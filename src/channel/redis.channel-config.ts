import { ChannelConfig } from '@nestjstools/messaging';
export class RedisChannelConfig extends ChannelConfig {
  public readonly connection: Connection;
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

interface Connection {
  host: string;
  port: number;
  password?: string;
  db?: number;
  /**
   * This prefix is not used as RedisOptions keyPrefix, it is used as prefix for BullMQ
   * Read more: https://github.com/taskforcesh/bullmq/issues/1219#issuecomment-1113903785
   */
  keyPrefix?: string;
}
