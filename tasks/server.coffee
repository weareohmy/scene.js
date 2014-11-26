gulp = require "gulp"
connect = require "gulp-connect"

gulp.task "server", ["demo"], ->
	gulp.watch('demo/**').on('change', ->
		console.log "changed"
		connect.reload()
	)
	connect.server(
		root: 'demo'
		livereload: true
		port: 8001
	)