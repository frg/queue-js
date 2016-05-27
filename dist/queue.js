(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g._q = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (doSomething) {
    this.pendingQ = [];
    this.hotQ = [];
    this._doSomething = doSomething;
    
    this.doSomething = function () {
        console.info('[q]: doSomething called');
        // move pendingQ
        this.hotQ = this.pendingQ.slice();
        // call original doSomething
        this._doSomething.call(this, this.hotQ, function () {
            console.info('[q]: Success', this.hotQ);
            // success callback
            removeElements(this.pendingQ, this.hotQ);

            // once done check if there are elements in q
            if (this.pendingQ.length > 0) {
                this.doSomething();
            }
        }.bind(this), function () {
            console.info('[q]: Failed');
            // fail callback
            this.doSomething();
        }.bind(this));
    }

    this.push = function (obj) {
        var initialLength = this.pendingQ.length;
        
        if (obj instanceof Array) {
            this.pendingQ = this.pendingQ.concat(obj);
        } else {
            this.pendingQ.push(obj);
        }
        
        // if q is empty doSomething
        if (initialLength === 0) {
            console.info('[q]: Initial Q call');
            this.doSomething();
        }

        return this;
    }

    return this;

    function removeElements(arr1, arr2) {
        for (var i = 0, len = arr2.length; i < len; i++) {
            var index = arr1.indexOf(arr2[i]);
            if (index > -1) {
                arr1.splice(index, 1);
            }
        }
    }
}
},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvcXVldWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkb1NvbWV0aGluZykge1xyXG4gICAgdGhpcy5wZW5kaW5nUSA9IFtdO1xyXG4gICAgdGhpcy5ob3RRID0gW107XHJcbiAgICB0aGlzLl9kb1NvbWV0aGluZyA9IGRvU29tZXRoaW5nO1xyXG4gICAgXHJcbiAgICB0aGlzLmRvU29tZXRoaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUuaW5mbygnW3FdOiBkb1NvbWV0aGluZyBjYWxsZWQnKTtcclxuICAgICAgICAvLyBtb3ZlIHBlbmRpbmdRXHJcbiAgICAgICAgdGhpcy5ob3RRID0gdGhpcy5wZW5kaW5nUS5zbGljZSgpO1xyXG4gICAgICAgIC8vIGNhbGwgb3JpZ2luYWwgZG9Tb21ldGhpbmdcclxuICAgICAgICB0aGlzLl9kb1NvbWV0aGluZy5jYWxsKHRoaXMsIHRoaXMuaG90USwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ1txXTogU3VjY2VzcycsIHRoaXMuaG90USk7XHJcbiAgICAgICAgICAgIC8vIHN1Y2Nlc3MgY2FsbGJhY2tcclxuICAgICAgICAgICAgcmVtb3ZlRWxlbWVudHModGhpcy5wZW5kaW5nUSwgdGhpcy5ob3RRKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG9uY2UgZG9uZSBjaGVjayBpZiB0aGVyZSBhcmUgZWxlbWVudHMgaW4gcVxyXG4gICAgICAgICAgICBpZiAodGhpcy5wZW5kaW5nUS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvU29tZXRoaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdbcV06IEZhaWxlZCcpO1xyXG4gICAgICAgICAgICAvLyBmYWlsIGNhbGxiYWNrXHJcbiAgICAgICAgICAgIHRoaXMuZG9Tb21ldGhpbmcoKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHVzaCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICB2YXIgaW5pdGlhbExlbmd0aCA9IHRoaXMucGVuZGluZ1EubGVuZ3RoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdRID0gdGhpcy5wZW5kaW5nUS5jb25jYXQob2JqKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdRLnB1c2gob2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaWYgcSBpcyBlbXB0eSBkb1NvbWV0aGluZ1xyXG4gICAgICAgIGlmIChpbml0aWFsTGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnW3FdOiBJbml0aWFsIFEgY2FsbCcpO1xyXG4gICAgICAgICAgICB0aGlzLmRvU29tZXRoaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVFbGVtZW50cyhhcnIxLCBhcnIyKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycjIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gYXJyMS5pbmRleE9mKGFycjJbaV0pO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgYXJyMS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
