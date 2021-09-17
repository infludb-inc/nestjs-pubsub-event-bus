import type { IEventHandler } from '@nestjs/cqrs';
import type { AbstractSubscriptionEvent } from './AbstractSubscriptionEvent';
import type { BindingQueueOptions } from './BindingQueueOptions';

export abstract class AbstractPubsubHandler<T extends AbstractSubscriptionEvent<any>> implements IEventHandler<T> {
    abstract handle(event: T): void | Promise<void>;

    queue = (): string | undefined => undefined;

    // Queue binding options.
    withQueueConfig = (): BindingQueueOptions => ({});

    /**
     * Positively acknowledge event.
     * This method should be used only when automatic acknowledge is disabled.
     * This method should not be overridden
     */
    ack(_event: AbstractSubscriptionEvent<any>): void {}

    /**
     * Negatively acknowledge event.
     * This method should be used only when automatic acknowledge is disabled.
     * This method should not be overridden
     */
    nack(_event: AbstractSubscriptionEvent<any>): void {}
}