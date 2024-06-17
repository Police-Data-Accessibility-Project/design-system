/**  
 * 
 * NOTE: this is not imported from `/config`, so any updates will have to be made there as well for the time being (CJS / MJS mis-matches)
 * TODO: figure out how to do this. (Maybe just a script?)
 * 
*/
export default {
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
