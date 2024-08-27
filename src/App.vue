<template>
  <div id="app">
    <header class="header">
      <div class="auto_container">
        <div class="header_wrap">
          <router-link to="/" class="header_logo">
            #movienow
          </router-link>
        </div>
      </div>
    </header>

    <main>
      <router-view />
    </main>

  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style></style>
