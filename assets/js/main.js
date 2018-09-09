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
  // data = app.outFunction();
  // app.inFunction();
  var isEdit = false,data;
  if(window.interFormData){
    app.inFunction(window.interFormData);
    isEdit = true;
  }
  $("#submitSurvey").on("click",function(){
    var content_str = app.outFunction(),content_html = $("#render").html(),name = $("#titleName").val();
    if(!name){
      alert("标题为必填项");
      return;
    }
    if(isEdit){
      var survey_id = $("#survey_id").attr("data-id");
      data = {
        content_str: content_str,
        content_html: content_html,
        name: name,
        id: survey_id
      };
    }else{
      data = {
        content_str: content_str,
        content_html: content_html,
        name: name
      };
    }
    $.ajax({
        type: "POST",
        url: isEdit?"***":"***",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            if(data&&data.code==200){
                alert("保存成功");
                location.href = document.referrer;
                return;
            }
            alert(data.msg);
        },
        error: function () {
            alert('服务器错误');
        }
    });

  });
});
