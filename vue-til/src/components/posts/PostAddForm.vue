<template>
  <div class="contents">
    <h1 class="page-header">학습 노트 등록 페이지</h1>
    <div class="form-wrapper">
      <form class="form" @submit.prevent="submitForm()">
        <div>
          <label for="title">Title: </label>
          <input id="title" type="text" v-model="title" />
        </div>
        <div>
          <label for="contents">Contents: </label>
          <textarea type="text" rows="5" v-model="contents" />
          <p v-if="!isContentsLengthValid" class="validation-text warning">
            Contents length must be less than 200
          </p>
        </div>
        <button type="submit" class="btn">Create</button>
      </form>
      <p class="log">
        {{ logMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { createPost } from '@/api/posts';
export default {
  data() {
    return {
      title: '',
      contents: '',
      logMessage: '',
    };
  },
  computed: {
    isContentsLengthValid() {
      return this.contents.length <= 200;
    },
  },
  methods: {
    async submitForm() {
      try {
        const response = await createPost({
          title: this.title,
          contents: this.contents,
        });
        this.$router.push('/main');

        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        // this.logMessage = error.response.data.message;
        this.logMessage = '이미 동일한 글의 게시물이 존재합니다.';
      }
    },
  },
};
</script>

<style scoped>
.form-wrapper .form {
  width: 100%;
}

.btn {
  color: white;
}
</style>
