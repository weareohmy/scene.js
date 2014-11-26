gulp = require "gulp"
gutil = require "gulp-util"
duration = require "gulp-duration"
header = require 'gulp-header'
gulpif = require 'gulp-if'

source = require "vinyl-source-stream"
{exec} = require "child_process"
watchify = require "watchify"
coffeeify = require "coffeeify"
debowerify = require "debowerify"
uglifyify = require "uglifyify"
browserify = require "browserify"
uglify = require 'gulp-uglify'
streamify = require 'gulp-streamify'
derequire = require 'gulp-derequire'

# Rebundle when files are changed
gulp.task "script", ->
	rebundle()

rebundle = () ->
	b = browserify(
		cache: {}
		packageCache: {}
		entries: ["./src/Scene.coffee"]
		extensions: ['.coffee']
		standalone: "Scene"
		# debug: if gutil.env.uglify or gutil.env.dist then false else true
	)
	bundler = watchify(b)
	bundler.transform "coffeeify"
	bundler.transform "debowerify"
	
	# don't watch if dist
	if not gutil.env.dist?
		bundler.on 'update', ->
			share(bundler)
	
	share(bundler)

pkg = require '../package.json'
banner = ['/**',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * <%= pkg.description %>',
  ' * <%= pkg.homepage %>',
  ' * Released under the MIT License.',
  ' */',
  ''].join('\n')

share = (bundler) ->
	bundler.bundle()
		.on "error", scriptError
		.pipe source('scene.js')
		.pipe gulpif(gutil.env.uglify or gutil.env.dist, streamify(uglify()), derequire())
		.pipe duration("script > rebundle")
		.pipe header(banner, { pkg : pkg })
		.pipe gulp.dest(if gutil.env.dist then "./dist/" else "./demo/js/")

scriptError = (error) ->
	gutil.log "browserifyError: " + error
	exec("afplay /System/Library/Sounds/Basso.aiff -v 0.5")
