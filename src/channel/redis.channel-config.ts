import { ChannelConfig } from '@nestjstools/messaging';

export class RedisChannelConfig extends ChannelConfig {
  public readonly connection: Connection;
  public readonly queue: string;
  /**
   * @description
   * This prefix is not used as RedisOptions keyPrefix, it is used as prefix for BullMQ
   * Read more: https://github.com/taskforcesh/bullmq/issues/1219#issuecomment-1113903785
   */
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
