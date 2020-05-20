var host = "http://127.0.0.1:9001";


/**
 * 检查用户名是否可用
 */
function checkUseable(username) {
  var data = {};

  // if (username == 'haha') { //作为模拟,后期使用ajax
  //   data = {
  //     status: 200, //200 成功
  //     msg: "OK", // 返回信息消息
  //     data: false // 返回数据，true：数据可用，false：数据不可用
  //   }
  // } else {
  //   data = {
  //     status: 200, //200 成功
  //     msg: "OK", // 返回信息消息
  //     data: true // 返回数据，true：数据可用，false：数据不可用
  //   }
  // }

  wx.request({  //使用ajax请求服务
    url: host + "/repair/check" + username + "/1", //url
    method: 'GET', //请求方式
    header: {
      'Content-Type': 'application/json',
    },
    data: {
    },
    success: function (res) {
      if (res.data.status == 200) {
        data = res.data;
      } else {
        data = {};
      }

    },
    fail: function () {
      app.consoleLog("请求数据失败");
    },
    complete: function () {
      // complete 
    }
  })

  return data;
}

/**
 * 注册
 */
function regist(username, password) {
  var data = null;
  wx.request({  //使用ajax请求服务
    url: host + "/repair/register", //url
    method: 'POST', //请求方式
    header: {
      'Content-Type': 'application/json',
    },
    data: {
      "username": username,
      "password": password
    },
    success: function (res) {
      if (res.data.status == 200) {
        data = res.data;
      } else {
        data = {};
      }

    },
    fail: function () {
      app.consoleLog("请求数据失败");
    },
    complete: function () {
      // complete 
    }
  })
  return data;
}

/**
 * 获得登录结果
 */
function get_login_Result(e, usertype) {
  var username = e.detail.value.username;
  var password = e.detail.value.password;
  

  // console.log(username);
  // console.log(password);

  // var data = {};
  // if (username == 'haha' && password == '123456') { // 作为模拟, 后期将使用ajax调用服务接口
  //   data = {
  //     'status': 200,
  //     'msg': "OK",
  //     'data': {
  //       "ID": 1,
  //       "username": "haha",
  //       "nickname": "该昵称已存在",
  //       "phone": "15800807944",
  //       "password": "123456"
  //     }
  //   };
  // } else { //用户名或密码错误
  //   data = {
  //     'status': 200,
  //     'msg': "OK",
  //     'data': {}
  //   };
  // }

  var data = null;
  wx.request({  //使用ajax请求服务
    url: host + "/"+usertype+"/login", //url
    method: 'POST', //请求方式
    header: {
      'Content-Type': 'application/json',
    },
    data: {
      "username": username,
      "password": password
    },
    success: function (res) {
      console.log(res.data);
      if (res.data.status == 200) {
        data = res.data;
        return data;
      } else {
        data = {};
      }

    },
    fail: function () {
      app.consoleLog("请求数据失败");
    },
    complete: function () {
      // complete 
    }
  })
  return data;
}


/**
 * 通过微信登录
 */
function login_by_wx(code, usertype, nickname) {
  console.log(code + "  " + usertype + " " + nickname);
  //获得用户的code, 后台查询微信服务获得openID查询数据库的openID,有:注册过进行登录 没有:进行注册,填入昵称作为用户名
  var data;
  // if (res.code) {
  //   //把获取到的code通过一个request的请求发给java服务器
  //   wx.request({
  //     url: "http://x.x.x.x:8080/"+usertype+"/loginByWX", //url
  //     data: {
  //       code: res.code,
  //       nickname: nickname,
  //     },
  //     method: 'POST',
  //     dataType: 'json',
  //     success: function (res) {
  //       //请求成功的处理
  //       data = res.data;
  //     }
  //   })
  // }

  data = {
    'status': 200,
    'msg': '',
    'data': {
      "ID": 1,
      "username": "该昵称已存在",
      "phone": "15800807944",
      "password": "123456"
    }
  }
  return data;
}



/**
 * 修改用户信息
 */
function info_result(e) {
  var ID = wx.getStorageSync('user').ID;
  var password = wx.getStorageSync('user').password;
  var username = e.detail.value.username;
  var phone = e.detail.value.phone;
  var user_type = wx.getStorageSync('user_type')

  var data = {};

  //作为模拟
  data = {
    "status": 200,
    "msg": "OK",
    "data": {
      "ID": ID,
      "username": username,
      "password": password,
      "phone": phone
    }
  };

  // wx.request({  //使用ajax请求服务
  //   url: "http://x.x.x.x:8080/"+user_type+"/edit/"+ID, //url
  //   method: 'PUT', //请求方式
  //   header: {
  //     'Content-Type': 'application/json',
  //   },
  //   data: {
  //     username: username,  //参数
  //     phone:phone,
  //     password: password
  //   },
  //   success: function (res) {
  //     if (res.data.status == 200) {
  //       data = res.data;
  //     }else{
  //       data = {};
  //     }
  //   },
  //   fail: function () {
  //     app.consoleLog("请求数据失败");
  //   },
  //   complete: function () {
  //     // complete 
  //   }
  // })


  return data;
};

/**
 * 修改用户登录密码
 */
function pwd_result(e) {
  var ID = wx.getStorageSync('user').ID;
  var password = e.detail.value.password;
  var username = wx.getStorageSync('user').username;
  var phone = wx.getStorageSync('user').phone;
  console.log(ID + " " + password + " " + username + " " + phone);
  var data = {};

  //作为模拟
  data = {
    "status": 200,
    "msg": "OK",
    "data": {
      "ID": ID,
      "username": username,
      "password": password,
      "phone": phone
    }
  };

  // wx.request({  //使用ajax请求服务
  //   url: "http://x.x.x.x:8080/repair/login", //url
  //   method: 'PUT', //请求方式
  //   header: {
  //     'Content-Type': 'application/json',
  //   },
  //   data: {
  //     username: username,  //参数
  //     phone:phone,
  //     password: password
  //   },
  //   success: function (res) {
  //     if (res.data.status == 200) {
  //       data = res.data;
  //     }else{
  //       data = {};
  //     }
  //   },
  //   fail: function () {
  //     app.consoleLog("请求数据失败");
  //   },
  //   complete: function () {
  //     // complete 
  //   }
  // })

  return data;
};


module.exports.checkUseable = checkUseable;
module.exports.regist = regist;
module.exports.get_login_Result = get_login_Result;
module.exports.info_result = info_result;
module.exports.pwd_result = pwd_result
module.exports.login_by_wx = login_by_wx