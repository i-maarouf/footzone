<template>
  <div class="loading">
    <div class="shapes"></div>
  </div>
</template>

<script>
export default {
  name: "loading",
};
</script>

<style>
.shapes {
  width: 44.8px;
  height: 44.8px;
  color: #16c432;
  position: relative;
  background: radial-gradient(11.2px, currentColor 94%, #0000);
}

.shapes:before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(10.08px at bottom right, #0000 94%, currentColor)
      top left,
    radial-gradient(10.08px at bottom left, #0000 94%, currentColor) top right,
    radial-gradient(10.08px at top right, #0000 94%, currentColor) bottom left,
    radial-gradient(10.08px at top left, #0000 94%, currentColor) bottom right;
  background-size: 22.4px 22.4px;
  background-repeat: no-repeat;
  animation: shapes-77ngqcmd 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
}

@keyframes shapes-77ngqcmd {
  33% {
    inset: -11.2px;
    transform: rotate(0deg);
  }

  66% {
    inset: -11.2px;
    transform: rotate(90deg);
  }

  100% {
    inset: 0;
    transform: rotate(90deg);
  }
}
</style>
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
