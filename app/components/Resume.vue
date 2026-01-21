<style>
  .resume-download-btn {
    margin-top: 12px;
  }

  .resume {
    margin-top: 32px;
    width: 100%;
    border: none;
  }

  @media (max-width: 1023px) {
    .resume-download-btn {
      padding-left: 32px;
    }
  }
</style>

<script setup>
import { ref } from 'vue';

const resumeFrame = ref(null);
const iframeHeight = ref('auto');
const iframeSrc = ref(`/Jacob_Friesen_Resume_No_Title.html?v=${Date.now()}`);

const resizeIframe = () => {
  if (resumeFrame.value) {
    iframeHeight.value = `${resumeFrame.value.contentWindow.document.body.scrollHeight + 32}px`;
  }
}
</script>

<template>
  <ResumeDownload class="resume-download-btn"/>
  
  <iframe 
    class="resume"
    width="100%"
    frameborder="0"
    scrolling="no"
    ref="resumeFrame"
    :src="iframeSrc"
    :height="iframeHeight"
    @load="resizeIframe"
  ></iframe>
</template>