import { defineStore } from 'pinia'
import { ref } from 'vue'

const useThemeStore = defineStore(
  'theme',
  () => {
    let scheme  = ref('default')
    // 设置配色主题
    function setScheme(str: string) {
        scheme.value = str
    }
    return { scheme, setScheme }
  },
//   {
//     persist: true
//   }
)
export default useThemeStore