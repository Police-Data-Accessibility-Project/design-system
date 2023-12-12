/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.vue', './src/**/*.css'],
	theme: {
		// Nested within "extend" - extends tailwind theme defaults, only overrides properties named here
		extend: {
			colors: {
				brand: {
					blue: {
						light: 'rgba(var(--color-brand-blue-light)/<alpha-value>)',
						medium: 'rgba(var(--color-brand-blue-medium)/<alpha-value>)',
					},
					gold: 'rgba(var(--color-brand-gold)/<alpha-value>)',
					wine: 'rgba(var(--color-brand-wine)/<alpha-value>)',
				},
				neutral: {
					50: 'rgba(var(--color-neutral-50)/<alpha-value>)',
					100: 'rgba(var(--color-neutral-100)/<alpha-value>)',
					200: 'rgba(var(--color-neutral-200)/<alpha-value>)',
					300: 'rgba(var(--color-neutral-300)/<alpha-value>)',
					400: 'rgba(var(--color-neutral-400)/<alpha-value>)',
					500: 'rgba(var(--color-neutral-500)/<alpha-value>)',
					600: 'rgba(var(--color-neutral-600)/<alpha-value>)',
					700: 'rgba(var(--color-neutral-700)/<alpha-value>)',
					800: 'rgba(var(--color-neutral-800)/<alpha-value>)',
					900: 'rgba(var(--color-neutral-900)/<alpha-value>)',
					950: 'rgba(var(--color-neutral-950)/<alpha-value>)',
				},
			},
			brightness: {
				85: '.85',
			},
			maxWidth: {
				'4xl': '59rem',
			},
			screens: {
				xs: '500px',
			},
		},

		// Using properties directly - overrides tailwind theme defaults for entire section
		fontFamily: {
			sans: [
				'"Libre Franklin"',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'Oxygen',
				'Ubuntu',
				'Cantarell',
				'"Fira Sans"',
				'"Droid Sans"',
				'"Helvetica Neue"',
				'sans-serif',
			],
			serif: ['ui-serif', 'Georgia'],
			mono: [
				'"Source Code Pro"',
				'monospace',
				'ui-monospace',
				'SFMono-Regular',
			],
		},
		fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			med: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.75rem',
			'4xl': '2rem',
			'5xl': '2.625rem',
			'6xl': '3rem',
		},
	},
};
