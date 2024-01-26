import useCtx from "@/hooks/useCtx";

export const setActions = (data: {breadcrumbList: Array<{title: string, path: string}>}) => {
  const { _this } = useCtx();
  if (_this.$microProps && _this.$microProps.setGlobalState) {
    _this.$microProps.setGlobalState(data)
  }
}