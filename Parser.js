function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    //以下为示例，您可以完全重写或在此基础上更改
    var $ = cheerio.load(html, { decodeEntities: false });
    $(".oldschedule tr").each(
            function (i) {
                //console.log(i)
                if (i > 1) {
                    $(this).children('td').each(function (j) {
                        //console.log(j)
                        if ((i - 1) == 1 || (i - 1) == 6 || (i - 1) == 10 ){
                            if (j > 0) {
                                var classA = [].concat(getClassUser($(this).html(), (j - 1), (i - 1)));
                                if (classA.length === 1) {
                                    jsonArray.push(classA[0]);
                                } else if (classA.length === 2) {
                                    jsonArray.push(classA[0]);
                                    jsonArray.push(classA[1]);
                                }
                                //console.log("第"+(i-1)+"节课，周"+(j-1)+"课程名称："+$(this).html());
                            }
                        }
                        else{
                            if (j > 0) {
                                var classA = [].concat(getClassUser($(this).html(), j, (i - 1)));
                                if (classA.length === 1) {
                                    jsonArray.push(classA[0]);
                                } else if (classA.length === 2) {
                                    jsonArray.push(classA[0]);
                                    jsonArray.push(classA[1]);
                                }
                                //console.log("第"+(i-1)+"节课，周"+(j)+"课程名称："+$(this).html());
                            }                            
                        }
                    })
                }
            }
        )
    
    var jsonArray1 = JSON.stringify(jsonArray);
    var time1 = JSON.stringify(time);
    var conss = new Object();
    conss.courseInfos = JSON.parse(jsonArray1);
    conss.sectionTimes = JSON.parse(time1);
    var json2 = JSON.stringify(conss);
    // console.info(jsonArray);
    // return JSON.parse(json2);
    // console.log(jsonArray);
    return jsonArray;

}

function getClassUser(classHtml, day, section) {
    var classA = [];
    var classs = classHtml.split('<br>').filter(function(n){return n});
    //console.log(classs)

    if (classs.length > 1) {
        //当课程为标准课程
        var classObj1 = {};
        classObj1.name = classs[0];
        classObj1.position = classs[3];
        classObj1.teacher = classs[2];
        classObj1.weeks = [].concat(getWeeksUser(classs[1]));
        classObj1.day = day;
        classObj1.sections = [];
        if (classs[1].indexOf(',') != -1){
            classObj1.sections.push(time[(section - 1)]);
            classObj1.sections.push(time[(section)]);
        }else{
            classObj1.sections.push(time[(section) - 1]);
        }
        classA.push(classObj1);

        // 多课程
        if (classs.length > 7){
            for (var i = 4; i<classs.length; i += 4){
                if (classs[i] == classs[0]){
                    console.log(classs[i])
                    var classObj1 = {};
                    classObj1.name = classs[i];
                    classObj1.position = classs[i+3];
                    classObj1.teacher = classs[i+2];
                    classObj1.weeks = [].concat(getWeeksUser(classs[i+1]));
                    classObj1.day = day;
                    classObj1.sections = [];
                    if (classs[i+1].indexOf(',') != -1){
                        classObj1.sections.push(time[(section - 1)]);
                        classObj1.sections.push(time[(section)]);
                    }else{
                        classObj1.sections.push(time[(section) - 1]);
                    }
                    classA.push(classObj1);
                } else{
                    var classObj1 = {};
                    classObj1.name = classs[i];
                    classObj1.position = classs[i+3];
                    classObj1.teacher = classs[i+2];
                    classObj1.weeks = [].concat(getWeeksUser(classs[i+1]));
                    classObj1.day = day;
                    classObj1.sections = [];
                    if (classs[i+1].indexOf(',') != -1){
                        classObj1.sections.push(time[(section - 1)]);
                        classObj1.sections.push(time[(section)]);
                    }else{
                        classObj1.sections.push(time[(section) - 1]);
                    }
                    classA.push(classObj1);                    
                }
            }
        }          
         
    }
    return classA;
}


function getWeeksUser(weeksHtml) {
    var weeksStr = weeksHtml;
    var weeksA = [];
    if (weeksStr.indexOf('-') != -1) {
        var weeksA1 = weeksHtml.split('-');
        var start = 0;
        var end = 0;
        if (weeksA1[0][weeksA1[0].length - 2] != '第') {
            start = parseInt(weeksA1[0][weeksA1[0].length - 2] + weeksA1[0][weeksA1[0].length - 1])
        } else {
            start = parseInt(weeksA1[0][weeksA1[0].length - 1])
        }

        if (weeksA1[1][1] != '周') {
            end = parseInt(weeksA1[1][0] + weeksA1[1][1])
        } else {
            end = parseInt(weeksA1[1][0])
        }

        if (weeksStr.indexOf('单') != -1) {
            for (var i = start; i <= end; i = i + 2) {
                weeksA.push(i);
            }
        } else if (weeksStr.indexOf('双') != -1) {
            for (var i = start; i <= end; i = i + 2) {
                weeksA.push(i);
            }
        } else {
            for (var i = start; i <= end; i++) {
                weeksA.push(parseInt(i))
            }
        }
    }
    return weeksA;
}
var jsonArray = []
var time = [
        {"section": 1,"startTime": "08:00","endTime": "08:45"},
        {"section": 2,"startTime": "08:50","endTime": "09:35"},
        {"section": 3,"startTime": "09:55","endTime": "10:40"},
        {"section": 4,"startTime": "10:45","endTime": "11:30"},
        {"section": 5,"startTime": "11:35","endTime": "12:20"},
        {"section": 6,"startTime": "13:00","endTime": "13:45"},
        {"section": 7,"startTime": "13:50","endTime": "14:35"},
        {"section": 8,"startTime": "14:50","endTime": "15:35"},
        {"section": 9,"startTime": "15:40","endTime": "16:25"},
        {"section": 10,"startTime": "16:30","endTime": "17:15"},
        {"section": 11,"startTime": "17:30","endTime": "18:15"},
    ] 