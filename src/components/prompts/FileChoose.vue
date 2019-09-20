<template>
  <div class="card floating">
    <div class="card-title">
      <h2>{{ $t('prompts.fileChoose') }}</h2>
    </div>

    <div class="card-content">
<!--      <p>{{ $t('prompts.copyMessage') }}</p>-->
      <file-list @update:selected="val => dest = val"></file-list>
    </div>

    <div class="card-action">
      <button class="button button--flat button--grey"
        @click="$store.commit('closeHovers')"
        :aria-label="$t('buttons.cancel')"
        :title="$t('buttons.cancel')">{{ $t('buttons.cancel') }}</button>
      <button class="button button--flat"
        @click="fileChoose"
        :disabled="fileUrl === dest"
        :aria-label="$t('buttons.select')"
        :title="$t('buttons.select')">{{ $t('buttons.select') }}</button>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import FileList from './AllFiles'

  import {files as api} from '@/api'
  import { login } from '@/utils/auth'

export default {
  name: 'fileChoose',
  components: { FileList },
  data: function () {
    return {
      current: window.location.pathname,
      dest: null
    }
  },
  computed: {
    // req: {
    //   get() {
    //     return this.getSetting.req;
    //   }
    // },
    // selected: {
    //   get() {
    //     return this.getSetting.selected;
    //   }
    // },
    fileUrl: {
      get() {
        return this.getSetting.fileUrl;
      },
      set(value) {
        this.changeSetting({name: 'fileUrl', value})
      }
    },
    ...mapGetters(['getSetting']),
    // ...mapState(['req', 'selected'])
  },
  mounted() {

  },
  methods: {
    ...mapMutations(['changeSetting']),

    fileChoose: async function (event) {
      event.preventDefault();
      // let url = this.dest.replace('/files/', '/'); // {#} -i -sign
        let url = this.dest.split('/main/');
      window.filechooseCallBack('http://115.182.90.212:9992/preview/main/' + url[1]);
      this.$store.commit("closeHovers");
    }
  }
}
</script>
