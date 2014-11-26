Scene.js
====================================

## What is Scene.js

Scene.js is a JavaScript library for animating image sequences and spritesheets in the browser. It allows you to play, pause, play animations and fire events amoungst other things.

## Getting started

Getting started is relatively easy. You first have to create a scene:

```JavaScript
var scene = new Scene(document.getElementsByTagName("body")[0]);
```

After that you just have to add display objects to your scene.

```JavaScript
scene.add(Scene.SPRITE, "/img/static/table-x411-y250.png", {
	contentWidth: 137,
	contentHeight: 208
});

scene.add(Scene.MOVIE_CLIP, data, {
	contentWidth: 352,
	contentHeight: 373
});
```


## DisplayObject

Scene, Sprite and MovieClip all extend DisplayObject. So all have the following options and methods.


### Options

 Property      | Default       | Description
---------------|---------------|---------------------------------------------
 visible       | true          | Visibility of the element
 opacity       | 1             | Opacity of the element
 buttonMode    | false         | Whether the cursor is a pointer
 name          | null          | Name property used as a reference
 id            | null          | The id property of the element
 index         | 0             | The z-index of the element
 interactive   | false         | Uses PointerEvents property to allow display object to recieve mouse/touch events.
 origin        | {x:0,y:0}     | The origin used for transforms
 x             | 0             | The x position of the element in relation to its parent
 y             | 0             | The y position of the element in relation to its parent
 rotation      | 0             | The rotation transform of the element
 contentWidth  | 100           | The width of the contents visible area
 contentHeight | 100           | The height of the contents visible area
 width         | null          | The width of the element which will scale the content to fit
 height        | null          | The height of the element which will scale the content to fit
 scaleX        | 1             | The scale in the x axis, setting this updates the width
 scaleY        | 1             | The scale in the y axis, setting this updates the height


### Methods

**show()**

Shows the DisplayObject.

returns the instance of the `DisplayObject`

**hide()**

Hides the DisplayObject.

returns the instance of the `DisplayObject`

**globalToLocal(point)**

Converts a global point into a local point.

returns the local `Point` in relation to the `DisplayObject`
> *point* The global `Point` to convert

**localToGlobal(point)**

Converts a local point into a global point.

returns the global `Point` in relation to the `DisplayObject`
> *point* The local `Point` to convert

**destroy()**

Destroys the instance

**transition(duration[,ease,delay])**

Adds a CSS transition to the element

> *duration* The transition duration
> *ease* Defaults to `"linear"`. The easing formula
> *delay* Defaults to `0`. Any delay


### Getters/Setters

Setters with the force property forces a render rather than waiting for the next render cycle.

**setVisible(value)**

**getVisible()**

**setOpacity(value)**

**getOpacity()**

**setButtonMode(value)**

**getButtonMode()**

**setName(value)**

**getName()**

**setId(value)**

**setIndex(value)**

**getIndex()**

**setInteractive(value)**

**getInteractive()**

**setOrigin(value)**

**getOrigin()**

**setX(value[,force])**

**getX()**

**setY(value[,force])**

**getY()**

**setRotation(value[,force])**

**getRotation()**

**setContentWidth(value[,force])**

**getContentWidth()**

**setContentHeight(value[,force])**

**getContentHeight()**

**setWidth(value[,force])**

**getWidth()**

**setHeight(value[,force])**

**getHeight()**

**setScaleX(value[,force])**

**getScaleX()**

**setScaleY(value[,force])**

**getScaleY()**


## Scene

A scene is your complete canvas to add other display objects to.


### Constructor

**new Scene(element[,options])**

> *element* The html element to use as the scene and add child elements to
> *options* Configuration options from DisplayObject or the table below


### Options

 Property      | Default       | Description
---------------|---------------|---------------------------------------------
 fps           | 25            | The frame rate to run animations at


### Methods

**add(displayObject)**

Add an instance of a `DisplayObject` (`Sprite` or `MovieClip`) to the `Scene`

returns the instance of the `DisplayObject` added to the `Scene`
> *displayObject* The `DisplayObject` to add

**add(displayObjectType,data[,options])** 

Shorthand way of creating a `Sprite` or `MovieClip` and adding it to the `Scene`

returns the instance of the `DisplayObject` added to the `Scene`
> *displayObjectType* The type to create and add `Scene.MOVIE_CLIP` or `Scene.SPRITE`
> *data* The image path for a `Sprite` or data object for for a `MovieClip`
> *options* The configuration options to pass to the new `DisplayObject` instance

**remove(child)**

Remove a child `DisplayObject` instance from the scene

> *child* The instance of a `DisplayObject` to remove

**destroy()**

Destroys the scene for garbage collection, destroying all children and removing all elements
	
**pause()**

Pauses the whole `Scene` and all it's children
	
**unpause()**

Unpauses a paused `Scene`


## Sprite

A `Sprite` is a single frame `DisplayObject`


### Constructor

**new Scene.Sprite(image[,options])**
 
> *image* The image path of the image to use for the sprite
> *options* Configuration options from DisplayObject or the table below


### Options

 Property      | Default            | Description
---------------|--------------------|---------------------------------------------
 renderMethod  | "renderBackground" | The method of rendering the display object


## MovieClip

A `MovieClip` is a multi framed `DisplayIbject`


### Constructor

**new Scene.MovieClip(data[,options])**
 
> *data* The animation frame data, see the Frame Data section for more information
> *options* Configuration options from DisplayObject or the table below


### Options

 Property      | Default            | Description
---------------|--------------------|---------------------------------------------
 renderMethod  | "renderBackground" | The method of rendering the display object


### Methods

**addAnimation(name,min,max)**

Add an animation which is a sequence of frames in the `MovieClip`

returns the current instance of the `MovieClip`
> *name* An identifier, if animation already exists with this name it will be replaced
> *min* The frame on which to start
> *max* The last frame to play

**removeAnimation(name)**

Remove an animation

returns the current instance of the `MovieClip`
> *name* The identifier of the animation you wish to remove

**updatePlayOptions(options)**

Update the play options of this `MovieClip`

returns the current instance of the `MovieClip`
> *options* The play options you wish to set

**then(func)**

Add a function to be triggered when the current sequence has finished

returns the current instance of the `MovieClip`
> *func* The function to call

**clearQueue()**

Clears the queue of functions added by using `then(func)`

**addDelay(frames)**

Pauses playback of the `MovieClip` for a number of frames

returns the current instance of the `MovieClip`
> *frames* The number of frames to pause playback for

**clearDelay()**

Clears any currently active delay

returns the current instance of the `MovieClip`

**play([options])**

Plays the `MovieClip`

returns the current instance of the `MovieClip`
> *options* The play options to use

**stop()**

Stops the `MovieClip` if it is playing

**nextFrame()**

Jumps to the next frame, if the playhead is on the last frame it will jump to the first

returns the current instance of the `MovieClip`

**previousFrame()**

Jumps to the previous frame, if the playhead is on on the first frame it will jump to the last

returns the current instance of the `MovieClip`

**gotoAndPlay(frame[,options])**

Goes to a specified frame of the `MovieClip` and starts playing

returns the current instance of the `MovieClip`
> *frame* The frame to go to, it can be either a `string` for a cuepoint or animation or an `integer`
> *options* The play options to use

**gotoAndStop(frame)**

Goes to a specified frame of the `MovieClip` and stops

returns the current instance of the `MovieClip`
> *frame* The frame to go to, it can be either a `string` for a cue point or animation or an `integer`

**addCuePoint(name,frame)**

Adds a cue point to reference

returns the current instance of the `MovieClip`
> *name* The name to use for the cue point
> *frame* The frame number to add the cue point

**stopRepeating()**

If playback has been set to repeat, it stops at the end of the current loop
returns the current instance of the `MovieClip`


### Play Options

 Property      | Default            | Description
---------------|--------------------|---------------------------------------------
 repeat        | false              | Whether to repeat the playback
 speed         | 1                  | The playback speed, how many frames to move on each tick
 delay         | 0                  | A delay in frames to wait before playback commences
 max           | total frames - 1   | The last frame to play
 min           | 0                  | The first frame to play
 animation     | null               | Overrides min and max with animation presets


### Playback data

Scene.js currently supports two different data types, Zoe exported data and basic.

#### Zoe

``` JSON
{
	"framerate":24,
	"images":["img/animated/man/man_0.png", "img/animated/man/man_1.png", "img/animated/man/man_2.png"],
	"frames":[
		[247, 312, 247, 312, 1, -1, -57],
		[207, 1290, 247, 312, 0, -1, -57],
		...
	],
	"animations":{}
}
```

#### Basic

``` JSON
{
	"images":[
		"img/animated/woman/woman-x244-y69-frame0.png",
		"img/animated/woman/woman-x244-y69-frame1.png",
		...
	]
}
```
