module.exports = {
	parserOptions: {
		parser: "@typescript-eslint/parser",
		project: [
			"./tsconfig.eslint.json"
		],
		tsConfigRootDir: "./"
	},
	extends: [
		"@pdap-design-system/eslint-config",
		"plugin:@typescript-eslint/recommended",
		"@vue/typescript/recommended",
	],
	plugins: [
		"@typescript-eslint",
	],
	overrides: [
		{
			"extends": [
				"plugin:@typescript-eslint/disable-type-checked"
			],
			"files": [
				"./**/*.js"
			]
		}
	],
	rules: {
		"@typescript-eslint/indent": "off",
		"@typescript-eslint/ban-ts-comment": [
			"error", {
				'ts-expect-error': false,
				'ts-ignore': true,
				'ts-nocheck': true,
				'ts-check': false,
				minimumDescriptionLength: 3,		
		}]
	}
}