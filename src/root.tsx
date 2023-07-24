import { component$, useStyles$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import fontStyles from './styles/fonts.css?inline';
import resetStyles from './styles/reset.css?inline';
import globalStyles from './styles/global.css?inline';

export default component$(() => {
    useStyles$(fontStyles);
    useStyles$(resetStyles);
    useStyles$(globalStyles);

    return (
        <QwikCityProvider>
            <head>
                <meta charSet="utf-8" />
                <link rel="manifest" href="/manifest.json" />
                <RouterHead />
            </head>
            <body lang="en" id="mainBody">
                <RouterOutlet />
                <ServiceWorkerRegister />
            </body>
        </QwikCityProvider>
    );
});
