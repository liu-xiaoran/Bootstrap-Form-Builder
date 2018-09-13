define([
       "jquery" , "underscore" , "backbone"
       , "collections/snippets" , "collections/my-form-snippets"
       , "views/tab" , "views/my-form"
       , "text!data/input.json", "text!data/radio.json"
       , "text!templates/app/render.html"
], function(
  $, _, Backbone
  , SnippetsCollection, MyFormSnippetsCollection
  , TabView, MyFormView
  , inputJSON, radioJSON
  , renderTab
){
  return {
    initialize: function(){
      var that = this;
      //Bootstrap tabs from json.
      new TabView({
        title: "Input", 
        name: "输入框",
        collection: new SnippetsCollection(JSON.parse(inputJSON))
      });
      new TabView({
        title: "Radios / Checkboxes", 
        name: "单选/多选按钮",
        collection: new SnippetsCollection(JSON.parse(radioJSON))
      });
      // new TabView({
      //   title: "Select", 
      //   name: "单选/多选选框",
      //   collection: new SnippetsCollection(JSON.parse(selectJSON))
      // });
      // new TabView({
      //   title: "Buttons", 
      //   name: "按钮",
      //   collection: new SnippetsCollection(JSON.parse(buttonsJSON))
      // });
      new TabView({
        title: "Rendered", 
        name: "预览",
        content: renderTab
      });
      // new TabView({
      //   title: "About", 
      //   name: "预览",
      //   content: aboutTab
      // });

      //Make the first tab active!
      $("#components .tab-pane").first().addClass("active");
      $("#formtabs li").first().addClass("active");
      // Bootstrap "My Form" with 'Form Name' snippet.
      // 定义数据
      that.myForm = new MyFormView({
        title: "Original", 
        collection: new MyFormSnippetsCollection()
      });
    },
    outFunction: function(){
      var that = this;
      var outData = that.myForm.outCollection();
      return outData;
    },
    inFunction: function(data){
      var that = this;
      that.myForm.initialize({},data);
    }
  }
});
