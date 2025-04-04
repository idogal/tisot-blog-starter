module.exports = {
  plugins: [
    require('postcss-import'),
    require('cssnano')({
      preset: 'default',
    }),
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}