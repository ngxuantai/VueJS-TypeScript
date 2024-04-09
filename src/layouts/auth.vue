<template>
  <div class="container">
    <div class="img-container">
      <img :src="require('../assets/logo.png')" alt="logo brand" />
    </div>
    <div>
      <h3>Welcome to our app</h3>
    </div>
  </div>
  <slot />
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}

.img-container {
  width: 100px;
  height: 100px;
  text-align: center;
  margin: 0 auto;
}

.img-container img {
  width: 100%;
  height: 100%;
}
</style>
