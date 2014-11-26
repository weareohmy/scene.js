/**
 * scene.js v0.0.1
 * OHMY - Scene.js
 * https://github.com/weareohmy/scene.js
 * Released under the MIT License.
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.Scene=t()}}(function(){return function t(e,i,n){function r(o,h){if(!i[o]){if(!e[o]){var u="function"==typeof require&&require;if(!h&&u)return u(o,!0);if(s)return s(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var a=i[o]={exports:{}};e[o][0].call(a.exports,function(t){var i=e[o][1][t];return r(i?i:t)},a,a.exports,t,e,i,n)}return i[o].exports}for(var s="function"==typeof require&&require,o=0;o<n.length;o++)r(n[o]);return r}({1:[function(t,e){var i,n,r,s,o=function(t,e){return function(){return t.apply(e,arguments)}},h={}.hasOwnProperty,u=function(t,e){function i(){this.constructor=t}for(var n in e)h.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t};i=t("./display/DisplayObject"),n=t("./display/MovieClip"),s=t("./display/Sprite"),e.exports=r=function(t){function e(t,i){null==t&&(t=document.getElementsByTagName("body")[0]),null==i&&(i=null),this.update=o(this.update,this),this.render=o(this.render,this),e.__super__.constructor.call(this),this.element.className+=" scene",t.appendChild(this.element),this._children=[],this._initOptions(i),this.update(),this.render()}return u(e,t),e.ENTER_FRAME="Scene/ENTER_FRAME",e.EXIT_FRAME="Scene/EXIT_FRAME",e.RENDER="Scene/RENDER",e.DISPLAY_OBJECT="DisplayObject",e.MOVIE_CLIP="MovieClip",e.SPRITE="Sprite",e.RENDER_BACKGROUND="renderBackground",e.RENDER_IMAGE="renderImage",e.MovieClip=n,e.Sprite=s,e.displayObject=i,e.INIT_DEFAULTS={fps:25},e.prototype._fps=null,e.prototype._time=null,e.prototype._parent=null,e.prototype._previousFrameTime=null,e.prototype._children=[],e.prototype._paused=!1,e.prototype._lastUpdateTime=0,e.prototype._timeout=null,e.prototype._animationFrame=null,e.prototype.render=function(){var t;if(this._paused)return this._animationFrame=null;for(this.dispatch(e.RENDER),e.__super__.render.call(this),t=0;t<this._children.length;)this._children[t].render(),t++;return this._animationFrame=window.requestAnimationFrame(this.render)},e.prototype.update=function(){var t;if(this._paused)return this.timeout=null;for(this.dispatch(e.ENTER_FRAME),t=0;t<this._children.length;)this._children[t].update(),t++;return this.dispatch(e.EXIT_FRAME),this.timeout=setTimeout(this.update,this._time)},e.prototype.add=function(t,i,r){var o,h;if(console.log("value",t),null!=t){if(this._isString(t))if(t===e.MOVIE_CLIP&&null!=i)o=new n(i,r);else{if(t!==e.SPRITE||null==i)return null;o=new s(i,r)}else{if(!(t instanceof n||t instanceof s))return null;o=t}for(h=0;h<this._children.length;){if(this._children[h]===o)return o;h++}return this._children.push(o),this.element.appendChild(o.element),o}return null},e.prototype.remove=function(t){var e;if(null!=t)for(this.element.removeChild(t.element),e=0;e<this._children.length;){if(this._children[e]===t)return void this._children.splice(e,1);e++}},e.prototype.destroy=function(){var t;for(window.cancelAnimationFrame(this._animationFrame),clearTimeout(this._timeout);this._children.length;)t=this._children[0],this.removeChild(t),t.destroy();return this._parent.removeChild(this.element),this._children=[],e.__super__.destroy.call(this)},e.prototype.pause=function(){return this._paused?void 0:(window.cancelAnimationFrame(this._animationFrame),this._animationFrame=null,clearTimeout(this._timeout),this._timeout=null,this._paused=!0)},e.prototype.unpause=function(){return this._paused&&(this._paused=!1,this._previousFrameTime=null,null==this._timeout&&this.update(),null==this._animationFrame)?this.render():void 0},e.prototype.setFps=function(t){return t!==this._fps?(this._fps=t,this._time=1e3/t):void 0},e.prototype.getFps=function(){return this._fps},e.prototype._initOptions=function(t){return e.__super__._initOptions.call(this,t),this._setOptions(t,e.INIT_DEFAULTS)},e.prototype._isString=function(t){return"[object String]"==={}.toString.call(t)},e}(i)},{"./display/DisplayObject":2,"./display/MovieClip":3,"./display/Sprite":4}],2:[function(t,e){var i,n,r,s,o={}.hasOwnProperty,h=function(t,e){function i(){this.constructor=t}for(var n in e)o.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t};n=t("../event/EventDispatcher"),r=t("../geom/Point"),s=t("../util/Vendor"),e.exports=i=function(t){function e(t){null==t&&(t=null),e.__super__.constructor.call(this),console.log("DisplayObject",this),this.element=document.createElement("div"),this.element.className="display-object",this.element.style.position="absolute",this.element.style[s.pre("transformOrigin")]=s.origin(0,0),this.uid=e.uidCounter.toString(),e.uidCounter++,this.element.setAttribute("data-uid",this.uid),this._initOptions(t)}return h(e,t),e.uidCounter=0,e.READY="DisplayObject/READY",e.INIT_DEFAULTS={contentWidth:100,contentHeight:100,x:0,y:0,rotation:0,scaleX:1,scaleY:1,width:null,height:null,index:0,visible:!0,buttonMode:!1,interactive:!1,origin:{x:0,y:0},opacity:1},e.prototype.element=null,e.prototype._width=null,e.prototype._height=null,e.prototype._x=null,e.prototype._y=null,e.prototype._rotation=null,e.prototype._scaleX=null,e.prototype._scaleY=null,e.prototype._index=null,e.prototype._visible=null,e.prototype._buttonMode=null,e.prototype._interactive=null,e.prototype._origin={},e.prototype._opacity=null,e.prototype._id=null,e.prototype._name=null,e.prototype._visibility=null,e.prototype._uid=null,e.prototype._dirtyExternals=!1,e.prototype._dirtyInternals=!1,e.prototype.show=function(){return this.setVisible(!0),this},e.prototype.hide=function(){return this.setVisible(!1),this},e.prototype.update=function(){},e.prototype.globalToLocal=function(t){var e,i;return e=(t.x-this._x)/this._scaleX,i=(t.y-this._y)/this._scaleY,new r(e,i)},e.prototype.localToGlobal=function(t){var e,i;return e=t.x*this._scaleX+this._x,i=t.y*this._scaleY+this._y,new r(e,i)},e.prototype.destroy=function(){return this.element=null,e.__super__.destroy.call(this)},e.prototype.transition=function(t,e,i){return null==e&&(e="linear"),null==i&&(i=0),this.element.style[s.pre("transition")]=null!=t&&t>0?s.css("transform")+" "+t+"s "+e+" "+i+"s":"none"},e.prototype.setVisible=function(t){return t!==this._visible?(this._visible=t,this._visibility=t?"visible":"hidden",this._dirtyExternals=!0):void 0},e.prototype.getVisible=function(){return this._visible},e.prototype.setOpacity=function(t){return t!==this._opacity?(this._opacity=t,this._dirtyExternals=!0):void 0},e.prototype.getOpacity=function(){return this._opacity},e.prototype.setButtonMode=function(t){return t!==this._buttonMode?(this._buttonMode=t,this.element.style.cursor=t?"pointer":"default"):void 0},e.prototype.getButtonMode=function(){return this._buttonMode},e.prototype.setName=function(t){return t!==this._name?this.name=t:void 0},e.prototype.getName=function(){return this._name},e.prototype.setId=function(t){return t!==this._id?(this._id=t,this.element.id=t):void 0},e.prototype.getId=function(){return this._id},e.prototype.setIndex=function(t){return t!==this._index?(this._index=t,this.element.style.zIndex=t):void 0},e.prototype.getIndex=function(){return this._index},e.prototype.setInteractive=function(t){return t!==this._interactive?(this._interactive=t,this.element.style.pointerEvents=t?"auto":"none"):void 0},e.prototype.getInteractive=function(){return this._interactive},e.prototype.setOrigin=function(t){return this._origin&&this._origin.x===t.x&&this._origin.y===t.y?void 0:(this._origin.x=t.x,this._origin.y=t.y,this.element.style[s.pre("transformOrigin")]=s.origin(t.x,t.y))},e.prototype.getOrigin=function(){return this._origin},e.prototype.setX=function(t,e){return null==e&&(e=!1),t!==this._x?(this._x=t,this._dirtyExternals=!0,e&&this.render(),this):void 0},e.prototype.getX=function(){return this._x},e.prototype.setY=function(t,e){return null==e&&(e=!1),t!==this._y?(this._y=t,this._dirtyExternals=!0,e&&this.render(),this):void 0},e.prototype.getY=function(){return this._y},e.prototype.setRotation=function(t,e){return null==e&&(e=!1),t!==this._rotation?(this._rotation=t,this._dirtyExternals=!0,e&&this.render(),this):void 0},e.prototype.getRotation=function(){return this},e.prototype.setContentWidth=function(t,e){return null==e&&(e=!1),t!==this._contentWidth?(this._contentWidth=t,this._scaleX=this._width/this._contentWidth,this._dirtyExternals=!0,e&&this.render(),this):void 0},e.prototype.getContentWidth=function(){return this._contentWidth},e.prototype.setContentHeight=function(t,e){return null==e&&(e=!1),t!==this._contentHeight?(this._contentHeight=t,this._scaleY=this._height/this._contentHeight,this._dirtyExternals=!0,e&&this.render(),this):void 0},e.prototype.getContentHeight=function(){return this._contentHeight},e.prototype.setWidth=function(t,e){return null==e&&(e=!1),t!==this._width?(this._width=t,this._scaleX=this._width/this._contentWidth,this._dirtyExternals=!0,e&&this.render(),this):void 0},e.prototype.getWidth=function(){return this._width},e.prototype.setHeight=function(t,e){return null==e&&(e=!1),t!==this._height?(this._height=t,this._scaleY=this._height/this._contentHeight,this._dirtyExternals=!0,e&&this.render(),this):void 0},e.prototype.getHeight=function(){return this._height},e.prototype.setScaleX=function(t,e){return null==e&&(e=!1),t!==this._scaleX?(this._scaleX=t,this._width=this._contentWidth*this._scaleX,this._dirtyExternals=!0,e&&this.render(),this):void 0},e.prototype.getScaleX=function(){return this._scaleX},e.prototype.setScaleY=function(t,e){return null==e&&(e=!1),t!==this._scaleY?(this._scaleY=t,this._height=this._contentHeight*this._scaleY,this._dirtyExternals=!0,e&&this.render(),this):void 0},e.prototype.getScaleY=function(){return this._scaleY},e.prototype._initOptions=function(t){return this._setOptions(t,e.INIT_DEFAULTS)},e.prototype._setOptions=function(t,e){var i,n,r;r=[];for(n in e)i="set"+n.charAt(0).toUpperCase()+n.slice(1),r.push(null!=this[i]?null!=(null!=t?t[n]:void 0)?this[i](t[n]):null!=e[n]?this[i](e[n]):void 0:void 0);return r},e.prototype._renderInternals=function(){return this._dirtyInternals=!1},e.prototype._renderExternals=function(){return this._dirtyExternals?(this.element.style.width=this._contentWidth+"px",this.element.style.height=this._contentHeight+"px",this.element.style.visibility=this._visibility,this.element.style.opacity=this._opacity,this.element.style[s.pre("transform")]=s.translate(this._x,this._y)+" scale("+this._scaleX+","+this._scaleY+") rotate("+this._rotation+"deg)",this._dirtyExternals=!1):void 0},e.prototype.render=function(){return this._renderExternals(),this._renderInternals()},e}(n)},{"../event/EventDispatcher":9,"../geom/Point":10,"../util/Vendor":11}],3:[function(t,e){var i,n,r,s,o,h,u,l=function(t,e){return function(){return t.apply(e,arguments)}},a={}.hasOwnProperty,p=function(t,e){function i(){this.constructor=t}for(var n in e)a.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t};r=t("../display/DisplayObject"),h=t("../util/Vendor"),n=t("../display/layout/BasicLayout"),u=t("../display/layout/ZoeLayout"),i=t("../display/render/BackgroundRender"),s=t("../display/render/ImageRender"),e.exports=o=function(t){function e(t,r){switch(null==r&&(r=null),this._next=l(this._next,this),e.__super__.constructor.call(this,r),this._animations={},this._cuePointsByFrame={},this._cuePointsByName={},this._queue=[],this.element.className+=" movieClip",this.element.style.overflow="hidden",this._getDataType(t)){case e.DATA_TYPES.zoe:this._layoutEngine=new u(t);break;case e.DATA_TYPES.basic:this._layoutEngine=new n(t,this._contentWidth,this._contentHeight);break;default:console.error("Invalid data")}if(null!=(null!=r?r.renderMethod:void 0))switch(r.renderMethod){case"renderBackground":this._renderEngine=new i(this._layoutEngine.images);break;case"renderImage":this._renderEngine=new s(this._layoutEngine.images);break;default:this._renderEngine=new i(this._layoutEngine.images)}else this._renderEngine=new i(this._layoutEngine.images);this.element.appendChild(this._renderEngine.element),this._totalFrames=this._layoutEngine.totalFrames,this._layoutEngine.update(this._currentFrame),this._dirtyInternals=!0}return p(e,t),e.REPEAT="MovieClip/REPEAT",e.COMPLETE="MovieClip/COMPLETE",e.CUE_POINT="MovieClip/CUE_POINT",e.DATA_TYPES={zoe:"zoe",basic:"basic"},e.prototype._repeat=null,e.prototype._speed=null,e.prototype._maxFrame=null,e.prototype._minFrame=null,e.prototype._delay=null,e.prototype._totalFrames=0,e.prototype._playhead=0,e.prototype._currentFrame=0,e.prototype._count=0,e.prototype._playing=!1,e.prototype._animations=null,e.prototype._cuePointsByFrame=null,e.prototype._cuePointsByName=null,e.prototype._queue=null,e.prototype._sheets=null,e.prototype._layoutEngine=null,e.prototype._renderEngine=null,e.prototype.addAnimation=function(t,e,i){return this._animations[t]={min:e,max:i},this},e.prototype.removeAnimation=function(t){return this._animations[t]=null,this},e.prototype.destroy=function(){return this._animations=null,this._cuePointsByFrame=null,this._cuePointsByName=null,this._queue=null,e.__super__.destroy.call(this)},e.prototype.updatePlayOptions=function(t){return this._updatePlayOptions(t),this},e.prototype.clearQueue=function(){return this._queue=[],this},e.prototype.then=function(t){return this._queue.push(t),this},e.prototype.clearDelay=function(){return this._delay=0,this},e.prototype.addDelay=function(t){return this._delay=t,this},e.prototype.play=function(t){return this._updatePlayOptions(t),this._count=0,this._playing=!0,this},e.prototype.stop=function(){return this._playing=!1,this},e.prototype.nextFrame=function(){var t;return this._playing=!1,t=this._currentFrame+1,this._playhead=t,this._currentFrame=t,this._layoutEngine.update(this._currentFrame),this._dirtyInternals=!0,this},e.prototype.previousFrame=function(){var t;return this._playing=!1,t=this._currentFrame-1,this._playhead=t,this._currentFrame=t,this._layoutEngine.update(this._currentFrame),this._dirtyInternals=!0,this},e.prototype.gotoAndPlay=function(t,e){return t=this._frame(t),null!=t&&(this._playhead=t,this._currentFrame=t,this._layoutEngine.update(this._currentFrame),this._updatePlayOptions(e),this._count=0,this._playing=!0),this},e.prototype.gotoAndStop=function(t){return t=this._frame(t),null!=t&&(this._playing=!1,this._playhead=t,this._currentFrame=t,this._layoutEngine.update(this._currentFrame),this._dirtyInternals=!0),this},e.prototype.update=function(){var t,i,n,r;if(this._playing){if(this._delay>0)return this._delay--;if(this._playhead+=this._speed,this._currentFrame=Math.floor(this._playhead),null!=this._cuePointsByFrame[this._currentFrame])for(r=this._cuePointsByFrame[this._currentFrame],i=0,n=r.length;n>i;i++)t=r[i],this.dispatch(e.CUE_POINT,{name:t});return this._speed>0&&this._currentFrame>this._maxFrame?this._repeat!==this._count?(this._playhead=this._minFrame+this._currentFrame-this._maxFrame-1,this._currentFrame=Math.floor(this._playhead),this.dispatch(e.REPEAT),this._count++):(this._playhead=this._maxFrame,this._currentFrame=this._maxFrame,this.stop(),this._queue.length>0?this._next():this.dispatch(e.COMPLETE)):this._speed<0&&this._currentFrame<this._minFrame&&(this._repeat!==this._count?(this._playhead=this._maxFrame+this._currentFrame-this._minFrame+1,this._currentFrame=Math.floor(this._playhead),this.dispatch(e.REPEAT),this._count++):(this._playhead=this._minFrame,this._currentFrame=this._minFrame,this.stop(),this._queue.length>0?this._next():this.dispatch(e.COMPLETE))),this._layoutEngine.update(this._currentFrame),this._dirtyInternals=!0}},e.prototype.addCuePoint=function(t,e){var i;return null==(i=this._cuePointsByFrame)[e]&&(i[e]=[]),this._cuePointsByFrame[e].push(t),this._cuePointsByName[t]=e,this},e.prototype.stopRepeating=function(){return this._count=-1,this._repeat=-1,this},e.prototype.getAnimationByName=function(t){return this._animations[t]},e.prototype.getCurrentFrame=function(){return this._currentFrame},e.prototype.getTotalFrames=function(){return this._totalFrames},e.prototype.getPlaying=function(){return this._playing},e.prototype.getSpeed=function(){return this._speed},e.prototype._getDataType=function(t){if(!this._isString(t)&&!this._isNumber(t))if(null!=t.frames&&null!=t.images&&this._isArray(t.images)&&this._isArray(t.frames)&&t.images.length>0&&t.frames.length>0){if(this._isString(t.images[0])&&this._isArray(t.frames[0])&&7===t.frames[0].length)return e.DATA_TYPES.zoe}else if(null!=t.images&&this._isArray(t.images)&&this._isString(t.images[0]))return e.DATA_TYPES.basic;return null},e.prototype._frame=function(t){return this._isString(t)?null!=this._animations[t]?this._animations[t].min:null!=this._cuePointsByName[t]?this._cuePointsByName[t]:(console.warn("No animations or cuepoints with that name"),null):this._isNumber(t)?t:(console.warn("No animations or cuepoints with that name"),null)},e.prototype._isString=function(t){return"[object String]"==={}.toString.call(t)},e.prototype._isNumber=function(t){return!isNaN(t)},e.prototype._isArray=Array.isArray||function(t){return"[object Array]"==={}.toString.call(t)},e.prototype._updatePlayOptions=function(t){return null!=(null!=t?t.repeat:void 0)?this._repeat=t.repeat===!0?-1:this._isNumber(t.repeat)?Math.round(t.repeat):0:(null==this._repeat||this._repeat===!1)&&(this._repeat=0),this._speed=null!=(null!=t?t.speed:void 0)?t.speed:1,this._delay=null!=(null!=t?t.delay:void 0)?t.delay:this._delay,this._maxFrame=this._totalFrames-1,this._minFrame=0,null!=(null!=t?t.animation:void 0)&&(null!=this._animations[t.animation]?(this._minFrame=this.animations[t.animation].min,this._maxFrame=this.animations[t.animation].max):console.warn("Animation",t.animation,"doesn't exist")),null!=(null!=t?t.max:void 0)&&(this._maxFrame=t.max),null!=(null!=t?t.min:void 0)?this._minFrame=t.min:void 0},e.prototype._renderInternals=function(){return this._dirtyInternals?(this._renderEngine.render(this._layoutEngine.current),this._dirtyInternals=!1):void 0},e.prototype._next=function(){var t;return(null!=(t=this._queue)?t.length:void 0)>0?this._queue.shift().call(this):void 0},e}(r)},{"../display/DisplayObject":2,"../display/layout/BasicLayout":5,"../display/layout/ZoeLayout":6,"../display/render/BackgroundRender":7,"../display/render/ImageRender":8,"../util/Vendor":11}],4:[function(t,e){var i,n,r,s,o,h,u={}.hasOwnProperty,l=function(t,e){function i(){this.constructor=t}for(var n in e)u.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t};h=t("../util/Vendor"),s=t("../vo/ImageVO"),n=t("../display/DisplayObject"),i=t("../display/render/BackgroundRender"),r=t("../display/render/ImageRender"),e.exports=o=function(t){function e(t,n){if(e.__super__.constructor.call(this,n),this._image=new s(t,0,0,this._contentWidth,this._contentHeight),this.element.className+=" sprite",this.element.style.overflow="hidden",null!=(null!=n?n.renderMethod:void 0))switch(n.renderMethod){case"renderBackground":this._renderEngine=new i([this._image]);break;case"renderImage":this._renderEngine=new r([this._image]);break;default:this._renderEngine=new i([this._image])}else this._renderEngine=new i([this._image]);this.element.appendChild(this._renderEngine.element),this._dirtyInternals=!0}return l(e,t),e.prototype._image=null,e.prototype._renderEngine=null,e.prototype.destroy=function(){return this._image=null,e.__super__.destroy.call(this)},e.prototype._renderInternals=function(){return this._dirtyInternals?(this._renderEngine.render(this._image),this._dirtyInternals=!1):void 0},e}(n)},{"../display/DisplayObject":2,"../display/render/BackgroundRender":7,"../display/render/ImageRender":8,"../util/Vendor":11,"../vo/ImageVO":12}],5:[function(t,e){var i,n;n=t("../../vo/ImageVO"),e.exports=i=function(){function t(t,e,i){var r;for(this._data=t,this.images=[],r=0;r<this._data.images.length;)this.images.push(new n(this._data.images[r],0,0,e,i)),r++;this.totalFrames=this._data.images.length,this.update(0)}return t.prototype.images=null,t.prototype.totalFrames=null,t.prototype.destroy=function(){return t.__super__.destroy.call(this),this._images=null},t.prototype.update=function(t){return this.current=this.images[t]},t}()},{"../../vo/ImageVO":12}],6:[function(t,e){var i,n;i=t("../../vo/ImageVO"),e.exports=n=function(){function t(t){var e;for(this._data=t,this.images=[],e=0;e<this._data.images.length;)this.images.push(new i(this._data.images[e])),e++;this.totalFrames=this._data.frames.length,this.update(0)}return t.prototype.images=null,t.prototype.totalFrames=null,t.prototype._currentSheetNumber=null,t.prototype.destroy=function(){return t.__super__.destroy.call(this),this._images=null},t.prototype.update=function(t){var e,i,n;return i=this._data.frames[t],null!=i?(n=i[4],this._currentSheetNumber=n,e=this.images[this._currentSheetNumber],e.x=-i[0],e.y=-i[1],e.offsetX=i[5],e.offsetY=i[6],e.width=i[2],e.height=i[3],this.current=e):console.warn("Data doesn't exist for frame",t)},t}()},{"../../vo/ImageVO":12}],7:[function(t,e){var i,n;n=t("../../util/Vendor"),e.exports=i=function(){function t(t){var e;this._images=t,this.element=document.createElement("div"),this.element.style.position="absolute",this.element.style.overflow="hidden",this.element.style.backgroundRepeat="no-repeat",this.element.style.backgroundImage=function(){var t,i,n,r;for(n=this._images,r=[],t=0,i=n.length;i>t;t++)e=n[t],r.push("url('"+e.url+"')");return r}.call(this).join(", "),this.element.style.backgroundPosition=function(){var t,i,n,r;for(n=this._images,r=[],t=0,i=n.length;i>t;t++)e=n[t],r.push("0px 2048px");return r}.call(this).join(", ")}return t.prototype.render=function(t){var e,i,r,s,o;for(i=[],o=this._images,r=0,s=o.length;s>r;r++)e=o[r],i.push(e===t?e.positionToString():"0px 2048px");return this.element.style.backgroundPosition=i.join(", "),this.element.style.width=t.width+"px",this.element.style.height=t.height+"px",this.element.style[n.pre("transform")]=n.translate(-t.offsetX,-t.offsetY)},t}()},{"../../util/Vendor":11}],8:[function(t,e){var i,n;n=t("../../util/Vendor"),e.exports=i=function(){function t(t){this._images=t,this.element=document.createElement("img"),this.element.style.position="absolute",this.element.style.left=0,this.element.style.top=0}return t.prototype.render=function(t){return this.element.src=t.url,this.element.style[n.pre("transform")]=n.translate(t.x-t.offsetX,t.y-t.offsetY)},t}()},{"../../util/Vendor":11}],9:[function(t,e){var i;e.exports=i=function(){function t(){}return t.prototype.destroy=function(){return this._events=null},t.prototype.on=function(t,e,i){var n;for(null==this._events&&(this._events={}),null==this._events[t]&&(this._events[t]=[]),n=0;n<this._events[t].length;){if(this._events[t][n].listener===e)return this;n++}return this._events[t].push({listener:e,scope:i}),this},t.prototype.off=function(t,e){var i,n,r,s,o;if(null==t&&(t=null),null==e&&(e=null),null==this._events)return this;if(null==t)return this._events={},this;if(null!=this._events[t]&&null==e)return this._events[t]=[],this;if(null!=this._events[t])for(o=this._events[t],n=r=0,s=o.length;s>r;n=++r)i=o[n],null!=i&&i.listener===e&&this._events[t].splice(n,1);return this},t.prototype.dispatch=function(t,e){var i,n,r,s,o;if(null!=this._events&&null!=this._events[t]){for(null==e&&(e={}),e.target=this,s=this._events[t],o=[],n=0,r=s.length;r>n;n++)i=s[n],null==i.scope&&(i.scope=this),o.push(i.listener.call(i.scope,e));return o}},t}()},{}],10:[function(t,e){var i;e.exports=i=function(){function t(t,e){null==t&&(t=0),null==e&&(e=0),this.x=t,this.y=e}return t.createFromAngle=function(e,i){var n,r;return n=Math.sin(e)*i,r=Math.cos(e)*i,new t(n,r)},t.prototype.toString=function(){return this.x+" "+this.y},t.prototype.equals=function(t){return this.x===t.x&&this.y===t.y},t.prototype.clone=function(){return new t(this.x,this.y)},t.prototype.set=function(t,e){return this.x=t,this.y=e,this},t.prototype.reset=function(){return this.set(0,0)},t.prototype.round=function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},t.prototype.overwrite=function(t){return this.x=t.x,this.y=t.y,this},t.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this},t.prototype.subtract=function(t){return this.x-=t.x,this.y-=t.y,this},t.prototype.multiply=function(t){return this.x*=t,this.y*=t,this},t.prototype.divide=function(t){return this.x/=t,this.y/=t,this},t.prototype.normalize=function(){var t;return t=this.getLength(),0!==t&&(this.x/=t,this.y/=t),this},t.prototype.dot=function(t){return this.x*t.x+this.y*t.y},t.prototype.invert=function(){return this.x=-this.x,this.y=-this.y,this},t.prototype.getLength=function(){return Math.sqrt(this.dot(this))},t.prototype.getLengthNoSquareRoot=function(){return this.dot(this)},t.prototype.setLength=function(t){var e;return e=this.getLength(),0!==e&&(this.x=this.x/e*t,this.y=this.y/e*t),this},t.prototype.getAngle=function(){return Math.atan2(this.x,this.y)},t.prototype.setAngle=function(t,e){return e=e||this.getLength(),this.x=Math.sin(t)*e,this.y=Math.cos(t)*e,this},t}()},{}],11:[function(t,e){var i;e.exports=i=function(){function t(){}return t.support3D=null,t.prefix=function(){var t,e,i;if("result"in arguments.callee)return arguments.callee.result;e=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,i=document.getElementsByTagName("script")[0];for(t in i.style)if(e.test(t))return arguments.callee.result=""+t.match(e)[0];return arguments.callee.result="WebkitOpacity"in i.style?"webkit".toLowerCase():"KhtmlOpacity"in i.style?"khtml".toLowerCase():""},t.pre=function(e){var i;return i=t.prefix(),i.length>0?i+e.charAt(0).toUpperCase()+e.slice(1):e},t.css=function(e){var i;return i=t.prefix(),i.length>0?"-"+i+"-"+e:e},t.origin=function(e,i){return isNaN(e)||(e+="px"),isNaN(i)||(i+="px"),null==t.support3D&&t.check3D(),t.support3D?""+e+" "+i+" 0":""+e+" "+i},t.translate=function(e,i){return null==t.support3D&&t.check3D(),t.support3D?"translate3d("+e+"px, "+i+"px, 0)":"translate("+e+"px, "+i+"px)"},t.check3D=function(){var e,i,n;return n=document.createElement("div"),n.style[t.pre("transform")]="translate3d(0px, 0px, 0px)",i=/translate3d\(0px, 0px, 0px\)/g,e=n.style.cssText.match(i),t.support3D=null!==e&&1===e.length},t}()},{}],12:[function(t,e){var i;e.exports=i=function(){function t(t,e,i,n,r,s,o){this.url=t,this.x=null!=e?e:0,this.y=null!=i?i:0,this.width=null!=n?n:0,this.height=null!=r?r:0,this.offsetX=null!=s?s:0,this.offsetY=null!=o?o:0}return t.prototype.urlToString=function(){return"url("+this.url+")"},t.prototype.positionToString=function(){return""+this.x+"px "+this.y+"px"},t}()},{}]},{},[1])(1)});