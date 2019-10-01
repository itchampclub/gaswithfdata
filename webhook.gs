var channelToken = "dltp6rZJvyJ7fC9v6bqERyCMVd7SqrbgcZlIpazm7EUkV1l7UlgKWnrbEGUoE+2jh3eeJH1j7TB0ywh3SJsX3s3smmGv9JjAs5n06s8RfGvhiQe1k/5829L9qMZ4A5+zbXoKuvRLgttRsKk+qodJ7wdB04t89/1O/w1cDnyilFU=";
var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Xp34vfiKKieGwszLaqlaaM/edit#gid=0");
var sheet = ss.getSheetByName("data");



function replyMsg(replyToken, Msg, channelToken) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var opt = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': Msg
    })
  };
  UrlFetchApp.fetch(url, opt);
}

function pushMsg(usrId, Msg, channelToken) {
  var url = 'https://api.line.me/v2/bot/message/push';
  var opt = {
    'headers': {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + channelToken,
  },
  'method': 'post',
  'payload': JSON.stringify({
    'to': usrId,
    'messages': Msg
  })
 };
 UrlFetchApp.fetch(url, opt);
}

function doPost(e) {
  var value = JSON.parse(e.postData.contents);
    var events = value.events;
    if (events != null) {
      for (var i in events) {
        var event = events[i];
        var type = event.type;
        var replyToken = event.replyToken;
        var sourceType = event.source.type;
        var userId = event.source.userId;
        var groupId = event.source.groupId;
        var timeStamp = event.timestamp;
        var url = "https://api.line.me/v2/bot/profile/"+userId;
        var headers = {
             "contentType": "application/json",
    "headers":{"Authorization": "Bearer "+channelToken}
             };
        var getprofile = UrlFetchApp.fetch(url, headers);
        var profiledata = JSON.parse(getprofile.getContentText());
        var displayName = profiledata.displayName;
        var statusMessage = profiledata.statusMessage;
        var pictureUrl = profiledata.pictureUrl;
        var confcheck = sheet.getRange(2, 1, sheet.getLastRow(),sheet.getLastColumn()).getValues();
        
        //message type
        switch (type) {
          case 'postback':
            break;
          case 'message':
            var messageType = event.message.type;
            var messageId = event.message.id;
            var messageText = event.message.text;
            if(messageText.indexOf("conf ")>-1){
            var confId = messageText.split(' ',2)[1];
            var uid = sheet.getRange(2, 1, sheet.getLastRow(),sheet.getLastColumn()).getValues();
            for(var i = 0;i<uid.length; i++){
            if(confId == uid[i][0]){
              sheet.getRange(i+2,5).setValue("TRUE");
              var mess = [{'type': 'text', 'text': 'ได้รับการยืนยันจากผู้ดูแล'}];
              pushMsg(confId, mess, channelToken);
                }
              }
            }
            else{
            for(var x = 0;x<confcheck.length; x++){
               if(userId == confcheck[x][0]){
               var confstatus = sheet.getRange(x+2,5).getValue();
               
            if(confstatus == true){
            
                  var ssx = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/11mFh3T6OGuDdB9fGcbbyE/edit");
                  var sheetx = ssx.getSheetByName("people");
                  var valuesx = sheetx.getRange(2, 7, sheetx.getLastRow(),sheetx.getLastColumn()).getValues();
                  var valuesnick = sheetx.getRange(2, 6, sheetx.getLastRow(),sheetx.getLastColumn()).getValues();
                  
                    for(var ix = 0;ix<valuesx.length; ix++){
                      if(valuesx[ix][0] == messageText ){
                      var finded1 = true;
                        ix=ix+2;
                  var Data1 = sheetx.getRange(ix,2).getValue(); 
                  var Data2 = sheetx.getRange(ix,3).getValue();
                  var Data3 = sheetx.getRange(ix,4).getValue();
                  var Data4 = sheetx.getRange(ix,5).getValue();
                  var Data5 = sheetx.getRange(ix,6).getValue();
                  
                  var mess = [{'type': 'text', 'text': "ประเภท : "+Data1+"\nสถานะ : "+Data2+"\nรูป : "+Data3+"\nชื่อ-สกุล : "+Data4+"\nชื่อเล่น : "+Data5}];
              }
              }
              if(!finded1){
                  var ssx = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1uQNWD-y8zNNp_hJMYUJmw/edit");
                  var sheetx = ssx.getSheetByName("ATM - ID");
                  var atmid = sheetx.getRange(2, 4, sheetx.getLastRow(),sheetx.getLastColumn()).getValues();

                      for(var ix = 0;ix<atmid.length; ix++){
                      if(atmid[ix][0] == messageText ){
                      var finded2 = true;
                        ix=ix+2;
                  var Data1 = sheetx.getRange(ix,2).getValue(); 
                  var Data2 = sheetx.getRange(ix,3).getValue();
                  var Data3 = sheetx.getRange(ix,5).getValue();
                  var Data4 = sheetx.getRange(ix,6).getValue();
                  var cutmessage1 = Data4.split(',',2)[0];
                  var cutmessage2 = Data4.split(',',2)[1];

                  var mess = [{'type': 'text', 'text': "Picture : "+Data1+"\nBank Name : "+Data2+"\nLocation : "+Data3+"\nLat,Long : "+Data4},{"type": "location","title": "ATM Location","address": "ATM Location","latitude": cutmessage1,"longitude": cutmessage2}];
              }
              }
              }
              if(!finded1 && !finded2){
                  var ssx = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1NNrWBTPLmX4R8_ArXxy4/edit");
                  var sheetx = ssx.getSheetByName("การตอบแบบฟอร์ม 1");
                  var atmid = sheetx.getRange(2, 7, sheetx.getLastRow(),sheetx.getLastColumn()).getValues();

                      for(var ix = 0;ix<atmid.length; ix++){
                      if(atmid[ix][0] == messageText ){
                      var finded3 = true;
                        ix=ix+2;
                  var Data1 = sheetx.getRange(ix,2).getValue(); 
                  var Data2 = sheetx.getRange(ix,3).getValue();
                  var Data3 = sheetx.getRange(ix,4).getValue();
                  var Data4 = sheetx.getRange(ix,5).getValue();
                  var Data5 = sheetx.getRange(ix,6).getValue();
                  var cutmessage1 = Data4.split(',',2)[0];
                  var cutmessage2 = Data4.split(',',2)[1];

                  var mess = [{'type': 'text', 'text': "สถานที่ : "+Data1+"\nจำนวน : "+Data2+"\nทิศทาง : "+Data3+"\nผู้ครอบครอง : "+Data5},{"type": "location","title": "ATM Location","address": "ATM Location","latitude": cutmessage1,"longitude": cutmessage2}];
              }
              }
              }
              if(!finded1 && !finded2 && !finded3){
                var mess = [{'type': 'text', 'text': "ไม่พบข้อมูลที่ค้นหา"}];
              }
              
                  replyMsg(replyToken, mess, channelToken);  
              }
              
             else{
            var mess = [{'type': 'text', 'text': "ไอดีท่านยังไม่ได้รับการยืนยัน"}];
            replyMsg(replyToken, mess, channelToken);
                }
              }
            }
          }
            break;
          case 'join':
            var mess = [{'type': 'text', 'text': "join"}];
            replyMsg(replyToken, mess, channelToken);
            break;
          case 'leave':
            var mess = [{'type': 'text', 'text': "leave"}];
            replyMsg(replyToken, mess, channelToken);
            break;
          case 'memberLeft':
            var mess = [{'type': 'text', 'text': "memberLeft"}];
            replyMsg(replyToken, mess, channelToken);
            break;
          case 'memberJoined':
            var mess = [{'type': 'text', 'text': "memberJoined"}];
            replyMsg(replyToken, mess, channelToken);
            break;
          case 'follow':
            var mess = [{'type': 'text', 'text': "โปรดรอการยืนยันจากผู้ดูแล"}];
            replyMsg(replyToken, mess, channelToken);
            var uid = sheet.getRange(2, 1, sheet.getLastRow(),sheet.getLastColumn()).getValues();
                for(var i = 0;i<uid.length; i++){
                   if(userId == uid[i][0]){
                    var already = true;
                    sheet.getRange(i+2,2).setValue(displayName);
                    sheet.getRange(i+2,3).setValue(statusMessage);
                    sheet.getRange(i+2,4).setValue('=IMAGE("'+pictureUrl+'")');
                   }
                }
                   if(!already){
                    var img = '=IMAGE("'+pictureUrl+'")';
                    sheet.appendRow([userId, displayName, statusMessage, img, "false"]);
                    var admId = "Uf879a6ef33f584bb96f7053e564b8376";
                    var mess = [{
        "type": "flex",
        "altText": "confirm or not!!",
        "contents": {
  "type": "bubble",
  "hero": {
    "type": "image",
    "size": "full",
    "aspectRatio": "20:13",
    "aspectMode": "cover",
    "url": pictureUrl
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "spacing": "md",
    "contents": [
      {
        "type": "text",
        "text": displayName,
        "size": "xl",
        "weight": "bold",
        "align": "center"
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "horizontal",
    "contents": [
      {
        "type": "button",
        "style": "primary",
        "color": "#41A317",
        "action": {
          "type": "message",
          "label": "CONFIRM",
          "text": "conf "+userId
        },
        "gravity": "center"
      },
      {
        "type": "separator",
        "margin": "sm"
      },
      {
        "type": "button",
        "style": "primary",
        "color": "#9F000F",
        "action": {
          "type": "message",
          "label": "REJECT",
          "text": "REJECT"
        },
        "gravity": "center"
      }
    ]
  }
}
        }];
                    pushMsg(admId, mess, channelToken);
                   }
            break;
          case 'unfollow':
            var mess = [{'type': 'text', 'text': "unfollow"}];
            replyMsg(replyToken, mess, channelToken);
            break;
          default:
            break;
        }
      }
   }
}
