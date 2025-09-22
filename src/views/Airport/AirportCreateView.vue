<template>
  <div v-if="!loading">
    <v-card class="card-show" color="white">
      <v-card-title>
        ساخت فرودگاه جدید
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="text-left">
            <v-btn width="200px" class="main-button" @click="$router.push('/airport/index')">
              <v-icon color="white">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>
                جستجو فرودگاه
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field color="black" label="نام شهر یا فرودگاه را وارد کنید."
                                  v-model="needle"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn class="letter-spacing-normal white--text main-button" width="200px" @click="searchAirPort()">
                      جستجو
                    </v-btn>
                  </v-col>
                  <v-col cols="12" v-for="airport in searchedAirports" :key="airport.airportName + airport.airportCode">
                    <v-row>
                      <v-col cols="2">
                        نام فرودگاه {{ airport.airportName }}
                      </v-col>
                      <v-col cols="2">
                        کد فرودگاه {{ airport.airportCode }}
                      </v-col>
                      <v-col cols="2">
                        کد شهر
                        {{ airport.cityCode }}
                      </v-col>
                      <v-col cols="2">
                        نام شهر
                        {{ airport.cityName }}
                      </v-col>
                      <v-col cols="2">
                        نام کشور
                        {{ airport.countryName }}
                      </v-col>
                      <v-col cols="2">
                        کد کشور
                        {{ airport.countryCode }}
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="airport.en_name" label="نام انگلیسی" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="airport.fa_name" label="نام فارسی" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="airport.city" label="نام شهر" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="airport.country" label="کشور" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="airport.city_en" label="شهر انگلیسی" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="airport.country_code" label="کد کشور" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-select v-model="airport.type"
                      :items="[{text:'تمام فردگاه های این شهر',value:'all'},{text:'همین فرودگاه',value:'airport'}]"
                      label="نوع" color="black">
            </v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="airport.airport_code" label="کد فرودگاه" color="black">
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-switch color="black" :true-value="1" :false-value="0" label="نمایش در مبدا؟"
                      v-model="airport.is_origin"></v-switch>
          </v-col>
          <v-col cols="3">
            <v-switch color="black" :true-value="1" :false-value="0" label="نمایش در مقصد؟"
                      v-model="airport.is_destination"></v-switch>
          </v-col>
          <v-col cols="3">
            <v-switch color="black" :true-value="1" :false-value="0" label="نمایش در صفحه اصلی؟"
                      v-model="airport.show_index"></v-switch>
          </v-col>

          <v-col cols="3">
            <v-switch color="black" :true-value="1" :false-value="0" label="هتل?"
                      v-model="airport.has_hotel"></v-switch>
          </v-col>

          <v-col cols="3">
            <v-switch color="black" :true-value="1" :false-value="0" label="CIP?"
                      v-model="airport.has_cip"></v-switch>
          </v-col>
          <v-col cols="3">
            <v-switch color="black" :true-value="1" :false-value="0" label="خدمات ورودی پرواز های داخلی"
                      v-model="airport.has_cip_domestic_enter"></v-switch>
          </v-col>
          <v-col cols="3">
            <v-switch color="black" :true-value="1" :false-value="0" label="خدمات خروجی پرواز های داخلی"
                      v-model="airport.has_cip_domestic_exit"></v-switch>
          </v-col>
          <v-col cols="3">
            <v-switch color="black" :true-value="1" :false-value="0" label="خدمات ورودی پرواز های خارجی"
                      v-model="airport.has_cip_foreign_enter"></v-switch>
          </v-col>
          <v-col cols="3">
            <v-switch color="black" :true-value="1" :false-value="0" label="خدمات خروجی پرواز های خارجی"
                      v-model="airport.has_cip_foreign_exit"></v-switch>
          </v-col>

          <v-col cols="3">
            <v-switch :true-value="1" :false-value="0" v-model="airport.status" label="وضعیت" color="black">
            </v-switch>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn @click="create()" class="letter-spacing-normal white--text main-button" width="200px">ساخت
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "AirportCreateView",
  data() {
    return {
      needle: null,
      searchedAirports: [],
      loading: false,
      airport: {
        en_name: null,
        fa_name: null,
        city: null,
        country: null,
        city_en: null,
        country_code: null,
        type: null,
        airport_code: null,
        is_origin: 0,
        is_destination: 0,
        status: 0,
        show_index: 1,
        has_hotel: 0,
        has_cip: 0,
        has_cip_domestic_enter: 0,
        has_cip_domestic_exit: 0,
        has_cip_foreign_enter: 0,
        has_cip_foreign_exit: 0,
      },
    }
  },
  mounted() {
  },
  methods: {
    searchAirPort() {
      window.axios.get('admin/airport/search?needle=' + this.needle).then((res) => {
        this.searchedAirports = res.data.data
        this.openSnackbar(res.data.message, '#413b3b')
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        }
      })
    },
    create() {
      window.axios.post('admin/airport/create/', {
        en_name: this.airport.en_name,
        fa_name: this.airport.fa_name,
        city: this.airport.city,
        country: this.airport.country,
        city_en: this.airport.city_en,
        country_code: this.airport.country_code,
        type: this.airport.type,
        airport_code: this.airport.airport_code,
        is_origin: this.airport.is_origin,
        is_destination: this.airport.is_destination,
        status: this.airport.status,
        show_index: this.airport.show_index,
        has_hotel: this.airport.has_hotel,
        has_cip: this.airport.has_cip,
        has_cip_domestic_enter: this.airport.has_cip_domestic_enter,
        has_cip_domestic_exit: this.airport.has_cip_domestic_exit,
        has_cip_foreign_enter: this.airport.has_cip_foreign_enter,
        has_cip_foreign_exit: this.airport.has_cip_foreign_exit
      }).then((res) => {
        this.openSnackbar(res.data.message, '#413b3b')
      }).catch((err) => {
        if (err.response.status === 422) {
          this.showValidationErrors(err, '#F1416C')
        } else if (err.response.status === 400 || err.response.status === 404) {
          this.openSnackbar(err.response.data.message, '#F1416C')
        }
      })
    },
  }
}
</script>

<style>
.main-margin {
  margin: 2vh 6vw 2vh 2vw;
}

.main-padding {
  padding: 1vh 2vw;
}

.text-dialog-title {
  font-size: 18px;
  font-weight: 800;
}

.letter-spacing-normal {
  letter-spacing: normal;
}
</style>