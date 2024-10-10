import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    rules: {
      indent: 'error',
    },
  },
  eslintConfigPrettier, // eslint-config-prettier last
]
