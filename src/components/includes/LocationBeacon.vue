<template>
  <span class="loader"></span>
</template>
<script>
export default {
    name: 'LocationBeacon'
}
</script>

<style lang="scss" scoped>
$dimension: 200px;
.loader {
  width: $dimension;
  height: $dimension;
  display: inline-block;
  position: relative;
}
.loader::after,
.loader::before {
  content: '';  
  box-sizing: border-box;
  width: $dimension;
  height: $dimension;
  border-radius: 50%;
  background: var(--primary-color);
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}
.loader::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
    
</style>