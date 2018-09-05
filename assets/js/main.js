require.config({
  baseUrl: "assets/js/lib/"
  , shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: '$.fn.popover'
    }
  }
  , paths: {
    app         : ".."
    , collections : "../collections"
    , data        : "../data"
    , models      : "../models"
    , helper      : "../helper"
    , templates   : "../templates"
    , views       : "../views"
  }
});
require([ 'app/app'], function(app){
  app.initialize();
  data = app.outFunction();
  console.log(data);
  // var aa ='[{"title":"Form Name","fields":{"id":{"label":"ID / Name","type":"input-readonly","value":"formName","name":"id"},"name":{"label":"输入名称","type":"input","value":"表单名称","name":"name"}},"fresh":true},{"title":"Text Input","fields":{"id":{"label":"ID / Name","type":"input-readonly","value":"textinput-0","name":"id"},"label":{"label":"问题","type":"textarea","value":"请输入问题","name":"label"},"placeholder":{"label":"默认文字","type":"input","value":"默认文字","name":"placeholder"},"helptext":{"label":"提示文案","type":"input","value":"帮助（清空不显示）","name":"helptext"},"required":{"label":"必填","type":"checkbox","value":false,"name":"required"},"inputsize":{"label":"输入框大小","type":"select","value":[{"value":"input-mini","label":"Mini","selected":false},{"value":"input-small","label":"Small","selected":false},{"value":"input-medium","label":"Medium","selected":false},{"value":"input-large","label":"Large","selected":false},{"value":"input-xlarge","label":"Xlarge","selected":true},{"value":"input-xxlarge","label":"Xxlarge","selected":false}],"name":"inputsize"}},"fresh":false},{"title":"Text Input","fields":{"id":{"label":"ID / Name","type":"input-readonly","value":"textinput-1","name":"id"},"label":{"label":"问题","type":"textarea","value":"请输入问题","name":"label"},"placeholder":{"label":"默认文字","type":"input","value":"默认文字","name":"placeholder"},"helptext":{"label":"提示文案","type":"input","value":"帮助（清空不显示）","name":"helptext"},"required":{"label":"必填","type":"checkbox","value":false,"name":"required"},"inputsize":{"label":"输入框大小","type":"select","value":[{"value":"input-mini","label":"Mini","selected":false},{"value":"input-small","label":"Small","selected":false},{"value":"input-medium","label":"Medium","selected":false},{"value":"input-large","label":"Large","selected":false},{"value":"input-xlarge","label":"Xlarge","selected":true},{"value":"input-xxlarge","label":"Xxlarge","selected":false}],"name":"inputsize"}},"fresh":false}]'
  app.inFunction(window.aaData);
});
