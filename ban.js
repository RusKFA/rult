const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require("../profile.json");

module.exports.run = async (bot,message,args) => {
if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Нет прав!");
let rUser;

if (message.mentions.users.first()) {
    rUser = message.mentions.users.first();
  } else {
    rUser = message.author;
  } 


profile[rUser.id].ban++;
    fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
        if(err) console.log(err)
    });


if(profile[rUser.id].ban >=1){
    message.guild.member(rUser).ban({ reason: 'Вас забанил Админ' } )
    }

    let embed = new Discord.MessageEmbed()
    .setColor(`#000000`)
    .setDescription("Бан")

    .addField("Админ",message.author.username)
    .addField("Выдал бан",`${rUser.username}`)
    .addField("Всего Банов",`${profile[rUser.id].ban}/100`)

    message.channel.send(embed)
}


try{
}catch(err){
    if(err.name === "ReferenceError")
    console.log("ОШИБКА")
    console.log(`1.${err.name}\n2.${err.message}\n3.${err.stack}`);
 }

module.exports.help = {
    name: "ban" 
}
