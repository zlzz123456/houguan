<template>
  <button @click="upload" :aria-label="$t('buttons.uploadZip')" :title="$t('buttons.uploadZip')" class="action" id="upload-button">
    <i class="material-icons" style="color: #ffffff;">archive</i>
    <!--    <span>{{ $t('buttons.upload') }}</span>   open_in_browser-->
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
        this.unzip = true;
        document.getElementById('upload-input').click()
      }
    }
  }
</script>
