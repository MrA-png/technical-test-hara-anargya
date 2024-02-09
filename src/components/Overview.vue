<template>
  <div class="container mx-auto" style="margin-left: 18rem;">
    <!-- Task 1: Menampilkan daftar kota berdasarkan id provinsi -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Daftar Kota Berdasarkan Provinsi</h2>
      <div class="flex flex-wrap">
        <div v-for="city in getCityListByProvince(selectedProvinceId)" :key="city.id" class="px-4 py-2 bg-gray-100 rounded-lg m-2">
          {{ city.name }}
        </div>
      </div>
    </div>

    <!-- Task 2: Menampilkan nama provinsi berdasarkan id kota -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Nama Provinsi Berdasarkan Kota</h2>
      <div>
        <p v-if="selectedCityId">{{ getProvinceNameByCity(selectedCityId) }}</p>
        <p v-else>Tidak ada kota yang dipilih</p>
      </div>
    </div>

    <!-- Task 3: Mengurutkan array provinsi berdasarkan id & nama provinsi (asc/desc) -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Urutkan Provinsi</h2>
      <div class="mb-4">
        <label for="sortDirection" class="mr-2">Urutkan Berdasarkan:</label>
        <select v-model="sortDirection" id="sortDirection" class="px-2 py-1 rounded-lg border-gray-300 border">
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
      <div>
        <button @click="sortProvinces" class="px-4 py-2 bg-blue-500 text-white rounded-lg">Urutkan</button>
      </div>
      <div class="mt-4">
        <h3 class="text-lg font-semibold">Daftar Provinsi:</h3>
        <ul>
          <li v-for="province in sortedProvinces" :key="province.id">{{ province.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      provinces: [],
      cities: [],
      selectedProvinceId: null,
      selectedCityId: null,
      sortDirection: 'asc'
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json');
        this.provinces = response.data;
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }

      try {
        const response = await axios.get('https://emsifa.github.io/api-wilayah-indonesia/api/cities.json');
        this.cities = response.data;
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    },
    getCityListByProvince(provinceId) {
      return this.cities.filter(city => city.province_id === provinceId);
    },
    getProvinceNameByCity(cityId) {
      const city = this.cities.find(city => city.id === cityId);
      if (city) {
        const province = this.provinces.find(province => province.id === city.province_id);
        return province ? province.name : 'Provinsi tidak ditemukan';
      }
      return 'Kota tidak ditemukan';
    },
    sortProvinces() {
      this.provinces.sort((a, b) => {
        const order = this.sortDirection === 'asc' ? 1 : -1;
        return order * (a.id - b.id);
      });
    }
  },
  computed: {
    sortedProvinces() {
      return [...this.provinces];
    }
  }
};
</script>

<style scoped>
/* Tambahkan gaya sesuai keinginan untuk membuat tampilan menarik */
</style>
