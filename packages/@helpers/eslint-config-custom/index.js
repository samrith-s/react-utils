module.exports = {
	extends: [
		"eslint:recommended",
		"turbo",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	plugins: ["react", "react-hooks", "prettier"],
	parser: "@typescript-eslint/parser",
};
