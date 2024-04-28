<template>
  <div class="container">
    Ici on gèrera l'affichage des différents Widgets dans l'onglet Widgets. <br />
    Cette page sera le point d'arrivée de la redirection quand l'utilisateur se connecte.
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ON PEUT UTILISER SWITCHMODE POUR PASSER DES PARAMETRES AUX WIDGETS ?
// function switchMode(newMode) {
//   mode.value = newMode;
// }
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
