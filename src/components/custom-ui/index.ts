/*
* @Description: 将所有的自定义组件进行全局注册
* @Author: mxliu5
* @Date: 2023-08-16
*/

import { createApp } from "vue";

import myButton from "@/components/custom-ui/myButton.vue";
import TooltipButton from "@/components/custom-ui/TooltipButton.vue";
import myDialog from "@/components/custom-ui/myDialog.vue";
import myDrawer from "@/components/custom-ui/myDrawer.vue";
import myForm from "@/components/custom-ui/myForm.vue";
import Query from "@/components/custom-ui/Query.vue";
import Operation from "@/components/custom-ui/Operation.vue";
import Pagination from "@/components/custom-ui/Pagination.vue";
import myTable from "@/components/custom-ui/myTable.vue";
import TablePage from "@/components/custom-ui/TablePage.vue";
import Empty from "@/components/custom-ui/Empty.vue";
import TagInput from "@/components/custom-ui/TagInput.vue"
import StatusTag from "@/components/status/status-tag.vue";
import StatusDot from "@/components/status/status-dot.vue";
import Upload from "@/components/upload/Upload.vue";

const components = [
  myButton,
  TooltipButton,
  myDialog,
  myDrawer,
  myForm,
  Query,
  Operation,
  Pagination,
  myTable,
  TablePage,
  Empty,
  TagInput,
  StatusTag,
  StatusDot,
  Upload,
];
export function initComponent(app: ReturnType<typeof createApp>) {
  components.forEach((component) => {
    app.component(component.name, component);
  });
}
