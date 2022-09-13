module.exports = {
  '*.{js,ts,vue}': 'pnpm eslint',
  '*.vue': [
    () => {
      return `vue-tsc --noEmit --skipLibCheck`
    },
  ],
}