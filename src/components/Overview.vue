<template>
  <div class="container mx-auto p-4" style="margin-left: 18rem;">
    <h1 class="text-3xl font-semibold mb-4">Data Provinsi dan Kota</h1>

    <!-- Select Provinsi -->
    <div class="mb-4">
      <label for="provinsi" class="block font-semibold mb-2">Pilih Provinsi:</label>
      <select v-model="selectedProvinsi" @change="getKotaByProvinsi" id="provinsi" class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
        <option value="" disabled>Pilih Provinsi</option>
        <option v-for="provinsi in daftarProvinsi" :value="provinsi.id" :key="provinsi.id">{{ provinsi.name }}</option>
      </select>
    </div>

    <!-- List Kota -->
    <div v-if="selectedProvinsi">
      <h2 class="text-xl font-semibold mb-2">Daftar Kota di {{ namaProvinsi }}</h2>
      <ul>
        <li v-for="kota in daftarKota" :key="kota.id">{{ kota.name }}</li>
      </ul>
    </div>

    <!-- Nama Provinsi berdasarkan ID Kota -->
    <div v-if="selectedKota">
      <h2 class="text-xl font-semibold mb-2">Nama Provinsi Berdasarkan ID Kota {{ selectedKota }}</h2>
      <p>{{ getProvinsiName(selectedKota) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      daftarProvinsi: [],
      daftarKota: [],
      selectedProvinsi: null,
      selectedKota: null
    };
  },
  computed: {
    namaProvinsi() {
      const provinsi = this.daftarProvinsi.find(prov => prov.id === this.selectedProvinsi);
      return provinsi ? provinsi.name : "";
    }
  },
  mounted() {
    this.fetchDaftarProvinsi();
  },
  methods: {
    async fetchDaftarProvinsi() {
      try {
        const response = await fetch("https://api.allorigins.win/get?url=https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json");
        const result = await response.json();
        const data = JSON.parse(result.contents);
        this.daftarProvinsi = data;
      } catch (error) {
        console.error("Error fetching daftar provinsi:", error);
      }
    },
    async getKotaByProvinsi() {
      if (!this.selectedProvinsi) return;

      try {
        const response = await fetch(`https://api.allorigins.win/get?url=https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${this.selectedProvinsi}.json`);
        const result = await response.json();
        const data = JSON.parse(result.contents);
        this.daftarKota = data;
      } catch (error) {
        console.error("Error fetching kota by provinsi:", error);
      }
    },
    async getProvinsiName(kotaId) {
      try {
        const response = await fetch(`https://api.allorigins.win/get?url=https://emsifa.github.io/api-wilayah-indonesia/api/regency/${kotaId}.json`);
        const result = await response.json();
        const data = JSON.parse(result.contents);
        const provinceId = data.province_id;
        
        const provinceResponse = await fetch(`https://api.allorigins.win/get?url=https://emsifa.github.io/api-wilayah-indonesia/api/province/${provinceId}.json`);
        const provinceResult = await provinceResponse.json();
        const provinceData = JSON.parse(provinceResult.contents);
        
        return provinceData.name;
      } catch (error) {
        console.error("Error fetching provinsi name:", error);
      }
    }
  },
};
</script>

<style>
/* Optional CSS styling can be added here */
</style>
