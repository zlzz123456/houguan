<template>
  <button @click="download" :aria-label="$t('buttons.download')" :title="$t('buttons.download')" id="download-button" class="action">
    <i class="material-icons" style="color: #ffffff;">file_download</i>
<!--    <span>{{ $t('buttons.download') }}</span>-->
    <span v-if="selectedCount > 0" class="counter">{{ selectedCount }}</span>
  </button>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import { files as api } from '@/api'

export default {
  name: 'download-button',
  computed: {
    req: {
      get() {
        return this.getSetting.req;
      }
    },
    selected: {
      get() {
        return this.getSetting.selected;
      }
    },
    user: {
      get() {
        return this.getSetting.user;
      }
    },
    fileUrl: {
      get() {
        return this.getSetting.fileUrl;
      },
      // set(value) {
      //   this.changeSetting({name: 'fileUrl', value})
      // }
    },
    ...mapGetters([
      'getSetting'
    ]),
    // ...mapState(['req', 'selected']),
    ...mapGetters(['isListing', 'selectedCount'])
  },
  methods: {
    download: function () {
      if (!this.isListing) {
        api.download(null, this.fileUrl);
        return
      }

      if (this.selectedCount === 1 && !this.req.items[this.selected[0]].isDir) {
        api.download(null, this.req.items[this.selected[0]].url)
        return
      }

      this.$store.commit('showHover', 'download')
    }
  }
}
</script>

