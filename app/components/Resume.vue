<style>
  .resume-download-btn {
    margin-top: 12px;
  }

  .resume {
    margin-top: 32px;
    height: 2276px;
    width: 100%;
    border: none;
  }

  @media (max-width: 1023px) {
    .resume-download-btn {
      padding-left: 32px;
    }
  }
</style>

<script>
export default {
  data() {
    return {
      resumeSrc: '/Jacob_Friesen_Resume_No_Title.html',
      timestamp: Date.now(),
    };
  },
  computed: {
    iframeSrc() {
      // Append the timestamp as a query parameter for cache busting
      return `${this.resumeSrc}?v=${this.timestamp}`;
    },
  },
};
</script>

<template>
  <ResumeDownload class="resume-download-btn"/>
  
  <iframe class="resume" width="100%" :src="iframeSrc"></iframe>
</template>