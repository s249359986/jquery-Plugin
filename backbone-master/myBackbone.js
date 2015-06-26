/**
 * Created by bill on 15/6/16.
 */


;!function(window,undefined){

    "use strict";
    window.myBackbone = {};

    var Model = myBackbone.Model = function(attributes, options) {
        debugger;

        //  var attrs = attributes || {};
        //   options || (options = {});
        //   this.cid = _.uniqueId(this.cidPrefix);
        //  this.attributes = {};
        //  if (options.collection) this.collection = options.collection;
        //   if (options.parse) attrs = this.parse(attrs, options) || {};
        //   attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
        //  this.set(attrs, options);
        //    this.changed = {};
        this.initialize.apply(this, arguments);
    };

    var extend = function(protoProps, staticProps) {

        debugger;
        var parent = this;
        var child;
        //返回父类的构造函数，当子类调用时出入子类对象
        child = function(){ return parent.apply(this, arguments); };


      //  _.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent` constructor function.
        var Surrogate = function(){
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;
        if (protoProps) _.extend(child.prototype, protoProps);

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        return child;
    };
   //  Model={extend:extend};



    _.extend(Model.prototype, {

        initialize: function(){

            alert("父类构造函数");
        }






    });
   //  Model.extend = extend;
    myBackbone.Model.extend=extend;




}(window);
