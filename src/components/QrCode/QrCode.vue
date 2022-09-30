<template>
  <div ref="qrCodeDomRef" class="qr-code-box">
    <h1>化简简历</h1>
    <p>{{ appStore.useUserInfoStore.userInfo.name }}</p>
    <qrcode-vue :value="value" :size="size" level="H" :foreground="foreground" />
  </div>
</template>

<script lang="ts" setup>
  import QrcodeVue from 'qrcode.vue';
  import appStore from '@/store';
  import html2canvas from 'html2canvas';

  interface TQr {
    value: string;
    size: number;
    foreground: string;
  }
  withDefaults(defineProps<TQr>(), {
    value: '',
    size: 100,
    foreground: '#00c091'
  });

  const qrCodeDomRef = ref<any>(null);
  const downLoadQRcode = () => {
    html2canvas(qrCodeDomRef.value, {
      backgroundColor: '#ffffff'
    }).then((canvas) => {
      var imgData = canvas.toDataURL('image/jpeg');
      fileDownload(imgData);
    });
  };
  const fileDownload = (downloadUrl: string) => {
    let aLink = document.createElement('a');
    aLink.style.display = 'none';
    aLink.href = downloadUrl;
    aLink.download = '化简简历.png';
    // 触发点击-然后移除
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
  };

  defineExpose({
    downLoadQRcode
  });
</script>
<style lang="scss" scoped>
  .qr-code-box {
    width: 220px;
    height: 280px;
    border: 1px solid rgb(235, 235, 235);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 4%);
    h1 {
      font-size: 18px;
    }
    p {
      margin-bottom: 10px;
    }
  }
</style>
