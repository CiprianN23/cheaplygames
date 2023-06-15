import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './policy.css?inline';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    useStylesScoped$(styles);
    return (
        <>
            <div class="content">
                <iframe
                    src="https://www.termsfeed.com/live/02601daa-defe-4998-a6c2-2f99d9543dfe"
                    title="Privacy Policy"
                />
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: 'CheaplyGames - Privacy Policy',
    meta: [
        {
            name: 'description',
            content: "CheaplyGames's privacy policy",
        },
    ],
};
