import { sveltekit } from '@sveltejs/kit/vite';
import Unocss from 'unocss/vite';
import { extractorSvelte } from '@unocss/core';
import presetIcons from '@unocss/preset-icons';
import presetWebFonts from '@unocss/preset-web-fonts';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		Unocss({
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
		})
	]
};

export default config;
