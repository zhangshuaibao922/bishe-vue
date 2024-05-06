<template>
  <div>
    <div style="position: relative" id="tui-image-editor"></div>
    <el-button v-show="false" style="position: absolute;right: 50px;top: 15px" type="primary" size="small" @click="save">保存</el-button>
  </div>
</template>

<script lang="ts" setup>
import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import ImageEditor from 'tui-image-editor';
import {defineExpose,defineProps,defineEmits, computed, onMounted, ref, watch} from 'vue';
import {update} from "@/request/upload/upload"
import { ElMessage } from 'element-plus';
// 定义组件的props
const props = defineProps({
  imagePath: {
    type: String,
    required: true
  }
});
// 计算属性，动态更新loadImage对象
const loadImage = computed(() => ({
  path: props.imagePath,
  name: 'image'
}));
const locale_zh = {
  ZoomIn: '放大',
  ZoomOut: '缩小',
  Hand: '手掌',
  History: '历史',
  Resize: '调整宽高',
  Crop: '裁剪',
  DeleteAll: '全部删除',
  Delete: '删除',
  Undo: '撤销',
  Redo: '反撤销',
  Reset: '重置',
  Flip: '镜像',
  Rotate: '旋转',
  Draw: '画',
  Shape: '形状标注',
  Icon: '图标标注',
  Text: '文字标注',
  Mask: '遮罩',
  Filter: '滤镜',
  Bold: '加粗',
  Italic: '斜体',
  Underline: '下划线',
  Left: '左对齐',
  Center: '居中',
  Right: '右对齐',
  Color: '颜色',
  'Text size': '字体大小',
  Custom: '自定义',
  Square: '正方形',
  Apply: '应用',
  Cancel: '取消',
  'Flip X': 'X 轴',
  'Flip Y': 'Y 轴',
  Range: '区间',
  Stroke: '描边',
  Fill: '填充',
  Circle: '圆',
  Triangle: '三角',
  Rectangle: '矩形',
  Free: '曲线',
  Straight: '直线',
  Arrow: '箭头',
  'Arrow-2': '箭头2',
  'Arrow-3': '箭头3',
  'Star-1': '星星1',
  'Star-2': '星星2',
  Polygon: '多边形',
  Location: '定位',
  Heart: '心形',
  Bubble: '气泡',
  'Custom icon': '自定义图标',
  'Load Mask Image': '加载蒙层图片',
  Grayscale: '灰度',
  Blur: '模糊',
  Sharpen: '锐化',
  Emboss: '浮雕',
  'Remove White': '除去白色',
  Distance: '距离',
  Brightness: '亮度',
  Noise: '噪音',
  'Color Filter': '彩色滤镜',
  Sepia: '棕色',
  Sepia2: '棕色2',
  Invert: '负片',
  Pixelate: '像素化',
  Threshold: '阈值',
  Tint: '色调',
  Multiply: '正片叠底',
  Blend: '混合色',
  Width: '宽度',
  Height: '高度',
  'Lock Aspect Ratio': '锁定宽高比例'
}
// 画布组件自定义样式
const customTheme = {
  // image 坐上角度图片
  'common.bi.image': '', // 在这里换上你喜欢的logo图片
  'common.bisize.width': '0px',
  'common.bisize.height': '0px',
  'common.backgroundImage': 'none',
  'common.backgroundColor': '#f3f4f6',
  'common.border': '1px solid #444',

  // header
  'header.backgroundImage': 'none',
  'header.backgroundColor': '#f3f4f6',
  'header.border': '0px',

  // load button
  'loadButton.backgroundColor': '#fff',
  'loadButton.border': '1px solid #ddd',
  'loadButton.color': '#222',
  'loadButton.fontFamily': 'NotoSans, sans-serif',
  'loadButton.fontSize': '12px',
  'loadButton.display': 'none', // 可以直接隐藏掉

  // download button
  'downloadButton.backgroundColor': '#fdba3b',
  'downloadButton.border': '1px solid #fdba3b',
  'downloadButton.color': '#fff',
  'downloadButton.fontFamily': 'NotoSans, sans-serif',
  'downloadButton.fontSize': '12px',
  'downloadButton.display': 'none', // 可以直接隐藏掉

  // icons default
  'menu.normalIcon.color': '#8a8a8a',
  'menu.activeIcon.color': '#555555',
  'menu.disabledIcon.color': '#434343',
  'menu.hoverIcon.color': '#e9e9e9',
  'submenu.normalIcon.color': '#8a8a8a',
  'submenu.activeIcon.color': '#e9e9e9',

  'menu.iconSize.width': '24px',
  'menu.iconSize.height': '24px',
  'submenu.iconSize.width': '32px',
  'submenu.iconSize.height': '32px',

  // submenu primary color
  'submenu.backgroundColor': '#1e1e1e',
  'submenu.partition.color': '#858585',

  // submenu labels
  'submenu.normalLabel.color': '#858585',
  'submenu.normalLabel.fontWeight': 'lighter',
  'submenu.activeLabel.color': '#fff',
  'submenu.activeLabel.fontWeight': 'lighter',

  // checkbox style
  'checkbox.border': '1px solid #ccc',
  'checkbox.backgroundColor': '#fff',

  // rango style
  'range.pointer.color': '#fff',
  'range.bar.color': '#666',
  'range.subbar.color': '#d1d1d1',

  'range.disabledPointer.color': '#414141',
  'range.disabledBar.color': '#282828',
  'range.disabledSubbar.color': '#414141',

  'range.value.color': '#fff',
  'range.value.fontWeight': 'lighter',
  'range.value.fontSize': '11px',
  'range.value.border': '1px solid #353535',
  'range.value.backgroundColor': '#151515',
  'range.title.color': '#fff',
  'range.title.fontWeight': 'lighter',

  // colorpicker style
  'colorpicker.button.border': '1px solid #1e1e1e',
  'colorpicker.title.color': '#fff'
};
const imageEditor = ref<null | ImageEditor>(null);
const init = () => {
  imageEditor.value = new ImageEditor(document.querySelector('#tui-image-editor'), {
    includeUI: {
      loadImage: {
        path: loadImage.value.path,
        name: 'image'
      },
      menu: ['draw', 'shape', 'text'],
      initMenu: '',
      menuBarPosition: 'bottom',
      locale: locale_zh,
      theme: customTheme
    },
    cssMaxWidth: 500,
    cssMaxHeight: 700,
  });

  document.getElementsByClassName('tui-image-editor-main')[0].style.top = 0
  document.getElementsByClassName('tie-btn-history tui-image-editor-item help enabled')[0].style.display = 'none';
  document.getElementsByClassName('tie-btn-undo tui-image-editor-item help')[0].style.display = 'none';
  document.getElementsByClassName('tie-btn-redo tui-image-editor-item help')[0].style.display = 'none';
  document.getElementsByClassName('tie-btn-deleteAll tui-image-editor-item help')[0].style.display = 'none';
  document.getElementsByClassName('tie-btn-delete tui-image-editor-item help')[0].style.display = 'none';
  // 隐藏分割线
  document.querySelectorAll('.tui-image-editor-icpartition').forEach(item => {
    item.style.display = 'none'
  })
};
const save = async () => {
  console.log('save')
  const base64String = imageEditor.value?.toDataURL();
  const data = window.atob(base64String.split(',')[1]);
  const ia = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i);
  }
  const blob = new Blob([ia], { type: 'image/png' });
  const form = new FormData();
  form.append('image', blob);
  await update(loadImage.value.path,form)
  ElMessage.success("批注成功")
  return '123';
};
defineExpose({
  save,
});
// 监听 imagePath 的变化
watch(() => props.imagePath, (newVal, oldVal) => {
  // 在 imagePath 发生变化时执行的操作
  console.log('Image path changed. New value:', newVal);
  // 可以在这里调用其他方法，执行相应的逻辑
  init();
});
onMounted(() => {
  // init();
});
</script>

<style scoped>
/* 强制压缩菜单的高度 ，减少占用屏幕的空间*/
.tui-image-editor-container .tui-image-editor-submenu {
  height: auto !important;
}
.tui-image-editor-container.bottom .tui-image-editor-submenu > div {
  padding: 0 !important;
}
.tui-image-editor-container .tui-image-editor-help-menu.top {
  background-color: #e9e9e9;
}
/* 顶部工具栏定位 */
.tui-image-editor-container .tui-image-editor-header {
  top: -55px;
}
.tui-image-editor-container .tui-image-editor-help-menu.top {
  top: -50px;
}
/* 取消超出部分隐藏，否则因为顶部工具栏已经超出去了，会显示不出来
.tui-image-editor-container {
  overflow: auto;
} */
/* 顶部工具栏定位 */
.tui-image-editor-container {
  overflow: visible;
}
</style>
