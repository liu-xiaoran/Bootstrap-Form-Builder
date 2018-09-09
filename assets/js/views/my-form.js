define([
       "jquery", "underscore", "backbone"
      , "views/temp-snippet"
      , "helper/pubsub"
      , "text!templates/app/renderform.html"
], function(
  $, _, Backbone
  , TempSnippetView
  , PubSub
  , _renderForm
){
  return Backbone.View.extend({
    tagName: "fieldset"
    , initialize: function(arg,collectionmodels){
      this.collection.on("add", this.render, this);
      this.collection.on("remove", this.render, this);
      this.collection.on("change", this.render, this);
      PubSub.on("mySnippetDrag", this.handleSnippetDrag, this);
      PubSub.on("tempMove", this.handleTempMove, this);
      PubSub.on("tempDrop", this.handleTempDrop, this);
      this.$build = $("#build");
      this.renderForm = _.template(_renderForm);
      // 传入的数据
      if(collectionmodels){
        this.collection.add(JSON.parse(collectionmodels),{jump: 1});
        this.collection.remove(this.collection.models[0]);
      }
      this.render();
    }
    , outCollection: function(){
      return JSON.stringify(this.collection.models);
    }
    , render: function(){
      //Render Snippet Views
      this.$el.empty();
      var that = this;
      var containsFile = false;
      _.each(this.collection.renderAll(), function(snippet){
        that.$el.append(snippet);
      });
      // 测试
      // console.log(JSON.stringify(this.collection.models));

      // 在此输出数据
      var renderHtml = that.renderForm({
        multipart: this.collection.containsFileType(),
        text: _.map(this.collection.renderAllClean(), function(e){return e.html()}).join("\n")
      });
      
      $("#render").html(renderHtml);
      this.$el.appendTo("#build form");
      this.delegateEvents();
    }
    , getBottomAbove: function(eventY){
      var myFormBits = $(this.$el.find(".component"));
      var topelement = _.find(myFormBits, function(renderedSnippet) {
        // 此处增加160是我的项目页面头部有全局的160，没有头部的可以删去才正常
        if (($(renderedSnippet).position().top+160 + $(renderedSnippet).height()) > eventY  - 90) {
          return true;
        }
        else {
          return false;
        }
      });
      if (topelement){
        return topelement;
      } else {
        return myFormBits[0];
      }
    }

    , handleSnippetDrag: function(mouseEvent, snippetModel) {
      // 移除元素
      $("body").append(new TempSnippetView({model: snippetModel}).render());
      this.collection.remove(snippetModel);
      PubSub.trigger("newTempPostRender", mouseEvent);
    }

    , handleTempMove: function(mouseEvent){
      $(".target").removeClass("target");
      // 此处增加160是我的项目页面头部有全局的160，没有头部的可以删去才正常。左边增加260同理
      if(mouseEvent.pageX >= this.$build.position().left+260 &&
          mouseEvent.pageX < (this.$build.width() + this.$build.position().left+260) &&
          mouseEvent.pageY >= this.$build.position().top+160 &&
          mouseEvent.pageY < (this.$build.height() + this.$build.position().top+160)){
        $(this.getBottomAbove(mouseEvent.pageY)).addClass("target");
      } else {
        $(".target").removeClass("target");
      }
    }

    , handleTempDrop: function(mouseEvent, model, index){
      // 增加元素
      // 此处增加160是我的项目页面头部有全局的160，没有头部的可以删去才正常。左边增加260同理
      if(mouseEvent.pageX >= this.$build.position().left+260 &&
         mouseEvent.pageX < (this.$build.width() + this.$build.position().left+260) &&
         mouseEvent.pageY >= this.$build.position().top+160 &&
         mouseEvent.pageY < (this.$build.height() + this.$build.position().top+160)) {
        var index = $(".target").index();
        $(".target").removeClass("target");
        this.collection.add(model,{at: index+1});
      } else {
        $(".target").removeClass("target");
      }
    }
  })
});
