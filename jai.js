//자이봇 response.js
var player = null;
var ud = 0;
var q = 0;
var power = false;
var pw = String(Math.round(Math.random() * 10000))
var prefix = "/";
var botOff = false;
var ps = "";
var que = [];
var ans = [];
var chats = [];
const chater = [];
var chating;

var 주사위 = Math.floor(Math.random() * 7) + 1;
var chat = {};
String.prototype.replaceAll = function(be, af) {
    return String(this).split(be).join(af);
}
var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
var folder = new java.io.File(sdcard + "/Jaidb/badwordsc/");
var 관리자 = ["⸢Cscientist⸥ * DEVP", "DEBUG$MODE*NAME+", "재희"];
var 인증 = "관리자.indexOf(sender) != -1"
var badwords_list = new Array();
badwords_list = readFile("kbot/badwords.txt").split("nn");
var blist = java.io.File(sdcard + "/Jaidb/blacklist").listFiles().join("");
blist = blist.replace(/\/storage\/emulated\/0\/Jaidb\/blacklist\//g, "");
blist = blist.replace(/.txt/g, "&&");
var black = blist.split("&&").slice(0, -1);
var list = java.io.File(sdcard + "/Jaidb/whitelist").listFiles().join("");
list = list.replace(/\/storage\/emulated\/0\/Jaidb\/whitelist\//g, "");
list = list.replace(/.txt/g, "&&");
var white = list.split("&&").slice(0, -1);
var alist = java.io.File(sdcard + "/Jaidb/account").listFiles().join("");
alist = list.replace(/\/storage\/emulated\/0\/Jaidb\/account\//g, "");
alist = list.replace(/.txt/g, "&&");
var acc = list.split("&&").slice(0, -1);
folder.mkdirs();

function save(folderName, fileName, str) {
    var c = new java.io.File(sdcard + "/" + folderName + "/" + fileName);
    var d = new java.io.FileOutputStream(c);
    var e = new java.lang.String(str);
    d.write(e.getBytes());
    d.close();
}


function createClock(size) {
    var data = []
    for (var i = 0; i < size; i++) {
        var line = [];
        for (var j = 0; j < size; j++)
            line.push('□');
        data.push(line);
    }
    var angle = (new Date().getMinutes() + 15) / 30 * Math.PI;
    var angleh = (new Date().getHours() + 3) / 6 * Math.PI + (angle / 12);
    var radius = (size) / 2;
    var angles = (new Date().getSeconds() + 3) / 30 * Math.PI;
    for (i = 0; i < radius; i++) {
        var x = Math.floor(radius - Math.sin(angles) * i)
        var y = Math.floor(radius - Math.cos(angles) * i)
        data[x][y] = '▒'
        var x = Math.floor(radius - Math.sin(angle) * i)
        var y = Math.floor(radius - Math.cos(angle) * i)
        data[x][y] = '■'

        var x = Math.floor(radius - Math.sin(angleh) * i)
        var y = Math.floor(radius - Math.cos(angleh) * i)
        if (i < size / 4)
            data[x][y] = '█'
    }
    for (var i = 0; i < 360; i += 8) {
        data[Math.floor(Math.sin(i / 180 * 3.14) * (size - 1) / 2 + size / 2)][Math.floor(Math.cos(i / 180 * 3.14) * (size - 1) / 2 + size / 2)] = '▓'
    }
    var result = [];
    for (var i = 0; i < data.length; i++) result.push(data[i].join(''));
    return result.join('\n');

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
        return "잘 모르겠어요..ㅎ";
    }
}


function read(folderName, fileName) {
    var b = new java.io.File(sdcard + "/" + folderName + "/" + fileName);
    if (!(b.exists())) return null;
    var c = new java.io.FileInputStream(b);
    var d = new java.io.InputStreamReader(c);
    var e = new java.io.BufferedReader(d);
    var f = e.readLine();
    var g = "";
    while ((g = e.readLine()) != null) {
        f += "\n" + g;
    }
    c.close();
    d.close();
    e.close();
    return f.toString();
}

function readFile(path) {
    var br = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Jaidb/badWords.txt"))),
        tmp, ret = "";
    while ((tmp = br.readLine()) != null) { ret += tmp + "\n"; };
    return ret;
}

function response(room, msg, sender, isGroup, replier) {
    var premessage = msg;
    if (black.indexOf(sender) != -1) return;

    if (msg == "Jaibotconnect@" && 관리자.indexOf(sender) != -1) {

        botOff = false;

        replier.reply("봇이 켜졌습니다!");

    } else if (msg == "Jaibotdisconnect@" && 관리자.indexOf(sender) != -1) {



        botOff = true;

        replier.reply("다음에 만나요!");

    }
    if (botOff) return;


    if (관리자.indexOf(sender) != -1 && msg.indexOf("관리자 권한 ") == 0) {
        replier.reply("{최고관리자 시스템}\n" + msg.substr(7) + "님을 화이트리스트에 넣었습니다.");
        var folder = new java.io.File(sdcard + "/Jaibot/whitelist/");
        folder.mkdirs();
        save("Jaidb/whitelist", msg.substr(7) + ".txt");
    }
    if (관리자.indexOf(sender) != -1 && msg.indexOf("블랙 리스트 ") == 0) {
        replier.reply("{최고관리자 시스템}\n" + msg.substr(7) + "님을 차단하였습니다.");
        var folder = new java.io.File(sdcard + "/Jaidb/blacklist/");
        folder.mkdirs();
        save("Jaidb/blacklist", msg.substr(7) + ".txt");
    }
    var replace_special_str = msg.replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi, "");
    var bad_words = [];
    var badword_scan = 0;
    for (var i = 0; i < badwords_list.length; i++) {
        if (replace_special_str.indexOf(badwords_list[i]) != -1) {
            badword_scan = 1;
            bad_words.push(badwords_list[i]);
        }
    }
    /*if(badword_scan == 1) {
    replier.reply("(곤란)");
            if(read("Jaidb/badwordsc",sender +".txt")==null) {
        save("Jaidb/badwordsc",sender +".txt","0");
        replier.reply("처음으로 욕을 쓰셨군요!!\n새로운 리스트를 만듭니다!");
        }
        var gung = read("Jaidb/badwordsc",sender +".txt");
        gung=Number(gung)+1
        replier.reply("<"+gung+"/10> 번째 경고입니다");
        save("Jaidb/badwordsc",sender+".txt",gung);
        if(gung >9) {
        replier.reply("경고횟수가초과 됬네요.. 우리 절교해요!\n자동으로 차단되었습니다")
            var folder = new java.io.File(sdcard+"/Jaidb/blacklist/");
        folder.mkdirs();
        save("Jaidb/blacklist",sender+".txt");
        }
      } 개선될때까지 중지합니다*/
    msg = msg.trim();


    if (msg == "자이야") {
        var a = Math.floor(Math.random() * 3);
        if (a == "0") {
            replier.reply("나불렀어?");
        }
        if (a == "1") {
            replier.reply("왜? 자이봇 설명서 라고 쳐봐!");
        }
        if (a == "2") {
            replier.reply("네, 형님 왜 부르셨어요?");
        }

    }
    if (msg == "투명문자") {
        replier.reply("\n")
    }

    if (msg.split(" ")[0] == "국어사전") {
        try {
            replier.reply(Utils.getWebText("http://stdweb2.korean.go.kr/search/List_dic.jsp?PageRow=100&Table=words%7Cword&Gubun=0&SearchPart=Simple&SearchText=" + encodeURI(msg.substr(5))).split("<span id=\"print_area\">")[1].split("<!-- paging.jsp -->")[0].replace(/(<([^>]+)>)/gi, "").replace(/ /g, "\n").replace(/&nbsp;/g, ""));
        } catch (error) {
            replier.reply("검색 결과가 없습니다.");
        }
    }
    if (msg == "/eval") {
        pw = String(Math.round(Math.random() * 10000))
        Api.replyRoom("재희", pw);
        replier.reply("비밀번호가 관리자 계정으로 보내졌습니다.")
    }
    try {
        if (msg.indexOf(pw) == 0 && sender == "재희") {
            var a = msg.split(" ")[1];
            replier.reply(eval(a));
        }
    } catch (e) {
        replier.reply(e)
    }
    if (msg.indexOf("손목 시계") == 0) {
        replier.reply("[자이 시계]\n" + createClock(17));
    }
    if (msg.split(" ")[0] == "타이머") {
        var 초 = msg.replace("타이머", "");
        java.lang.Thread.sleep(초 * 1000);
        replier.reply("타이머가 끝났습니다.\n 설정시간:" + 초 + "초");
    }
    if (msg.split(" ")[0] == "내호감도") {
        var 호감도 = Math.floor(Math.random() * 101);
        replier.reply(sender + "님의 호감도는 " + 호감도 + "입니다 하핳");
    }
    if (msg == "주사위 굴리기") {
        replier.reply("🎲 주사위를 굴리는 중 입니다.. 도르르르르 🎲");
        replier.reply("🎲 주사위 수는 " + 주사위 + " 입니다. 🎲");
    }
    if (msg.indexOf("줄바꿈소스화") == 0) {
        replier.reply(msg.substr(7).replaceAll("\n", "\\n"));
    }
    if (msg.indexOf("학습") != -1 && white.indexOf(sender) != -1) {
        var talk0 = msg.substring(2, msg.length)
        var talk1 = talk0.split(";")
        var tlk1 = talk1[0]
        var tlk2 = talk1[1]
        replier.reply("" + tlk1 + "을(를) " + tlk2 + "(으)로 학습되었습니다");
        replier.reply("학습시 자신의 이름과 내용이 저장됨. 부적절 판단시 삭제.");
        var folder = new java.io.File(sdcard + "/Jaidb/learndb/");
        folder.mkdirs();
        save("Jaidb/learndb", tlk1.trim() + ".txt", tlk2 + "\n\n학습자 : " + sender + "입니다.")
    }
    var hask = read("Jaidb/learndb", msg + ".txt")
    if (hask !== null) {
        replier.reply(hask)
    }
    if (msg == "저작권") {
        replier.reply("[ 자이봇 ]\nCopy Right (C) Jaibot 2018");
    }
    if (msg.indexOf("암호화") == 0) {
        replier.reply("암호화\n" + encodeURIComponent(msg.substr(4)) + "\n로 암호화 되었습니다.");
    }

    if (msg.indexOf("복호화") == 0) {
        replier.reply("복호화\n" + decodeURI(msg.substr(4)) + "\n로 복호화 되었습니다.");
    }
    if (msg == "랜덤숫자") {
        var 랜덤숫자 = Math.floor(Math.random() * 999999999999999999) + 1;
        replier.reply("숫자: " + 랜덤숫자);
    }
    var h = 0;
    var chats = [];
    if (isNaN(chat[sender]) == true)
        chat[sender] = 0;
    chat[sender]++;
    for (var j = 0;
        (j + 1) <= chater.length; j++) {
        if (chater[j] == sender) {
            h = 1;
        }

    }
    if (h == 0) {
        chater.push(sender);
    }
    if (msg.trim() == "채팅량") {
        for (var i = 0;
            (i + 1) <= chater.length; i++) {
            chats.push(chater[i] + ": " + chat[chater[i]]);
        }
        replier.reply("[ 채팅량 ]\n자이봇을 사용한 모든 사람의 채팅 수가 나옵니다\n" + chats.join("\n"));
    }

    if (msg.indexOf("복권") == 0) {
        var a = Math.floor(Math.random() * 99);
        var b = Math.floor(Math.random() * 99);
        var c = Math.floor(Math.random() * 99);
        var d = Math.floor(Math.random() * 99);
        var e = Math.floor(Math.random() * 99);
        var f = Math.floor(Math.random() * 99);
        var z = msg.split(" ")[1];
        var x = msg.split(" ")[2];
        var v = msg.split(" ")[3];
        var m = msg.split(" ")[4];
        var j = msg.split(" ")[5];
        var k = msg.split(" ")[6];
        if (z == a && x == b && v == c && m == d && j == e && f == k) {
            replier.reply(sender + "님이 선택한수는\n" + z + " , " + x + " , " + v + " , " + m + " , " + j + " , " + k + "\n이고 제가 고른수는\n" + a + " , " + b + " , " + c + " , " + d + " , " + e + " , " + f + "\n입니다!복권담청!!축하드려요!!.. 와 ㄷㄷ 이거 가능 한거에요?? 관리자로 넣어 드릴테니 톡좀..ㄷㄷ");
        }
        replier.reply(sender + "님이 쓴수는\n" + z + " , " + x + " , " + v + " , " + m + " , " + j + " , " + k + "\n이고 자이가 쓴건\n" + a + " , " + b + " , " + c + " , " + d + " , " + e + " , " + f + "\n입니다!복권이 저랑 다르네용..ㅠ");
    }
    if (msg == "포커") {
        var a = [];
        var b;
        var c = [];
        var d;
        for (var i = 0; i < 7; i++) {
            b = Math.floor(Math.random() * 13);
            d = Math.floor(Math.random() * 4);
            if (b == 0) {
                a.push("A");
            } else if (b == 10) {
                a.push("J");
            } else if (b == 11) {
                a.push("Q");
            } else if (b == 12) {
                a.push("K");
            } else {
                a.push((b + 1));
            }
            if (d == 0) {
                c.push("♤");
            } else if (d == 1) {
                c.push("♢");
            } else if (d == 2) {
                c.push("♡");
            } else {
                c.push("♧");
            }
        }
        var res = c[0] + a[0] + "/";
        var res2 = c[1] + a[1] + "/";
        var res3 = c[2] + a[2] + "/\n";
        var res4 = c[3] + a[3] + "/";
        var res5 = c[4] + a[4] + "/";
        var res6 = c[5] + a[5] + "/";
        var res7 = c[6] + a[6];
        replier.reply(sender + "님이 나온 카드는 : " + res + res2 + res3 + res4 + res5 + res6 + res7 + "입니다.");
    }
    if (msg.indexOf("뭐야") != -1) {
        replier.reply(namuWiki(msg.replace(/가뭐야/g, "").replace(/가 뭐야/g, "").replace(/이 뭐야/g, "").replace(/이뭐야/g, "")))
    }

    if (msg == "디지털 시계") {
        var hour = Date().slice(16, 18);
        var minute = Date().slice(19, 21);
        var smsg = "디지털 시계\n";
        var num = [
            ["111", "101", "101", "101", "111"],
            ["001", "001", "001", "001", "001"],
            ["111", "001", "111", "100", "111"],
            ["111", "001", "111", "001", "111"],
            ["101", "101", "111", "001", "001"],
            ["111", "100", "111", "001", "111"],
            ["111", "100", "111", "101", "111"],
            ["111", "101", "101", "001", "001"],
            ["111", "101", "111", "101", "111"],
            ["111", "101", "111", "001", "001"]
        ];
        var middle = "01010";
        for (var i = 0; i < 5; i++) {
            smsg += num[hour[0]][i] + "  " + num[hour[1]][i] + "  " + middle[i] + "  " + num[minute[0]][i] + "  " + num[minute[1]][i] + "\n";
        }
        replier.reply(smsg.replace(/0/gi, "▓").replace(/1/gi, "█").slice(0, -1));
    }
    if (msg == "안녕하세요" || msg == "ㅎㅇ" || msg == "안녕") {
        replier.reply(sender + "님 안녕하세요\n\n명령어 종류를 알려드리겠습니다\n\n1)자이봇 설명서 - 자이봇 사용법이 나옵니다\n2)검색 커멘드 - 검색할수있는 사이트들이 나옵니다.");
    }
    if (msg == "가위바위보") { 
        replier.reply("가위바위보 게임을 시작합니다.\n가위, 바위, 보 중 하나를 내주세요.");
        player = sender; 
    }
    if (player == sender && (msg == "가위" || msg == "바위" || msg == "보")) {
        var result = Math.floor(Math.random() * 3);
        if (result == 0) { 
            if (msg == "가위") {
                replier.reply("난 바위지롱\n자이가 이겼습니다!");
            } else if (msg == "바위") {
                replier.reply("난 보지롱\n자이가 이겼습니다!");
            } else if (msg == "보") {
                replier.reply("난 가위지롱\n자이가 이겼습니다!");
            }
        } else if (result == 1) {
            replier.reply("난 " + msg + "지롱.\n비겨버렸네..");
        } else if (result == 2) {
            if (msg == "가위") {
                replier.reply("당신이 이겼습니다.");
            } else if (msg == "바위") {
                replier.reply("당신이 이겼습니다.");
            } else if (msg == "보") {
                replier.reply("당신이 이겼습니다.");
            }
        }
        player = null;
    }
    var Data = msg.split(" ");
    if (Data[0] == "따라해") {
        replier.reply(msg.replace("따라해", ""));
    }
    if (msg.indexOf("숫자찾기") == 0) 
    {
        msg = msg.substring(5); 
        {
            if (msg < 1) 
            {
                replier.reply("숫자의 범위는 1이상으로 해주세요\n 예시: 숫자찾기 100"); 
            }

            if (msg > 1) 
            {
                replier.reply("숫자찾기 게임을 시작합니다!\n숫자는 1~" + msg + "중에 랜덤입니다.\n하는법:.숫자 \n예시:.77");
                q = Math.floor(Math.random() * msg) + 1; 
                ud = 1; 
            }
        }
    }
    if (ud == 1 && msg.indexOf('.') == 0) 
    {
        if (msg.split('.')[1] == q) 
        {
            replier.reply(sender + "님이 정답을 말씀하셨습니다!!"); 
            replier.reply("게임이 종료됩니다.");
            ud = 0; 
        } else if (msg.split('.')[1] > q) 
        {
            replier.reply("다운"); 
        } else if (msg.split('.')[1] < q)
        {
            replier.reply("업"); 
        }
    }
    if (msg.indexOf("노래가사 ") > -1 && msg != "노래가사") {


        var lrd1 = Utils.getWebText("http://m.music.naver.com/search/search.nhn?target=lyrics&query=" + encodeURIComponent(msg.replace("노래가사 ", "")));
        lrd1 = lrd1.split("this,'.song','")[1].split("'")[0];
        var lrd2 = Utils.getWebText("http://m.music.naver.com/track/index.nhn?trackId=" + lrd1);
        lrd3 = lrd2.trim().split("</h3> \n   <div class=")[1].replace(/"mu_lyric">\n/g, "").split("</div>")[0].replace(/    /g, "").replace(/<br>/g, "").replace("\n   ", "").replace(/"mu_dsc">\n/g, "").replace(/amp;/g, "");
        var muname = lrd2.split("<dt>")[0].split("<span>")[1].split("</span>")[0].replace(/amp;/g, "");
        var muart = lrd2.split("<dt>")[1].split(/;">/g)[1].split("</a>")[0].replace(/amp;/g, "");
        var mual = lrd2.split("<dt>")[2].split(/;">/g)[1].replace(/\n     /g, "").split("\n    </dd>")[0].replace(/amp;/g, "");
        var mudt = lrd2.split("<dt>")[3].split("<dd>\n     ")[1].split("\n    </dd> \n    ")[0].replace(/amp;/g, "");
        var muja = lrd2.split("<dt>")[4].split("<dd>\n      ")[1].split("\n    </dd>")[0].replace(/amp;/g, "");

        replier.reply("노래 정보 안내" + "\n" + "음원명 - " + muname + "\n" + "아티스트 - " + muart + "\n" + "앨범 - " + mual + "\n" + "발매일 - " + mudt + "\n" + "장르 - " + muja + "\n" + "\n" + "\n" + "\n" + lrd3);
    }
    if (msg == "검색 커멘드") {
        replier.reply("[ 검색어 ] 명령어 안내" + "\n" + "\n" + "<포털사이트 검색>" + "\n" + "  #네이버" + "\n" + "    →" + prefix + "네이버 <검색어>" + "\n" + "\n" + "  #다음" + "\n" + "    →" + prefix + "다음 <검색어>" + "\n" + "\n" + "  #네이트" + "\n" + "    →" + prefix + "네이트 <검색어>" + "\n" + "\n" + "  #줌" + "\n" + "    →" + prefix + "줌 <검색어>" + "\n" + "\n" + "  #구글" + "\n" + "    →" + prefix + "구글 <검색어>" + "\n" + "\n" + "  #빙" + "\n" + "    →" + prefix + "빙 <검색어>" + "\n" + "\n" + "<영상>" + "\n" + "  #유튜브" + "\n" + "    →" + prefix + "유튜브 <검색어>" + "\n" + "\n" + "  #V LIVE" + "\n" + "    →" + prefix + "브이 <검색어>" + "\n" + "\n" + "  #네이버 TV" + "\n" + "    →" + prefix + "네이버티비 <검색어>" + "\n" + "\n" + "<지도>" + "\n" + "  #네이버 지도" + "\n" + "    →" + prefix + "네이버지도 <검색어>" + "\n" + "\n" + "  #Daum 지도" + "\n" + "    →" + prefix + "다음지도 <검색어>" + "\n" + "\n" + "  #구글 맵스" + "\n" + "    →" + prefix + "구글지도 <검색어>" + "\n" + "\n" + "<사전>" + "\n" + "  #나무위키" + "\n" + "    →" + prefix + "나무위키 <검색어>" + "\n" + "\n" + "  #위키피디아" + "\n" + "    →" + prefix + "위키백과 <검색어>" + "\n" + "\n" + "  #디시위키" + "\n" + "    →" + prefix + "디시위키 <검색어>" + "\n" + "\n" + "  #네이버 어학사전" + "\n" + "    →" + prefix + "어학사전 <검색어>" + "\n" + "\n" + "<커뮤니티>" + "\n" + "  #디시인사이드" + "\n" + "    →" + prefix + "디시 <검색어>" + "\n" + "\n" + "  #디시인사이드 갤러리" + "\n" + "    →" + prefix + "디시갤 <검색어>" + "\n" + "\n" + "  #엠엘비파크" + "\n" + "    →" + prefix + "엠팍 <검색어>" + "\n" + "\n" + "<음악사이트>" + "\n" + "  #네이버뮤직" + "\n" + "    →" + prefix + "네뮤 <제목/뮤지션>" + "\n" + "\n" + "  #엠넷닷컴" + "\n" + "    →" + prefix + "엠넷 <제목/뮤지션>" + "\n" + "\n" + "  #벅스" + "\n" + "    →" + prefix + "벅스 <제목/뮤지션>" + "\n" + "\n" + "  #소리바다" + "\n" + "    →" + prefix + "소리바다 <제목/뮤지션>" + "\n" + "\n" + "  #몽키3뮤직" + "\n" + "    →" + prefix + "몽키 <제목/뮤지션>" + "\n" + "\n" + "  #가온차트" + "\n" + "    →" + prefix + "가온차트" + "\n" + "\n" + "  #엠넷차트" + "\n" + "    →" + prefix + "엠넷차트" + "\n" + "\n" + "  #네이버뮤직 차트" + "\n" + "    →" + prefix + "네뮤차트" + "\n" + "\n" + "  #벅스차트" + "\n" + "    →" + prefix + "벅스차트" + "\n" + "\n" + "  #지니차트" + "\n" + "    →" + prefix + "지니차트" + "\n" + "\n" + "  #몽키3차트" + "\n" + "    →" + prefix + "몽키차트" + "\n" + "\n" + "  #소리바다차트" + "\n" + "    →" + prefix + "소리바다차트" + "\n" + "\n" + "<쇼핑몰>" + "\n" + "  #옥션" + "\n" + "    →" + prefix + "옥션 <품명>" + "\n" + "\n" + "  #G마켓" + "\n" + "    →" + prefix + "지마켓 <품명>" + "\n" + "\n" + "  #11번가" + "\n" + "    →" + prefix + "십일번가 <품명>" + "\n" + "\n" + "  #쿠팡" + "\n" + "    →" + prefix + "쿠팡 <품명>" + "\n" + "\n" + "  #에누리닷컴" + "\n" + "    →" + prefix + "에누리 <품명>" + "\n" + "\n" + "  #다음 쇼핑하우" + "\n" + "    →" + prefix + "다음쇼핑 <품명>" + "\n" + "\n" + "  #네이버쇼핑" + "\n" + "    →" + prefix + "네이버쇼핑 <품명>" + "\n" + "\n" + "<서점>" + "\n" + "  #교보문고" + "\n" + "    →" + prefix + "교보 <품명>" + "\n" + "\n" + "  #YES24" + "\n" + "    →" + prefix + "예스 <품명>" + "\n" + "\n" + "<중고사이트>" + "\n" + "  #중고나라" + "\n" + "    →" + prefix + "중고 <품명>" + "\n" + "\n" + "  #번개장터" + "\n" + "    →" + prefix + "번개 <품명>");
    if (msg.indexOf("사랑해") != -1) {
        replier.reply("저도요~!");
        replier.reply("(하트)");
    }
    if (msg == "실검") {
        var ns = Utils.getWebText("https://datalab.naver.com/keyword/realtimeList.naver?where=search&mobile");
        ns = ns.split("</ul>")[8]
        var ns2 = ns.split("</strong>")[0].replace(/(<([^>]+)>)/g, "").replace(/\n/g, "").trim();
        ns2 = ns2.replace("(", " (").replace(")", ") ");
        const list = [];
        for (let i = 1; i < 21; i++) {
            list.push(i + '위 - ' + ns.split("<span class=\"title\">")[i].split("<")[0]);
        }
        replier.reply('[ 네이버 실검 ] ' + ns2 + ' 네이버 실검' + '\n' + list.join('\n'));
    }



    if (msg.split(" ")[0] == "글자수 ") {
        replier.reply(msg.substr(4).split('').length + "개")
    }
    if (msg == "날씨 알려줘") {
        var data = Utils.getWebText("https://m.search.naver.com/search.naver?query=날씨");
        var data2 = data.split("전국날씨</strong>");
        var data3 = data2[1].split("특보");
        var data4 = data3[0].replace(/(<([^>]+)>)/g, "");
        data4 = data4.trim();
        data4 = data4.replace(/  /g, "");
        data4 = data4.replace(/도씨/g, "℃");
        data4 = data4.replace(/ /g, ", ");
        replier.reply("[한국 현재 날씨]\n" + data4);
    }
    for (var n = 0; n < que.length; n++) {
        if (que[n] == msg) {
            replier.reply(ans[n]);
            break;
        }
    }
    if (msg.trim() == "자이봇 상태") {
        var fill = ["알수없음", "충전중", "충전중 아님", "충전완료 후 충전중 아님", "충전 완료"];
        var heal = ["알수없음", "좋음", "과열", "불량", "과전압", "불특정 실패", "저온"];
        var ifilter = new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED);
        var batteryStatus = Api.getContext().registerReceiver(null, ifilter);
        var battery = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_STATUS, -1);
        var voltage = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_VOLTAGE, -1);
        var health = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_HEALTH, -1);
        var level = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1);
        var scale = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1);
        var am = Api.getContext().getSystemService(Api.getContext().ACTIVITY_SERVICE);
        var mem = new android.app.ActivityManager.MemoryInfo();
        am.getMemoryInfo(mem);
        var temp = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_TEMPERATURE, -1);
        var ms1 = java.lang.System.currentTimeMillis();
        replier.reply("로딩중...");
        var ms2 = java.lang.System.currentTimeMillis();
        var ps = (((ms2 - ms1) / 1000) + "초");
        replier.reply("전원 : 켜짐\n속도 : " + ps + "\n현재상태 : " + fill[battery - 1] + "\n성능 : " + heal[health - 1] + "\n램 : " + (mem.availMem / mem.totalMem * 100).toFixed(2) + "% 남음\n배터리 : " + Math.round(level / scale * 100) + "%\n온도 : " + Math.round(temp) / 10 + "°C\n전압 : " + voltage + "mv")
    }
    if (msg.indexOf("재희") != -1) {
        replier.reply("재희는 지금 폰을 보고있지 않습니다. 좀있다가 연락 부탁드립니다");
    }

    var Data = msg.split(" ");
    if (Data[0] == "건의") {
        replier.reply(msg.replace("건의", ""));
        replier.reply("라고 건의 되었습니다");
        Api.replyRoom("재희", msg.replace("건의", ""));
    }
    if (msg == "리로드") {
        replier.reply("리로드 시작, 끝나면 완료라고 뜹니다")
        Api.reload();
        replier.reply("리로드 완료");
    }
    if (msg.indexOf("ㅋㅋㅋ") != -1) {
        replier.reply("ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ");
    }
    var cmd = msg.split(" ");
    if (cmd[0] == "번역") {
        if (cmd[1] == "영한") {
            var value = msg.replace("번역 영한 ", "");
            var result = Api.papagoTranslate("en", "ko", value);
            replier.reply("[ 자이번역 ] " + result);
        } else if (cmd[1] == "한영") {
            var value = msg.replace("번역 한영 ", "");
            var result = Api.papagoTranslate("ko", "en", value);
            replier.reply("[ 자이번역 ] " + result);
        } else if (cmd[1] == "한일") {
            var value = msg.replace("번역 한일 ", "");
            var result = Api.papagoTranslate("ko", "ja", value);
            replier.reply("[ 자이번역 ] " + result);
        } else if (cmd[1] == "일한") {
            var value = msg.replace("번역 일한 ", "");
            var result = Api.papagoTranslate("ja", "ko", value);
            replier.reply("[ 자이번역 ] " + result);
        } else if (cmd[1] == "한중") {
            var value = msg.replace("번역 한중 ", "");
            var result = Api.papagoTranslate("ko", "zh-CN", value);
            replier.reply("[ 자이번역 ] " + result);
        } else if (cmd[1] == "중한") {
            var value = msg.replace("번역 중한 ", "");
            var result = Api.papagoTranslate("zh-CN", "ko", value);
            replier.reply("[ 자이번역 ] " + result);
        } else {}
    }
    if (msg.indexOf(prefix + "롤 ") > -1 && msg != prefix + "롤") {
        var lol = encodeURIComponent(msg.replace(prefix + "롤 ", ""));
        replier.reply("[ 롤 ] http://www.op.gg/summoner/userName=" + lol);
    }
    if (msg.indexOf(prefix + "배그 ") > -1 && msg != prefix + "배그") {
        var bg = encodeURIComponent(msg.replace(prefix + "배그 ", ""));
        replier.reply("[ 배그 ] http://dak.gg/search?name=" + bg);
    }
    if (msg.indexOf(prefix + "옵치 ") > -1 && msg != prefix + "옵치") {
        var ow = encodeURIComponent(msg.replace(prefix + "옵치 ", ""));
        replier.reply("[ 옵치 ] https://overlog.gg/search?playerName=" + ow);
    }
    if (msg.indexOf(prefix + "네이버 ") > -1 && msg != prefix + "네이버") {
        var naver = encodeURIComponent(msg.replace(prefix + "네이버 ", ""));
        replier.reply("[ 네이버 ] https://m.search.naver.com/search.naver?ie=&query=" + naver);
    }
    if (msg.indexOf(prefix + "다음 ") > -1 && msg != prefix + "다음") {
        var daum = encodeURIComponent(msg.replace(prefix + "다음 ", ""));
        replier.reply("[ 다음 ] https://m.search.daum.net/search?w=&q=" + daum);
    }
    if (msg.indexOf(prefix + "줌 ") > -1 && msg != prefix + "줌") {
        var zum = encodeURIComponent(msg.replace(prefix + "줌 ", ""));
        replier.reply("[ 줌 ] https://m.search.zum.com/search.zum?&query=" + zum);
    }
    if (msg.indexOf(prefix + "구글 ") > -1 && msg != prefix + "구글") {
        var google = encodeURIComponent(msg.replace(prefix + "구글 ", ""));
        replier.reply("[ 구글 ] https://www.google.co.kr/search?ie=&q=" + google);
    }
    if (msg.indexOf(prefix + "빙 ") > -1 && msg != prefix + "빙") {
        var bing = encodeURIComponent(msg.replace(prefix + "빙 ", ""));
        replier.reply("[ 빙 ] http://www.bing.com/search?q=" + bing);
    }
    if (msg.indexOf(prefix + "유튜브 ") > -1 && msg != prefix + "유튜브") {
        var youtube = encodeURIComponent(msg.replace(prefix + "유튜브 ", ""));
        replier.reply("[ 유튜브 ] https://www.youtube.com/results?search_query=" + youtube);
    }
    if (msg.indexOf(prefix + "브이 ") > -1 && msg != prefix + "브이") {
        var vlive = encodeURIComponent(msg.replace(prefix + "브이 ", ""));
        replier.reply("[ 브이앱 ] http://m.vlive.tv/search?query=" + vlive);
    }
    if (msg.indexOf(prefix + "네이버티비 ") > -1 && msg != prefix + "네이버티비") {
        var ntv = encodeURIComponent(msg.replace(prefix + "네이버티비 ", ""));
        replier.reply("[ 네이버앱 ] http://m.tv.naver.com/search?query=" + ntv);
    }
    if (msg.indexOf(prefix + "네이버지도 ") > -1 && msg != prefix + "네이버지도") {
        var nm = encodeURIComponent(msg.replace(prefix + "네이버지도 ", ""));
        replier.reply("[ 네이버지도 ] https://m.map.naver.com/search2/search.nhn?query=" + nm);
    }
    if (msg.indexOf(prefix + "다음지도 ") > -1 && msg != prefix + "다음지도") {
        var dm = encodeURIComponent(msg.replace(prefix + "다음지도 ", ""));
        replier.reply("[ 다음지도 ] https://m.map.daum.net/actions/searchView?q=" + dm);
    }
    if (msg.indexOf(prefix + "구글지도 ") > -1 && msg != prefix + "구글지도") {
        var gm = encodeURIComponent(msg.replace(prefix + "구글지도 ", ""));
        replier.reply("[ 구글지도 ] https://www.google.com/maps/place/" + gm);
    }
    if (msg.indexOf(prefix + "나무위키 ") > -1 && msg != prefix + "나무위키") {
        var nw = encodeURIComponent(msg.replace(prefix + "나무위키 ", ""));
        replier.reply("[ 나무위키 ] https://namu.wiki/w/" + nw);
    }
    if (msg.indexOf(prefix + "위키백과 ") > -1 && msg != prefix + "위키백과") {
        var wp = encodeURIComponent(msg.replace(prefix + "위키백과 ", ""));
        replier.reply("[ 위키백과 ] https://ko.m.wikipedia.org/wiki/" + wp);
    }
    if (msg.indexOf(prefix + "디시위키 ") > -1 && msg != prefix + "디시위키") {
        var dw = encodeURIComponent(msg.replace(prefix + "디시위키 ", ""));
        replier.reply("[ 디시위키 ] http://wiki.dcinside.com/wiki/" + dw);
    }
    if (msg.indexOf(prefix + "디시 ") > -1 && msg != prefix + "디시") {
        var dc = encodeURIComponent(msg.replace(prefix + "디시 ", ""));
        replier.reply("[ 디시 ] http://m.dcinside.com/search/?search_gall=" + dc + "&search_type=default");
    }
    if (msg.indexOf(prefix + "엠팍 ") > -1 && msg != prefix + "엠팍") {
        var mp = encodeURIComponent(msg.replace(prefix + "엠팍 ", ""));
        replier.reply("[ 엠팍 ] http://mlbpark.donga.com/mp/b.php?select=sct&m=search&query=" + mp);
    }
    if (msg.indexOf(prefix + "디시갤 ") > -1 && msg != prefix + "디시갤") {
        var dg = encodeURIComponent(msg.replace(prefix + "디시갤 ", ""));
        replier.reply("[ 디시갤 ] http://m.dcinside.com/search/index.php?search_gall=" + dg + "&search_type=gall_name");
    }
    if (msg.indexOf(prefix + "네이트 ") > -1 && msg != prefix + "네이트") {
        var nate = encodeURIComponent(msg.replace(prefix + "네이트 ", ""));
        replier.reply("[ 네이트 ] https://m.search.daum.net/nate?q=" + nate);
    }
    if (msg.indexOf(prefix + "어학사전 ") > -1 && msg != prefix + "어학사전") {
        var nd = encodeURIComponent(msg.replace(prefix + "어학사전 ", ""));
        replier.reply("[ 어학사전 ] https://m.search.naver.com/search.naver?query=" + nd + "&where=m_ldic");
    }
    if (msg.indexOf(prefix + "옥션 ") > -1 && msg != prefix + "옥션") {
        var oct = encodeURIComponent(msg.replace(prefix + "옥션 ", ""));
        replier.reply("[ 옥션 ] http://mmya.auction.co.kr/Search/#/search?keyword=" + oct);
    }
    if (msg.indexOf(prefix + "지마켓 ") > -1 && msg != prefix + "지마켓") {
        var gmar = encodeURIComponent(msg.replace(prefix + "지마켓 ", ""));
        replier.reply("[ 지마켓 ] http://mobile.gmarket.co.kr/Search/Search?topKeyword=" + gmar);
    }
    if (msg.indexOf(prefix + "쿠팡 ") > -1 && msg != prefix + "쿠팡") {
        var coop = encodeURIComponent(msg.replace(prefix + "쿠팡 ", ""));
        replier.reply("[ 쿠팡 ] http://m.coupang.com/nm/search?q=" + coop);
    }
    if (msg.indexOf(prefix + "에누리 ") > -1 && msg != prefix + "에누리") {
        var enu = encodeURIComponent(msg.replace(prefix + "에누리 ", ""));
        replier.reply("[ 에누리 ] http://m.enuri.com/mobilefirst/search.jsp?keyword=" + enu);
    }
    if (msg.indexOf(prefix + "다음쇼핑 ") > -1 && msg != prefix + "다음쇼핑") {
        var ds = encodeURIComponent(msg.replace(prefix + "다음쇼핑 ", ""));
        replier.reply("[ 다음쇼핑 ] http://m.shopping.daum.net/m/search/q/" + ds);
    }
    if (msg.indexOf(prefix + "네이버쇼핑 ") > -1 && msg != prefix + "네이버쇼핑") {
        var ns = encodeURIComponent(msg.replace(prefix + "네이버쇼핑 ", ""));
        replier.reply("[ 네이버쇼핑 ] https://msearch.shopping.naver.com/search/all.nhn?query=" + ns);
    }
    if (msg.indexOf(prefix + "십일번가 ") > -1 && msg != prefix + "십일번가") {
        var eleven = encodeURIComponent(msg.replace(prefix + "십일번가 ", ""));
        var eleven2 = encodeURI(eleven);
        replier.reply("[ 11번가 ] http://m.11st.co.kr/MW/Search/searchProduct.tmall?decSearchKeyword=" + eleven + "&searchType=&searchKeyword=" + eleven2);
    }
    if (msg.indexOf(prefix + "네뮤 ") > -1 && msg != prefix + "네뮤") {
        var nm = encodeURIComponent(msg.replace(prefix + "네뮤 ", ""));
        replier.reply("[ 네뮤 ] http://m.music.naver.com/search/search.nhn?target=all&query=" + nm);
    }
    if (msg.indexOf(prefix + "엠넷 ") > -1 && msg != prefix + "엠넷") {
        var mnet = encodeURIComponent(msg.replace(prefix + "엠넷 ", ""));
        replier.reply("[ 엠넷 ] http://m.mnet.com/search/?q=" + mnet);
    }
    if (msg.indexOf(prefix + "벅스 ") > -1 && msg != prefix + "벅스") {
        var bugs = encodeURIComponent(msg.replace(prefix + "벅스 ", ""));
        replier.reply("[ 벅스 ] https://m.bugs.co.kr/search/track?q=" + bugs);
    }
    if (msg.indexOf(prefix + "몽키 ") > -1 && msg != prefix + "몽키") {
        var mm = encodeURIComponent(msg.replace(prefix + "몽키 ", ""));
        replier.reply("[ 몽키 ] http://m.monkey3.co.kr/?act=se.all&q=" + mm);
    }
    if (msg.indexOf(prefix + "소리바다 ") > -1 && msg != prefix + "소리바다") {
        var srbd = encodeURIComponent(msg.replace(prefix + "소리바다 ", ""));
        replier.reply("[ 소리바다 ] http://m.soribada.com/search/all/" + srbd);
    }
    if (msg.indexOf(prefix + "교보 ") > -1 && msg != prefix + "교보") {
        var kyobo = encodeURIComponent(msg.replace(prefix + "교보 ", ""));
        replier.reply("[ 교보문고 ] http://mobile.kyobobook.co.kr/search/main/" + kyobo);
    }
    if (msg.indexOf(prefix + "예스 ") > -1 && msg != prefix + "예스") {
        var yes = encodeURIComponent(msg.replace(prefix + "예스 ", ""));
        replier.reply("[ 예스24 ] http://m.yes24.com/search/search?query=" + yes);
    }
    if (msg.indexOf(prefix + "중고 ") > -1 && msg != prefix + "중고") {
        var jg = encodeURIComponent(msg.replace(prefix + "중고 ", ""));
        replier.reply("[ 중고나라 ] https://m.cafe.naver.com/ArticleSearchList.nhn?search.query=" + jg + "&search.clubid=10050146");
    }
    if (msg.indexOf(prefix + "번개 ") > -1 && msg != prefix + "번개") {
        var bgjt = encodeURIComponent(msg.replace(prefix + "번개 ", ""));
        replier.reply("[ 번개 ] http://m.bunjang.co.kr/search/products?q=" + bgjt);
    }
    if (msg == prefix + "아학") {
        replier.reply("[ 아학 ] http://onair.mnet.com/idolschool");
    }
    if (msg == prefix + "네뮤차트") {
        replier.reply("[ 네뮤차트 ] http://m.music.naver.com/listen/top100.nhn?domain=TOTAL");
    }
    if (msg == prefix + "지니차트") {
        replier.reply("[ 지니차트 ] http://mw.genie.co.kr/chart");
    }
    if (msg == prefix + "소리바다차트") {
        replier.reply("[ 소리바다차트 ] http://m.soribada.com/chart/realtime");
    }
    if (msg == prefix + "가온차트") {
        replier.reply("[ 가온차트 ] http://www.gaonchart.co.kr");
    }
    if (msg == prefix + "엠넷차트") {
        replier.reply("[ 엠넷차트 ] http://m.mnet.com/chart/music");
    }
    if (msg == prefix + "벅스차트") {
        replier.reply("[ 벅스차트 ] https://m.bugs.co.kr/chart");
    }
    if (msg == prefix + "몽키차트") {
        replier.reply("[ 몽키차트 ] http://m.monkey3.co.kr/?charts.realChart");
    }
}