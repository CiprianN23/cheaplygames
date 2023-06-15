import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './terms.css?inline';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    useStylesScoped$(styles);
    return (
        <>
            <div class="content">
                <iframe
                    src="https://www.termsfeed.com/live/b3d2263b-3c3d-427e-96bc-4e958a172c2c"
                    title="Terms and Conditions"
                />
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: 'CheaplyGames - Terms & Conditions',
    meta: [
        {
            name: 'description',
            content: "CheaplyGames's terms and conditions",
        },
    ],
};
