<template>
  <div id="login">
    <div class="login-wrap">
      <h2>登陆</h2>
      <!--      from start -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form">
        <!--        用户名-->
        <el-form-item prop="email" class="item-form">
          <el-input type="email" v-model="ruleForm.email" autocomplete="off" placeholder="邮箱">
          </el-input>
        </el-form-item>

        <!--   验证码-->
        <el-form-item prop="code" class="item-form">
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input type="text" v-model.number="ruleForm.code" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="success" class="button block" @click="getVerifyCode()" :disabled="codeButton.status">
                {{ codeButton.text }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <!--        -->

        <!--        提交-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="item-form block"
                     v-bind:disabled="loginButtonStatus">登陆
          </el-button>
        </el-form-item>

      </el-form>
      <!--      from end-->
    </div>
  </div>
</template>

<script>
import {GetVerifyCode} from "@/api/login"
import {reactive, onMounted, ref} from "@vue/composition-api"
import {validateEmail} from '@/utils/validate';

export default {
  name: "index.vue",
  setup(props, {refs, root}) {
    //验证邮箱
    let checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (validateEmail(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };
    //验证验证码
    let validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };

    //定义数据
    const ruleForm = reactive({
      email: "",
      code: "",
    })
    const rules = reactive({
      email: [
        {validator: checkEmail, trigger: 'blur'}
      ],
      code: [
        {validator: validateCode, trigger: 'blur'}
      ]
    })
    const loginButtonStatus = ref(false)

    const timer = ref(null)
    //验证码按钮
    const codeButton = reactive({status: false, text: "获取验证码"})
    //声明函数

    //获取验证码
    const getVerifyCode = (() => {
      //邮箱格式检查
      if (ruleForm.email === '') {
        root.$message.error('邮箱不能为空');
        return false
      }
      if (validateEmail(ruleForm.email)) {
        root.$message.error('邮箱格式有误');
        return false
      }
      codeButton.status = true;
      codeButton.text = "发送中";

      //获取验证码
      let data = {email: ruleForm.email}

      GetVerifyCode(data).then(response => {
        console.log(response)
        //正常发送提示
        let data = response.data
        root.$message({message: data.smg, type: 'success'})

        //启用登陆按钮
        loginButtonStatus.value = false
        countDown(60)
      }).catch(error => {
        countDown(5)
        //root.$message.error(error.smg);
        console.log(error)
      })

    })


    //提交表单
    const submitForm = (formName => {
      refs[formName].validate((valid) => {
        if (valid) {
          let requestData = {
            username: "",
            email: ruleForm.email,
            phone: "",
            password: "",
            verify_code: ruleForm.code + ''
          }
          //登陆
          root.$store.dispatch('login/login', requestData).then(response => {
            console.log(response)
            //成功后跳转
            root.$router.push({
              name: 'Dashboard',
            })

          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    })

    // 倒计时
    const countDown = ((number) => {
      if (timer.value) {
        clearInterval(timer.value)
      }
      let t = number
      timer.value = setInterval(() => {
        t--
        if (t === 0) {
          clearInterval(timer.value)
          codeButton.status = false
          codeButton.text = "重新发送"
        } else {
          codeButton.text = `倒计时${t}秒`
        }
      }, 1000)


    })


    //生命周期，挂载完后后
    onMounted(() => {
    })

    // 给html的数据
    return {
      checkEmail,
      validateCode,
      ruleForm,
      rules,
      submitForm,
      getVerifyCode,
      loginButtonStatus,
      codeButton
    }
  },
}
</script>

<style lang="scss" scoped>
.login-wrap {
  h2 {
    font-size: 25px;
    margin-bottom: 25px;
  }

  height: 275px;
  width: 365px;
  margin: auto;
  padding: 30px;
}

.login-form {
  .item-form {
    margin-top: 20px;
  }

  .block {
    display: inline-block;
    width: 100%;
  }

  .button {
    border: 0px;
  }
}


</style>