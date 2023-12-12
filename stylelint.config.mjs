export default {
	extends: ['stylelint-config-standard'],
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
