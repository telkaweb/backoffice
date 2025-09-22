<template>
  <div>
    {{ label }}
    <v-btn color="secondary" class="mt-4 mr-8" @click="multiMediaDialog = true">
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
    <v-dialog v-model="multiMediaDialog" v-if="!loading">
      <v-card class="pa-8">
        <v-card-actions>
          <v-icon @click="multiMediaDialog=false" color="red">mdi-close</v-icon>
        </v-card-actions>
        <v-row>
          <v-col cols="2">
            فایل منیجر
          </v-col>
          <v-col cols="10" class="text-center">
            <v-pagination
                class="text-center"
                color="#0a1225"
                v-model="files.current_page"
                :length="files.last_page"
                @input="getFiles"
            ></v-pagination>
          </v-col>
          <v-col class="col-file-manager" cols="3" v-for="file in files.data" :key="file.id">
            <div>
              <v-checkbox @click="selectFile(file.id)" v-model="selectedFilesForSend[file.id]" :true-value="true"
                          :false-value="false"></v-checkbox>
            </div>
            <div v-if="selectedFileForShow[file.id]">
              <div v-if="file.type === 'audio'">
                <audio :src="file.file" controls/>
              </div>
              <div v-if="file.type === 'image'">
                <img :src="file.file" class="cover-image-file"
                     alt="cover">
              </div>
              <div v-if="file.type === 'video'">
                <video-player source="ShowFileComponent" :options="videoOptions"></video-player>
              </div>
              <div v-if="file.type === 'pdf'">
                <v-btn style="letter-spacing: normal" width="100%"
                       color="primary"
                       @click="goTo(file)">مشاهده
                </v-btn>
              </div>
            </div>
            <div v-else>
              <div>
                عنوان :
                {{ file.title }}

                <span v-if="file.type === 'pdf'">
               <v-icon color="error" large>mdi-file-pdf-box</v-icon>
             </span>
                <span v-if="file.type === 'video'">
               <v-icon color="secondary" large>mdi-video-box</v-icon>
             </span>
                <span v-if="file.type === 'audio'">
               <v-icon color="primary" large>mdi-volume-medium</v-icon>
             </span>
                <span v-if="file.type === 'image'">
               <v-icon color="teal" large>mdi-image-area</v-icon>
             </span>
              </div>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <div
                      v-bind="attrs" v-on="on" class="px-1"
                  >
                    توضیحات:
                    {{ file.description.substring(1, 20) + ' ...' }}
                  </div>
                </template>
                <span>{{ file.description }}</span>
              </v-tooltip>
              <div>
                <img @click="showFile(file)" :src="file.cover" class="cover-image-file"
                     alt="cover">
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VideoPlayer from "@/components/Player/VideoPlayer";

export default {
  name: "FileManager",
  props: ['module', 'type', 'label', 'icon'],
  components: {VideoPlayer},
  data() {
    return {
      selectedFilesForSend: [],
      selectedFileForShow: [],
      loading: true,
      multiMediaDialog: false,
      files: {
        current_page: 1
      },
      videoOptions: {
        autoplay: true,
        playbackRates: [0.5, 1, 1.5, 2, 4, 8],
        height: 500,
        width: 888,
        controls: true,
        liveui: true,
        responsive: true,
        sources: [
          {
            src: '',
            type: "application/vnd.apple.mpegurl"
          }
        ],
      },
    };
  },
  mounted() {
    this.getFiles()
  },
  methods: {
    selectFile() {
      this.$emit('selectFiles', this.selectedFilesForSend)
    },
    goTo(file) {
      window.open(file.file)
    },
    getFiles() {
      let url = 'gallery/index?page=' + this.files.current_page ?? 1
      if (this.type) {
        url = url + '&type=' + this.type
      }
      window.axios.get(url).then((res) => {
        this.files = res.data.data
        this.loading = false
      })
    },
    showFile(file) {
      this.selectedFileForShow = []
      if (file.type === 'video') {
        console.log(this.videoOptions)
        this.videoOptions.sources[0].src = file.file
        this.$set(this.selectedFileForShow, file.id, true)
        console.log(this.videoOptions)
      } else {
        this.$set(this.selectedFileForShow, file.id, true)
      }
    }
  }
}
</script>

<style scoped>
.col-file-manager {
  border-style: solid !important;
  border-color: #001a33 !important;
  border-radius: 10px;
  padding: 10px;
  margin: 8px;
}

.cover-image-file {
  width: 100%;
  aspect-ratio: 1 !important;
  object-fit: cover !important;
}
</style>
