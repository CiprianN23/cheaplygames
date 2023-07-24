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
      mangleSelectors: typeof process.env.STYLIFY_MANGLE_SELECTORS !== 'undefined',
      variables: {
        text: '#010304',
        background: '#eff6fb',
        primary: '#1e7b3a',
        secondary: '#ffffff',
        accent: '#84b9e1',
        'background-lighten-10': 'darken($background,10)',

        fontSize100: 'clamp(0.78rem, calc(0.79rem + -0.02vw), 0.79rem)',
        fontSize200: 'clamp(0.89rem, calc(0.87rem + 0.08vw), 0.94rem)',
        fontSize300: 'clamp(1.00rem, calc(0.96rem + 0.22vw), 1.13rem)',
        fontSize400: 'clamp(1.13rem, calc(1.05rem + 0.39vw), 1.35rem)',
        fontSize500: 'clamp(1.27rem, calc(1.14rem + 0.62vw), 1.62rem)',
        fontSize600: 'clamp(1.42rem, calc(1.24rem + 0.90vw), 1.94rem)',
        fontSize700: 'clamp(1.60rem, calc(1.35rem + 1.27vw), 2.33rem)',
        fontSize800: 'clamp(1.80rem, calc(1.45rem + 1.73vw), 2.80rem)',

        dark: {
          text: '#fbfdfe',
          background: '#040b10',
          'background-lighten-10': 'lighten($background,10)',
          primary: '#1e7b3a',
          secondary: '#000000',
          accent: '#84b9e1',
        },

        '.dark': {
            text: '#fbfdfe',
            background: '#040b10',
            'background-lighten-10': 'lighten($background,10)',
            primary: '#1e7b3a',
            secondary: '#000000',
            accent: '#84b9e1',
          },
      },
      customSelectors: {
        'body': 'background-color:$background color:$text font-size:$fontSize400 line-height:1.6',
        '.headerSortDown': `padding-left:20px`,
        '.headerSortUp': `padding-left:20px`,
        '.headerSortDown:after': `
          content:^^;
          position:relative;
          left:10px;
          border:7px_solid_transparent;
          top:10px;
          border-top-color:silver;
          `,
          '.headerSortUp:after': `
          content:^^;
          position:relative;
          left:10px;
          border:7px_solid_transparent;
          bottom:15px;
          border-bottom-color:silver;
          `
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
        'disabled': `cursor:none;background-color:#999_!important;color:$text_!important`,
        'error': ``,
        'success': ``,
        'info': ``,
        'headerSortDown':``,
        'headerSortUp': ``
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
