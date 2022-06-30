const sass = require('gulp-sass')(require('sass'));
const { src, dest, parallel } = require('gulp')

const BookTestFunctionPath = '.aws-sam/build/BookTestFunction'
const GovUKToolKit = './node_modules/govuk-frontend/govuk'

function styles() {
  return src('./public/scss/*.scss')
    .pipe(sass({ includePaths: [GovUKToolKit] }))
    .pipe(dest(`${BookTestFunctionPath}/public/stylesheets`))
}

function govukViews() {
  return src([`${GovUKToolKit}/**/*.njk`])
    .pipe(dest(`${BookTestFunctionPath}/views/govuk`))
}

function bookingViews() {
  return src(['./views/**/*.html'])
    .pipe(dest(`${BookTestFunctionPath}/views`))
}

function javascript() {
  return src(`${GovUKToolKit}/all.js`)
    .pipe(dest(`${BookTestFunctionPath}/public/javascript`))
}

function assets() {
  return src(`${GovUKToolKit}/assets/**/*.*`)
    .pipe(dest(`${BookTestFunctionPath}/public/assets`))
}

const views = parallel(govukViews, bookingViews)

exports.build = parallel(styles, views, javascript, assets)
exports.views = views
