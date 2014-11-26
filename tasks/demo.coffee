gulp = require "gulp"
gutil = require "gulp-util"
duration = require "gulp-duration"

source = require "vinyl-source-stream"
{exec} = require "child_process"
watchify = require "watchify"
coffeeify = require "coffeeify"
debowerify = require "debowerify"
browserify = require "browserify"
uglify = require 'gulp-uglify'
streamify = require 'gulp-streamify'

# Rebundle when files are changed
gulp.task "demo", ["script"], ->
	rebundle()

rebundle = () ->
	b = browserify(
		cache: {}
		packageCache: {}
		entries: ["./demo/coffee/main.coffee"]
		extensions: ['.coffee']
		debug: if gutil.env.uglify or gutil.env.dist then false else true
	)
	bundler = watchify(b)
	bundler.transform "coffeeify"
	bundler.transform "debowerify"
	
	bundler.on 'update', ->
		share(bundler)
	
	share(bundler)

share = (bundler) ->
	bundler.bundle()
		.on "error", scriptError
		.pipe source('main.js')
		.pipe duration("demo > rebundle")
		.pipe gulp.dest("./demo/js/")

scriptError = (error) ->
	gutil.log "browserifyError: " + error
	exec("afplay /System/Library/Sounds/Basso.aiff -v 0.5")
