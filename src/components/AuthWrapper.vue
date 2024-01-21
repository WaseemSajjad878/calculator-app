<template>
  <div class="auth-wrapper flex column justify-center">
    <div class="row justify-center items-center full-height q-mx-none">
      <div class="col-11 col-sm-8 col-md-7 col-lg-6 q-my-lg">
        <q-card class="custom-q-card rounded-borders q-pa-lg">
         <slot />
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-wrapper {
  background: url('@/assets/images/banner.jpg') no-repeat;
  background-size: cover;
  min-height: 100vh;
}
</style>
