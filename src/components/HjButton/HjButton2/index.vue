<template>
  <button class="slide">Slide</button>
</template>
<style lang="scss" scoped>
  .slide:hover,
  .slide:focus {
    box-shadow: inset 6.5em 0 0 0 var(--hover);
  }

  // Multiple shadows, one on the outside, another on the inside
  .offset {
    box-shadow: 0.3em 0.3em 0 0 #8fc866, inset 0.3em 0.3em 0 0 #8fc866;

    &:hover,
    &:focus {
      box-shadow: 0 0 0 0 var(--hover), inset 6em 3.5em 0 0 var(--hover);
    }
  }
</style>
