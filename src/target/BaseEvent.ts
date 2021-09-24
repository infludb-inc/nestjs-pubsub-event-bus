import { paramCase } from 'change-case';
import { PubsubEvent } from '../interface';

export abstract class BaseEvent<TEventPayload> extends PubsubEvent<TEventPayload> {
  exchange(): string {
    return paramCase(this.constructor.name.substring(0, this.constructor.name.indexOf('Event')));
  }
}
