import { defineStore } from "pinia";
import { ref } from "vue";

const useMenuStore = defineStore(
  "menu",
  () => {
    const isCollapse = ref<Boolean>(false);
    // 设置配色主题
    function collapseChange(bool: Boolean) {
      isCollapse.value = bool
    }
    return { isCollapse, collapseChange };
  }
);
export default useMenuStore