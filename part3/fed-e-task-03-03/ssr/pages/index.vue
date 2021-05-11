<template>
  <view class='index'>
    Home
  </view>
</template>

<script>
export default {
  components: {},
  props: {},
  async asyncData() {
    const { data } = await axios({
      method: "GET",
      url: "/data.json",
    });
    return data;
  },
};
</script>

<style scoped lang="scss">
</style>