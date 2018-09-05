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
      var collectionmodels = '[{"title":"Form Name","fields":{"id":{"label":"ID / Name","type":"input-readonly","value":"formName","name":"id"},"name":{"label":"输入名称","type":"input","value":"表单名称","name":"name"}},"fresh":true},{"title":"Text Input","fields":{"id":{"label":"ID / Name","type":"input-readonly","value":"textinput-0","name":"id"},"label":{"label":"问题","type":"textarea","value":"请输问题","name":"label"},"placeholder":{"label":"默认文字","type":"input","value":"默认文字","name":"placeholder"},"helptext":{"label":"提示文案","type":"input","value":"帮助（清空不显示）","name":"helptext"},"required":{"label":"必填","type":"checkbox","value":false,"name":"required"},"inputsize":{"label":"输入框大小","type":"select","value":[{"value":"input-mini","label":"Mini","selected":false},{"value":"input-small","label":"Small","selected":false},{"value":"input-medium","label":"Medium","selected":false},{"value":"input-large","label":"Large","selected":false},{"value":"input-xlarge","label":"Xlarge","selected":true},{"value":"input-xxlarge","label":"Xxlarge","selected":false}],"name":"inputsize"}},"fresh":false},{"title":"Text Input","fields":{"id":{"label":"ID / Name","type":"input-readonly","value":"textinput-2","name":"id"},"label":{"label":"问题","type":"textarea","value":"请输入问题","name":"label"},"placeholder":{"label":"默认文字","type":"input","value":"默认文字","name":"placeholder"},"helptext":{"label":"提示文案","type":"input","value":"帮助（清空不显示）","name":"helptext"},"required":{"label":"必填","type":"checkbox","value":false,"name":"required"},"inputsize":{"label":"输入框大小","type":"select","value":[{"value":"input-mini","label":"Mini","selected":false},{"value":"input-small","label":"Small","selected":false},{"value":"input-medium","label":"Medium","selected":false},{"value":"input-large","label":"Large","selected":false},{"value":"input-xlarge","label":"Xlarge","selected":true},{"value":"input-xxlarge","label":"Xxlarge","selected":false}],"name":"inputsize"}},"fresh":false},{"title":"Multiple Radios","fields":{"id":{"label":"ID / Name","type":"input","value":"multipleradios-0","name":"id"},"label":{"label":"Label Text","type":"input","value":"Multiple Radios","name":"label"},"required":{"label":"Required","type":"checkbox","value":false,"name":"required"},"radios":{"label":"Radios","type":"textarea-split","value":["Option one","Option two"],"name":"radios"}},"fresh":false}]';
      var myForm = new MyFormView({
        title: "Original", 
        collection: new MyFormSnippetsCollection([
          { "title" : "Form Name", 
            "fields": {
              "id": {
                "label": "ID / Name",
                "type": "input-readonly",
                "value": "formName"
              },
              "name" : {
                "label"   : "输入名称"
                , "type"  : "input"
                , "value" : "表单名称"
              }
            }
          }
        ])
      });

      $("#myClick").on("click",function(){
        // 使用数据，重置表单
        // myForm.initialize({},collectionmodels);
        
        // 输出已经存储的元素数据
        var outData = myForm.outCollection();
        console.log(outData);
        
      });
    }
  }
});
