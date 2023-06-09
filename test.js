const scriptName = "test.js";

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName) {
    if (msg.indexOf("화학식검사 ") != -1) {
        replier.reply("화학식을 검사중입니다..")
        try {

            var data = Utils.getWebText("https://www.webqc.org/balance.php?reaction=" + encodeURIComponent(msg.substr(6)))

            var data2 = data.split('<span class="green">Balanced equation</span>:<br> ');
            var data3 = data2[1].split('<br>');
            var data4 = data3[0].replace(/(<([^>]+)>)/g, "");
            data4 = data4.replace(/  /g, "");
            data4 = data4.trim();
            replier.reply("조금 틀린거 같은데요..?\n제가 한번 추천 해봤어요!\n\n" + data4)
        } catch (e) {
            replier.reply("식이 완성되지 않았습니다.")
        }
    }
    try {
        if (msg.indexOf("/롤전적") == 0) {
            msg = msg.replace(/ /g, "+");
            var u = Utils.getWebText("http://www.op.gg/summoner/userName=" + msg.substr(4));
            var t = u.split("<span class=\"tierRank\">");
            var w = u.split("<span class=\"wins\">");
            var l = u.split("<span class=\"losses\">");
            var win = u.split("<span class=\"winratio\">");
            replier.reply(msg.substr(5) + "님의 롤 전적 검색결과 입니다\n티어 : " + t[1].split("<")[0] + "\n승리 : " + w[1].split("<")[0] + "\n패배 : " + l[1].split("<")[0] + "\n승률 : " + win[1].split("<")[0]);
            //
        }
    } catch (e) {
        replier.reply("롤전적 정보가 없습니다");
    }
    if (msg.indexOf("뭐야") != -1) {
        replier.reply(namuWiki(msg))
    }
}

function namuWiki(tparam) {
    var html;
    var content;
    html = Utils.getWebText("https://namu.wiki/go/" + encodeURI(tparam));
    if (html.indexOf("검색 결과 - 나무위키</title>") == -1) {
        html = html.replace(/\n/gm, "");
        html = html.replace(/<div class="wiki-table-wrap".*?>.*?<\/div>/g, "");
        html = html.replace(/<blockquote.*?<\/blockquote>/g, "");
        if (html.indexOf("<h2 class=\"wiki-heading\"") != -1) {
            html = html.split("<h2 class=\"wiki-heading\"")[1];
            html = html.split(/<div class=\"wiki-heading-content\".*?>/gm)[1];
            if (html == "") {
                proom = tempRoom;
                return null;
            }
            var i = 1;
            if (html.indexOf("<p>") != -1) {
                for (i = 1; i < html.split("<p>").length; i++) {
                    if (html.split("<p>")[i].split("</p>")[0].replace(/<br.*?>/gm, "").replace(/<.*?>/gm, "").replace(/&#91;.*?&#93;/gm, "") != "") {
                        html = html.split("<p>")[i].split("</p>")[0];
                        break;
                    }
                }
            }
            html = html.replace(/<br.*?>/gm, "\n").replace(/<.*?>/gm, "").replace(/\[.*?]/gm, "").replace(/&#91;.*?&#93;/gm, "");
        } else {
            html = html.split("<p>")[1].split("</p>")[0].replace(/<br.*?>/gm, "\n").replace(/<.*?>/gm, "").replace(/\[.*?]/gm, "");
        }
        content = html.split(".")[0];
        if (content.split(".")[0].replace(/\n/gm, "").replace(/ /gm, "") == "") {
            content = "";
        }
        return content.trim();
    } else {
        return null;
    }
}

function onStartCompile() {
    /*컴파일 또는 Api.reload호출시, 컴파일 되기 이전에 호출되는 함수입니다.
     *제안하는 용도: 리로드시 자동 백업*/

}