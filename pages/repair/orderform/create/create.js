// pages/repair/orderform/create/create.js
const area_arr = {
  龙湖校区南苑: ['图书馆', '3#组团楼', '1号公寓', '2号公寓', '3号公寓', '4号公寓'],
  龙湖校区北苑: ['1#国教楼', '1号宿舍楼', '2号宿舍楼', '3号宿舍楼', '4号宿舍楼'],
  中原校区: ['图书馆', '亚太楼', '1号公寓', '2号公寓', '3号公寓', '4号公寓'],
  西三环校区: ['图书馆', '1号教学楼', '1号公寓(男)', '1号公寓(女)', '2号公寓', '学生餐厅'],
};
const sort_arr = {
  水: [{
    'ID': 1001,
    'name': '水龙头类',
    'pid': 1
  }, {
    'ID': 1002,
    'name': '上下水管类',
    'pid': 1
  }, {
    'ID': 1003,
    'name': '阀门类',
    'pid': 1
  }, {
    'ID': 1004,
    'name': '厕所洁具类',
    'pid': 1
  }, {
    'ID': 1005,
    'name': '下水疏通类',
    'pid': 1
  }, {
    'ID': 1006,
    'name': '其他',
    'pid': 1
  }],
  电: [{
    'ID': 2001,
    'name': '室内照明类',
    'pid': 2
  }, {
    'ID': 2002,
    'name': '开关插座类',
    'pid': 2
  }, {
    'ID': 2003,
    'name': '公共照明类',
    'pid': 2
  }, {
    'ID': 2004,
    'name': '电风扇类',
    'pid': 2
  }, {
    'ID': 2005,
    'name': '空调类',
    'pid': 2
  }, {
    'ID': 2006,
    'name': '其他',
    'pid': 2
  }],
  土建: [{
    'ID': 3001,
    'name': '地板砖,踢脚线',
    'pid': 3
  }, {
    'ID': 3002,
    'name': '吊顶天花板',
    'pid': 3
  }, {
    'ID': 3003,
    'name': '墙体漆面,墙砖',
    'pid': 3
  }, {
    'ID': 3004,
    'name': '防盗网',
    'pid': 3
  }, {
    'ID': 3005,
    'name': '其他',
    'pid': 3
  }],
  木工: [{
    'ID': 4001,
    'name': '门窗类',
    'pid': 4
  }, {
    'ID': 4002,
    'name': '床铺',
    'pid': 4
  }, {
    'ID': 4003,
    'name': '柜子桌椅',
    'pid': 4
  }, {
    'ID': 4004,
    'name': '玻璃类',
    'pid': 4
  }, {
    'ID': 4005,
    'name': '高低床铁梯',
    'pid': 4
  }, {
    'ID': 4006,
    'name': '其他',
    'pid': 4
  }],
  暖气: [{
    'ID': 5001,
    'name': '暖气不热',
    'pid': 5
  }, {
    'ID': 5002,
    'name': '暖气片漏水',
    'pid': 5
  }, {
    'ID': 5003,
    'name': '暖气片针阀门漏水',
    'pid': 5
  }, {
    'ID': 5004,
    'name': '暖气管漏水',
    'pid': 5
  }, {
    'ID': 5005,
    'name': '其他',
    'pid': 5
  }],
};



Page({

  /**
   * 页面的初始数据
   */
  data: {
    sorts: [{
      values: Object.keys(sort_arr),
      className: 'column1',
    },
      {
        values: sort_arr[0],
        className: 'column2',
        defaultIndex: 2,
      }
    ],
    areas: [{
        values: Object.keys(area_arr),
        className: 'column1',
      },
      {
        values: area_arr[0],
        className: 'column2',
        defaultIndex: 2,
      }
    ],




    areaShow: false,
    sortShow: false,
    area: null,

    sort_text: null,
    sort: null,
    sort_arr: null,

    //表单信息
    contact_person: null,
    contact_number: null,
    location: null,
    remarks: null,
    description: null,
    repair_image: null,

    //上传图片
    fileList: [],

  
  },

  onShow: function(){
    let that = this;
    //获得维修分类信息
    wx.request({
      url: wx.getStorageSync('host') + "/sort/getAllsort", //url
      method: 'GET', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        var sort_arr = res.data.data;
        that.setData({
          sort_arr: sort_arr,
        })


      }
    })


  },


  areaShow: function() { //显示地区选择器
    this.setData({
      areaShow: true
    })

  },
  areaClose: function () {//隐藏地区选择器
    this.setData({
      areaShow: false
    })
  },

  sortShow: function () {//显示种类选择器
    this.setData({
      sortShow: true
    })
  },

  sortClose: function () {//隐藏种类选择器
    this.setData({
      sortShow: false
    })
  },

  onSortChange(event) {  //获得维修种类
    const {picker,value,index} = event.detail;
    picker.setColumnValues(1, sort_arr[value[0]]);
    if (index == 0) {
      this.setData({
        sort_text: value[0] + ' ' + sort_arr[value[0]][0].name,
        sort: sort_arr[value[0]][0]
      })
    } else {
      this.setData({
        sort_text: value[0] + ' ' + value[1].name,
        sort: value[1]
      })
    }
  },

  onAreaChange(event) {  //获得地区
    const {
      picker,
      value,
      index
    } = event.detail;
    picker.setColumnValues(1, area_arr[value[0]]);
    if (index == 0) {
      this.setData({
        area: value[0] + ' ' + area_arr[value[0]][0]
      })
    } else {
      this.setData({
        area: value[0] + ' ' + value[1]
      })
    }

  },

  get_contact_person: function (event){
    var contact_person = event.detail.value;
    if(contact_person==null || contact_person==''){
      wx.showToast({
        title: '请填写联系人信息!',
        icon: 'none'
      })
    }else{
      this.setData({contact_person: contact_person})
    }

  },

  get_contact_number: function (event) {
    var contact_number = event.detail.value;
    if (contact_number == null || contact_number == '') {
      wx.showToast({
        title: '请填写联系电话!',
        icon: 'none'
      })
      return
    } 
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(contact_number)) {
      wx.showToast({
        title: '请输入正确的联系电话！',
        icon: 'none',
        duration: 1500
      })
      return false;
    }
    
    this.setData({ contact_number: contact_number })
    

  },

  get_location_details:function(event){
    var location_details = event.detail.value;
    var area = this.data.area;
    if(location_details == null || location_details==''){
      wx.showToast({
        title: '请填写详细地址!',
        icon: 'none'
      })
      return
    }
    this.setData({
      location: area+' '+location_details
    })

  },

  get_description: function (event) {
    var description = event.detail.value;
    if (description == null || description == '') {
      wx.showToast({
        title: '请填写故障描述!',
        icon: 'none'
      })
    } else {
      this.setData({ description: description })
    }

  },

  get_remarks: function (event) {
    var remarks = event.detail.value;
    if (remarks == null || remarks == '') {
      this.setData({ remarks: '无' })
    } else {
      this.setData({ remarks: remarks })
    }

  },

  afterRead(event) {  //上传图片
    let that = this;

    const { file } = event.detail;
   

    /**
        * 上传完成后把文件上传到服务器
        */

    //上传文件
    wx.uploadFile({
      url: wx.getStorageSync('UploadUrl'),
      filePath: file.path,
      name: 'uploadIMG',
      header: {
        "Content-sort": "multipart/form-data"
      },
      success: function (res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = that.data;
        fileList.push({ ...file, url: JSON.parse(res.data).data });
        that.setData({ fileList });
        that.setData({
          'repair_image': JSON.parse(res.data).data
        });
  
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '上传图片失败',
          showCancel: false,
          success: function (res) { }
        })
      }
    });
  },


  commit: function(){
    let that = this;

    var sid = this.data.sort.ID;
    var user = wx.getStorageSync('user');
    var description = this.data.description;
    var remarks = this.data.remarks == null ? '无' : this.data.remarks;
    var contact_person = this.data.contact_person;
    var contact_number = this.data.contact_number;
    var location = this.data.location;
    var repair_image =  this.data.repair_image;

    if (contact_person == null || contact_number == null || sid == null || repair_image == null || location == null || description == null){
      wx.showToast({
        title: '请将信息填写完整!',
        icon: 'none'
      })
      return false
    }
    if (contact_person == '' || contact_number == '' || sid == '' || repair_image == '' || location == '' || description == '') {
      wx.showToast({
        title: '请将信息填写完整!',
        icon: 'none'
      })
      return false
    }

    var orderform = {
      'rid': user.id,
      'sid': sid,
      'location': location,
      'description': description,
      'remarks': remarks,
      'contact_person': contact_person,
      'contact_number': contact_number,
      'repair_image': repair_image
    }
    // console.log(orderform)
    //向后端发送请求
    wx.request({ //使用ajax请求服务
      url: wx.getStorageSync('host') + "/orderform/create", //url
      method: 'POST', //请求方式
      header: {
        'Content-Type': 'application/json',
      },
      data: orderform,
      success: function (res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: '提交成功!',
            icon: 'success',
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/orderform/orderform'
                })
              }, 1000)
            }
          });

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
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