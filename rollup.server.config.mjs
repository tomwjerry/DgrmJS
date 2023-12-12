import { terser } from 'rollup-plugin-terser';
import minifyHTMLPkg from 'rollup-plugin-minify-html-literals';
import serve from 'rollup-plugin-serve';

const minifyHTML = minifyHTMLPkg.default;

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/dgrmjs.js',
		format: 'iife',
		plugins: [
			terser({
				mangle: {
					keep_classnames: false,
					keep_fnames: false,
					properties: {
						regex: /^_/
					}
				}
			})]
	},
	plugins: [
		minifyHTML({
			options: {
				shouldMinify(template) {
					return (
						template.parts.some(part => {
							return (
								part.text.includes('<style') ||
								part.text.includes('<div') ||
								part.text.includes('<circle') ||
								part.text.includes('<path') ||
								part.text.includes('<svg')
							);
						})
					);
				},
				minifyOptions: {
					collapseWhitespace: true,
					minifyCSS: true,
					removeComments: true,
					keepClosingSlash: true
				}
			}
		}),
		serve('dist')
	]
};
