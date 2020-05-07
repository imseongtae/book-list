<template>
  <li>
    <div class="post-title">
      {{ postItem.title }}
    </div>
    <div class="post-contents">
      {{ postItem.contents }}
    </div>
    <div class="post-time">
      {{ postItem.createdAt | formatDate }}
      <i class="icon ion-md-create" @click="routeEditPage"></i>
      <i class="icon ion-md-trash" @click="deleteItem"></i>
    </div>
  </li>
</template>

<script>
import { deletePost } from '@/api/posts';

export default {
  props: {
    postItem: {
      type: Object,
      required: true,
    },
  },
  // filters: {
  //   formatDate(value) {
  //     return new Date(value);
  //   },
  // },
  methods: {
    async deleteItem() {
      try {
        if (confirm('You want to delete it?')) {
          const id = this.postItem._id;
          await deletePost(id);
          this.$emit('refresh');
          console.log('delete item');
        }
      } catch (error) {
        console.log(error);
      }
    },
    routeEditPage() {
      const id = this.postItem._id;
      this.$router.push(`/post/${id}`);
    },
  },
};
</script>

<style></style>
