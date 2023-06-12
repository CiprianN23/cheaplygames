import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './terms.css?inline';

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
