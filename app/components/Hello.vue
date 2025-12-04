<script setup>
const {data} = await useFetch('/hello');
</script>

<template>
  Data: <pre>{{data}}</pre>
</template>
