module.exports.config = {
  name: "goiadmin",
    version: "1.0.0",
    permission: 0,
    credits: "nayan",
    description: "mention",
    prefix: true,
    category: "user",
    usages: "tag",
    cooldowns: 5,
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "61552217665522") {
    var aid = ["61552217665522"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["Mantion_দিস না _রবিউল বস এর মন মন ভালো নেই আস্কে-!💔🥀", "- আমার সাথে কেউ  করে না থুক্কু টেক্স করে নাহ🫂💔", "আমার একটা প্রিয়র খুব দরকার কারন আমার চোখে পানি আসার আগে নাকে সর্দি চলে আসে🤣🤣","এত মেনশন না দিয়ে বক্স যাও কল দাও🤷‍ঝাং 😘"," বস রে Mantion_দিলে চুম্মাইয়া ঠুটের কালার change কইরা,লামু 💋😾😾🔨","রবিউল বস এখন  বিজি জা বলার আমাকে বলতে পারেন_!!😼🥰","এতো মিনশন নাহ দিয়া সিংগেল রবিউল রে একটা গফ দে 😒 😏","Mantion_না দিয়ে সিরিয়াস প্রেম করতে চাইলে ইনবক্স","মেনশন দিসনা পারলে একটা গফ দে","Mantion_দিস না বাঁলপাঁক্না রবিউল প্রচুর বিজি 🥵🥀🤐","চুমু খাওয়ার বয়স টা  চকলেট🍫খেয়ে উড়িয়ে দিলাম🤗","মেনশন দিস না বস এখন পাবজি games নিয়ে বিজি","Mantion দিয়ো না গো নিশাত আপু রাগ করে মেনশন দিলে বস এর সাথে কথা বলে না😒","Mantion দিস নাহ সানিলিওন  আফারে দংশোন হুমকি দিয়ে আসলো বস - 🤗 -আর 🫵তুমি আমার বসকে খেয়ে দিবা সেই ভয় দেখাইতে চাও ননসেন বেডি..!🥱😼"]
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
}
