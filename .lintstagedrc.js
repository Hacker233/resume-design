module.exports = {
  '*.{js,ts,vue}': ['pnpm eslint', () => 'vue-tsc --noEmit --skipLibCheck']
};
