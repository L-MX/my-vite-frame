<!-- 公共操作栏 -->
<template>
  <div class="custom-operation">
    <div class="total-box">
      {{ name }}{{ $t("title.totalRows") }}：<b>{{ totalRows }}</b>
      <template v-if="selectedTotal !== undefined">
        {{ $t("title.selected") }}<span>{{ selectedTotal }}</span
        >{{ $t("title.item") }}
      </template>
    </div>
    <div class="btn-box">
      <slot name="buttonGroup"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  name: { type: String, default: '' },
  selectedTotal: {type: Number},
  totalRows: {type: Number, default: 0}
})
</script>

<style lang="scss" scoped>
.custom-operation {
  @include flexBox();
  >div {
    @include flex();
    flex-wrap: wrap;
  }
  .total-box {
    height: 32px;
    font-size: 16px;
    color: $text-color-secondary;
    >b,>span {
      display: inline-block;
    }
    &>b {
      color: $text-color;
      margin-right: 16px;
    }
    &>span {
      color: $primary-color;
      margin: 0 6px;
    }
  }
}
</style>
