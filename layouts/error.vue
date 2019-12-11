<template>
  <div>出错了：{{error}}</div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
}
</script>

<style lang="scss" scoped>

</style>