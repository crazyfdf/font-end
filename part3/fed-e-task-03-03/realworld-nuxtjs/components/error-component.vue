<template>
  <div v-if="error">
    <ul class="error-messages">
      <template v-for="(messages,field) in error">
        <li v-for="(message,index) in messages"
            :key="index">
          {{field}} {{message}}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "error-component",
  components: {},
  props: {
    error: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped lang="scss">
</style>