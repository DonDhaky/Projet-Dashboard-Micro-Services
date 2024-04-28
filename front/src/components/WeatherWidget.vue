<template>
    <div v-if="weatherData">
      <h2>{{ weatherData.city }}</h2>
      <p>{{ weatherData.temperature }}°C</p>
    </div>
    <div v-else>
      <p>Loading weather data...</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        weatherData: null,
      };
    },
    async created() {
      try {
        const response = await fetch('http://localhost:3000/weather?city=Paris'); 
        const data = await response.json();
        this.weatherData = data;
      } catch (error) {
        console.error('Error while trying to fetch weather data:', error);
      }
    },
  };
  </script>
  