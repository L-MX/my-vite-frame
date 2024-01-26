<template>
  <div class="connect">
    <div class="top">判断节点</div>
    <div class="content">
      <p>判断节点分支</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  },
  methods: {
    done(type) {
      this.$emit('select-button', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.connect {
  width: 100%;
  height: 100%;
  background: #FFF;
  border: 1px solid #9a9a9b;
  overflow: hidden;
  @include rounded-corners(10px);
  .top {
    height: 30px;
    line-height: 30px;
    background-color: $warning-color;
    color: #fff;
    padding: 0 10px;
  }
  .content {
    @include calc-height(30px);
    padding: 10px;
  }
}
.connect p {
  margin: 0;
}
.button-list {
  position: absolute;
  bottom: 10px;
}
</style>