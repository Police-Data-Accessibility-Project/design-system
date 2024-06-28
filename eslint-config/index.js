module.exports = {
	root: true,
	parser: 'vue-eslint-parser',
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:vue/vue3-recommended',
		'plugin:vue/strongly-recommended',
		'@vue/eslint-config-prettier',
		'plugin:vuejs-accessibility/recommended'
	],
	env: {
		node: true
	},
	plugins: ['prettier', 'vuejs-accessibility'],
	rules: {
		'vue/require-default-prop': 'off',
		indent: 'off',
		'vue/no-reserved-component-names': 'off',
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always',
					normal: 'always',
					component: 'always',
				},
				svg: 'always',
				math: 'always',
			},
		],
		'prettier/prettier': [
			'warn',
			{
				indent: [
					'warn',
					'tab',
					{
						SwitchCase: 2,
					},
				],
				tabWidth: 2,
				useTabs: true,
				singleQuote: true,
				quotes: [2, 'single', { 'avoidEscape': true }]
			},
		],
		'vue/no-multiple-template-root': 'off',
		'vuejs-accessibility/alt-text': [
      'error',
      {
        'elements': ['img', 'object', 'area', 'input[type="image"]'],
        'img': ['Image'],
        'object': ['Object'],
        'area': ['Area'],
        'input[type=\'image\']': ['ImageInput']
      }
    ],
		"vuejs-accessibility/no-redundant-roles": [
    	"error",
			{
				"nav": ["navigation"],
			}
		],
		"vuejs-accessibility/media-has-caption": [
			"error",
			{
				"audio": ["Audio"],
				"video": ["Video"],
				"track": ["Track"]
			}
		],
		"vuejs-accessibility/label-has-for": [
      "error",
      {
        "required": {
          "some": ["nesting", "id"]
        },
        "allowChildren": true
      }
    ]
	},
};
