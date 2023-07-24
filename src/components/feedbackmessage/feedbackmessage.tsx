import { component$ } from '@builder.io/qwik';
import type { ResponseStatus } from '@modular-forms/qwik';
import { BiExclamationCircle } from '../icons/BiExclamationCircle';
import { BiCheckCircle } from '../icons/BiCheckCircle';
import { BiXCircle } from '../icons/BiXCircle';

interface ItemProps {
    status?: ResponseStatus | undefined;
    messasge?: string | undefined;
    data?: undefined;
}

export const FeedbackMessage = component$<ItemProps>(({ status, messasge }) => {
    return (
        <>
            <div class={status}>
                {status === 'error' && <BiExclamationCircle />}
                {status === 'success' && <BiCheckCircle />}
                {status === 'info' && <BiXCircle />}
                <div class="message">{messasge}</div>
            </div>
        </>
    );
});
