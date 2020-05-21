// pages/account/site_pwd/site_pwd.js
Page({

  /**
    * 页面的初始数据
    */
  data: {
    can_edit: false,
    password: null,
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
        password: password,
        can_edit: true
      });
    }
    return true;
  },

  editpwd: function () {

    let that = this;

    var id = wx.getStorageSync('user').id;
    var password = this.data.password;


    if (password == '' || password == null) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      });
      return;
    }
    

    //向后端发送请求
    wx.request({  //使用ajax请求服务
      url: wx.getStorageSync('host') + "/" + wx.getStorageSync('user_type') + "/sitePwd/" + wx.getStorageSync('user').id, //url
      method: 'PUT',
      data: {
        'password': password
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



  form_submit: function (e) { //修改默认密码
    var password = e.detail.value.password;
    wx.request({
      url: wx.getStorageSync('host') + "/" + wx.getStorageSync('user_type') + "/sitePwd/" + wx.getStorageSync('user').id, //url
      method: 'put',
      data:{
        'password':password
      },
      success:function (res){
        // console.log(res.data);
        if (res.data.status == 200) {
          wx.request({  //查询修改之后的用户信息
            url: wx.getStorageSync('host') + "/" + wx.getStorageSync('user_type') + "/get/" + wx.getStorageSync('user').id,
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
                  url: '/pages/orderform/orderform',
                })
              }, 2000);
            }
          });
        }
      }
    })


  }

})