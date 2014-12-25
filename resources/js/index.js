(function(){

var result;
var qqIframe;
var map;
var d;
var e;
var doc;
var win;
var chatList;
var chatListNotify;
var chatContainer;
var blackPhoneNumberList = [
    "15626136020","18820021456"
]

var hasLogined=false;
function showTips(str){
    // alert(str);
    console.log(str);
}

function errLog(str){
    console.log("ERROR:" +str);
}

function isInBlackPhoneNumberList(phoneNum){
    var flag = false;
    $.each(blackPhoneNumberList,function(i,v){
        if(v == phoneNum){
            flag = true;
        }
    });
    return flag;
}

function dataProtocolHandler(data,successCallback,failCallback){
    if(data){
        if(data.code===0){
            if(successCallback && typeof successCallback == "function"){
                successCallback(data.data,data.datatype);
            }
        }else{
            if(failCallback && typeof failCallback == "function"){
                failCallback(data.code,data.msg,data.data,data.datatype);
            }else{
                showTips("data msg="+ data.msg+";data.code="+ data.code);
            }
           
        }
    }else{
        showTips("data is null");
    }
}

function isImportantData(str){
    var pattern=/\d{11}|\d{7,8}|\d{3,4}-\d{7,8}/;
    var ret = pattern.exec(str);
    if(ret){
        return ret[0];
    }else{
        return false;
    }
}


$(document).ready(function() {

    result = $("#result");
    qqIframe = $("#qqIframe");

    var logOn = true;
    $("#switch").click(function(){
        if(logOn){
            $(this).html("开启log");
            result.hide();
            logOn = false;
        }else{
            $(this).html("关闭log");
            result.show();
            logOn = true;
        }
    });

    $("#clear").click(function(){
        result.html("");
    });

    map = {};

    result.append = function(str){
        result.html(result.html() +"<br>" + str);
    }

    result.append("开始咯~");
    
    // e = setInterval(function(){
    //     doc = qqIframe.get(0).contentDocument;
    //     win = qqIframe.get(0).contentWindow;

    //     var loginIframe = $("iframe",doc);
    //     doc = loginIframe.get(0).contentDocument;
    //     win = loginIframe.get(0).contentWindow;
    //     debugger;
    //     if(hasLogined) return;
    //     if ($("#u",doc).length <= 0) {
    //         return;
    //     }
    //     $("#u",doc).trigger("click");
    //     setTimeout(function(){
    //         $("#u",doc).val("312315220");
    //         $("#p",doc).trigger("click");
    //         setTimeout(function(){
    //             $("#p",doc).val("Qwerty@QQ");
    //             setTimeout(function(){
    //             $("#login_button",doc).trigger("click");
    //             hasLogined = true;
    //             clearInterval(e);
    //         },2000);
    //         },100);
            
    //     },100);
        
    // },5000);


    d = setInterval(function() {
        doc = qqIframe.get(0).contentDocument;
        win = qqIframe.get(0).contentWindow;
        chatList = $("#current_chat_list li", doc);

        // if(!hasLogined) return;
        if (chatList.length <= 0) {
            return;
        }
       
        chatListNotify = $("#current_chat_list li.notify", doc);
        if(chatListNotify.length>0){
            chatListNotify.each(function(k,v){
                    setTimeout(function(){
                        $(v).trigger("click");
                        setTimeout(function(){
                            chatContainer = $(".chat_container",doc);
                            chatContainer.find(".chat_content_group").each(function(a,b){
                                if(!map[chatListNotify.get(k).id]){
                                    map[chatListNotify.get(k).id] = {};
                                    map[chatListNotify.get(k).id].count = 0;
                                    map[chatListNotify.get(k).id].match = 0;
                                    map[chatListNotify.get(k).id].name = $(".chat-panel h1", doc).html();
                                }
                                var len = map[chatListNotify.get(k).id].count;
                                if(a >= len){
                                    map[chatListNotify.get(k).id].count ++;
                                    var phoneNum = isImportantData($(b).find(".chat_content").html().trim());
                                    if (!phoneNum){
                                        return;
                                    }

                                    map[chatListNotify.get(k).id].match++;
                                    var d = {
                                        time: +new Date(),
                                        nickname : $(b).find(".chat_nick").html().trim(),
                                        content: $(b).find(".chat_content").html().trim(),
                                        groupid : chatListNotify.get(k).id.split("-")[3],
                                        groupname : $(".chat-panel h1", doc).html(),
                                        phonenum : phoneNum
                                    }
                                    result.append(new Date()+ "  " + d.nickname + ":" + d.content +";" + d.groupid + ";" + d.groupname + ";" + d.phonenum)
                                    



                                    function uploadData(){
                                        var url = "http://115.29.8.74:9289/message/add";
                                                   
                                        var param = d;
                                        if(param==null){
                                            return;
                                        }

                                        var jqxhr = $.ajax({
                                            url: url,
                                            data: param,
                                            type: "POST",
                                            dataType: "json",
                                            success: function(data) {
                                                dataProtocolHandler(data,function(data){
                                                    console.log("uploadData");
                                                    // debugger;
                                                    // location.href = "/";
                                                },function(code,msg,data,dataType){
                                                    
                                                });
                                            },

                                            error: function(data) {
                                                errLog && errLog("loginAjax");
                                            }
                                        });
                                    }

                                    function sendBill(param){
                                        var url = "http://www.tthcc.cn:9289/message/grabsend";
                                                   
                                        if(param==null){
                                            return;
                                        }

                                        var jqxhr = $.ajax({
                                            url: url,
                                            data: param,
                                            type: "POST",
                                            dataType: "json",
                                            success: function(data) {
                                                dataProtocolHandler(data,function(data){
                                                    // debugger;
                                                    // sendBill2();
                                                    console.log("sendBill");
                                                });
                                            },
                                            error: function(data) {
                                                errLog && errLog("grabsend error");
                                            }
                                        });
                                    }
                                    // debugger;
                                    if(!isInBlackPhoneNumberList(phoneNum)){
                                        // debugger;
                                        var ret = SmartSend.judge(d);
                                        console.log(ret);
                                        if(ret.result){
                                            // debugger;
                                            sendBill(ret.result);

                                        }else{
                                            uploadData();
                                        }
                                        
                                    }
                                }
                            });
                            //关闭chat container
                            $(".btn_setting",doc).trigger("click");
                        },200);

                    }, k *1000);

                
            });
        }
        

    }, 10000);
});


})();
