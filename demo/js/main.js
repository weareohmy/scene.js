(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Demo, Scene,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Scene = require('../js/scene');

Demo = (function() {
  Demo.prototype.woman = null;

  Demo.prototype.man = null;

  Demo.prototype.scene = null;

  function Demo() {
    this.onKeyPress = __bind(this.onKeyPress, this);
    this.womanDataLoaded = __bind(this.womanDataLoaded, this);
    this.manDataLoaded = __bind(this.manDataLoaded, this);
    console.log("DEMO");
    this.scene = new Scene(document.getElementsByTagName("body")[0], {
      fps: 25
    });
    this.scene.add(Scene.SPRITE, "/img/static/table-x411-y250.png", {
      renderMethod: Scene.RENDER_BACKGROUND,
      contentWidth: 137,
      contentHeight: 208,
      x: 411,
      y: 250,
      index: 3
    });
    this.loadData('/img/animated/man/man.json', this.manDataLoaded);
    this.loadData('/img/animated/woman/woman.json', this.womanDataLoaded);
  }

  Demo.prototype.manDataLoaded = function(data) {
    console.log("DEMO: manDataLoaded");
    this.man = this.scene.add(Scene.MOVIE_CLIP, data, {
      renderMethod: Scene.RENDER_BACKGROUND,
      contentWidth: 352,
      contentHeight: 373,
      x: 435,
      y: 69,
      index: 2
    });
    console.log(this.man);
    if (this.woman != null) {
      return this.start();
    }
  };

  Demo.prototype.womanDataLoaded = function(data) {
    console.log("DEMO: womanDataLoaded");
    this.woman = new Scene.MovieClip(data, {
      renderMethod: Scene.RENDER_IMAGE,
      contentWidth: 302,
      contentHeight: 375,
      x: 244,
      y: 69,
      index: 1
    });
    this.scene.add(this.woman);
    console.log(this.woman);
    if (this.man != null) {
      return this.start();
    }
  };

  Demo.prototype.start = function() {
    console.log("DEMO: start");
    this.man.play({
      repeat: true
    });
    this.woman.play({
      repeat: true
    });
    return document.addEventListener("keypress", this.onKeyPress, false);
  };

  Demo.prototype.onKeyPress = function(event) {
    var keyCode;
    console.log("onKeyPress", event.keyCode);
    keyCode = event.keyCode;
    switch (keyCode) {
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        this.man.gotoAndPlay((keyCode - 49) * 10, {
          speed: this.man.getSpeed(),
          repeat: true
        });
        return this.woman.gotoAndPlay((keyCode - 49) * 10, {
          speed: this.woman.getSpeed(),
          repeat: true
        });
      case 32:
        if (this.man.getPlaying()) {
          this.man.stop();
        } else {
          this.man.play({
            speed: this.man.getSpeed(),
            repeat: true
          });
        }
        if (this.woman.getPlaying()) {
          return this.woman.stop();
        } else {
          return this.woman.play({
            speed: this.woman.getSpeed(),
            repeat: true
          });
        }
        break;
      case 97:
        this.man.play({
          speed: -1,
          repeat: true
        });
        return this.woman.play({
          speed: -1,
          repeat: true
        });
      case 115:
        this.man.play({
          repeat: true
        });
        return this.woman.play({
          repeat: true
        });
      case 122:
        this.man.play({
          speed: this.man.getSpeed() * 0.5,
          repeat: true
        });
        return this.woman.play({
          speed: this.woman.getSpeed() * 0.5,
          repeat: true
        });
      case 120:
        this.man.play({
          speed: this.man.getSpeed() * 2,
          repeat: true
        });
        return this.woman.play({
          speed: this.woman.getSpeed() * 2,
          repeat: true
        });
    }
  };

  Demo.prototype.loadData = function(path, callback) {
    var request;
    request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.onload = (function(_this) {
      return function() {
        var data;
        if (request.status >= 200 && request.status < 400) {
          data = JSON.parse(request.responseText);
          return callback(data);
        } else {
          return console.log("server returned error");
        }
      };
    })(this);
    request.onerror = function() {
      return console.log("connection error");
    };
    return request.send();
  };

  return Demo;

})();

new Demo();



},{"../js/scene":2}],2:[function(require,module,exports){
(function (global){
/**
 * scene.js v0.0.1
 * OHMY - Scene.js
 * https://github.com/weareohmy/scene.js
 * Released under the MIT License.
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Scene=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var DisplayObject, MovieClip, Scene, Sprite,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DisplayObject = _dereq_('./display/DisplayObject');

MovieClip = _dereq_('./display/MovieClip');

Sprite = _dereq_('./display/Sprite');

module.exports = Scene = (function(_super) {
  __extends(Scene, _super);

  Scene.ENTER_FRAME = "Scene/ENTER_FRAME";

  Scene.EXIT_FRAME = "Scene/EXIT_FRAME";

  Scene.RENDER = "Scene/RENDER";

  Scene.DISPLAY_OBJECT = "DisplayObject";

  Scene.MOVIE_CLIP = "MovieClip";

  Scene.SPRITE = "Sprite";

  Scene.RENDER_BACKGROUND = "renderBackground";

  Scene.RENDER_IMAGE = "renderImage";

  Scene.MovieClip = MovieClip;

  Scene.Sprite = Sprite;

  Scene.displayObject = DisplayObject;

  Scene.INIT_DEFAULTS = {
    fps: 25
  };

  Scene.prototype._fps = null;

  Scene.prototype._time = null;

  Scene.prototype._parent = null;

  Scene.prototype._previousFrameTime = null;

  Scene.prototype._children = [];

  Scene.prototype._paused = false;

  Scene.prototype._lastUpdateTime = 0;

  Scene.prototype._timeout = null;

  Scene.prototype._animationFrame = null;

  function Scene(parent, options) {
    if (parent == null) {
      parent = document.getElementsByTagName("body")[0];
    }
    if (options == null) {
      options = null;
    }
    this.update = __bind(this.update, this);
    this.render = __bind(this.render, this);
    Scene.__super__.constructor.call(this);
    this.element.className += " scene";
    parent.appendChild(this.element);
    this._children = [];
    this._initOptions(options);
    this.update();
    this.render();
  }


  /*
  		The render tick
   */

  Scene.prototype.render = function(time) {
    var i;
    if (!this._paused) {
      this.dispatch(Scene.RENDER);
      Scene.__super__.render.call(this);
      i = 0;
      while (i < this._children.length) {
        this._children[i].render();
        i++;
      }
      return this._animationFrame = window.requestAnimationFrame(this.render);
    } else {
      return this._animationFrame = null;
    }
  };


  /*
  		The animation frame tick
   */

  Scene.prototype.update = function() {
    var i;
    if (!this._paused) {
      this.dispatch(Scene.ENTER_FRAME);
      i = 0;
      while (i < this._children.length) {
        this._children[i].update();
        i++;
      }
      this.dispatch(Scene.EXIT_FRAME);
      return this.timeout = setTimeout(this.update, this._time);
    } else {
      return this.timeout = null;
    }
  };


  /*
  		Add a MovieClip to the stage
   */

  Scene.prototype.add = function(value, data, options) {
    var child, i;
    console.log("value", value);
    if (value != null) {
      if (this._isString(value)) {
        if (value === Scene.MOVIE_CLIP && (data != null)) {
          child = new MovieClip(data, options);
        } else if (value === Scene.SPRITE && (data != null)) {
          child = new Sprite(data, options);
        } else {
          return null;
        }
      } else if (value instanceof MovieClip || value instanceof Sprite) {
        child = value;
      } else {
        return null;
      }
      i = 0;
      while (i < this._children.length) {
        if (this._children[i] === child) {
          return child;
        }
        i++;
      }
      this._children.push(child);
      this.element.appendChild(child.element);
      return child;
    }
    return null;
  };


  /*
  		Remove a MovieClip from the stage
   */

  Scene.prototype.remove = function(child) {
    var i;
    if (child != null) {
      this.element.removeChild(child.element);
      i = 0;
      while (i < this._children.length) {
        if (this._children[i] === child) {
          this._children.splice(i, 1);
          return;
        }
        i++;
      }
    }
  };


  /*
  		Destroys the stage
   */

  Scene.prototype.destroy = function() {
    var child;
    window.cancelAnimationFrame(this._animationFrame);
    clearTimeout(this._timeout);
    while (this._children.length) {
      child = this._children[0];
      this.removeChild(child);
      child.destroy();
    }
    this._parent.removeChild(this.element);
    this._children = [];
    return Scene.__super__.destroy.call(this);
  };


  /*
  		Pauses updating and rendering
   */

  Scene.prototype.pause = function() {
    if (!this._paused) {
      window.cancelAnimationFrame(this._animationFrame);
      this._animationFrame = null;
      clearTimeout(this._timeout);
      this._timeout = null;
      return this._paused = true;
    }
  };


  /*
  		Unpauses updating and rendering
   */

  Scene.prototype.unpause = function() {
    if (this._paused) {
      this._paused = false;
      this._previousFrameTime = null;
      if (this._timeout == null) {
        this.update();
      }
      if (this._animationFrame == null) {
        return this.render();
      }
    }
  };

  Scene.prototype.setFps = function(value) {
    if (value === this._fps) {
      return;
    }
    this._fps = value;
    return this._time = 1000 / value;
  };

  Scene.prototype.getFps = function(value) {
    return this._fps;
  };

  Scene.prototype._initOptions = function(options) {
    Scene.__super__._initOptions.call(this, options);
    return this._setOptions(options, Scene.INIT_DEFAULTS);
  };


  /*
  		Check if value is string
   */

  Scene.prototype._isString = function(value) {
    return {}.toString.call(value) === '[object String]';
  };

  return Scene;

})(DisplayObject);



},{"./display/DisplayObject":2,"./display/MovieClip":3,"./display/Sprite":4}],2:[function(_dereq_,module,exports){
var DisplayObject, EventDispatcher, Point, Vendor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EventDispatcher = _dereq_('../event/EventDispatcher');

Point = _dereq_('../geom/Point');

Vendor = _dereq_('../util/Vendor');

module.exports = DisplayObject = (function(_super) {
  __extends(DisplayObject, _super);

  DisplayObject.uidCounter = 0;

  DisplayObject.READY = "DisplayObject/READY";

  DisplayObject.INIT_DEFAULTS = {
    contentWidth: 100,
    contentHeight: 100,
    x: 0,
    y: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    width: null,
    height: null,
    index: 0,
    visible: true,
    buttonMode: false,
    interactive: false,
    origin: {
      x: 0,
      y: 0
    },
    opacity: 1
  };

  DisplayObject.prototype.element = null;

  DisplayObject.prototype._width = null;

  DisplayObject.prototype._height = null;

  DisplayObject.prototype._x = null;

  DisplayObject.prototype._y = null;

  DisplayObject.prototype._rotation = null;

  DisplayObject.prototype._scaleX = null;

  DisplayObject.prototype._scaleY = null;

  DisplayObject.prototype._index = null;

  DisplayObject.prototype._visible = null;

  DisplayObject.prototype._buttonMode = null;

  DisplayObject.prototype._interactive = null;

  DisplayObject.prototype._origin = {};

  DisplayObject.prototype._opacity = null;

  DisplayObject.prototype._id = null;

  DisplayObject.prototype._name = null;

  DisplayObject.prototype._visibility = null;

  DisplayObject.prototype._uid = null;

  DisplayObject.prototype._dirtyExternals = false;

  DisplayObject.prototype._dirtyInternals = false;

  function DisplayObject(options) {
    if (options == null) {
      options = null;
    }
    DisplayObject.__super__.constructor.call(this);
    console.log("DisplayObject", this);
    this.element = document.createElement("div");
    this.element.className = "display-object";
    this.element.style.position = "absolute";
    this.element.style[Vendor.pre("transformOrigin")] = Vendor.origin(0, 0);
    this.uid = DisplayObject.uidCounter.toString();
    DisplayObject.uidCounter++;
    this.element.setAttribute('data-uid', this.uid);
    this._initOptions(options);
  }


  /*
  		Show
   */

  DisplayObject.prototype.show = function() {
    this.setVisible(true);
    return this;
  };


  /*
  		Hide
   */

  DisplayObject.prototype.hide = function() {
    this.setVisible(false);
    return this;
  };


  /*
  		Update this display object
   */

  DisplayObject.prototype.update = function() {};


  /*
  		Converts global coordinates to local ones
   */

  DisplayObject.prototype.globalToLocal = function(point) {
    var x, y;
    x = (point.x - this._x) / this._scaleX;
    y = (point.y - this._y) / this._scaleY;
    return new Point(x, y);
  };


  /*
  		Converts local coordinates to global ones
   */

  DisplayObject.prototype.localToGlobal = function(point) {
    var x, y;
    x = (point.x * this._scaleX) + this._x;
    y = (point.y * this._scaleY) + this._y;
    return new Point(x, y);
  };


  /*
  		Destroys the object
   */

  DisplayObject.prototype.destroy = function() {
    this.element = null;
    return DisplayObject.__super__.destroy.call(this);
  };

  DisplayObject.prototype.transition = function(duration, ease, delay) {
    if (ease == null) {
      ease = "linear";
    }
    if (delay == null) {
      delay = 0;
    }
    if ((duration != null) && duration > 0) {
      return this.element.style[Vendor.pre("transition")] = Vendor.css("transform") + " " + duration + "s " + ease + " " + delay + "s";
    } else {
      return this.element.style[Vendor.pre("transition")] = "none";
    }
  };

  DisplayObject.prototype.setVisible = function(value) {
    if (value === this._visible) {
      return;
    }
    this._visible = value;
    this._visibility = value ? "visible" : "hidden";
    return this._dirtyExternals = true;
  };

  DisplayObject.prototype.getVisible = function() {
    return this._visible;
  };

  DisplayObject.prototype.setOpacity = function(value) {
    if (value === this._opacity) {
      return;
    }
    this._opacity = value;
    return this._dirtyExternals = true;
  };

  DisplayObject.prototype.getOpacity = function() {
    return this._opacity;
  };

  DisplayObject.prototype.setButtonMode = function(value) {
    if (value === this._buttonMode) {
      return;
    }
    this._buttonMode = value;
    return this.element.style.cursor = value ? "pointer" : "default";
  };

  DisplayObject.prototype.getButtonMode = function() {
    return this._buttonMode;
  };

  DisplayObject.prototype.setName = function(value) {
    if (value === this._name) {
      return;
    }
    return this.name = value;
  };

  DisplayObject.prototype.getName = function() {
    return this._name;
  };

  DisplayObject.prototype.setId = function(value) {
    if (value === this._id) {
      return;
    }
    this._id = value;
    return this.element.id = value;
  };

  DisplayObject.prototype.getId = function() {
    return this._id;
  };

  DisplayObject.prototype.setIndex = function(value) {
    if (value === this._index) {
      return;
    }
    this._index = value;
    return this.element.style.zIndex = value;
  };

  DisplayObject.prototype.getIndex = function() {
    return this._index;
  };

  DisplayObject.prototype.setInteractive = function(value) {
    if (value === this._interactive) {
      return;
    }
    this._interactive = value;
    return this.element.style.pointerEvents = value ? "auto" : "none";
  };

  DisplayObject.prototype.getInteractive = function() {
    return this._interactive;
  };

  DisplayObject.prototype.setOrigin = function(value) {
    if (this._origin && this._origin.x === value.x && this._origin.y === value.y) {
      return;
    }
    this._origin.x = value.x;
    this._origin.y = value.y;
    return this.element.style[Vendor.pre("transformOrigin")] = Vendor.origin(value.x, value.y);
  };

  DisplayObject.prototype.getOrigin = function() {
    return this._origin;
  };

  DisplayObject.prototype.setX = function(value, force) {
    if (force == null) {
      force = false;
    }
    if (value === this._x) {
      return;
    }
    this._x = value;
    this._dirtyExternals = true;
    if (force) {
      this.render();
    }
    return this;
  };

  DisplayObject.prototype.getX = function() {
    return this._x;
  };

  DisplayObject.prototype.setY = function(value, force) {
    if (force == null) {
      force = false;
    }
    if (value === this._y) {
      return;
    }
    this._y = value;
    this._dirtyExternals = true;
    if (force) {
      this.render();
    }
    return this;
  };

  DisplayObject.prototype.getY = function() {
    return this._y;
  };

  DisplayObject.prototype.setRotation = function(value, force) {
    if (force == null) {
      force = false;
    }
    if (value === this._rotation) {
      return;
    }
    this._rotation = value;
    this._dirtyExternals = true;
    if (force) {
      this.render();
    }
    return this;
  };

  DisplayObject.prototype.getRotation = function() {
    return this;
  };

  DisplayObject.prototype.setContentWidth = function(value, force) {
    if (force == null) {
      force = false;
    }
    if (value === this._contentWidth) {
      return;
    }
    this._contentWidth = value;
    this._scaleX = this._width / this._contentWidth;
    this._dirtyExternals = true;
    if (force) {
      this.render();
    }
    return this;
  };

  DisplayObject.prototype.getContentWidth = function() {
    return this._contentWidth;
  };

  DisplayObject.prototype.setContentHeight = function(value, force) {
    if (force == null) {
      force = false;
    }
    if (value === this._contentHeight) {
      return;
    }
    this._contentHeight = value;
    this._scaleY = this._height / this._contentHeight;
    this._dirtyExternals = true;
    if (force) {
      this.render();
    }
    return this;
  };

  DisplayObject.prototype.getContentHeight = function() {
    return this._contentHeight;
  };

  DisplayObject.prototype.setWidth = function(value, force) {
    if (force == null) {
      force = false;
    }
    if (value === this._width) {
      return;
    }
    this._width = value;
    this._scaleX = this._width / this._contentWidth;
    this._dirtyExternals = true;
    if (force) {
      this.render();
    }
    return this;
  };

  DisplayObject.prototype.getWidth = function() {
    return this._width;
  };

  DisplayObject.prototype.setHeight = function(value, force) {
    if (force == null) {
      force = false;
    }
    if (value === this._height) {
      return;
    }
    this._height = value;
    this._scaleY = this._height / this._contentHeight;
    this._dirtyExternals = true;
    if (force) {
      this.render();
    }
    return this;
  };

  DisplayObject.prototype.getHeight = function() {
    return this._height;
  };

  DisplayObject.prototype.setScaleX = function(value, force) {
    if (force == null) {
      force = false;
    }
    if (value === this._scaleX) {
      return;
    }
    this._scaleX = value;
    this._width = this._contentWidth * this._scaleX;
    this._dirtyExternals = true;
    if (force) {
      this.render();
    }
    return this;
  };

  DisplayObject.prototype.getScaleX = function() {
    return this._scaleX;
  };

  DisplayObject.prototype.setScaleY = function(value, force) {
    if (force == null) {
      force = false;
    }
    if (value === this._scaleY) {
      return;
    }
    this._scaleY = value;
    this._height = this._contentHeight * this._scaleY;
    this._dirtyExternals = true;
    if (force) {
      this.render();
    }
    return this;
  };

  DisplayObject.prototype.getScaleY = function() {
    return this._scaleY;
  };

  DisplayObject.prototype._initOptions = function(options) {
    return this._setOptions(options, DisplayObject.INIT_DEFAULTS);
  };

  DisplayObject.prototype._setOptions = function(options, defaults) {
    var fn, property, _results;
    _results = [];
    for (property in defaults) {
      fn = "set" + property.charAt(0).toUpperCase() + property.slice(1);
      if (this[fn] != null) {
        if ((options != null ? options[property] : void 0) != null) {
          _results.push(this[fn](options[property]));
        } else if (defaults[property] != null) {
          _results.push(this[fn](defaults[property]));
        } else {
          _results.push(void 0);
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  DisplayObject.prototype._renderInternals = function() {
    return this._dirtyInternals = false;
  };

  DisplayObject.prototype._renderExternals = function() {
    if (this._dirtyExternals) {
      this.element.style.width = this._contentWidth + "px";
      this.element.style.height = this._contentHeight + "px";
      this.element.style.visibility = this._visibility;
      this.element.style.opacity = this._opacity;
      this.element.style[Vendor.pre("transform")] = Vendor.translate(this._x, this._y) + " scale(" + this._scaleX + "," + this._scaleY + ") rotate(" + this._rotation + "deg)";
      return this._dirtyExternals = false;
    }
  };

  DisplayObject.prototype.render = function() {
    this._renderExternals();
    return this._renderInternals();
  };

  return DisplayObject;

})(EventDispatcher);



},{"../event/EventDispatcher":9,"../geom/Point":10,"../util/Vendor":11}],3:[function(_dereq_,module,exports){
var BackgroundRender, BasicLayout, DisplayObject, ImageRender, MovieClip, Vendor, ZoeLayout,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DisplayObject = _dereq_("../display/DisplayObject");

Vendor = _dereq_("../util/Vendor");

BasicLayout = _dereq_("../display/layout/BasicLayout");

ZoeLayout = _dereq_("../display/layout/ZoeLayout");

BackgroundRender = _dereq_("../display/render/BackgroundRender");

ImageRender = _dereq_("../display/render/ImageRender");

module.exports = MovieClip = (function(_super) {
  __extends(MovieClip, _super);

  MovieClip.REPEAT = "MovieClip/REPEAT";

  MovieClip.COMPLETE = "MovieClip/COMPLETE";

  MovieClip.CUE_POINT = "MovieClip/CUE_POINT";

  MovieClip.DATA_TYPES = {
    zoe: "zoe",
    basic: "basic"
  };

  MovieClip.prototype._repeat = null;

  MovieClip.prototype._speed = null;

  MovieClip.prototype._maxFrame = null;

  MovieClip.prototype._minFrame = null;

  MovieClip.prototype._delay = null;

  MovieClip.prototype._totalFrames = 0;

  MovieClip.prototype._playhead = 0;

  MovieClip.prototype._currentFrame = 0;

  MovieClip.prototype._count = 0;

  MovieClip.prototype._playing = false;

  MovieClip.prototype._animations = null;

  MovieClip.prototype._cuePointsByFrame = null;

  MovieClip.prototype._cuePointsByName = null;

  MovieClip.prototype._queue = null;

  MovieClip.prototype._sheets = null;

  MovieClip.prototype._layoutEngine = null;

  MovieClip.prototype._renderEngine = null;

  function MovieClip(data, options) {
    if (options == null) {
      options = null;
    }
    this._next = __bind(this._next, this);
    MovieClip.__super__.constructor.call(this, options);
    this._animations = {};
    this._cuePointsByFrame = {};
    this._cuePointsByName = {};
    this._queue = [];
    this.element.className += " movieClip";
    this.element.style.overflow = "hidden";
    switch (this._getDataType(data)) {
      case MovieClip.DATA_TYPES.zoe:
        this._layoutEngine = new ZoeLayout(data);
        break;
      case MovieClip.DATA_TYPES.basic:
        this._layoutEngine = new BasicLayout(data, this._contentWidth, this._contentHeight);
        break;
      default:
        console.error("Invalid data");
    }
    if ((options != null ? options.renderMethod : void 0) != null) {
      switch (options.renderMethod) {
        case "renderBackground":
          this._renderEngine = new BackgroundRender(this._layoutEngine.images);
          break;
        case "renderImage":
          this._renderEngine = new ImageRender(this._layoutEngine.images);
          break;
        default:
          this._renderEngine = new BackgroundRender(this._layoutEngine.images);
      }
    } else {
      this._renderEngine = new BackgroundRender(this._layoutEngine.images);
    }
    this.element.appendChild(this._renderEngine.element);
    this._totalFrames = this._layoutEngine.totalFrames;
    this._layoutEngine.update(this._currentFrame);
    this._dirtyInternals = true;
  }


  /*
  		Add an animation that can be played
   */

  MovieClip.prototype.addAnimation = function(name, min, max) {
    this._animations[name] = {
      min: min,
      max: max
    };
    return this;
  };


  /*
  		Remove an animation
   */

  MovieClip.prototype.removeAnimation = function(name) {
    this._animations[name] = null;
    return this;
  };

  MovieClip.prototype.destroy = function() {
    this._animations = null;
    this._cuePointsByFrame = null;
    this._cuePointsByName = null;
    this._queue = null;
    return MovieClip.__super__.destroy.call(this);
  };

  MovieClip.prototype.updatePlayOptions = function(options) {
    this._updatePlayOptions(options);
    return this;
  };


  /*
  		Clear all the items in the queue
   */

  MovieClip.prototype.clearQueue = function() {
    this._queue = [];
    return this;
  };


  /*
  		After the current animation add another to the queue
   */

  MovieClip.prototype.then = function(func) {
    this._queue.push(func);
    return this;
  };

  MovieClip.prototype.clearDelay = function() {
    this._delay = 0;
    return this;
  };


  /*
  		Wait for a number of frames
   */

  MovieClip.prototype.addDelay = function(frames) {
    this._delay = frames;
    return this;
  };


  /*
  		Play the animation
  		Options are:
  		- repeat - whether to repeat the movieClip | default: false
  		- direction - the direction 1 for forward -1 for backward | default: 1 (forward)
  		- max - the maximum frame to play to (inclusive) | default: last frame
  		- min - the minimum frame to play to (inclusive) | default: 0 (first frame)
   */

  MovieClip.prototype.play = function(options) {
    this._updatePlayOptions(options);
    this._count = 0;
    this._playing = true;
    return this;
  };


  /*
  		Stop the animation
   */

  MovieClip.prototype.stop = function() {
    this._playing = false;
    return this;
  };


  /*
  		Moves to the next frame and stops
   */

  MovieClip.prototype.nextFrame = function() {
    var frame;
    this._playing = false;
    frame = this._currentFrame + 1;
    this._playhead = frame;
    this._currentFrame = frame;
    this._layoutEngine.update(this._currentFrame);
    this._dirtyInternals = true;
    return this;
  };


  /*
  		Moves to the previous frame and stops
   */

  MovieClip.prototype.previousFrame = function() {
    var frame;
    this._playing = false;
    frame = this._currentFrame - 1;
    this._playhead = frame;
    this._currentFrame = frame;
    this._layoutEngine.update(this._currentFrame);
    this._dirtyInternals = true;
    return this;
  };


  /*
  		Go to a frame and play the animation
   */

  MovieClip.prototype.gotoAndPlay = function(frame, options) {
    frame = this._frame(frame);
    if (frame != null) {
      this._playhead = frame;
      this._currentFrame = frame;
      this._layoutEngine.update(this._currentFrame);
      this._updatePlayOptions(options);
      this._count = 0;
      this._playing = true;
    }
    return this;
  };


  /*
  		Go to and frame and stop on it
   */

  MovieClip.prototype.gotoAndStop = function(frame) {
    frame = this._frame(frame);
    if (frame != null) {
      this._playing = false;
      this._playhead = frame;
      this._currentFrame = frame;
      this._layoutEngine.update(this._currentFrame);
      this._dirtyInternals = true;
    }
    return this;
  };


  /*
  		Update the animation if playing, only to be called from the stage
   */

  MovieClip.prototype.update = function() {
    var name, _i, _len, _ref;
    if (!this._playing) {
      return;
    }
    if (this._delay > 0) {
      return this._delay--;
    }
    this._playhead += this._speed;
    this._currentFrame = Math.floor(this._playhead);
    if (this._cuePointsByFrame[this._currentFrame] != null) {
      _ref = this._cuePointsByFrame[this._currentFrame];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        this.dispatch(MovieClip.CUE_POINT, {
          name: name
        });
      }
    }
    if (this._speed > 0 && this._currentFrame > this._maxFrame) {
      if (this._repeat !== this._count) {
        this._playhead = this._minFrame + this._currentFrame - this._maxFrame - 1;
        this._currentFrame = Math.floor(this._playhead);
        this.dispatch(MovieClip.REPEAT);
        this._count++;
      } else {
        this._playhead = this._maxFrame;
        this._currentFrame = this._maxFrame;
        this.stop();
        if (this._queue.length > 0) {
          this._next();
        } else {
          this.dispatch(MovieClip.COMPLETE);
        }
      }
    } else if (this._speed < 0 && this._currentFrame < this._minFrame) {
      if (this._repeat !== this._count) {
        this._playhead = this._maxFrame + this._currentFrame - this._minFrame + 1;
        this._currentFrame = Math.floor(this._playhead);
        this.dispatch(MovieClip.REPEAT);
        this._count++;
      } else {
        this._playhead = this._minFrame;
        this._currentFrame = this._minFrame;
        this.stop();
        if (this._queue.length > 0) {
          this._next();
        } else {
          this.dispatch(MovieClip.COMPLETE);
        }
      }
    }
    this._layoutEngine.update(this._currentFrame);
    return this._dirtyInternals = true;
  };


  /*
  		Add a cue point
   */

  MovieClip.prototype.addCuePoint = function(name, frame) {
    var _base;
    if ((_base = this._cuePointsByFrame)[frame] == null) {
      _base[frame] = [];
    }
    this._cuePointsByFrame[frame].push(name);
    this._cuePointsByName[name] = frame;
    return this;
  };


  /*
  		Stop any repeating
   */

  MovieClip.prototype.stopRepeating = function() {
    this._count = -1;
    this._repeat = -1;
    return this;
  };

  MovieClip.prototype.getAnimationByName = function(name) {
    return this._animations[name];
  };

  MovieClip.prototype.getCurrentFrame = function() {
    return this._currentFrame;
  };

  MovieClip.prototype.getTotalFrames = function() {
    return this._totalFrames;
  };

  MovieClip.prototype.getPlaying = function() {
    return this._playing;
  };

  MovieClip.prototype.getSpeed = function() {
    return this._speed;
  };

  MovieClip.prototype._getDataType = function(data) {
    if (!this._isString(data) && !this._isNumber(data)) {
      if ((data.frames != null) && (data.images != null) && this._isArray(data.images) && this._isArray(data.frames) && data.images.length > 0 && data.frames.length > 0) {
        if (this._isString(data.images[0]) && this._isArray(data.frames[0]) && data.frames[0].length === 7) {
          return MovieClip.DATA_TYPES.zoe;
        }
      } else if ((data.images != null) && this._isArray(data.images)) {
        if (this._isString(data.images[0])) {
          return MovieClip.DATA_TYPES.basic;
        }
      }
    }
    return null;
  };


  /*
  		Work out which frame to use
   */

  MovieClip.prototype._frame = function(value) {
    if (this._isString(value)) {
      if (this._animations[value] != null) {
        return this._animations[value].min;
      } else if (this._cuePointsByName[value] != null) {
        return this._cuePointsByName[value];
      } else {
        console.warn("No animations or cuepoints with that name");
        return null;
      }
    } else if (!this._isNumber(value)) {
      console.warn("No animations or cuepoints with that name");
      return null;
    }
    return value;
  };


  /*
  		Check if value is string
   */

  MovieClip.prototype._isString = function(value) {
    return {}.toString.call(value) === '[object String]';
  };


  /*
  		Check if value is number
   */

  MovieClip.prototype._isNumber = function(value) {
    return !isNaN(value);
  };


  /*
  		Check if value is array
   */

  MovieClip.prototype._isArray = Array.isArray || function(value) {
    return {}.toString.call(value) === '[object Array]';
  };


  /*
  		Update options
   */

  MovieClip.prototype._updatePlayOptions = function(options) {
    if ((options != null ? options.repeat : void 0) != null) {
      if (options.repeat === true) {
        this._repeat = -1;
      } else if (this._isNumber(options.repeat)) {
        this._repeat = Math.round(options.repeat);
      } else {
        this._repeat = 0;
      }
    } else {
      if ((this._repeat == null) || this._repeat === !-1) {
        this._repeat = 0;
      }
    }
    this._speed = (options != null ? options.speed : void 0) != null ? options.speed : 1;
    this._delay = (options != null ? options.delay : void 0) != null ? options.delay : this._delay;
    this._maxFrame = this._totalFrames - 1;
    this._minFrame = 0;
    if ((options != null ? options.animation : void 0) != null) {
      if (this._animations[options.animation] != null) {
        this._minFrame = this.animations[options.animation].min;
        this._maxFrame = this.animations[options.animation].max;
      } else {
        console.warn("Animation", options.animation, "doesn't exist");
      }
    }
    if ((options != null ? options.max : void 0) != null) {
      this._maxFrame = options.max;
    }
    if ((options != null ? options.min : void 0) != null) {
      return this._minFrame = options.min;
    }
  };


  /*
  		Render any updates
   */

  MovieClip.prototype._renderInternals = function() {
    if (this._dirtyInternals) {
      this._renderEngine.render(this._layoutEngine.current);
      return this._dirtyInternals = false;
    }
  };


  /*
  		Call the next function in the queue
   */

  MovieClip.prototype._next = function() {
    var _ref;
    if (((_ref = this._queue) != null ? _ref.length : void 0) > 0) {
      return this._queue.shift().call(this);
    }
  };

  return MovieClip;

})(DisplayObject);



},{"../display/DisplayObject":2,"../display/layout/BasicLayout":5,"../display/layout/ZoeLayout":6,"../display/render/BackgroundRender":7,"../display/render/ImageRender":8,"../util/Vendor":11}],4:[function(_dereq_,module,exports){
var BackgroundRender, DisplayObject, ImageRender, ImageVO, Sprite, Vendor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Vendor = _dereq_("../util/Vendor");

ImageVO = _dereq_("../vo/ImageVO");

DisplayObject = _dereq_("../display/DisplayObject");

BackgroundRender = _dereq_("../display/render/BackgroundRender");

ImageRender = _dereq_("../display/render/ImageRender");

module.exports = Sprite = (function(_super) {
  __extends(Sprite, _super);

  Sprite.prototype._image = null;

  Sprite.prototype._renderEngine = null;

  function Sprite(image, options) {
    Sprite.__super__.constructor.call(this, options);
    this._image = new ImageVO(image, 0, 0, this._contentWidth, this._contentHeight);
    this.element.className += " sprite";
    this.element.style.overflow = "hidden";
    if ((options != null ? options.renderMethod : void 0) != null) {
      switch (options.renderMethod) {
        case "renderBackground":
          this._renderEngine = new BackgroundRender([this._image]);
          break;
        case "renderImage":
          this._renderEngine = new ImageRender([this._image]);
          break;
        default:
          this._renderEngine = new BackgroundRender([this._image]);
      }
    } else {
      this._renderEngine = new BackgroundRender([this._image]);
    }
    this.element.appendChild(this._renderEngine.element);
    this._dirtyInternals = true;
  }

  Sprite.prototype.destroy = function() {
    this._image = null;
    return Sprite.__super__.destroy.call(this);
  };


  /*
  		Renders updates
   */

  Sprite.prototype._renderInternals = function() {
    if (this._dirtyInternals) {
      this._renderEngine.render(this._image);
      return this._dirtyInternals = false;
    }
  };

  return Sprite;

})(DisplayObject);



},{"../display/DisplayObject":2,"../display/render/BackgroundRender":7,"../display/render/ImageRender":8,"../util/Vendor":11,"../vo/ImageVO":12}],5:[function(_dereq_,module,exports){
var BasicLayout, ImageVO;

ImageVO = _dereq_('../../vo/ImageVO');

module.exports = BasicLayout = (function() {
  BasicLayout.prototype.images = null;

  BasicLayout.prototype.totalFrames = null;

  function BasicLayout(_data, width, height) {
    var i;
    this._data = _data;
    this.images = [];
    i = 0;
    while (i < this._data.images.length) {
      this.images.push(new ImageVO(this._data.images[i], 0, 0, width, height));
      i++;
    }
    this.totalFrames = this._data.images.length;
    this.update(0);
  }

  BasicLayout.prototype.destroy = function() {
    BasicLayout.__super__.destroy.call(this);
    return this._images = null;
  };


  /*
  		Calculates which image to display and at what position
   */

  BasicLayout.prototype.update = function(frame) {
    return this.current = this.images[frame];
  };

  return BasicLayout;

})();



},{"../../vo/ImageVO":12}],6:[function(_dereq_,module,exports){
var ImageVO, ZoeLayout;

ImageVO = _dereq_('../../vo/ImageVO');

module.exports = ZoeLayout = (function() {
  ZoeLayout.prototype.images = null;

  ZoeLayout.prototype.totalFrames = null;

  ZoeLayout.prototype._currentSheetNumber = null;

  function ZoeLayout(_data) {
    var i;
    this._data = _data;
    this.images = [];
    i = 0;
    while (i < this._data.images.length) {
      this.images.push(new ImageVO(this._data.images[i]));
      i++;
    }
    this.totalFrames = this._data.frames.length;
    this.update(0);
  }

  ZoeLayout.prototype.destroy = function() {
    ZoeLayout.__super__.destroy.call(this);
    return this._images = null;
  };


  /*
  		Calculates which image to display and at what position
   */

  ZoeLayout.prototype.update = function(frame) {
    var currentSheet, frameData, sheetNumber;
    frameData = this._data.frames[frame];
    if (frameData != null) {
      sheetNumber = frameData[4];
      this._currentSheetNumber = sheetNumber;
      currentSheet = this.images[this._currentSheetNumber];
      currentSheet.x = -frameData[0];
      currentSheet.y = -frameData[1];
      currentSheet.offsetX = frameData[5];
      currentSheet.offsetY = frameData[6];
      currentSheet.width = frameData[2];
      currentSheet.height = frameData[3];
      return this.current = currentSheet;
    } else {
      return console.warn("Data doesn't exist for frame", frame);
    }
  };

  return ZoeLayout;

})();



},{"../../vo/ImageVO":12}],7:[function(_dereq_,module,exports){
var BackgroundRender, Vendor;

Vendor = _dereq_('../../util/Vendor');

module.exports = BackgroundRender = (function() {
  function BackgroundRender(_images) {
    var img;
    this._images = _images;
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.overflow = "hidden";
    this.element.style.backgroundRepeat = "no-repeat";
    this.element.style.backgroundImage = ((function() {
      var _i, _len, _ref, _results;
      _ref = this._images;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        img = _ref[_i];
        _results.push("url('" + img.url + "')");
      }
      return _results;
    }).call(this)).join(", ");
    this.element.style.backgroundPosition = ((function() {
      var _i, _len, _ref, _results;
      _ref = this._images;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        img = _ref[_i];
        _results.push("0px 2048px");
      }
      return _results;
    }).call(this)).join(", ");
  }

  BackgroundRender.prototype.render = function(current) {
    var img, positions, _i, _len, _ref;
    positions = [];
    _ref = this._images;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      img = _ref[_i];
      if (img === current) {
        positions.push(img.positionToString());
      } else {
        positions.push("0px 2048px");
      }
    }
    this.element.style.backgroundPosition = positions.join(", ");
    this.element.style.width = current.width + "px";
    this.element.style.height = current.height + "px";
    return this.element.style[Vendor.pre("transform")] = Vendor.translate(-current.offsetX, -current.offsetY);
  };

  return BackgroundRender;

})();



},{"../../util/Vendor":11}],8:[function(_dereq_,module,exports){
var ImageRender, Vendor;

Vendor = _dereq_('../../util/Vendor');

module.exports = ImageRender = (function() {
  function ImageRender(_images) {
    this._images = _images;
    this.element = document.createElement("img");
    this.element.style.position = "absolute";
    this.element.style.left = 0;
    this.element.style.top = 0;
  }

  ImageRender.prototype.render = function(current) {
    this.element.src = current.url;
    return this.element.style[Vendor.pre("transform")] = Vendor.translate(current.x - current.offsetX, current.y - current.offsetY);
  };

  return ImageRender;

})();



},{"../../util/Vendor":11}],9:[function(_dereq_,module,exports){
var EventDispatcher;

module.exports = EventDispatcher = (function() {
  function EventDispatcher() {}

  EventDispatcher.prototype.destroy = function() {
    return this._events = null;
  };

  EventDispatcher.prototype.on = function(type, listener, scope) {
    var i;
    if (this._events == null) {
      this._events = {};
    }
    if (this._events[type] == null) {
      this._events[type] = [];
    }
    i = 0;
    while (i < this._events[type].length) {
      if (this._events[type][i].listener === listener) {
        return this;
      }
      i++;
    }
    this._events[type].push({
      listener: listener,
      scope: scope
    });
    return this;
  };

  EventDispatcher.prototype.off = function(type, listener) {
    var event, i, _i, _len, _ref;
    if (type == null) {
      type = null;
    }
    if (listener == null) {
      listener = null;
    }
    if (this._events == null) {
      return this;
    }
    if (type == null) {
      this._events = {};
      return this;
    }
    if ((this._events[type] != null) && (listener == null)) {
      this._events[type] = [];
      return this;
    }
    if (this._events[type] != null) {
      _ref = this._events[type];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        event = _ref[i];
        if ((event != null) && event.listener === listener) {
          this._events[type].splice(i, 1);
        }
      }
    }
    return this;
  };

  EventDispatcher.prototype.dispatch = function(type, obj) {
    var event, _i, _len, _ref, _results;
    if ((this._events != null) && (this._events[type] != null)) {
      if (obj == null) {
        obj = {};
      }
      obj.target = this;
      _ref = this._events[type];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        if (event.scope == null) {
          event.scope = this;
        }
        _results.push(event.listener.call(event.scope, obj));
      }
      return _results;
    }
  };

  return EventDispatcher;

})();



},{}],10:[function(_dereq_,module,exports){
var Point;

module.exports = Point = (function() {
  Point.createFromAngle = function(angle, length) {
    var x, y;
    x = Math.sin(angle) * length;
    y = Math.cos(angle) * length;
    return new Point(x, y);
  };

  function Point(x, y) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    this.x = x;
    this.y = y;
  }

  Point.prototype.toString = function() {
    return this.x + " " + this.y;
  };

  Point.prototype.equals = function(p) {
    return this.x === p.x && this.y === p.y;
  };

  Point.prototype.clone = function() {
    return new Point(this.x, this.y);
  };

  Point.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
    return this;
  };

  Point.prototype.reset = function() {
    return this.set(0, 0);
  };

  Point.prototype.round = function() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  };

  Point.prototype.overwrite = function(p) {
    this.x = p.x;
    this.y = p.y;
    return this;
  };

  Point.prototype.add = function(p) {
    this.x += p.x;
    this.y += p.y;
    return this;
  };

  Point.prototype.subtract = function(p) {
    this.x -= p.x;
    this.y -= p.y;
    return this;
  };

  Point.prototype.multiply = function(s) {
    this.x *= s;
    this.y *= s;
    return this;
  };

  Point.prototype.divide = function(s) {
    this.x /= s;
    this.y /= s;
    return this;
  };

  Point.prototype.normalize = function() {
    var length;
    length = this.getLength();
    if (length !== 0) {
      this.x /= length;
      this.y /= length;
    }
    return this;
  };

  Point.prototype.dot = function(p) {
    return this.x * p.x + this.y * p.y;
  };

  Point.prototype.invert = function() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  };

  Point.prototype.getLength = function() {
    return Math.sqrt(this.dot(this));
  };

  Point.prototype.getLengthNoSquareRoot = function() {
    return this.dot(this);
  };

  Point.prototype.setLength = function(newLength) {
    var length;
    length = this.getLength();
    if (length !== 0) {
      this.x = (this.x / length) * newLength;
      this.y = (this.y / length) * newLength;
    }
    return this;
  };

  Point.prototype.getAngle = function() {
    return Math.atan2(this.x, this.y);
  };

  Point.prototype.setAngle = function(angle, length) {
    length = length || this.getLength();
    this.x = Math.sin(angle) * length;
    this.y = Math.cos(angle) * length;
    return this;
  };

  return Point;

})();



},{}],11:[function(_dereq_,module,exports){
var Vendor;

module.exports = Vendor = (function() {
  function Vendor() {}

  Vendor.support3D = null;

  Vendor.prefix = function() {
    var prop, regex, someScript;
    if ("result" in arguments.callee) {
      return arguments.callee.result;
    }
    regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;
    someScript = document.getElementsByTagName("script")[0];
    for (prop in someScript.style) {
      if (regex.test(prop)) {
        return arguments.callee.result = "" + (prop.match(regex)[0]);
      }
    }
    if ("WebkitOpacity" in someScript.style) {
      return arguments.callee.result = "webkit".toLowerCase();
    }
    if ("KhtmlOpacity" in someScript.style) {
      return arguments.callee.result = "khtml".toLowerCase();
    }
    return arguments.callee.result = "";
  };

  Vendor.pre = function(value) {
    var str;
    str = Vendor.prefix();
    if (str.length > 0) {
      return str + value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  };

  Vendor.css = function(value) {
    var str;
    str = Vendor.prefix();
    if (str.length > 0) {
      return "-" + str + "-" + value;
    }
    return value;
  };

  Vendor.origin = function(x, y) {
    if (!isNaN(x)) {
      x += "px";
    }
    if (!isNaN(y)) {
      y += "px";
    }
    if (Vendor.support3D == null) {
      Vendor.check3D();
    }
    if (Vendor.support3D) {
      return "" + x + " " + y + " 0";
    } else {
      return "" + x + " " + y;
    }
  };

  Vendor.translate = function(x, y) {
    if (Vendor.support3D == null) {
      Vendor.check3D();
    }
    if (Vendor.support3D) {
      return "translate3d(" + x + "px, " + y + "px, 0)";
    } else {
      return "translate(" + x + "px, " + y + "px)";
    }
  };

  Vendor.check3D = function() {
    var asSupport, rxTranslate, temp;
    temp = document.createElement("div");
    temp.style[Vendor.pre("transform")] = "translate3d(0px, 0px, 0px)";
    rxTranslate = /translate3d\(0px, 0px, 0px\)/g;
    asSupport = temp.style.cssText.match(rxTranslate);
    return Vendor.support3D = asSupport !== null && asSupport.length === 1;
  };

  return Vendor;

})();



},{}],12:[function(_dereq_,module,exports){
var SheetVO;

module.exports = SheetVO = (function() {
  function SheetVO(url, x, y, width, height, offsetX, offsetY) {
    this.url = url;
    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
    this.width = width != null ? width : 0;
    this.height = height != null ? height : 0;
    this.offsetX = offsetX != null ? offsetX : 0;
    this.offsetY = offsetY != null ? offsetY : 0;
  }

  SheetVO.prototype.urlToString = function() {
    return "url(" + this.url + ")";
  };

  SheetVO.prototype.positionToString = function() {
    return "" + this.x + "px " + this.y + "px";
  };

  return SheetVO;

})();



},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
