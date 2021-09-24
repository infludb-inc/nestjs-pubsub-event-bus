import type { IEventHandler } from '@nestjs/cqrs';
import { paramCase } from 'change-case';
import { PubsubHandler } from '../interface';
import type { BaseEvent } from './BaseEvent';

export abstract class BaseEventHandler<TEvent extends BaseEvent<unknown>>
  extends PubsubHandler
  implements IEventHandler<TEvent>
{
  exchange(): string {
    return paramCase(this.constructor.name.substring(0, this.constructor.name.indexOf('Handler')));
  }

  abstract handle(event: TEvent): any;
}
