<template>
  <div class="custom-card">
    <div class="image-preview-wrapper" @click="selectImage" @drop.prevent="filesDragged" @dragover.prevent>
      <span class="upload-hint" v-if="!previewImages">
        لطفا فایل خود را انتخاب  کنید یا  داخل این باکس بیندازید
      </span>
      <div v-else class="img-wrapper">
        <div>
          <v-btn class="text-right" fab color="#fb4e4e" @click.stop.prevent="deleteImage()">
            <v-icon color="white">mdi-trash-can</v-icon>
          </v-btn>
        </div>
        <div class="img-wrapper"
             v-if="file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/svg+xml'">
          <img class="single-image" :src="previewImages"/>
        </div>
        <div
            class="pt-16"
            v-if="file.type === 'video/mp4' || file.type === 'video/avi' || file.type === 'video/mkv' || file.type === 'video/3gp'">
          <div class="black--text">
            {{ file.name }}
          </div>
          <v-icon x-large color="error">mdi-youtube</v-icon>
        </div>
        <div
            class="pt-16 text-center"
            v-if="file.type === 'application/pdf'">
          <div class="black--text">
            {{ file.name }}
          </div>
          <v-icon x-large color="error">mdi-file-pdf-box</v-icon>
        </div>
        <div
            class="pt-16"
            v-if="file.type === 'application/vnd.ms-excel'">
          <div class="black--text">
            {{ file.name }}
          </div>
          <v-icon x-large color="success">mdi-microsoft-excel</v-icon>
        </div>
      </div>
    </div>
    <input
        style="display: none"
        :accept="module === 'itemFile' || 'notification' || 'assignment' ? '*' : 'image/*,.pdf'"
        ref="fileInput"
        type="file"
        @input="pickFile"/>
    <div class="mt-16">
      <v-btn :disabled="!file.type" block class="white--text" x-large color="#696cff" @click="uploadFile()">بارگزاری
        فایل
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "DragAndDropMultiple",
  props: ['module', 'type'],
  data() {
    return {
      previewImages: null,
      file: {
        type: null
      },
    };
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click()
    },
    filesDragged(e) {
      let file = e.dataTransfer.files[0];
      this.file = file
      this.makeImagesTiles(file)
    },
    pickFile() {
      let file = this.$refs.fileInput.files[0]
      this.file = file
      this.makeImagesTiles(file)
    },
    makeImagesTiles(file) {
      this.previewImages = null;
      if (file) {
        let reader = new FileReader
        reader.onload = e => {
          this.previewImages = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    emitBackToParent(fileUrl) {
      this.$emit('changeFile', fileUrl)
    },
    deleteImage() {
      this.file = {
        type: null
      }
      this.previewImages = null;
      this.$emit('changeFile', null)
      this.$emit('closeUploadFileDialog')
    },
    reset() {
      this.previewImages = null
    },
    uploadFile() {
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('module', this.module)
      formData.append('type', this.type)
      window.axios.post('admin/file-manager/store', formData).then((res) => {
        this.fileUrl = res.data.data.data
        this.emitBackToParent( res.data.data.data)
        this.copyToClipboard()
        this.openSnackbar('فایل با موفقیت بارگزاری شد.', '#15C15D')
        this.$emit('closeUploadFileDialog')
        this.previewImages = null;
      }).catch((err) => {
        this.openSnackbar(err.response.data.message, '#FB4E4E')
      })
    },

    copyToClipboard () {
      let dummy = document.createElement('input')
      document.body.appendChild(dummy)
      dummy.setAttribute('value', this.fileUrl)
      dummy.select()
      document.execCommand('copy')
      document.body.removeChild(dummy)
    }

  }
}
</script>

<style scoped>
.custom-card {
  border-radius: 12px;
  border: 1px dashed #7D8392;
  background-color: white;
}

.custom-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: 0.5s ease;
}

.image-preview-wrapper {
  width: 100%;
  height: 250px;
  cursor: pointer;
}

.upload-hint {
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
}

img {
  border-radius: 12px;
}

.img-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.img-wrapper > img {
  object-fit: contain;
  height: 100%;
  width: 100%;
}

.delete-btn {
}

.single-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
}
</style>
