
const app = getApp();
Page({
  data: {
    option1: [
      { text: '选择登录角色', value: 'empty' },
      { text: '报修人员', value: 'repair' },
      { text: '维修人员', value: 'maintainer' }
    ],
    value1: 'empty',
    usertype: null,
    apLogin: true, //显示账号密码登录
    wxLogin: false, //隐藏微信登录
    color1: '#1989FA',  //
    color2: 'black',  //当前选中 
    username: null,
    password: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // console.log("用户授权了");
        } else {
          //用户没有授权
          // console.log("用户没有授权");
        }
      }
    });
  },

  /**
   * 弹出授权弹窗
   */
  bindGetUserInfo: function (res) {


    if (this.data.usertype == 'empty' || this.data.usertype == null) {
      wx.showToast({
        title: '请选择登录角色!',
        icon: 'none'
      });
      return;
    }
    if (res.detail.userInfo) {
      // console.log(res.detail.userInfo);
      var nickName = res.detail.userInfo.nickName;
      //用户按了允许授权按钮
      let that = this;


      //请求code
      wx.login({
        success(res) {
          var code = res.code;   //用户授权码,用于查询openID


          //向后端发送请求
          wx.request({  //使用ajax请求服务
            url: wx.getStorageSync('host') + "/" + that.data.usertype +"/loginByWX", //url
            method: 'POST', //请求方式
            header: {
              'Content-Type': 'application/json',
            },
            data: {
              "code": code,
              "nickname": nickName
            },
            success: function (res) {
              if (res.data.status == 200) {
                var user = res.data.data;

                that.login(user);

              } else {
                wx.showToast({
                  title: '登录失败,请稍后重试',
                  icon: 'none'
                })
              }

            },
            fail: function () {
              app.consoleLog("请求数据失败");
            },
            complete: function () {
              // complete 
            }
          })


        },
        fail: function () {
          console.log("发送code失败：", res.data);
        }
      })

      // console.log("用户的信息如下：");
      // console.log(res.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            // console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  confirm: function () {
  },


  login: function (user) { //小程序的登录操作
  let that = this;
    // console.log(user);
    wx.showToast({
      title: '登录中',
      icon: 'loading'
    });
    //存入用户信息
    //....
    wx.setStorage({ //存入用户信息
      key: 'user',
      data: user,
    });
    wx.setStorage({ //存入用户类别
      key: 'user_type',
      data: that.data.usertype,
    });
    // 跳转至orderform页面
    wx.switchTab({
      url: '/pages/orderform/orderform',
    });
  },


  /**
   * 获得用户名
   */
  getusername: function (event) {
    this.setData({
      username: event.detail.value
    });
  },
   /**
   * 获得用户密码
   */
  getpassword: function (event) {
    this.setData({
      password: event.detail.value
    });
  },

   /**
   * 获得用户类型
   */
  get_usertype:function(event){
    this.setData({ usertype: event.detail });
    // console.log(event.detail)
  },

  aclogin: function () {
    let that = this;
    if(that.data.usertype == 'empty' || that.data.usertype == null){
      wx.showToast({
        title: '请选择登录角色!',
        icon: 'none'
      });
      return;
    }

    //向后端发送请求
    wx.request({  //使用ajax请求服务
      url: wx.getStorageSync('host') + "/"+that.data.usertype+"/login", //url
      method: 'POST', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        "username": that.data.username,
        "password": that.data.password
      },
      success: function (res) {
        if (res.data.status == 200) {
          var user = res.data.data;
          if (JSON.stringify(user) == '{}' || user == null) {
            wx.showToast({
              title: '用户名或密码错误',
              icon: 'none'
            })
            return false;
          }
          that.login(user);

        } else {
          wx.showToast({
            title: '登录失败,请稍后重试',
            icon: 'none'
          })
        }

      },
      fail: function () {
        wx.showToast({
          title: '登录失败,请稍后重试',
          icon: 'none'
        })
      },
      complete: function () {
        // complete 
      }
    })
  },


  goToRegister: function () {
    wx.redirectTo({
      url: '/pages/repair/register/register',
    })
  },

  to_apLogin: function () {
    this.setData({
      apLogin: true, //显示账号密码登录
      wxLogin: false, //隐藏微信登录,
      color1: '#1989FA',  //当前选中
      color2: 'black',  // 
    })
  },

  to_wxLogin: function () {
    this.setData({
      apLogin: false, //隐藏账号密码登录
      wxLogin: true, //显示微信登录
      color1: 'black',  //
      color2: '#1989FA',  //当前选中 
    })
  },



})