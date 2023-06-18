import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { stylifyVite } from '@stylify/unplugin';

const stylifyPlugin = stylifyVite({
	bundles: [
		{ files: ['src/**/*.tsx'], outputFile: 'src/styles/global.css' }
	],
  compiler: {
      variables: {
        text: 'hsl(200, 60%, 1%)',
        background: 'hsl(205, 60%, 96%)',
        primary: 'hsl(138, 61%, 30%)',
        secondary: 'hsl(0, 0%, 100%)',
        accent: 'hsl(206, 61%, 70%)',

        fontSize100: 'clamp(0.63rem, calc(0.84rem + -0.27vw), 0.78rem)',
        fontSize200: 'clamp(0.88rem, calc(0.96rem + -0.09vw), 0.94rem)',
        fontSize300: 'clamp(1.13rem, calc(1.08rem + 0.22vw), 1.25rem)',
        fontSize400: 'clamp(1.20rem, calc(1.06rem + 0.68vw), 1.59rem)',
        fontSize500: 'clamp(1.62rem, calc(1.31rem + 1.53vw), 2.50rem)',
        fontSize600: 'clamp(1.94rem, calc(1.39rem + 2.77vw), 3.53rem)',
        fontSize700: 'clamp(2.33rem, calc(1.41rem + 4.63vw), 5.00rem)',
        fontSize800: 'clamp(2.80rem, calc(1.32rem + 7.42vw), 7.07rem)',

        dark: {
          text: 'hsl(200, 60%, 99%)',
          background: 'hsl(205, 60%, 4%)',
          primary: 'hsl(138, 61%, 30%)',
          secondary: 'hsl(0, 0%, 0%)',
          accent: 'hsl(206, 61%, 70%)',
        },

        '.dark': {
            text: 'hsl(200, 60%, 99%)',
            background: 'hsl(205, 60%, 4%)',
            primary: 'hsl(138, 61%, 30%)',
            secondary: 'hsl(0, 0%, 0%)',
            accent: 'hsl(206, 61%, 70%)',
          },
      },
      customSelectors: {
        'body': 'background-color:$background color:$text font-size:$fontSize400 line-height:1.6'
      },
      components: {
        'sr-only': `
          border:0_!important;
          clip:rect(1px,1px,1px,1px)_!important;
          webkit-clip-path:inset(50%)_!important;
          clip-path:inset(50%)_!important;
          height:1px_!important;
          margin:-1px_!important;
          overflow:hidden_!important;
          padding:0_!important;
          position:absolute_!important;
          width:1px_!important;
          white-space:nowrap_!important;
        `,
        'menu-close': 'transform:translateX(100%)',
        'menu-open': 'transform:translateX(0%)'
      }
    }
});

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite({devTools: {clickToSource: false}}), tsconfigPaths(), stylifyPlugin],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
