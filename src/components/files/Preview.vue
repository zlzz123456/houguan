<template>
  <div id="previewer">
    <div class="bar">
      <button @click="back" class="action" :title="$t('files.closePreview')" :aria-label="$t('files.closePreview')" id="close">
        <i class="material-icons" style="color: #000;">close</i>
      </button>

<!--      <rename-button v-if="user.perm.rename"></rename-button>-->
<!--      <delete-button v-if="user.perm.delete"></delete-button>-->
<!--      <download-button v-if="user.perm.download"></download-button>-->
<!--      <info-button></info-button>-->
    </div>

    <button class="action" @click="prev" v-show="hasPrevious" :aria-label="$t('buttons.previous')" :title="$t('buttons.previous')">
      <i class="material-icons" style="color: #000;">chevron_left</i>
    </button>
    <button class="action" @click="next" v-show="hasNext" :aria-label="$t('buttons.next')" :title="$t('buttons.next')">
      <i class="material-icons" style="color: #000;">chevron_right</i>
    </button>

    <div class="preview">
      <img v-if="req.type == 'image'" :src="raw">
      <audio v-else-if="req.type == 'audio'" :src="raw" autoplay controls></audio>
      <video v-else-if="req.type == 'video'" :src="raw" autoplay controls>
        <track
          kind="captions"
          v-for="(sub, index) in subtitles"
          :key="index"
          :src="sub"
          :label="'Subtitle ' + index" :default="index === 0">
        Sorry, your browser doesn't support embedded videos,
        but don't worry, you can <a :href="download">download it</a>
        and watch it with your favorite video player!
      </video>
      <object v-else-if="req.extension == '.pdf'" class="pdf" :data="raw"></object>
      <a v-else-if="req.type == 'blob'" :href="download">
        <h2 class="message">{{ $t('buttons.download') }} <i class="material-icons">file_download</i></h2>
      </a>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapState} from 'vuex'
import url from '@/utils/url'
import { baseURL } from '@/utils/constants'
import { files as api } from '@/api'
import InfoButton from '@/components/buttons/Info'
import DeleteButton from '@/components/buttons/Delete'
import RenameButton from '@/components/buttons/Rename'
import DownloadButton from '@/components/buttons/Download'

const mediaTypes = [
  "image",
  "video",
  "audio",
  "blob"
]

export default {
  name: 'preview',
  components: {
    InfoButton,
    DeleteButton,
    RenameButton,
    DownloadButton
  },
  data: function () {
    return {
      previousLink: '',
      nextLink: '',
      listing: null,
      subtitles: []
    }
  },
  computed: {
    req: {
      get() {
        return this.getSetting.req;
      }
    },
    oldReq: {
      get() {
        return this.getSetting.oldReq;
      }
    },
    user: {
      get() {
        return this.getSetting.user;
      }
    },
    jwt: {
      get() {
        return this.getSetting.jwt;
      }
    },
    fileUrl: {
      get() {
        return this.getSetting.fileUrl;
      },
      set(value) {
        this.changeSetting({name: 'fileUrl', value})
      }
    },
    ...mapGetters([
      'getSetting'
    ]),
    // ...mapState(['req', 'user', 'oldReq', 'jwt']),
    hasPrevious () {
      return (this.previousLink !== '')
    },
    hasNext () {
      return (this.nextLink !== '')
    },
    download () {
      let url = `${baseURL}/api/raw${this.req.path}?auth=${this.jwt}&`;

      url += `appId=${this.$store.state.setting.applicationObj.appId}&`

      url += `cId=${this.$store.state.setting.cId}`

      return  url;
    },
    raw () {
      return `${this.download}&inline=true`
    }
  },
  async mounted () {
    window.addEventListener('keyup', this.key)

    if (this.req.subtitles) {
      this.subtitles = this.req.subtitles.map(sub => `${baseURL}/api/raw${sub}?auth=${this.jwt}&inline=true`)
    }

    try {
      if (this.oldReq.items) {
        this.updateLinks(this.oldReq.items)
      } else {
        const path = url.removeLastDir(this.fileUrl)
        const res = await api.fetch(path)
        this.updateLinks(res.items)
      }
    } catch (e) {
      this.$showError(e)
    }
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.key)
  },
  methods: {
    ...mapMutations(['changeSetting']),
    back () {
      let uri = url.removeLastDir(this.fileUrl) + '/'
      this.fileUrl = uri;
      // this.$router.push({ path: uri })
    },
    prev () {
      this.fileUrl = this.previousLink;
      // this.$router.push({ path: this.previousLink })
    },
    next () {
      this.fileUrl = this.nextLink;
      // this.$router.push({ path: this.nextLink })
    },
    key (event) {
      event.preventDefault()

      if (event.which === 13 || event.which === 39) { // right arrow
        if (this.hasNext) this.next()
      } else if (event.which === 37) { // left arrow
        if (this.hasPrevious) this.prev()
      }
    },
    updateLinks (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].name !== this.req.name) {
          continue
        }

        for (let j = i - 1; j >= 0; j--) {
          if (mediaTypes.includes(items[j].type)) {
            this.previousLink = items[j].url
            break
          }
        }

        for (let j = i + 1; j < items.length; j++) {
          if (mediaTypes.includes(items[j].type)) {
            this.nextLink = items[j].url
            break
          }
        }

        return
      }
    }
  }
}
</script>
