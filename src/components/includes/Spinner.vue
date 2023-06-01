<template>
    <span class="loader"></span>
  </template>
<script>
export default {
    name: 'SpinnerLoader',
    props: ['size', 'white']
}
</script>
<style scoped lang="scss">
$dimension: 20px;

.loader {
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #3498db; /* Blue */
  border-radius: 50%;
  width: $dimension;
  height: $dimension;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
</style>