<template>
  <div class="container">
    <h1>Login</h1>

    <div v-if="mode === 'login'">
      <h2>Sign In</h2>
      <form @submit.prevent="login">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="loginData.email" required />

        <label for="password">Password:</label>
        <input type="password" id="password" v-model="loginData.password" required />

        <button type="submit">Login</button>
      </form>
      <button @click="signInWithSpotify">Sign In with Spotify</button>
      <p>
        <router-link to="/forgot-password">Forgot Password?</router-link>
        Don't have an account? <button @click="switchMode('register')">Sign Up</button>
      </p>
    </div>

    <div v-else>
      <h2>Sign Up</h2>
      <form @submit.prevent="register">
        <label for="registerEmail">Email:</label>
        <input type="email" id="registerEmail" v-model="registerData.email" required />

        <label for="registerPassword">Password:</label>
        <input
          type="password"
          id="registerPassword"
          v-model="registerData.password"
          required
        />

        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <button @click="switchMode('login')">Login</button></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const mode = ref("login");
const loginData = ref({ email: "", password: "" });
const registerData = ref({ email: "", password: "" });
const router = useRouter();

async function login() {
  try {
    // Vérifier si le mot de passe a au moins 8 caractères
    if (loginData.value.password.length < 8) {
      window.alert("Password must be at least 8 characters long");
      console.error("Password must be at least 8 characters long");
      return;
    }

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData.value),
    });

    if (response.ok) {
      router.push("/");
      console.log("Yataaaa");
    } else {
      console.error("Fail to connect");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function register() {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData.value),
    });

    if (response.ok) {
      router.push("/");
      console.log("Registration successful");
    } else {
      console.error("Registration failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function switchMode(newMode) {
  mode.value = newMode;
}

function signInWithSpotify() {
  window.location.href = "http://localhost:3000/auth";
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
  margin-top: 10px; /* Ajout de cette ligne pour espacer le bouton */
}

button:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}

p {
  margin-top: 20px;
}
</style>
