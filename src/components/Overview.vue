<template>
  <div>
    <h1>Overview</h1>
    <div>
      <!-- Tampilkan hasil dari fungsi-fungsi JavaScript -->
      <div v-for="user in users" :key="user.id">
        <img :src="user.profile_picture" alt="Profile Picture">
        <p>Name: {{ user.first_name }} {{ user.last_name }}</p>
        <p>Email: {{ user.email }}</p>
        <!-- Tampilkan informasi lainnya yang diinginkan -->
      </div>
    </div>
  </div>
</template>

<script>
// Import fungsi-fungsi JavaScript yang sudah dibuat
import { getCityByProvinceId, getProvinceByCityId, sortProvinces } from './utils';

export default {
  data() {
    return {
      users: [], // Gunakan array ini untuk menyimpan data pengguna dari API
    };
  },
  mounted() {
    // Ambil data pengguna dari API menggunakan fetch atau Axios
    // Setelah data diterima, simpan dalam array users
    // Contoh penggunaan fetch:
    fetch('https://api.slingacademy.com/v1/sample-data/users')
      .then(response => response.json())
      .then(data => {
        this.users = data.users;
      })
      .catch(error => console.error('Error fetching users:', error));
  },
  methods: {
    // Buat metode tambahan jika diperlukan
  }
};
</script>

<style>
/* Gunakan Tailwind CSS untuk styling */
</style>
