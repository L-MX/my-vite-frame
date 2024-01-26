<!-- 公共查询栏 -->
<template>
  <div class="custom-query">
    <el-form style="width: 100%">
      <el-row :gutter="20">
        <el-col
          :lg="6"
          :xl="6"
          :md="8"
          :sm="8"
          :xs="12"
          v-for="(item, key) in queryItems"
          :key="key"
          v-show="getIndex(key) < limitCount"
        >
          <el-form-item :label="item.label">
            <!-- 文本框 -->
            <el-input
              v-if="item.type === 'input'"
              v-model="item.value"
              :placeholder="$t('placeholder.pleaseInput')"
              :clearable="!item.clearDisable"
              style="width: 100%"
            ></el-input>
            <!-- 下拉框 -->
            <el-select
              v-else-if="item.type === 'select'"
              v-model="item.value"
              :placeholder="$t('placeholder.pleaseSelect')"
              :clearable="!item.clearDisable"
              :multiple="item.multiple"
              collapse-tags
              :max-collapse-tags="item.maxTag || 2"
              filterable
              style="width: 100%"
            >
              <el-option
                v-for="x of item.options"
                :key="x.value"
                :label="x.label"
                :value="x.value"
              >
              </el-option>
            </el-select>
            <!-- 日期选择框 -->
            <el-date-picker
              v-else-if="item.type === 'datePicker'"
              v-model="item.value"
              type="date"
              :placeholder="$t('time.chooseDate')"
              :picker-options="item.pickerOptions"
              :format="item.format || dateFormat"
              :value-format="item.format || dateFormat"
              style="width: 100%"
              >
            </el-date-picker>
            <!-- 日期选择范围 -->
            <el-date-picker
              v-else-if="item.type === 'dateRange'"
              v-model="item.value"
              type="daterange"
              :range-separator="$t('time.to')"
              :start-placeholder="$t('time.startDate')"
              :end-placeholder="$t('time.endDate')"
              :pickerOptions="item.pickerOptions"
              :format="item.format || dateFormat"
              :value-format="item.format || dateFormat">
            </el-date-picker>
            <!-- 日期时间选择范围 -->
            <el-date-picker
              v-else-if="item.type === 'datetimeRange'"
              v-model="item.value"
              type="datetimerange"
              :range-separator="$t('time.to')"
              :start-placeholder="$t('time.startTime')"
              :end-placeholder="$t('time.endTime')"
              :pickerOptions="item.pickerOptions"
              :format="item.format || datetimeFormat"
              :value-format="item.format || datetimeFormat">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 屏幕宽度 > 1200 展示4个；屏幕宽度 > 768 展示3个 ；屏幕宽度小于748展示2个 【包括按钮项】-->
        <el-col
          :lg="{ span: 6, offset: offsetCol }"
          :xl="{ span: 6, offset: offsetCol }"
          :md="{ span: 8, offset: offsetCol }"
          :sm="{ span: 8, offset: offsetCol }"
          :xs="{ span: 12, offset: offsetCol }"
          :class="{ right: showMore && !lessRange }"
          style="margin-bottom: 16px;"
        >
            <el-button type="primary" @click="search">{{ $t('btn.search') }}</el-button>
            <el-button @click="reset">{{ $t('btn.reset') }}</el-button>
            <span class="expand-btn link-text" v-if="showMore" @click="toggle">
              {{ isExpand ? $t('btn.fold'): $t('btn.expandmore') }}
              <el-icon style="position: relative; top: 2px">
                <ArrowUp v-if="isExpand" />
                <ArrowDown v-else />
              </el-icon>
            </span>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">

import { ref, computed, onMounted, onUnmounted } from "vue";
import { cloneDeep } from "lodash";

const props = defineProps({
  queryItems: { type: Object, default: () => {} },
});
const emit = defineEmits(["toggle", "search", "reset"]);
const dateFormat = ref<string>('YYYY-MM-DD')
const datetimeFormat =  ref<string>('YYYY-MM-DD hh:mm:ss')

// 监听屏幕分辨率
const limit = ref<number>(0);
const lessRange = ref<boolean>(false);
const resizeScreem = () => {
  const $w = window.innerWidth;
  limit.value = $w >= 1200 ? 3 : $w >= 768 ? 2 : 1;
  // 屏幕小于最小宽度时
  lessRange.value = $w <= 768;
  setOffsetCol();
};

// 设置按钮的偏移量，保证单行跟随，多行右对齐
const offsetCol = ref<number>(0);
const setOffsetCol = () => {
  const col = limit.value + 1; // 一行排满的col数量
  const residue = queryCount.value % col; // 不满一整行的col数量
  offsetCol.value = isExpand.value ? (col - residue - 1) * (24 / col) : 0;
};

// 展开收起
const isExpand = ref<Boolean>(false);
const toggle = () => {
  isExpand.value = !isExpand.value;
  setOffsetCol();
  emit("toggle");
};

/* computed */
// 备份一份，方便重置
const queryItemsCopy: any = cloneDeep(props.queryItems)
const getIndex = (key: string) => {
  const keys = Object.keys(props.queryItems)
  const index = keys.indexOf(key)
  return index
}
// 总查询条件的个数
const queryCount = computed(() => {
  const keys = Object.keys(props.queryItems)
  return keys.length
});
// 可展示的查询条件个数
const limitCount = computed(() => {
  return isExpand.value ? 1000 : limit.value;
});
// 是否展示“展开更多”
const showMore = computed(() => {
  return queryCount.value > limitCount.value || isExpand.value;
});

// 查询条件赋值
const getQuery = (obj: any) => {
  let query: any = {}
  for (let key in obj) {
    query[key] = obj[key].value
  }
  return query
}
const toSearch = (arr: any) => {
  const query = getQuery(arr) // 获取查询条件的值
  emit('search', query)       // 查询
}
const search = () => {
  toSearch(props.queryItems)
}
const reset = () => {
  emit('reset', queryItemsCopy) // 清空查询条件
  toSearch(queryItemsCopy)
}

/* 生命周期 */
onMounted(() => {
  resizeScreem();
  window.addEventListener("resize", resizeScreem);
}),
onUnmounted(() => {
  window.addEventListener("resize", resizeScreem);
});
</script>

<style lang="scss" scoped>
.custom-query {
  @include flexBox();
  .right {
    text-align: right;
  }
  .expand-btn {
    margin-left: 12px;
  }
}
</style>
