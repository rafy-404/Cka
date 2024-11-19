const fs = require("fs");
module.exports = {
  config:{
  name: "npx3",
        version: "1.0.1",
        prefix: false,
  permssion: 0,
  credits: "nayan", 
  description: "Fun",
  category: "no prefix",
  usages: "😒",
        cooldowns: 5, 
},

handleEvent: async function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  const content = event.body ? event.body : '';
  const body = content.toLowerCase();
  const axios = require('axios')
  const NAYAN = ['https://i.imgur.com/LLucP15.mp4','https://i.imgur.com/DEBRSER.mp4','https://i.imgur.com/gHLvXaP.mp4','https://i.imgur.com/BUFkXSC.mp4','https://i.imgur.com/z8I4XEg.mp4','https://i.imgur.com/n4mTrSi.mp4','https://i.imgur.com/VG6kKpO.mp4','https://i.imgur.com/0kaxQBC.mp4','https://i.imgur.com/JSr3GTY.mp4','https://i.imgur.com/Cy4FGmO.mp4','https://i.imgur.com/3URT7eJ.mp4','https://i.imgur.com/ef00rnZ.mp4','https://i.imgur.com/qlDSo6K.mp4','https://i.imgur.com/F2JUZQn.mp4','https://i.imgur.com/Vn6W5Bm.mp4','https://i.imgur.com/QczVtaQ.mp4','https://i.imgur.com/mhnBD0u.mp4','https://i.imgur.com/v9CStR5.mp4','https://i.imgur.com/wmkCbpa.mp4','https://i.imgur.com/YPbhovX.mp4','https://tinyurl.com/22ozmhgy',]
    var rndm = NAYAN[Math.floor(Math.random() * NAYAN.length)];
const media = (
    await axios.get(
      `${rndm}`,
      { responseType: 'stream' }
    )
  ).data;

  if (body.indexOf("🥰")==0 || body.indexOf("🤩")==0 || body.indexOf("😍")==0 || body.indexOf("💕")==0 || body.indexOf("😘")==0 || body.indexOf("☺️")==0 || body.indexOf(" ")==0 || body.indexOf("😝")==0 || body.indexOf(" ")==0 || body.indexOf(" ")==0) {
    var msg = {
        body:"- সৃষ্টির সব কিছু'ই সুন্দর..!🌻-অসুন্দর তো মানুষের মন মানসিকতা..।🤏💚-___ 🖇️✨___                                          ─༅༎.⎯͢⎯⃝রবিউল🩷🪽",
        attachment: media
      }
      api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("💞", event.messageID, (err) => {}, true)
    }
  },
  start: function({ nayan }) {
  }
}
