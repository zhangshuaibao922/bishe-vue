<template>
  <div>
    <input type="file" ref="fileInput" multiple webkitdirectory @change="handleFolderChange" accept="image/png, image/jpeg, image/gif, image/jpg">
    <button @click="uploadImages">上传图片</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';

export default defineComponent({
  setup() {
    const fileInput = ref<HTMLInputElement | null>(null);

    const handleFolderChange = () => {
      const files = fileInput.value?.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if(file.type.startsWith('image/')){
            console.log('选择的文件:', file.name);
          }
        }
      }
    };

    const uploadImages = async () => {
      const files = fileInput.value?.files;
      if (!files || files.length === 0) {
        console.error('请选择要上传的图片');
        return;
      }

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // 检查文件的 MIME 类型
        if (file.type.startsWith('image/')) {
          formData.append('images', file);
        } else {
          console.warn(`文件 '${file.name}' 的类型不是图片，将被忽略`);
        }
      }

      try {
        await axios.post('/upload', formData);
        console.log('上传成功');
      } catch (error) {
        console.error('上传失败:', error);
      }
    };

    return {
      fileInput,
      handleFolderChange,
      uploadImages
    };
  }
});
</script>
