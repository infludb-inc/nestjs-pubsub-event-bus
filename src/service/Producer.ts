import { ConfigProvider } from '../provider';
import type { PublishOptions } from '../interface';
import { PubsubManager } from './PubsubManager';

export class Producer extends PubsubManager {
  /**
   * Produce an event.
   * @param event - event name (Ex.: store.created, user.updated, order.cancelled, etc...)
   * @param payload - message payload
   * @param exchange - exchange name
   * @param publishHeaders - custom message headers
   */
  async produce(
    event: string,
    payload: Record<string, any> | Buffer,
    exchange: string,
    publishHeaders?: PublishOptions,
  ): Promise<void> {
    const headers: PublishOptions = { ...this.headers(publishHeaders), type: event };

    const message: string = `Event "${event}" to "${exchange}" with ${JSON.stringify({
      payload,
      headers,
    })}`;

    return void this.channelWrapper$.publish(
      exchange,
      event,
      payload,
      headers,
      (err: Error | null | undefined): boolean => {
        const isSuccess: boolean = !err;

        isSuccess
          ? this.logger().log(`${message} -> PUBLISHED.`)
          : this.logger().warn(`${message} -> UNPUBLISHED -> [${(err as Error).message}]`);

        return isSuccess;
      },
    );
  }

  protected headers(extra?: PublishOptions): PublishOptions {
    return {
      ...this.producerConfiguration(),
      ...extra,
    };
  }

  protected producerConfiguration(): PublishOptions {
    return ConfigProvider.producer;
  }
}
