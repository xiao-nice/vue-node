<template>
  <div class="login-wrap">
    <div class="login-content">
      <div class="login-title">系统登录</div>
      <el-form ref="loginFormRef" class="login-form" :model="loginForm" :rules="loginFormRules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" clearable placeholder="用户名" size="large">
            <template #prepend>
              <!-- <I name="UserFilled" size="14" /> -->
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="密码"
            size="large"
            :type="passwordType"
            @keyup.enter="submitForm"
          >
            <template #prepend>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" :loading="btnLoading" @click="submitForm">登录</el-button>
        </div>
        <p class="login-tips">用户名: admin 密码: 123456</p>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance, ElForm, ElFormItem } from 'element-plus'
import { useRouter } from 'vue-router'
import { loginApi } from '@/api/login'
import { useUserStroe } from '@/store/modules/user';

const router = useRouter()
const { loginAction } = useUserStroe()

const btnLoading = ref(false)
const passwordLock = ref(true)
const passwordType = ref('password')

const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})

const loginFormRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})


const submitForm = async () => {
  loginFormRef.value?.validate(async (valid) => {
    if (valid) {
      btnLoading.value = true
      try {
        await loginAction(loginForm)
      } finally {
        btnLoading.value = false
      }
      
      // 访问登录接口
      // store
      //   .dispatch('user/login', loginForm)
      //   .then(() => {
      //     router.push('/')
      //   })
      //   .finally(() => {
      //     btnLoading.value = false
      //   })
    } else {
      ElMessage.error('请输入用户名和密码')
    }
  })
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #235bae;
  /* background-image: url('@/assets/img/login_bg.jpg'); */
  background-size: cover;
}

.login-title {
  width: 100%;
  font-size: 20px;
  line-height: 50px;
  color: #fff;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.login-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 350px;
  transform: translate(-50%, -50%);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
}

.login-form {
  padding: 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #85155c;
}
</style>