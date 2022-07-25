<template>
  <div
    class="loader__wrap"
    role="alertdialog"
    aria-busy="true"
    aria-live="polite"
    aria-label="Loading…"
  >
    <div class="loader" aria-hidden="true">
      <div class="loader__sq"></div>
      <div class="loader__sq"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @mixin same-size($sz) {
    width: $sz;
    height: $sz;
  }

  // loader wrapper - can be used as a backdrop to obscure the rest of the page or given a transparent background/use hsla/rgba
  .loader__wrap {
    position: fixed;
    left: 0;
    top: 0;
    @include same-size(100%);
    display: flex;
    z-index: 9999; // fine for this demo
    background-color: #2c294f;
  }

  // container for animation
  .loader {
    --sz: 7rem;
    width: calc(var(--sz) * 2);
    height: var(--sz);
    margin: auto; // centers along both main and cross axis in flex containers
    display: flex;
    justify-content: space-evenly;
  }

  // each half of the animation container
  .loader__sq {
    // size of each loader piece circle/triangle;
    --p-sz: calc(var(--sz) / 4);
    // margin offset so each half of the container overlaps a bit
    --m-offset: calc((var(--p-sz) * -1) * 0.75);
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: space-evenly;
    height: 100%;
    width: 50%;

    &::before,
    &::after {
      @include same-size(var(--p-sz));
      content: '';
      position: relative;
      // transform is what's being animated
      transform: translateY(calc((var(--sz) - var(--p-sz)) * -1));

      animation: loader-box-bounce 0.5s cubic-bezier(0.3, 0.5, 0.4, 0.95) calc(var(--i) * 0.06s)
        infinite alternate-reverse;
    }

    &:first-of-type {
      margin-right: var(--m-offset);

      // first el animated and first visual element
      &::before {
        --i: 1;
        border: 3px solid #ff7ab5;
        border-radius: 50%;
      }

      // second element visually; third el animated
      &::after {
        --i: 3;
        background-color: #c643fb;
        // make the loader pieces triangles in supporting browsers
        @supports (clip-path: circle()) {
          clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
        }
      }
    }

    &:nth-of-type(2) {
      // third element visually; 2nd el animated
      &::before {
        --i: 2;
        border: 3px solid #ffb650;
      }

      // fourth element visually, fourth el animated
      &::after {
        --i: 4;
        background-color: #2fe2dd;
        border-radius: 50%;

        @supports (clip-path: circle()) {
          border-radius: 0;
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }
      }
    }
  }

  @keyframes loader-box-bounce {
    to {
      transform: translateY(0);
    }
  }
</style>
