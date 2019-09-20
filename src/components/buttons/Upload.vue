<template>
  <button @click="upload" :aria-label="$t('buttons.upload')" :title="$t('buttons.upload')" class="action" id="upload-button">
    <i class="material-icons" style="color: #ffffff;">file_upload</i>
<!--    <span>{{ $t('buttons.upload') }}</span>-->
  </button>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'upload-button',
  computed: {
    ...mapGetters(['getSetting']),
    unzip: {
      get () { return this.getSetting.unzip },
      set (value) { this.changeSetting({name: 'unzip', value}) }
    },
  },
  methods: {
    ...mapMutations(['changeSetting']),
    upload: function () {
      this.unzip = false;
      document.getElementById('upload-input').click()
    }
  }
}
</script>
