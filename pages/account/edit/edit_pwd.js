// pages/account/edit/edit_pwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    can_edit: false,
    user: null,
    user_type: null,
    password: null,
    check: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },






  check_password: function (e) {
    // console.log(e.detail.value);
    var password = e.detail.value;
    if (password == '' || password == null) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return false;
    } else {
      this.setData({
        password: password
      });
    }
    return true;
  },

  check_check: function (e) {
    // console.log(e.detail.value);
    var check = e.detail.value;
    if (check == '' || check == null) {
      wx.showToast({
        title: '确认密码不能为空',
        icon: 'none'
      })
      return false;
    } else if (this.data.password != check) {
      wx.showToast({
        title: '密码输入不一致',
        icon: 'none'
      })
      return false;
    }
    this.setData({check: check, can_edit: true})
    return true;
  },

  editpwd: function(){

    let that = this;

    var id = wx.getStorageSync('user').id;
    var password = this.data.password;
    var check = this.data.check;

    if (password == '' || password == null) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      });
    }
    //校验两次输入
    if (check != password) {
      wx.showToast({
        title: '两次密码输入不一致!',
        icon: 'none'
      });
      return false;
    }

    //向后端发送请求
    wx.request({  //使用ajax请求服务
      url: wx.getStorageSync('host') + "/" + wx.getStorageSync('user_type') + "/updatePwd/" + id, //url
      method: 'PUT', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        "username": wx.getStorageSync('user').username,   //用户名
        "password": wx.getStorageSync('user').password,   //旧密码,用于后端验证
        "newPwd": password  //新密码
      },
      success: function (res) {
        // console.log(res.data);
        if (res.data.status == 200) {
          wx.request({  //查询修改之后的用户信息
            url: wx.getStorageSync('host') + "/" + wx.getStorageSync('user_type') + "/get/" + id,
            method: 'GET',
            success: function (res) {
              if (res.data.status == 200) {
                wx.setStorage({
                  key: 'user',
                  data: res.data.data,
                });
              }
            }
          });

          wx.showToast({
            title: '修改成功',
            icon: 'success',
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '../account',
                })
              }, 2000);
            }
          });

        } else {  //status!=200
          wx.showToast({
            title: '修改失败,请稍后重试',
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

  cancel: function(){
    wx.switchTab({
      url: '/pages/account/account',
    })
  },


  /**
   * 修改密码
   */
  formSubmit: function (e) {
    let that = this;

    var id = wx.getStorageSync('user').id;
    var password = e.detail.value.password;
    var check = e.detail.value.check;

    if (password == '' || password == null) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      });
    }
    //校验两次输入
    if (check != password) {
      wx.showToast({
        title: '两次密码输入不一致!',
        icon: 'none'
      });
      return false;
    }

    //向后端发送请求
    wx.request({  //使用ajax请求服务
      url: wx.getStorageSync('host') + "/" + wx.getStorageSync('user_type') + "/updatePwd/" + id, //url
      method: 'POST', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        "username": wx.getStorageSync('user').username,   //用户名
        "password": wx.getStorageSync('user').password,   //旧密码,用于后端验证
        "newPwd": password  //新密码
      },
      success: function (res) {
        // console.log(res.data);
        if (res.data.status == 200) {
          wx.request({  //查询修改之后的用户信息
            url: wx.getStorageSync('host') + "/" + wx.getStorageSync('user_type') + "/get/" + id,
            method: 'GET',
            success: function (res) {
              if (res.data.status == 200) {
                wx.setStorage({
                  key: 'user',
                  data: res.data.data,
                });
              }
            }
          });

          wx.showToast({
            title: '修改成功',
            icon: 'success',
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '../account',
                })
              }, 2000);
            }
          });
           
        } else {  //status!=200
          wx.showToast({
            title: '修改失败,请稍后重试',
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


})