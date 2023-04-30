import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from 'unocss/vite';
import extractorSvelte from '@unocss/extractor-svelte';
import presetIcons from '@unocss/preset-icons';
import presetWebFonts from '@unocss/preset-web-fonts';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		UnoCSS({
			mode: 'svelte-scoped',
			extractors: [extractorSvelte],
			presets: [
				presetIcons(),
				presetWebFonts({
					provider: 'bunny',
					fonts: {
						sans: 'Poppins'
					}
				})
			]
		}),
		sveltekit()
	]
};

export default config;
