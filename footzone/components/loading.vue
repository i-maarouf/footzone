<template>
  <div class="loading">
    <img src="../assets/loading.gif" alt="loading" class="loadingImage" />
    <!-- <img src="../assets/Animation.gif" alt="loading" class="loadingImage" /> -->
  </div>
</template>

<script>
export default {
  name: "loading",
};
</script>

<style>
.loading {
  width: 100%;
  height: 100vh;
  z-index: 9999999;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 1600px) {
  .loadingImage {
    width: 150px;
    height: 150px;
  }
}
@media only screen and (min-width: 1601px) {
  .loadingImage {
    width: 150px;
    height: 150px;
  }
}
</style>
