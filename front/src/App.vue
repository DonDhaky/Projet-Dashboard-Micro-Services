<template>
  <div id="app">
    <header>
      <router-link to="/">Home</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/widgets">Widgets</router-link>
    </header>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup></script>

<style>
#app {
  font-family: Arial, sans-serif;
}

header {
  background-color: #333;
  color: white;
  padding: 10px;
}

footer {
  background-color: #333;
  color: white;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
