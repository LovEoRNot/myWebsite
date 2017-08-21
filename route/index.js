const express = require('express');
const route = express.Router();
const pool = require('./myConnection');

route.get('/', (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query('SELECT * FROM tb_project', (err, result) => {
      if(err) res.sendStatus(500).send('服务器内部错误').end();
      var projectList = result;
      conn.query('SELECT * FROM tb_introduce WHERE version = 1.2', (err, data) => {
        conn.release();
        if(err) res.sendStatus(500).send('服务器内部错误').end();
        var introduce = data[0];
        introduce.content = introduce.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
        res.render('index', {projectList, introduce});
      })     
    })
  })
});

module.exports = route;



// var projectList = [
//   { pic: './img/project/caculator.png', href: './project/caculator/index.html', name: 'caculator', description: '一个简易的网页版计算器', addTime: '2017-7-20' },
//   { pic: './img/project/danmu.png', href: './project/danmu/index.html', name: 'danmu', description: '弹幕聊天窗口', addTime: '2017-7-20' },
//   { pic: './img/project/introduce.png', href: './project/introduce/index.html', name: 'introduce', description: '一份名人的介绍页面', addTime: '2017-7-20' },
//   { pic: './img/project/randomQuoteMachine.png', href: './project/randomQuoteMachine/index.html', name: 'randomQuoteMachine', description: '一个可以随机产生名言的网页应用', addTime: '2017-7-20' },
//   { pic: './img/project/smallWebsite.png', href: './project/smallWebsite/index.html', name: 'smallWebsite', description: '一个简易的小网站', addTime: '2017-7-20' },
//   { pic: './img/project/tomatoClock.png', href: './project/tomatoClock/index.html', name: 'tomatoClock', description: '一个网页版的番茄钟应用', addTime: '2017-7-20' },
//   { pic: './img/project/weatherReport.png', href: './project/weatherReport/index.html', name: 'weatherReport', description: '一个网页版的天气预报应用', addTime: '2017-7-20' },
//   { pic: './img/project/simonGame.png', href: './project/simonGame/index.html', name: 'simonGame', description: '一个简易的小游戏，游戏方式为根据系统提示来点击相应的部分，完成基础部分，剩余一些其他功能尚未完成', addTime: '2017-8-10' }
// ];