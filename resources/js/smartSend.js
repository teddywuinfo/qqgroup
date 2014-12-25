var _d = [{
    phonenum:"13828492594",
    content:"下午惠阳需6.8米高栏厢车回中山珠海，有车联系高生",
    groupname:"佛山物流信息货运信息",
    nickname:"原速车队~~",
    groupid:"1775225090"
},{
    phonenum:"13828492594",
    content:"广州白云区长期出租大货车，有多台9米6前四后八，专业的珠三角短途整车运输，另求长期稳定货源，长途可跑，联系13710278828小成，此信息长年有效",
    groupname:"佛山物流信息货运信息",
    nickname:"原速车队~~",
    groupid:"1775225090"
},{
    phonenum:"13828492594",
    content:"广州市黄埔区有两年6.8箱式货车转让，东风天锦4.160联系电话13016046542",
    groupname:"佛山物流信息货运信息",
    nickname:"原速车队~~",
    groupid:"1775225090"
},{
    phonenum:"13828492594",
    content:"每天有货从东莞大岭山到中山东升，东凤，有7米6，9米6，13米的回程车朋友公司可以私聊18666267734",
    groupname:"佛山物流信息货运信息",
    nickname:"原速车队~~",
    groupid:"1775225090"
}]

var SmartSend = (function(){
    
    var adminUserId = "53e9cd5915a5e45c43813d1c";
    //能够智能添加的条件： 1个手机号码，1个from 1 个to 能够判断是货源还是车源
    var hasAtLeastOnePhoneNumer = function(str){
        var pattern=/1\d{10}/;
        var ret = pattern.exec(str);
        if(ret && ret.length ==1){
            //第二次正则匹配，如果有两个电话号码，拿第一个
            return {
                result : ret[0],
                msg : "success"
            };       
        }else{
            return {
                result : false,
                msg : "hasAtLeastOnePhoneNumer"
            };
        }
    }

    var hasOneFromTo = function(str){
        var locationMap = {
            "广州沙太" : "广东-广州-白云",
            "沙太" : "广东-广州-白云",
            "广州太和" : "广东-广州-白云",
            "太和" : "广东-广州-白云",
            "林安" : "广东-广州-白云",
            "广州番禺": "广东-广州-番禺",
            "番禺": "广东-广州-番禺",
            "广州增城" : "广东-广州-增城",
            "增城" : "广东-广州-增城",
            "新塘" : "广东-广州-新塘",
            "广州花都" : "广东-广州-花都",
            "花都" : "广东-广州-花都",
            "广州黄埔" : "广东-广州-黄埔",
            "黄埔" : "广东-广州-黄埔",
            "广州南沙" : "广东-广州-南沙",
            "广州萝岗" : "广东-广州-萝岗",
            "广州石井": "广东-广州-石井",
            "广州江高" :"广东-广州-白云",
            "江高" :"广东-广州-白云",
            "石井" : "广东-广州-石井",
            "深圳龙岗" : "广东-深圳-龙岗",
            "龙岗" : "广东-深圳-龙岗",
            "深圳宝安" : "广东-深圳-宝安",
            "宝安" : "广东-深圳-宝安",
            "保安" : "广东-深圳-宝安",
            "深圳盐田" : "广东-深圳-盐田",
            "盐田" : "广东-深圳-盐田",
            "深圳南山" : "广东-深圳-南山",
            "深圳松岗" : "广东-深圳-宝安",
            
            "佛山顺德": "广东-佛山-顺德",
            "西樵" : "广东-佛山-西樵",
            "顺德" : "广东-佛山-顺德",
            "佛山乐从" : "广东-佛山-乐从",
            "乐从" : "广东-佛山-乐从",
            "佛山南海" : "广东-佛山-南海",
            "南海" :  "广东-佛山-南海",
            "佛山里水" : "广东-佛山-南海",
            "里水" :  "广东-佛山-南海",
            
            "佛山南庄" :"广东-佛山-禅城",
            "佛山三水" : "广东-佛山-三水",
            "三水" : "广东-佛山-三水",
            "大沥" :"广东-佛山-南海",
            '高明' :  "广东-佛山-高明",
            "珠海斗门" :"广东-珠海-斗门",
            "斗门" :"广东-珠海-斗门",
            
            "东莞寮步" : "广东-东莞-寮步",
            "东莞厚街" : "广东-东莞-厚街",
            "凤岗" : "广东-东莞-凤岗",
            "惠州惠城" : "广东-惠州-惠城", 
            "惠城" : "广东-惠州-惠城", 
            "惠州惠阳" : "广东-惠州-惠阳", 
            "惠阳" : "广东-惠州-惠阳", 
            "恵阳" : "广东-惠州-惠阳", 
            "惠州陈江" : "广东-惠州-陈江", 
            "大亚湾" : "广东-惠州-大亚湾区",
            "惠州博罗" : "广东-惠州-博罗", 
            "博罗" : "广东-惠州-博罗", 

            "中山古镇" : "广东-中山-古镇",

            "肇庆四会": "广东-肇庆-四会",
            "四会" : "广东-肇庆-四会",

            "佛冈" : "广东-清远-佛冈",
            
            "汕头" : "广东-汕头-澄海",
            "澄海" : "广东-汕头-澄海",

            "江门蓬江" : "广东-江门-蓬江",
            "蓬江" : "广东-江门-蓬江",
            "江门鹤山" :"广东-江门-鹤山",
            "鹤山" :"广东-江门-鹤山",

            "高要" : "广东-肇庆-高要",

            "阳东" : "广东-阳江-阳东",
            "南雄" : "广东-韶关-南雄",

            "广州" : "广东-广州-不限",
            "深圳" : "广东-深圳-不限",
            "东莞" : "广东-东莞-不限",
            "惠州" : "广东-惠州-不限",
            "中山" : "广东-中山-不限",
            "韶关" : "广东-韶关-不限",
            "珠海" : "广东-珠海-不限",
            "佛山" : "广东-佛山-不限",
            "清远" : "广东-清远-不限",
            "汕头" : "广东-汕头-不限",
            "湛江" : "广东-湛江-不限",
            "河源" : "广东-河源-不限",
            "茂名" : "广东-茂名-不限",
            "江门" : "广东-江门-不限",
            "阳江" : "广东-阳江-不限",
            "珠海" : "广东-珠海-不限",
            "梅州" : "广东-梅州-不限",
            "肇庆" : "广东-肇庆-不限",
            "云浮" : "广东-云浮-不限",
            "汕尾" : "广东-汕尾-不限",
            "揭阳" : "广东-揭阳-不限",
            "潮州" : "广东-潮州-不限"
            // "南宁" : "广西-南宁-不限",
            // "桂林" : "广西-桂林-不限",
            // "江西上饶" : "江西-上饶-不限",
            // "珠三角" : "广东-不限-不限",
        };
        a = str;

        var b = a ;
        var fromFlag = false;
        var toFlag = false;
        var flag3 = false;
        var a1 = null;
        var a2 = null;
        var msg = "";

        var str = str.replace("回程","").replace("回头","");

        var daoIndex = (function(str){
            var index;
            if(str.indexOf("到")>=0){
                return str.indexOf("到");
            }
            if(str.indexOf("—")>=0){
                return str.indexOf("—");
            }
            if(str.indexOf("回")>=0){
                return str.indexOf("回");
            }

            if(str.indexOf("去")>=0){
                return str.indexOf("去");
            }

            return -1;
        })(str);

        if(daoIndex == -1){
            return {
                result: false,
                msg : "没有 到、回、去的关键词"
            };
        }

        $.each(locationMap,function(k,v){

            if(!fromFlag && b.indexOf(k) >=0){
                b = b.replace(k,"");
                a1 = {
                    "key" : k,
                    "value" : v
                }
                fromFlag = true;
            }
        });


        $.each(locationMap,function(k,v){

            if(!toFlag && b.indexOf(k) >=0){
                b = b.replace(k,"");
                a2 = {
                    "key" : k,
                    "value" : v
                }
                toFlag = true;
            } 
        });

        $.each(locationMap,function(k,v){

            if(!flag3 && b.indexOf(k) >=0){
                flag3 = true;
                msg = "地址超过2个";
            }
        });

        if(!flag3 && a1 && a2){
            if (a.indexOf(a1.key) < a.indexOf(a2.key)){
                ret = {
                    "from" : a1.value,
                    "to" : a2.value
                }
            }else{
                ret = {
                    "from" : a2.value,
                    "to" : a1.value
                }
            }

            if(a.indexOf(a1.key) > daoIndex && a.indexOf(a2.key)> daoIndex){
                return {
                    result: false,
                    msg : "两个地址在 到 的同一边，可能不太对"
                };
            }

            if(a.indexOf(a1.key) < daoIndex && a.indexOf(a2.key) < daoIndex){
                return {
                    result: false,
                    msg : "两个地址在 到 的同一边，可能不太对"
                };
            }
            return {
                result : ret,
                msg : "success"
            }; 
        }else{


            if(!(a1 && a2)){
                msg = "地址不够两个";
            }

            return {
                result: false,
                msg : msg
            };
        } 
    }

    var isGoodsOrTrunk = function(str){
        var askTrunk = [/货讯/,
                        /求.*车/,
                        /有空?车请?速?来?电/,
                        /有回[程头]车/,
                        /有货[从去回到,，。]/,
                        /[求找]回[程头]车/,
                        /[需要].*回[程头]车/,
                        /回程车请?速电/,
                        /[需要].*的车/,
                        /能带/,
                        /有空?车回?的?请?(电话)?联系/,
                        /有空?车(回的)?请?致电/,
                        /有.*的货带回.*/,
                        /有货带去/,
                        /有货(\d+吨|\d+个?方)/,
                        /有(\d+吨|\d+个?方)的?货/,
                        /有.*去.*的货.*装/, //下午有大亚湾去韶关的货7.6米厢车下午6点装
                        ];
        var askGoods = [/车讯/,
                        /有货的?请?[联系|来电]/,
                        /有.*车.*[回到去]/,
                        /有去往?.*的.*车[，。]/,
                        /空车/,
                        /待货/,
                        /代货/,
                        /有需?要空?车的/,
                        /有(需?要)?带货的?(老板)?.?(可以)?请?.?联系/,
                        /有货带的(老板)?请?/,
                        /有货源的老板请电/,
                        /求.*货/];

        var flag = false;
        var msg = "不知道是货源还是车源";
        console.log(str);
        $.each(askTrunk,function(k,v){
            if(flag==false){
                var ret = v.exec(str);
                if(ret){
                    console.log("1.货源");
                    console.log("2." + v);
                    flag =  "goods";
                    msg = "success";
                }
            }
            
        });

        if(flag==false){
            $.each(askGoods,function(k,v){
                if(flag==false){
                    var ret = v.exec(str);
                    if(ret){
                        console.log("1.车源");
                        console.log("2." + v);
                        flag =  "trunk";
                        msg = "success";
                    }
                }
            });
        }
        
        if(flag==false){
            if (getGoodsName(str) != "普货"){
                flag = "goods";
                msg = "success";
            }
        }
        return  {
            result: flag,
            msg : msg
        };;
    }

    var isNotRubish = function(data){
        if(data.content.length >70){
            return {
                result : false,
                msg : "太长了"
            };
        };

        var rubish = [/长短期合作/,
                        /每天/,
                        /长年有效/,
                        /长期有效/,
                        /出租/,
                        // /转让/
                        /税/
                        ];
        var flag = true;
        var msg = "success";

        $.each(rubish,function(k,v){
            var ret = v.exec(data.content);
            if(ret){
                flag =  false;
                msg = "垃圾信息";
            }
        });

        return {
            result : flag,
            msg : msg
        }



    }

    var retData = {};


    var getBillTime = function(data){
        return data.time/1000;
    }

    var getValidTimeSec = function(data){
        var time = 8 * 60 * 60; //8小时有效期
        if((new Date()).getHours()>=19  || data.content.indexOf("明天")>=0 ){
            time = 24 * 60 * 60;
        }
        return time;
    }

    var getComment = function(data){
        pattern=/\d{11}|\d{7,8}|\d{3,4}-\d{7,8}/g;
        var a = data.content;

        var phone = a.match(pattern);

        if(phone){
            $.each(phone,function(k,v){
                a = a.replace(v,"");
            });
        }
        a = a.replace(/,+/g,",").replace(/，+/,"，");

        if(a[a.length-1] == "，" || a[a.length-1] == ","){
            a = a.substring(a,a.length-1);
        }

        a = a.replace(/<.*>/g,""); //去掉Html
        a = a.replace(/[\'\"\r\n]/g,""); //去掉' " 
        a = a.replace(/(货讯：?:?|车讯：?:?)/g,"");   //去掉货讯车讯
        a = a.replace(/(QQ)?上?恕?不回复?/g,"");
        a = a.replace(/Q/g,"");

        
        a = a.replace(/[自定义表情]/g,"");
        a = a.replace(/群内不回?复?/g,"");
        
        return a;
    };

    var getSenderName = function(billType, str, fromTo,phonenum){
        var names = ['王','李','张','刘','陈','杨','赵','黄','周','吴','徐','孙','胡','朱',
            '林','何','郭','梁','宋','郑','唐','韩','冯','董','萧','程','曹','谭','余','任',
            '袁','邓','沈','曾','吕','苏','卢','蒋','蔡','贾','薛','魏','章'];
        var name;
        if(billType.result == "goods"){
            name= "货源";
        }else{
            name= "车源";
        }

        var str = str.replace(fromTo.from, "").replace(fromTo.to, "").replace("回程","");

        $.each(names,function(k,v){
            if(str.indexOf(v)>=0){

                var phonenumIndex = str.indexOf(phonenum);
                var nameIndex = str.indexOf(v);
                var flag = false;
                if(nameIndex>phonenumIndex && nameIndex -phonenumIndex < 15){
                    flag = true;
                }else if(nameIndex < phonenumIndex && phonenumIndex - nameIndex< 5){
                    flag = true;
                }
                if(flag){
                    if(billType == "goods"){
                        name= v + "先生";
                    }else{
                        name= v + "师傅";
                    }
                }
                
            }
        });
        return name;

    }

    var getWeight =function(str){
        var pattern=/\d+吨|\d+\.\d+吨/;
        var ret = pattern.exec(str);
        if(ret){
            return ret[0].split("吨").join("");
        }else{
            var pattern2=/\d+T|\d+\.\d+T/;
            var ret = pattern.exec(str);
            if(ret){
                return ret[0].split("T").join("");
            }else{
                return null;
            }
        }
    }

    var getGoodsName = function(str){
        var names = ['泡货','布条','椅子','地砖','家具','空调','轮胎','百货','设备',
                '零件','钢管','机械','建材','纸巾','木材','铁粉','塑胶','塑料','饮料',
                '玻璃','饲料','挖机','石材','托盘','推土机','树苗','海绵','重货',
                '铝板','纸箱','展柜','摩托车','化肥','凉茶','粗苯','石膏','鞋子',
                '钢板','不锈钢'
            ];
        var name = '普货';

            $.each(names,function(k,v){
                if(str.indexOf(v)>=0){
                    name =  v;
                }
            });

        return name;
    }

    var getVolume = function(data){
        var pattern=/\d+立*方|\d+\.\d+立*方/;
        var ret = pattern.exec(data.content);
        if(ret){
            return ret[0].split("方").join("");
        }else{
            return null;
        }
    }

    var getLength = function(data){
        var lengthMap = {
            "九米六" : "9.6米",
            "9米6": "9.6米",
            "9.6" : "9.6米",
            "9*6" : "9.6米",
            "96" : "9.6米",

            "4.2" : "4.2米",
            "四米二": "4.2米",
            "4米2": "4.2米",
            "4*2": "4.2米",
            "4.2" : "4.2米",
            "四米三": "4.3米",
            "4米3": "4.3米",
            "4*3": "4.3米",
            "4.3" : "4.3米",
            "六米八": "6.8米",
            "6米8": "6.8米",
            "6*8": "6.8米",
            "6.8" : "6.8米",
            "六米二": "6.2米",
            "6米2": "6.2米",
            "6*2": "6.2米",
            "6.2" : "6.2米",
            "七米八": "7.8米",
            "7米8": "7.8米",
            "7*8": "7.8米",
            "7.8" : "7.8米",
            "七米六": "7.6米",
            "7米6": "7.6米",
            "7*6": "7.6米",
            "7.6" : "7.6米",

            "9。6" : "9.6米",
            "4。2" : "4.2米",
            "4。3" : "4.3米",
            "6。8" : "6.8米",
        };
        var a = data.content;
        var flag = null;
        $.each(lengthMap,function(k,v){
            if(a.indexOf(k)>=0){
                flag = v;
            }
        });

        if(flag){
            return flag.split("米").join("");
        }

        var pattern=/\d+米|\d+\.\d+米/;
        var ret = pattern.exec(a);
        if(ret){
            return ret[0].split("米").join("");
        }else{
            return null;
        }
    }

    var getTrunkType = function(data){
        var a = data.content;
        if(a.indexOf("平板")>=0){
            return '平板车';
        }
        if(a.indexOf("高栏")>=0 || a.indexOf("高拦")>=0 || a.indexOf("高兰")>=0){
            return '高栏车';
        }
        if(a.indexOf("低栏")>=0 || a.indexOf("低拦")>=0 || a.indexOf("低兰")>=0){
            return '低栏车';
        }
        if(a.indexOf("箱车")>=0 || a.indexOf("厢车")>=0 || a.indexOf("箱式车")>=0 || a.indexOf("厢式车")>=0 ){
            return '厢车'
        }

        return null;
    }
    var judge = function(data){
        retData = {};
        console.log(data.content);
        if(!(retData.phoneNum = hasAtLeastOnePhoneNumer(data.content).result)){
            return hasAtLeastOnePhoneNumer(data.content);
        }

        var fromTo = hasOneFromTo(data.content);

        if(!fromTo.result){
            return fromTo;
        }else{
            retData.fromAddr = fromTo.result.from;
            retData.toAddr = fromTo.result.to;
        }

        var billType = isGoodsOrTrunk(data.content);
        if(!billType.result){
            return billType;
        }else{
            if(billType.result =="goods"){
                retData.billType = "goods";
                retData.userType = "owner";
            }else{
                retData.billType = "trunk";
                retData.userType = "driver";
            }
        }

        var rubish = isNotRubish(data);
        if(!rubish.result){
            return rubish;
        }
        

        /***************************** 开始抓数据 ******************/

        retData.billTime = getBillTime(data);
        retData.validTimeSec = getValidTimeSec(data);
        retData.comment = getComment(data);
        retData.senderName = getSenderName(billType,data.content,fromTo.result,retData.phoneNum);
        retData.sender = adminUserId;
        retData.userId = adminUserId;
        retData.qqgroup = data.groupname;
        retData.qqgroupid = data.groupid;
        retData.rawText = data.content;
        retData.sendTime = (+new Date())/1000;
        retData.editor = "teddywu";

        if(billType.result == "goods"){
            retData.price = null;
            retData.weight = getWeight(data.content);
            retData.material = getGoodsName(data.content);
            retData.volume = getVolume(data);
            retData.trunkLength = getLength(data);
        }else{
            retData.trunkType = getTrunkType(data);
            retData.trunkLength = getLength(data);
            retData.trunkLoad = getWeight(data.content);
        }

        return {
            result: retData
        };
    }

    return {
        "name": "SmartSend",
        "judge":judge
    }
})();

function showTips(str){
    alert(str);
    console.log(str);
}

function errLog(str){
    console.log("ERROR:" +str);
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

function getMessage(){
    var url = "http://www.tthcc.cn:9289/test/message/getFail";
               
    var param = {
    };
    var jqxhr = $.ajax({
        url: url,
        data: param,
        type: "GET",
        dataType: "json",
        success: function(data) {
            dataProtocolHandler(data,function(data){
                var matchCount = 0;
                $("#result").empty();

                $("#result").html("总共：" + data.length+ "<br>");
                
                $("#table").empty();

                $.each(data, function(k,v){
                    if(!(v.reason.indexOf("车源货源弄反了")>=0)){
                        return;
                    }
                    v.content = v.rawText;
                    var d = SmartSend.judge(v);

                    if(d.result){
                        matchCount ++;
                    }
                    var getOrigin = function(v){
                        var ret = "";
                        for(var i in v){
                            ret += i +":" + v[i] + "<br>";
                        }
                        return ret;
                    };
                    
                    var getResult = function(v){
                        if(d.result){
                            return "True";
                        }else{
                            return "False";
                        }
                    };

                    var getReturn = function(v){
                        if(v.result){
                            var ret = "";
                            for(var i in v.result){
                                ret += i +":" + v.result[i] + "<br>";
                            }
                            return ret;
                        }else{
                            return v.msg;
                        }
                    };

                // var template = '<tr data-id="'+v._id.$oid +'">\
                //   <td class="td-origin">'+ getOrigin(v) +'</td>\
                //   <td>'+ getResult() +'</td>\
                //   <td class="td-result">'+ getReturn(d) +'</td>\
                // </tr>';
                // if(v.billType == "trunk" && d.result.billType=="goods"){
                //     var id = v._id.$oid;
                //     var url = "http://www.tthcc.cn:9289/message/giveup";            
                //     var jqxhr = $.ajax({
                //         url: url,
                //         data: {id:id},
                //         type: "POST",
                //         dataType: "json",
                //         success: function(data) {
                //             console.log(data);
                //         },
                //         error: function(data) {
                //             errLog && errLog("getMessage");
                //         }
                //     });
                // }
                // if(v.billType == "goods" && d.result.billType=="trunk"){
                //     var id = v._id.$oid;
                //     var url = "http://www.tthcc.cn:9289/message/giveup";            
                //     var jqxhr = $.ajax({
                //         url: url,
                //         data: {id:id},
                //         type: "POST",
                //         dataType: "json",
                //         success: function(data) {
                //             console.log(data);
                //         },
                //         error: function(data) {
                //             errLog && errLog("getMessage");
                //         }
                //     });
                // }

            var template = '<tr data-id="'+v._id.$oid +'">\
                <td class="rawText">'+ v.rawText +'</td>\
                  <td class="reason">'+ v.reason +'</td>\
                  <td class="billtype">'+ v.billType +'</td>\
                  <td class="resultBilltype">'+ d.result.billType +'</td>\
                  <td class="td-result">'+ getReturn(d) +'</td>\
                </tr>';
                   $("#table").append(template);
                });
                $("#result").html($("#result").html() + "匹配：" + matchCount+ "<br>");
                $("#result").html($("#result").html() + "比例：" + matchCount/data.length * 100 + " % <br>");
                
                
                // location.href = "/";
            });
        },

        error: function(data) {
            errLog && errLog("getMessage");
        }
    });
}

// getMessage();

// $("#giveup").click(function(){

//     // $(".td-result").each(function(k,v){
//     //     if($(v).html()=="太长了"){
//     //         console.log("太长了");
//     //         console.log($(v).parent().data("id"));
//     //         var id = $(v).parent().data("id");
//     //         var url = "http://www.tthcc.cn:9289/message/giveup";            
//     //         var jqxhr = $.ajax({
//     //             url: url,
//     //             data: {id:id},
//     //             type: "POST",
//     //             dataType: "json",
//     //             success: function(data) {
//     //                 console.log(data);
//     //             },

//     //             error: function(data) {
//     //                 errLog && errLog("getMessage");
//     //             }
//     //         });
//     //     }
//     // });

//     $(".td-origin").each(function(k,v){
//         if($(v).html().indexOf("QQ不") >=0){
//             console.log("QQ不");
//             console.log($(v).parent().data("id"));
//             var id = $(v).parent().data("id");
//             var url = "http://www.tthcc.cn:9289/message/giveup";            
//             var jqxhr = $.ajax({
//                 url: url,
//                 data: {id:id},
//                 type: "POST",
//                 dataType: "json",
//                 success: function(data) {
//                     console.log(data);
//                 },

//                 error: function(data) {
//                     errLog && errLog("getMessage");
//                 }
//             });
//         }
//     });
    
// });
// $.each(_d,function(k,v){
//     console.log(SmartSend.judge(v).result);
//     console.log(SmartSend.judge(v).msg);
// });
