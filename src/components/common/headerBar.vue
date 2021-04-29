<template>
  <div id="header-bar" class="p-clear">
    <div class="p-left logo-content p-animation">
      
    </div>
    <div class="right-content p-animation">
      <div class="right-container p-animation">
        <div class="p-left">
          <!-- <span style="    font-size: 24px; margin-left: 10px;">
            <i v-if="letfShow"
              @click="openLeft"
              class="el-icon-s-unfold sub-item-icon "></i>
            <i v-if="!letfShow"
              @click="openLeft"
              class="el-icon-s-fold sub-item-icon "></i>
          </span> -->
        </div>
        <div class="p-left">
          <span
            v-for="(item, index) in menuList"
            :key="item.path"
            @click="getChildrenList(item.childNodes || [], index)"
            :class="
              currentMenuIndex === index
                ? 'active-topmenu top-menu'
                : 'top-menu'
            "
            >{{ item.name }}</span
          >
        </div>
        <div class="p-right right-box">
          <el-dropdown>
            <div class="message-box" style="color: #fff !important">
              <div class="message">
                <i v-if="infoCount === 0" class="icon-nomessage"></i>
                <i v-else class="icon-message"></i>
                <!-- <div class="message-num">
                  <div style="transform: scale(0.7)">
                    {{ infoCount > 99 ? "99+" : infoCount }}
                  </div>
                </div> -->
              </div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in infoList" :key="index">
                <p @click="_toSkipHandle(item)">
                  {{ item.type }}({{ item.amount }})
                </p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown trigger="click" @command="handleCommand">
            <span style="color: #fff">
              {{ formInfo.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus" command="changePwd"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-circle-plus" command="logOut"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <el-dialog
      :visible="msgVisible"
      width="150px"
      :modal="false"
      class="dialog-box"
      :show-close="false"
      :before-close="msgDialogHandle"
      style="margin-right: 50px"
    >
      <div style="padding: 10px"></div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog
      :visible="pwdVisible"
      title="修改密码"
      width="30%"
      class="pwd-dialog"
      :before-close="pwdDialogHandle"
    >
      <div class="info-box">
        <div class="info-top">
          <p class="info-title">登录账号</p>
          <div class="item-info">
            <p class="sub-item">账号:</p>
            <p class="sub-info">{{ formInfo.name }}</p>
          </div>
          <div class="item-info">
            <p class="sub-item">手机账号:</p>
            <p class="sub-info">{{ formInfo.phone }}</p>
          </div>
        </div>
        <div class="info-top">
          <p class="info-title">登录密码</p>
          <el-form :model="formInfo" ref="formInfo" :rules="rules">
            <el-form-item label="原密码:" prop="oldPass" label-width="100px">
              <el-input
                placeholder="8~15位，字母+数字"
                :minlength="8"
                :maxlength="15"
                v-model="formInfo.oldPass"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码:" prop="password" label-width="100px">
              <el-input
                placeholder="8~15位，字母+数字"
                :minlength="8"
                :maxlength="15"
                v-model="formInfo.password"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="确认密码:"
              prop="confirmPass"
              label-width="100px"
            >
              <el-input
                placeholder="8~15位，字母+数字"
                v-model="formInfo.confirmPass"
                :minlength="8"
                :maxlength="15"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="info-btn">
        <el-button round @click="pwdDialogHandle">取消</el-button>
        <el-button round type="primary" @click="_saveHandle">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import baseInfo from "../../config/config";
import { updatePassword } from "./../../apis/commonApi";
export default {
  name: "headerBar",
  components: {},
  data() {
    var validateInput = (rule, value, callback) => {
      let reg = /^[0-9a-zA-Z]{8,15}$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入8~15位，字母+数字"));
      } else {
        return callback();
      }
    };
    var checkedPass = (rule, value, callback) => {
      let reg = /^[0-9a-zA-Z]{8,15}$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入8~15位，字母+数字"));
      } else if (value !== this.formInfo.password) {
        return callback(new Error("两次密码不相同，请重新输入"));
      } else {
        return callback();
      }
    };
    return {
      menuList: [],
      menuArray: [],
      currentMenuIndex: 0,
      infoCount: 0,
      letfShow: true,
      infoList: [],
      msgVisible: false,
      pwdVisible: false,
      formInfo: {
        name: 'admin'
      },
      rules: {
        oldPass: [
          { required: true, validator: validateInput, trigger: "blur" },
        ],
        password: [
          { required: true, validator: validateInput, trigger: "blur" },
        ],
        confirmPass: [
          { required: true, validator: checkedPass, trigger: "blur" },
        ],
      },
      timer: null,
    };
  },
  created() {
    let menuTree = localStorage.getItem("menuTree")
      ? JSON.parse(localStorage.getItem("menuTree"))
      : [];
    this.menuList = menuTree;
    this.initrootMenuIndex();
  },
  mounted() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { name, phone, userId } = JSON.parse(userInfo);
      this.formInfo.name = name;
      this.formInfo.phone = phone;
      this.formInfo.userId = userId;
      this.userId = userId;
      this.init();
    }
  },

  methods: {
    handleCommand(command) {
      this[command]();
    },
    changePwd() {
      this.pwdVisible = true;
    },
    initrootMenuIndex() {
      this.menuArray = this.treeToarray(JSON.parse(localStorage.menuTree), []);
      let currentMenuItem = this.menuArray.filter(
        (item) => item.path === this.$router.history.current.path
      );
      if (currentMenuItem.length > 0) {
        this.findRootItem(currentMenuItem[0]);
      }else{
        this.$emit("changeChild", sessionStorage.leftMenu ? JSON.parse(sessionStorage.leftMenu):[]);
        this.currentMenuIndex = Number(sessionStorage.topMenuIndex) || 0;
      }
    },
    treeToarray(tree, array) {
      if (tree.length > 0) {
        tree.forEach((item) => {
          array.push(item);
          if (item.childNodes.length > 0) {
            this.treeToarray(item.childNodes, array);
          }
        });
      }
      return array;
    },
    findRootItem(item) {
      if (item.parentId === 0) {
        this.menuList.forEach((item2, index) => {
          if (item2.path === item.path) {
            this.getChildrenList(item2.childNodes,index);
          }
        });
      } else {
        this.menuArray.forEach((item2) => {
          if (item2.id === item.parentId) {
            this.findRootItem(item2);
          }
        });
      }
    },
    logOut() {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userName");
      localStorage.removeItem("password");
      localStorage.removeItem("tokenInfo");
      localStorage.removeItem("subPath");
      localStorage.removeItem("menuTree");
      sessionStorage.removeItem("leftMenu");
      sessionStorage.removeItem('pageTabList')
      sessionStorage.removeItem('activeIndex')
      sessionStorage.removeItem('topMenuIndex')
      // this.$router.push("/login");
      window.location.href="/login"
    },
    _saveHandle() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          let params = {
            ...this.formInfo,
          };
          updatePassword(params).then((res) => {
            if (res.data.code === 200) {
              this.$message.success(res.data.message);
              this.pwdDialogHandle();
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error(JSON.stringify(valid));
        }
      });
    },
    pwdDialogHandle() {
      this.$refs.formInfo.resetFields();
      this.pwdVisible = false;
    },
    init: function () {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(`${baseInfo.SCOKET_HOST}` + this.userId); // ws://192.168.31.174:8080/wsdemo
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open: function () {
      console.log("socket连接成功");
    },
    error: function () {
      console.log("连接错误");
    },
    getMessage: function (msg) {
      const { data } = msg;
      if (data) {
        if (data !== "message") {
          var msgData = JSON.parse(data);
          this.infoList = msgData.message;
        }
      }
      this.infoCount = 0;
      this.infoList.forEach((item) => {
        this.infoCount += item.amount;
      });
    },
    send: function () {
      this.socket.send(JSON.stringify({ msg: "123" }));
    },
    close: function () {
      console.log("socket已经关闭");
    },

    openLeft() {
      this.letfShow = !this.letfShow;
      this.$emit("getLeftShow");
    },
    _toSkipHandle(row) {
      if (row.type === "采购申请审批") {
        this.msgDialogHandle();
        this.$router.push("/purchaseApproval");
      } else if (row.type === "退货审批") {
        this.msgDialogHandle();
        this.$router.push("/returnApproval");
      }
    },
    msgDialogHandle() {
      this.msgVisible = false;
    },
    msgDialog() {
      this.msgVisible = true;
    },
    getChildrenList(item, index) {
      sessionStorage.leftMenu = JSON.stringify(item)
      sessionStorage.topMenuIndex = index
      this.$emit("changeChild", item);
      this.currentMenuIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
#header-bar {
  position: relative;
  .logo-small {
    width: 58px !important;
  }
  .logo-content {
    width: 200px;
    height: 45px;
  }
  .logo-text {
    width: 200px;
    height: 100%;
    text-align: center;
    padding-top: 3px;
    box-sizing: border-box;
  }
  .logo-icon {
    width: 58px;
    height: 45px;
    background: url("../../assets/image/logo-1.png") no-repeat center center;
    background-size: 80%;
  }
  .right-large {
    margin-left: 58px !important;
  }
  .right-content {
    margin-left: 200px;
    height: 45px;
    line-height: 45px;
    .right-container {
      vertical-align: middle;
      height: 100%;
      // width: 100%;
      overflow: hidden;
      .menu-icon {
        margin-left: 10px;
        width: 20px;
        height: 28px;
        background: url("../../assets/image/icon-system.png") no-repeat center
          center;
        background-size: 100%;
        display: inline-block;
        vertical-align: middle;
      }
      .systemName {
        color: #333333;
        font-size: 22px;
        font-weight: bold;
        // float: left;
        // height: 28px;
        // line-height: 28px;
        padding-left: 10px;
      }
      .right-box {
        display: flex;
        line-height: 30px;
        height: 30px;
        padding-right: 40px;
        margin-top: 10px;
        color: #fff;
        .status-box {
          width: 33%;
        }
        .message-num {
          // position: absolute;
          // background: red;
          // display: inline-block;
          // color: #fff;
          // font-size: 5px;
          // width: 14px;
          // text-align: center;
          // height: 14px;
          // line-height: 14px;
          // border-radius: 50%;
          // right: -11px;
          // top: 0px;
          // cursor: pointer;
        }
        .message-box {
          display: inline-block;
          position: relative;
          margin-left: 5px;
          cursor: pointer;
        }
        .message {
          margin-right: 20px;
          position: relative;
          .icon-message {
            display: block;
            width: 38px;
            height: 28px;
            background: url("../../assets/image/message.png") no-repeat center center;
            background-size: 70%;
          }
          .icon-nomessage {
            display: block;
            width: 38px;
            height: 28px;
            background: url("../../assets/image/nomessage.png") no-repeat center center;
            background-size: 70%;
          }
        }
        .user {
          padding-left: 50px;
          position: relative;
          color: #31478f;
          margin-right: 8px;
        }
        .user::after {
          display: block;
          content: "";
          width: 14px;
          height: 14px;
          background: rgba(49, 71, 143, 1);
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 50%;
          position: absolute;
          left: 20px;
          top: 7px;
        }
        .user::before {
          display: block;
          content: "";
          left: 5px;
          top: 7.5px;
          width: 2px;
          height: 15px;
          background: rgba(49, 71, 143, 1);
          position: absolute;
        }
        .icon-box {
          line-height: 30px;
          padding-left: 10px;
          color: #31478f;
          position: relative;
        }
        .icon-box::after {
          display: block;
          content: "";
          left: 5px;
          top: 7.5px;
          width: 2px;
          height: 15px;
          background: rgba(49, 71, 143, 1);
          position: absolute;
        }
      }
    }
  }
  .sub-header {
    background: #007c90;
    padding-left: 20px;
    .sub-header-item {
      display: inline-block;
      vertical-align: middle;
      line-height: 35px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      padding: 5px 30px;
      .sub-item-icon {
        font-size: 30px;
        vertical-align: middle;
      }
    }
    .sub-item-active {
      background: #26b4ce;
    }
  }
  .logOut {
    font-weight: bold;
    cursor: pointer;
  }
  @keyframes myAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .pwd-dialog {
    .info-box {
      padding: 0 20px;
      .info-top {
        margin-top: 15px;
        .info-title {
          // height: 17px;
          line-height: 30px;
          font-size: 18px;
          font-weight: bold;
        }
        .item-info {
          line-height: 30px;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 10px;
          .sub-item {
            width: 20%;
            text-align: right;
            margin-right: 10px;
          }
          .sub-info {
            width: 60%;
          }
        }
      }
    }
    .info-btn {
      border-top: 1px solid #e5e5e5;
      text-align: center;
      padding-top: 10px;
    }
  }
}
</style>
<style lang="less" >
.dialog-box {
  top: -100px !important;
  .el-dialog {
    margin-right: 35px !important;
  }
  .el-dialog__body {
    padding-top: 10px;
  }
  .el-dialog__header {
    display: none;
  }
}

#header-bar {
  background: #2265fa;
  .right-content {
    .right-container {
      .right-box {
        .el-select {
          width: 69% !important;
          .el-input__inner {
            height: 30px !important;
            line-height: 30px !important;
          }
        }
      }
    }
  }
}
.top-menu {
  display: inline-block;
  width: 100px;
  height: 45px;
  color: #fff;
  cursor: pointer;
  text-align: center;
}
.top-menu.active-topmenu {
  background: rgba(255, 255, 255, 0.15) !important;
}
</style>
<style lang="less">
.pwd-dialog {
  .el-dialog__header {
    background: #1d93a8 !important;
    .el-dialog__title {
      color: #fff !important;
    }
    .el-dialog__close {
      color: #fff !important;
    }
  }
  .el-dialog__body {
    padding-top: 0;
  }
  .checkbox-wrapper {
    padding: 10px;
    border: 1px solid #e5e5e5;
    margin-bottom: 10px;
    .el-checkbox {
      display: inline-block;
      width: 40%;
      line-height: 30px;
    }
  }
}
</style>
