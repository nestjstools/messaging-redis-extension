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
    /**
     * If set, client will send AUTH command with the value of this option when connected.
     */
    password?: string;
    /**
     * Database index to use.
     *
     * @default 0
     */
    db?: number;
  };
  /**
   * Prefix for all queue keys.
   */
  prefix?: string;
}
