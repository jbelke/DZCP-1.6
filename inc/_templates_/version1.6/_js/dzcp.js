// GLOBAL VARS
var doc = document, ie4 = document.all, opera = window.opera;
var innerLayer, layer, x, y, doWheel = false, offsetX = 15, offsetY = 5;
var tickerc = 0, mTimer = new Array(), tickerTo = new Array(), tickerSpeed = new Array();
var shoutInterval = 15000; // refresh interval of the shoutbox in ms
var teamspeakInterval = 15000; // refresh interval of the teamspeak viewer in ms
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
var DZCP={init:function(){doc.body.id="dzcp-engine-1.6";$("body").append('<div id="infoDiv"></div>');layer=$("#infoDiv")[0];doc.body.onmousemove=DZCP.trackMouse;if($("#navShout")[0])window.setInterval("$('#navShout').load('../inc/ajax.php?i=shoutbox');",shoutInterval);if($("#navTeamspeakContent")[0])window.setInterval("$('#navTeamspeakContent').load('../inc/ajax.php?i=teamspeak');",teamspeakInterval);DZCP.initLightbox();$(".slidetabs").tabs(".images > div",{effect:"fade",rotate:true}).slideshow({autoplay:true,interval:6e3});$(".tabs").tabs("> .switchs");$(".tabs2").tabs(".switchs2 > div",{effect:"fade",rotate:true})},initLightbox:function(){$("a[rel^=lightbox]").lightBox({fixedNavigation:true,overlayBgColor:"#000",overlayOpacity:.8,imageLoading:"../inc/images/lightbox/loading.gif",imageBtnClose:"../inc/images/lightbox/close.gif",imageBtnPrev:"../inc/images/lightbox/prevlabel.gif",imageBtnNext:"../inc/images/lightbox/nextlabel.gif",containerResizeSpeed:350,txtImage:lng=="de"?"Bild":"Image",txtOf:lng=="de"?"von":"of",maxHeight:screen.height*.9,maxWidth:screen.width*.9})},addEvent:function(e,t,n){if(e.addEventListener){e.addEventListener(t,n,false);return true}else if(e.attachEvent){var r=e.attachEvent("on"+t,n);return r}else return false},trackMouse:function(e){innerLayer=$("#infoInnerLayer")[0];if(typeof layer=="object"){var t=doc.all;var n=doc.getElementById&&!doc.all;var r=5;var i=-15;x=n?e.pageX-r:window.event.clientX+doc.documentElement.scrollLeft-r;y=n?e.pageY-i:window.event.clientY+doc.documentElement.scrollTop-i;if(innerLayer){var s=(t?innerLayer.offsetWidth:innerLayer.clientWidth)-3;var o=t?innerLayer.offsetHeight:innerLayer.clientHeight}else{var s=(t?layer.clientWidth:layer.offsetWidth)-3;var o=t?layer.clientHeight:layer.offsetHeight}var u=n?window.innerWidth+window.pageXOffset-12:doc.documentElement.clientWidth+doc.documentElement.scrollLeft;var a=n?window.innerHeight+window.pageYOffset:doc.documentElement.clientHeight+doc.documentElement.scrollTop;layer.style.left=(x+offsetX+s>=u-offsetX?x-(s+offsetX):x+offsetX)+"px";layer.style.top=y+offsetY+"px"}return true},popup:function(e,t,n){t=parseInt(t);n=parseInt(n)+50;popup=window.open(e,"Popup","width=1,height=1,location=0,scrollbars=0,resizable=1,status=0");popup.resizeTo(t,n);popup.moveTo((screen.width-t)/2,(screen.height-n)/2);popup.focus()},initGameServer:function(e){DZCP.initDynLoader("navGameServer_"+e,"server","&serverID="+e)},initTeamspeakServer:function(){DZCP.initDynLoader("navTeamspeakServer","teamspeak","")},initDynLoader:function(e,t,n){var r=$.ajax({url:"../inc/ajax.php?i="+t+n,type:"GET",data:{},cache:true,dataType:"html",contentType:"application/x-www-form-urlencoded; charset=iso-8859-1"});r.done(function(t){$("#"+e).html(t).hide().fadeIn("normal")})},shoutSubmit:function(){$.post("../shout/index.php?ajax",$("#shoutForm").serialize(),function(e){if(e)alert(e.replace(/  /g," "));$("#navShout").load("../inc/ajax.php?i=shoutbox");if(!e)$("#shouteintrag").prop("value","")});return false},switchuser:function(){var e=doc.formChange.changeme.options[doc.formChange.changeme.selectedIndex].value;window.location.href=e},tempswitch:function(){var e=doc.form.tempswitch.options[doc.form.tempswitch.selectedIndex].value;if(e!="lazy")DZCP.goTo(e)},goTo:function(e,t){if(t==1)window.open(e);else window.location.href=e},maxlength:function(e,t,n){if(e.value.length>n)e.value=e.value.substring(0,n);else t.value=n-e.value.length},showInfo:function(e,t,n,r,i,s){if(typeof layer=="object"){var o="";if(t&&n){var u=t.split(";");var a=n.split(";");var f="";for(var l=0;l<u.length;++l){f=f+"<tr><td>"+u[l]+"</td><td>"+a[l]+"</td></tr>"}o='<tr><td class="infoTop" colspan="2">'+e+"</td></tr>"+f+""}else if(t&&typeof n=="undefined"){o='<tr><td class="infoTop" colspan="2">'+e+"</td></tr><tr><td>"+t+"</td></tr>"}else{o="<tr><td>"+e+"</td></tr>"}var c="";if(r){c='<tr><td colspan=2 align=center><img src="'+r+'" width="'+i+'" height="'+s+'" alt="" /></td></tr>'}else{c=""}layer.innerHTML='<div id="hDiv">'+'  <table class="hperc" cellspacing="0" style="height:100%">'+"    <tr>"+'      <td style="vertical-align:middle">'+'        <div id="infoInnerLayer">'+'          <table class="hperc" cellspacing="0">'+"              "+o+""+"              "+c+""+"          </table>"+"        </div>"+"      </td>"+"    </tr>"+"  </table>"+"</div>";if(ie4&&!opera){layer.innerHTML+='<iframe id="ieFix" frameborder="0" width="'+$("#hDiv")[0].offsetWidth+'" height="'+$("#hDiv")[0].offsetHeight+'"></iframe>';layer.style.display="block"}else layer.style.display="block"}},showSteamBox:function(e,t,n,r,i){var s;switch(i){case 1:s="online";break;case 2:s="in-game";break;default:s="offline";break}if(typeof layer=="object"){layer.innerHTML='<div id="hDiv">'+'  <table class="hperc" cellspacing="0" style="height:100%">'+"    <tr>"+'      <td style="vertical-align:middle">'+'        <div id="infoInnerLayer">'+'             <table class="steam_box_bg" border="0" cellspacing="0" cellpadding="0">'+"              <tr>"+"                <td>"+'                   <div class="steam_box steam_box_user '+s+'">'+'                     <div class="steam_box_avatar '+s+'"> <img src="'+t+'" /></div>'+'                     <div class="steam_box_content">'+e+"<br />"+'                     <span class="friendSmallText">'+n+"<br>"+r+"</span></div>"+"                   </div>"+"                </td>"+"              </tr>"+"            </table>"+"        </div>"+"      </td>"+"    </tr>"+"  </table>"+"</div>";if(ie4&&!opera){layer.innerHTML+='<iframe id="ieFix" frameborder="0" width="'+$("#hDiv")[0].offsetWidth+'" height="'+$("#hDiv")[0].offsetHeight+'"></iframe>';layer.style.display="block"}else layer.style.display="block"}},hideInfo:function(){if(typeof layer=="object"){layer.innerHTML="";layer.style.display="none"}},toggle:function(e){if(e==0)return;else{if($("#more"+e).css("display")=="none"){$("#more"+e).css("display","");$("#img"+e).prop("src","../inc/images/collapse.gif")}else{$("#more"+e).css("display","none");$("#img"+e).prop("src","../inc/images/expand.gif")}}},fadetoggle:function(e){$("#more_"+e).fadeToggle("slow","swing");if($("#img_"+e).prop("alt")=="hidden"){$("#img_"+e).prop({alt:"normal",src:"../inc/images/toggle_normal.png"})}else{$("#img_"+e).prop({alt:"hidden",src:"../inc/images/toggle_hidden.png"})}},resizeImages:function(){for(var e=0;e<doc.images.length;e++){var t=doc.images[e];if(t.className=="content"){var n=t.width;var r=t.height;if(maxW!=0&&n>maxW){t.width=maxW;t.height=Math.round(r*(maxW/n));if(!DZCP.linkedImage(t)){var i=doc.createElement("span");var s=doc.createElement("a");i.appendChild(doc.createElement("br"));i.setAttribute("class","resized");i.appendChild(doc.createTextNode("auto resized to "+t.width+"x"+t.height+" px"));s.setAttribute("href",t.src);s.setAttribute("rel","lightbox");s.appendChild(t.cloneNode(true));t.parentNode.appendChild(i);t.parentNode.replaceChild(s,t);DZCP.initLightbox()}}}}},linkedImage:function(e){do{e=e.parentNode;if(e.nodeName=="A")return true}while(e.nodeName!="TD"&&e.nodeName!="BODY");return false},calSwitch:function(e,t){$("#navKalender").load("../inc/ajax.php?i=kalender&month="+e+"&year="+t)},teamSwitch:function(e){clearTimeout(mTimer[1]);$("#navTeam").load("../inc/ajax.php?i=teams&tID="+e,DZCP.initTicker("teams","h",60))},ajaxVote:function(e){DZCP.submitButton("contentSubmitVote");$.post("../votes/index.php?action=do&ajax=1&what=vote&id="+e,$("#navAjaxVote").serialize(),function(e){$("#navVote").html(e)});return false},ajaxFVote:function(e){DZCP.submitButton("contentSubmitFVote");$.post("../votes/index.php?action=do&fajax=1&what=fvote&id="+e,$("#navAjaxFVote").serialize(),function(e){$("#navFVote").html(e)});return false},ajaxPreview:function(e){var t=doc.getElementsByTagName("textarea");for(var n=0;n<t.length;n++){var r=t[n].className;var i=t[n].id;if(r=="editorStyle"||r=="editorStyleWord"||r=="editorStyleNewsletter"){var s=tinyMCE.getInstanceById(i);$("#"+i).prop("value",s.getBody().innerHTML)}}$("#previewDIV").html('<div style="width:100%;text-align:center">'+' <img src="../inc/images/admin/loading.gif" alt="" />'+"</div>");var o="";if(e=="cwForm"){$("input[type=file]").each(function(){o=o+"&"+$(this).prop("name")+"="+$(this).prop("value")})}var u=prevURL;$.post(u,$("#"+e).serialize()+o,function(e){$("#previewDIV").html(e)})},del:function(e){e=e.replace(/\+/g," ");e=e.replace(/oe/g,"�");return confirm(e+"?")},hideForumFirst:function(){$("#allkat").prop("checked",false)},hideForumAll:function(){for(var e=0;e<doc.forms["search"].elements.length;e++){var t=doc.forms["search"].elements[e];if(t.id.match(/k_/g))t.checked=false}},submitButton:function(e){submitID=e?e:"contentSubmit";$("#"+submitID).prop("disabled",true);$("#"+submitID).css("color","#909090");$("#"+submitID).css("cursor","default");return true},initTicker:function(e,t,n){tickerTo[tickerc]=t=="h"||t=="v"?t:"v";tickerSpeed[tickerc]=parseInt(n)<=10?10:parseInt(n);var r=$("#"+e).html();var i='  <div id="scrollDiv'+tickerc+'" class="scrollDiv" style="position:relative;left:0;z-index:1">';i+='    <table id="scrollTable'+tickerc+'" class="scrolltable"  cellpadding="0" cellspacing="0">';i+="      <tr>";i+='        <td onmouseover="clearTimeout(mTimer['+tickerc+'])" onmouseout="DZCP.startTickerDiv('+tickerc+')">';for(var s=0;s<10;s++)i+=r;i+="        </td>";i+="      </tr>";i+="    </table>";i+="  </div>";$("#"+e).html(i);window.setTimeout("DZCP.startTickerDiv("+tickerc+");",1500);tickerc++},startTickerDiv:function(e){tableObj=$("#scrollTable"+e)[0];obj=tableObj.parentNode;objWidth=tickerTo[e]=="h"?tableObj.offsetWidth:tableObj.offsetHeight;newWidth=Math.floor(objWidth/2)*2+2;obj.style.width=newWidth;mTimer[e]=setInterval("DZCP.moveDiv('"+obj.id+"', "+newWidth+", "+e+");",tickerSpeed[e])},moveDiv:function(e,t,n){var r=$("#"+e)[0];if(tickerTo[n]=="h")r.style.left=parseInt(r.style.left)<=0-t/2+2?0:parseInt(r.style.left)-1+"px";else r.style.top=r.style.top==""||parseInt(r.style.top)<0-t/2+6?0:parseInt(r.style.top)-1+"px"},TS3Settings:function(e){if(e==3){$("#ts3settings").css("display","")}else{$("#ts3settings").css("display","none")}}}// load global events$(document).ready(function() { DZCP.init(); });$(window).load(function() { DZCP.resizeImages(); });