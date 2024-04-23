<template>
    <div class="container">
      <h1>Login</h1>
  
      <div v-if="mode === 'login'">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="loginData.email" required>
          
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="loginData.password" required>
          
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <button @click="switchMode('register')">Register</button></p>
      </div>
  
      <div v-else>
        <h2>Register</h2>
        <form @submit.prevent="register">
          <label for="registerEmail">Email:</label>
          <input type="email" id="registerEmail" v-model="registerData.email" required>
          
          <label for="registerPassword">Password:</label>
          <input type="password" id="registerPassword" v-model="registerData.password" required>
          
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <button @click="switchMode('login')">Login</button></p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const mode = ref('login'); 
  const loginData = ref({ email: '', password: '' });
  const registerData = ref({ email: '', password: '' });
  
  function login() {
    // to be continued...
    console.log('toto');
  }
  
  function register() {
    // to be continued...
    console.log('tata');
  }
  
  function switchMode(newMode) {
    mode.value = newMode;
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  form {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #363b41;
    color: hsla(160, 100%, 37%, 1);
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
  
  p {
    margin-top: 20px;
  }
  </style>
  