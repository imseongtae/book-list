<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="username">id: </label>
          <input id="username" type="text" v-model="username" />
          <p class="validation-text">
            <span class="warning" v-if="username && !isUsernameValid">
              이메일 형식에 맞추어 아이디를 입력하세요
            </span>
          </p>
        </div>
        <div>
          <label for="password">pw: </label>
          <input id="password" type="text" v-model="password" />
        </div>
        <div>
          <label for="nickname">nickname: </label>
          <input id="nickname" type="text" v-model="nickname" />
        </div>
        <button
          type="submit"
          class="btn"
          :class="
            !isUsernameValid || !password || !nickname ? 'disabled' : null
          "
          :disabled="!isUsernameValid || !password || !nickname"
        >
          회원 가입
        </button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/auth';
import { validateEmail } from '@/utils/validation';

export default {
  data() {
    return {
      // form values
      username: '',
      password: '',
      nickname: '',
      // log
      logMessage: '',
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.username);
    },
  },
  methods: {
    async submitForm() {
      try {
        const userData = {
          username: this.username,
          password: this.password,
          nickname: this.nickname,
        };
        const { data } = await registerUser(userData);
        console.log(data.username);
        this.logMessage = `${data.username} 님이 가입되었습니다`;
        this.initForm();
      } catch (error) {
        // console.log(error.response.data);
        this.logMessage =
          '이미 중복된 아이디가 존재합니다. 다른 아이디를 사용해주세요';
      }
    },
    initForm() {
      this.username = '';
      this.password = '';
      this.nickname = '';
    },
  },
};
</script>

<style scoped>
.btn {
  color: #fff;
}
</style>
