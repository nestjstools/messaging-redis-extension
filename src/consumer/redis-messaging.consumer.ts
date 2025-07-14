import { ConsumerMessage, IMessagingConsumer } from '@nestjstools/messaging';
import { ConsumerMessageDispatcher } from '@nestjstools/messaging';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { MessageConsumer } from '@nestjstools/messaging';
import { ConsumerDispatchedMessageError } from '@nestjstools/messaging';
import { RedisChannel } from '../channel/redis.channel';
import { Worker } from 'bullmq';

@Injectable()
@MessageConsumer(RedisChannel)
export class RedisMessagingConsumer
  implements IMessagingConsumer<RedisChannel>, OnApplicationShutdown
{
  private channel?: RedisChannel = undefined;
  private worker?: Worker = undefined;

  async consume(
    dispatcher: ConsumerMessageDispatcher,
    channel: RedisChannel,
  ): Promise<void> {
    this.channel = channel;

    this.worker = new Worker(
      channel.config.queue,
      async (job) => {
        dispatcher.dispatch(new ConsumerMessage(job.data, job.name));
      },
      {
        connection: {
          host: channel.config.connection.host,
          port: channel.config.connection.port,
          password: channel.config.connection.password,
          db: channel.config.connection.db,
        },
        prefix: channel.config.connection.keyPrefix,
      },
    );

    return Promise.resolve();
  }

  onError(
    errored: ConsumerDispatchedMessageError,
    channel: RedisChannel,
  ): Promise<void> {
    return Promise.resolve();
  }

  async onApplicationShutdown(signal?: string): Promise<any> {
    if (this.channel) {
      await this.worker.close();
      await this.channel.queue.close();
    }
  }
}

interface RabbitMQMessage {
  contentType: string;
  body: object;
  routingKey: string;
  headers: { [key: string]: string };
}
