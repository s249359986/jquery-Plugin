/**
 * Created by bill on 15/6/16.
 */


;!function(window,undefined){

    "use strict";
    var extend = function(protoProps, staticProps) {

        debugger;
        var parent = this;
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent constructor.
//        if (protoProps && _.has(protoProps, 'constructor')) {
//            child = protoProps.constructor;
//        } else {
//            child = function(){ return parent.apply(this, arguments); };
//        }


        //返回父类的构造函数，当子类调用时出入子类对象
        child = function(){ return parent.apply(this, arguments); };

        // Add static properties to the constructor function, if supplied.
      //  _.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent` constructor function.
        var Surrogate = function(){

            debugger;
            this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        return child;
    };
    var Model={extend:extend};

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
    _.extend(Model.prototype, {

        initialize: function(){

            alert("父类构造函数");
        }






    });
   //  Model.extend = extend;
    myBackbone.Model.extend=extend;


}(window);
