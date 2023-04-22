function response(room, msg, sender, isGroupChat, replier) {
    if (msg == "파일럿봇 커멘드" || msg == "/?") {
        replier.reply("{Virtual 파일럿 Info BOT}\n\n" + sender + "님 안녕하세요, 키워드를 알려드리겠습니다\n\n/? - 파일럿봇 설명서\n/! - 사용시 유의점\n/atc - 현재 한국공역 atc 를 불러온다\n/pilot - 현재 한국공역 파일럿을 불러온다\n/taf ICAO - 공항 TAF 정보를 불러온다\n/metar ICAO - 공항 metar 정보를 불러온다\n/icao ICAO - icao 정보를 불러온다\n")
    }
    if (msg == "/!") {
        
    }
    if (msg == "/notam") {
        replier.reply("데이터를 불러오는데 20초이상 걸리신다면 재시도 해주시기 바랍니다.")
        var data = Utils.getWebText("http://www.vatkor.net/xe/notice");
        var data2 = data.split('<a href="/xe/index.php?mid=notice&amp;sort_index=readed_count&amp;order_type=desc">조회 수</a></span></th> ');
        var data3 = data2[1].split("</tbody>");
        var data4 = data3[0].replace(/(<([^>]+)>)/g, "");
        data4 = data4.replace(/ /g, "");
        data4 = data4.trim();
        replier.reply("노탐\n\n\n" + data4 + "\n\n\n자세한 노탐 내용은\nhttp://www.vatkor.net/xe/notice\n에서 확인 부탁드립니다.");
    }
    if (msg.indexOf("/metar ") != -1) {
        replier.reply("데이터를 불러오는데 20초이상 걸리신다면 재시도 해주시기 바랍니다.")
        var data = Utils.getWebText("http://wxweb.meteostar.com/cgi-bin/metartafsearch/both.cgi?choice=" + msg.substr(7))
        var data2 = data.split('<hr> <font color="red"><b>');
        var data3 = data2[1].split('<br><br>______________________________________<br>');
        var data4 = data3[0].replace(/(<([^>]+)>)/g, "");
        data4 = data4.replace(/  /g, "");
        data4 = data4.trim();
        if (data4 == "METAR: ______________________________________\n TAF:") {
            replier.reply("ICAO가 올바르지 않거나, METAR 정보가 존재하지 않습니다")
        } else {
            replier.reply(data4);
        }
    }
    if (msg.indexOf("/taf ") != -1) {
        replier.reply("데이터를 불러오는데 20초이상 걸리신다면 재시도 해주시기 바랍니다.")
        var data = Utils.getWebText("http://wxweb.meteostar.com/cgi-bin/metartafsearch/both.cgi?choice=" + msg.substr(5))
        var data2 = data.split('<hr> <font color="BLUE"><b>');
        var data3 = data2[1].split('</div>');
        var data4 = data3[0].replace(/<br>/g, "\n");
        var data4 = data3[0].replace(/(<([^>]+)>)/g, "");
        data4 = data4.replace(/  /g, "");
        data4 = data4.trim();
        if (data4 == "TAF:") {
            replier.reply("ICAO가 올바르지 않거나, TAF 정보가 존재하지 않습니다")
        } else {
            replier.reply(data4);
        }
    }
    if (msg == "/atc") {
        replier.reply("데이터를 불러오는데 20초이상 걸리신다면 재시도 해주시기 바랍니다.")
        var data = Utils.getWebText("http://www.vatkor.net/xe/status");
        var data2 = data.split('<table width="277" border="0" cellpadding="0" cellspacing="0" class="font">');
        var data3 = data2[1].split("</tbody>");
        var data4 = data3[0].replace(/(<([^>]+)>)/g, "");
        data4 = data4.replace(/ /g, "");
        data4 = data4.trim();
        if (data4 == "NoATC") {
            replier.reply("관제사가 없습니다.")
        } else {
            replier.reply("관제사 현황\n\n\n" + data4)
        }
    }
    if (msg == "/pilot") {
        replier.reply("데이터를 불러오는데 20초이상 걸리신다면 재시도 해주시기 바랍니다.")
        var data = Utils.getWebText("http://www.vatkor.net/xe/status");
        var data2 = data.split('</table><br><br><img src="/images/flight_status.jpg" width="277" height="70" border="0"><br>');
        var data3 = data2[1].split("</table><br>&nbsp;<p></p> </td>");
        var data4 = data3[0].replace(/(<([^>]+)>)/g, "");
        data4 = data4.replace(/ /g, "");
        data4 = data4.trim();
        if (data4 == "NoFlight") {
            replier.reply("비행편이 존재 하지 않습니다.")
        } else {
            replier.reply("파일럿 현황\n\n\n" + data4)
        }
    }
    /* if (msg.indexOf("/icao ") != -1) {
    try{
          var icaos = Utils.getWebText("https://flightplandatabase.com/airport/"+msg.substr(6))
        var icao1 = icaos.split('<span itemprop="icaoCode">');
        var icao2 = icao1[1].split("<td>Plans</td>");
                var icao = icao2[0].replace(/(<([^>]+)>)/g, "").replace(/          /g, "").trim();
        replier.reply(icao)
    }catch(error){
    replier.reply("에러 정보: "+error+"\n\n해당공항 정보가 존재하지 않습니다")
    }
    }*/
    if (msg.indexOf("/icao ") != -1) {
        try {
            var data = Utils.getWebText("http://www.aircharterguide.com/AirportSearch.aspx?SearchText=" + msg.substr(6))
            var data2 = data.split('<span id="ctl00_ctl00_MainContent_ContentPlaceHolderResults_lvAirports_ctrl0_lblLocation">');
            var data3 = data2[1].split("</span>");
            var data4 = data3[0].replace(/(<([^>]+)>)/g, "").replace(/&nbsp;/g, "")
            data4 = data4.trim();
            replier.reply(data4)
        } catch (error) {
            replier.reply("에러 정보: " + error + "\n\n해당공항 정보가 존재하지 않습니다")
        }
    }
}
//이 아래 4가지 메소드는 스크립트 액티비티를 수정할 때 사용하는 메소드들
function onCreate(savedInstanceState, activity) {}

function onResume(activity) {}

function onPause(activity) {}

function onStop(activity) {}