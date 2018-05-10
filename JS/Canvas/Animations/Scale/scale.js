'use strict'

var CanvasAPI = ( function () {

    var shapes = {
        rect: "fillRect"
    };

    function api ( canvas ) {

        this.canvas = canvas;
        this.context = this.getContext( this.canvas );
        this.tween = new tween( this );
        this.x = undefined;
        this.y = undefined;
        this.dx = undefined;
        this.dy = undefined;
        this.init();

    }

    /**
     * @memberof api
     * @function getContext
     * @param {Object} obj - An Object defining what to draw on the canvas
     * */
    api.prototype.getContext = function ( canvas ) {

        return canvas.getContext("2d",{
            alpha: false
        });  

    };

    /**
     * @memberof api
     * @function init
     * */
    api.prototype.init = function ( ) {

        var ctx = this.context;

        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.fillStyle = "rgb(255,255,255)";
        
    };

    /**
     * @memberof api
     * @function drawShape
     * @param {Object} obj - An Object defining what to draw on the canvas
     * @example { shape: 'rect', x: 0, y: 0, dx: 5, dy: 5}
     * */
    api.prototype.drawShape = function ( obj ) {

        this.context[shapes[obj.shape]](obj.x, obj.y, obj.dx, obj.dy);

        this.x = obj.x;
        this.y = obj.y;
        this.dx = obj.dx;
        this.dy = obj.dy;

    };

    /**
     * @memberof api
     * @function drawShape
     * @param {Object} obj - An Object defining what to draw on the canvas
     * @example { shape: 'rect', x: 0, y: 0, dx: 5, dy: 5}
     * */
    api.prototype.animate = function ( obj ) {

        var ctx = this.context;
        var tween = this.tween;
        var key = Object.keys(obj.props);
        
        tween.define( ctx, this.dx, obj.props[key[0]].to, obj.duration, obj.repeat );
        console.log(tween);
        tween.start();

    };

    function tween ( canvas ) {

        this.canvas = canvas;
        this.elem = null;
        this.startTime = 0;
        this.startX = 0;
        this.endX = 0;
        this.duration = 0;

    }
    
    tween.prototype.define = function ( target, start, end, duration, repeat ) {
    
        this.elem = target;
        this.startX = start;
        this.endX = end;
        this.duration = duration;
        
    };
    
    tween.prototype.easeOutQuart = function (t, b, c, d) {
        console.log("Input: ", t, b, c, d);
        t /= d;
        console.log("Step 1: ", t, b, c, d);
        t--;
        console.log("Step 2: ", t, b, c, d);
        console.log("Step 3: ", t, b, c, d);
        return -c * (t*t*t*t - 1) + b;
    };
    
    tween.prototype.animate = function () {
         console.log(this);
          // get current time
          var t = Date.now() - this.startTime;
          // make the update
          if (t <= this.duration) {

            var translate = (this.easeOutQuart(t, this.startX, this.endX, (this.duration*100)));
            console.log("translated: ", translate);
            this.elem.fillRect( this.canvas.x,this.canvas.y, translate, this.canvas.dy);

          }
    
          requestAnimationFrame(this.animate);

    };
    
    tween.prototype.start = function () {

        var that = this;
        that.startTime = Date.now();
        animate();
        
        function animate() {

              // get current time
              var d = Date.now();
              var t = (d - that.startTime)/1000;
              
              // make the update
              if ( t <= that.duration ) {
    
                var val = (t/that.duration);
                var translate = that.startX - ((val--)*that.startX);

                // console.group();
                // console.info("translation: ",translate);
                // console.info("time: ",t);
                // console.groupEnd();

                that.elem.clearRect(0,0,that.canvas.canvas.width, that.canvas.canvas.height);

                // var color = Math.floor(Math.random()*1000);
                that.elem.fillStyle = "rgb(255,0,0)";

                that.elem.fillRect( 1,1, translate, that.canvas.dy);
                window.requestAnimationFrame(animate);

              }else{

                    //console.info("time: ",d,that.startTime,t);

                  return;

              }

        } 

    };
    
    return {
        canvas: api,
        animation: tween
    };

})();