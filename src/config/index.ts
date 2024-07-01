export const tailwindConfig = {
	content: ['./src/**/*.vue', './src/**/*.css'],
	theme: {
		// Nested within "extend" - extends tailwind theme defaults, only overrides properties named here
		extend: {
			colors: {
				brand: {
					gold: {
						DEFAULT: 'rgba(var(--color-brand-gold-600) / <alpha-value>)',
						50: 'rgba(var(--color-brand-gold-50) / <alpha-value>)',
						100: 'rgba(var(--color-brand-gold-100) / <alpha-value>)',
						200: 'rgba(var(--color-brand-gold-200) / <alpha-value>)',
						300: 'rgba(var(--color-brand-gold-300) / <alpha-value>)',
						400: 'rgba(var(--color-brand-gold-400) / <alpha-value>)',
						500: 'rgba(var(--color-brand-gold-500) / <alpha-value>)',
						600: 'rgba(var(--color-brand-gold-600) / <alpha-value>)',
						700: 'rgba(var(--color-brand-gold-700) / <alpha-value>)',
						800: 'rgba(var(--color-brand-gold-800) / <alpha-value>)',
						900: 'rgba(var(--color-brand-gold-900) / <alpha-value>)',
						950: 'rgba(var(--color-brand-gold-950) / <alpha-value>)',
					},
					wine: {
						DEFAULT: 'rgba(var(--color-brand-wine-500) / <alpha-value>)',
						50: 'rgba(var(--color-brand-wine-50) / <alpha-value>)',
						100: 'rgba(var(--color-brand-wine-100) / <alpha-value>)',
						200: 'rgba(var(--color-brand-wine-200) / <alpha-value>)',
						300: 'rgba(var(--color-brand-wine-300) / <alpha-value>)',
						400: 'rgba(var(--color-brand-wine-400) / <alpha-value>)',
						500: 'rgba(var(--color-brand-wine-500) / <alpha-value>)',
						600: 'rgba(var(--color-brand-wine-600) / <alpha-value>)',
						700: 'rgba(var(--color-brand-wine-700) / <alpha-value>)',
						800: 'rgba(var(--color-brand-wine-800) / <alpha-value>)',
						900: 'rgba(var(--color-brand-wine-900) / <alpha-value>)',
						950: 'rgba(var(--color-brand-wine-950) / <alpha-value>)',
					},
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
				goldneutral: {
					50: 'rgba(var(--color-gold-neutral-50)/<alpha-value>)',
					100: 'rgba(var(--color-gold-neutral-100)/<alpha-value>)',
					200: 'rgba(var(--color-gold-neutral-200)/<alpha-value>)',
					300: 'rgba(var(--color-gold-neutral-300)/<alpha-value>)',
					400: 'rgba(var(--color-gold-neutral-400)/<alpha-value>)',
					500: 'rgba(var(--color-gold-neutral-500)/<alpha-value>)',
					600: 'rgba(var(--color-gold-neutral-600)/<alpha-value>)',
					700: 'rgba(var(--color-gold-neutral-700)/<alpha-value>)',
					800: 'rgba(var(--color-gold-neutral-800)/<alpha-value>)',
					900: 'rgba(var(--color-gold-neutral-900)/<alpha-value>)',
					950: 'rgba(var(--color-gold-neutral-950)/<alpha-value>)',
				},
				wineneutral: {
					50: 'rgba(var(--color-wine-neutral-50)/<alpha-value>)',
					100: 'rgba(var(--color-wine-neutral-100)/<alpha-value>)',
					200: 'rgba(var(--color-wine-neutral-200)/<alpha-value>)',
					300: 'rgba(var(--color-wine-neutral-300)/<alpha-value>)',
					400: 'rgba(var(--color-wine-neutral-400)/<alpha-value>)',
					500: 'rgba(var(--color-wine-neutral-500)/<alpha-value>)',
					600: 'rgba(var(--color-wine-neutral-600)/<alpha-value>)',
					700: 'rgba(var(--color-wine-neutral-700)/<alpha-value>)',
					800: 'rgba(var(--color-wine-neutral-800)/<alpha-value>)',
					900: 'rgba(var(--color-wine-neutral-900)/<alpha-value>)',
					950: 'rgba(var(--color-wine-neutral-950)/<alpha-value>)',
				},
				blue: {
					light: 'rgba(var(--color-blue-light)/<alpha-value>)',
					medium: 'rgba(var(--color-blue-medium)/<alpha-value>)',
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

export const stylelintConfig = {
	extends: [
		'stylelint-config-standard', 
		"@ronilaukkarinen/stylelint-a11y/recommended"
	],
	rules: {
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'variants',
					'responsive',
					'screen',
				],
			},
		],
		'comment-empty-line-before': null,
		'declaration-block-trailing-semicolon': null,
		'no-descending-specificity': null,
		"a11y/no-text-align-justify": true,
		"a11y/font-size-is-readable": true,
		"a11y/media-prefers-color-scheme": true,
		"a11y/line-height-is-vertical-rhythmed": true,
		"a11y/no-display-none": true,
		"a11y/no-obsolete-element": true,
	},
	"overrides": [
    {
      "files": ["**/*.vue"],
      "extends": [
        "stylelint-config-standard-vue"
      ]
    }
  ]
};
