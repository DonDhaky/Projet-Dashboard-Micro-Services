<template>
  <div class="container">
    <div v-if="mode === 'login'">
      <h2 class="title">Sign In</h2>
      <form @submit.prevent="login">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="loginData.email" required />

        <label for="password">Password :</label>
        <input type="password" id="password" v-model="loginData.password" required />

        <button type="submit">Login</button>
      </form>
      <button @click="signInWithSpotify">Sign In with Spotify</button>
      <p>
        <router-link to="/forgot-password">Forgot Password?</router-link>
        Don't have an account ? <button @click="switchMode('register')">Sign Up</button>
      </p>
    </div>

    <div v-else>
      <h2 class="title">Sign Up</h2>
      <form @submit.prevent="register">
        <label for="registerEmail">Email :</label>
        <input type="email" id="registerEmail" v-model="registerData.email" required />

        <label for="registerPassword">Password :</label>
        <input
          type="password"
          id="registerPassword"
          v-model="registerData.password"
          required
        />

        <button type="submit">Register</button>
      </form>
      <p>Already have an account ? <button @click="switchMode('login')">Login</button></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const mode = ref("login");
const router = useRouter();

////////////////////////////////////////////////////////////////////////////////////// LOGIN
const loginData = ref({ email: "", password: "" });

async function login() {
  const loginFormData = new URLSearchParams();
  loginFormData.append("user_email_address", loginData.value.email);
  loginFormData.append("user_password", loginData.value.password);

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: loginFormData,
    });

    if (response.ok) {
      const text = await response.text();
      if (text.includes("error")) {
        console.error("Login failed :", text);
        alert("Your email or password is incorrect !");
      } else {
        console.log("Login successful");
        window.alert("You are now conneceted !");
        router.push("/dashboard");
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

////////////////////////////////////////////////////////////////////////////////////// REGISTER
const registerData = ref({ email: "", password: "" });

async function register() {
  const registerFormData = new URLSearchParams();
  registerFormData.append("user_email_address", registerData.value.email);
  registerFormData.append("user_password", registerData.value.password);

  try {
    // Vérifier si le mot de passe a au moins 8 caractères
    if (registerData.value.password.length < 8) {
      window.alert("Password must be at least 8 characters long");
      return;
    }
    const response = await fetch(
      "http://localhost:3000/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: registerFormData,
      }
      // console.log(registerFormData.toString()) // OBSERVATION DES DONNEES ENVOYEES
    );

    if (response.ok) {
      const text = await response.text();
      if (text.includes("error")) {
        console.error("Registration failed :", text);
        alert("Your email is already in use !");
      } else {
        console.log("Registration successful");
        alert("Registration successful, you can connect with your account !");
        window.location.reload();
      }
    } else {
      console.error("Registration failed:", response.status, response.statusText);
      alert("Registration failed, try again !");
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

.title {
  text-align: center;
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
