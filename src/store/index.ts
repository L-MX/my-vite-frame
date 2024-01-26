import useMenuStore from "./menu";
import useThemeStore from "./theme";
// 统一导出useStore方法
export default function useStore() {
  return {
    menu: useMenuStore(),
    theme: useThemeStore()
  };
}
