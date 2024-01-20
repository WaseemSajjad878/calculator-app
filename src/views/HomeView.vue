<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container class="shadow-2 rounded-borders window-height">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>Calculator App</q-toolbar-title>

        <q-btn to="/login" color="negative" label="Login" />
        <q-btn to="/sign-up" color="negative" label="SignUp" class="q-ml-md"/>
        </q-toolbar>
      </q-header>
    </q-layout>
  </div>
</template>