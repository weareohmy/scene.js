require ["Scene"], (Scene) ->

	class Example

		woman: null
		man: null
		scene: null

		constructor: () ->
			@scene = new Scene(document.getElementsByTagName("body")[0],{fps:25})
			@scene.add(Scene.SPRITE,"/img/static/table-x411-y250.png",{renderMethod:Scene.RENDER_BACKGROUND,contentWidth:137,contentHeight:208,x:411,y:250,index:3})

			@loadData('/img/animated/man/man.json',@manDataLoaded)
			@loadData('/img/animated/woman/woman.json',@womanDataLoaded)

		manDataLoaded: (data) =>
			@man = @scene.add(Scene.MOVIE_CLIP,data,{renderMethod:Scene.RENDER_BACKGROUND,contentWidth:352,contentHeight:373,x:435,y:69,index:2})
			@start() if @woman?

		womanDataLoaded: (data) =>
			@woman = @scene.add(Scene.MOVIE_CLIP,data,{renderMethod:Scene.RENDER_IMAGE,contentWidth:302,contentHeight:375,x:244,y:69,index:1})
			@start() if @man?

		start: () ->
			@man.play({repeat:true})
			@woman.play({repeat:true})

			document.addEventListener("keypress", @onKeyPress, false);

		onKeyPress: (event) =>
			console.log "onKeyPress",event.keyCode
			keyCode = event.keyCode
			switch keyCode
				when 49,50,51,52,53,54,55,56,57 #1-9
					@man.gotoAndPlay((keyCode - 49) * 10,{speed:@man.getSpeed(),repeat:true})
					@woman.gotoAndPlay((keyCode - 49) * 10,{speed:@woman.getSpeed(),repeat:true})
				when 32 #space
					if @man.getPlaying() then @man.stop() else @man.play({speed:@man.getSpeed(),repeat:true})
					if @woman.getPlaying() then @woman.stop() else @woman.play({speed:@woman.getSpeed(),repeat:true})
				when 97 #a
					@man.play({speed:-1,repeat:true})
					@woman.play({speed:-1,repeat:true})
				when 115 #s
					@man.play({repeat:true})
					@woman.play({repeat:true})
				when 122 #z
					@man.play({speed:@man.getSpeed() * 0.5,repeat:true})
					@woman.play({speed:@woman.getSpeed() * 0.5,repeat:true})
				when 120 #x
					@man.play({speed:@man.getSpeed() * 2,repeat:true})
					@woman.play({speed:@woman.getSpeed() * 2,repeat:true})

		loadData: (path,callback) ->
			request = new XMLHttpRequest()
			request.open('GET', path, true)
			request.onload = =>
				if (request.status >= 200 and request.status < 400)
					data = JSON.parse(request.responseText)
					callback(data)
				else
					console.log "server returned error"
			request.onerror = ->
				console.log "connection error"

			request.send()

	new Example()