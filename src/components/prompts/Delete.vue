<template>
  <div class="card floating p-3">
    <div class="card-content">
<!--      req.kind !== 'listing'-->
      <p v-if="true">{{ $t('prompts.deleteMessageSingle') }}</p>
      <p v-else>{{ $t('prompts.deleteMessageMultiple', { count: selectedCount}) }}</p>
    </div>
    <div class="card-action">
      <button @click="$store.commit('closeHovers')"
        class="button button--flat button--grey"
        :aria-label="$t('buttons.cancel')"
        :title="$t('buttons.cancel')">{{ $t('buttons.cancel') }}</button>
      <button @click="submit"
        class="button button--flat button--red"
        :aria-label="$t('buttons.delete')"
        :title="$t('buttons.delete')">{{ $t('buttons.delete') }}</button>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapState} from 'vuex'
import { files as api } from '@/api'
import url from '@/utils/url'
import buttons from '@/utils/buttons'

export default {
  name: 'delete',
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
    fileUrl: {
      get() {
        return this.getSetting.fileUrl;
      },
      set(value) {
        this.changeSetting({name: 'fileUrl', value})
      }
    },
    ...mapGetters([ 'getSetting', 'isListing', 'selectedCount']),
    // ...mapState(['req', 'selected'])
  },
  methods: {
    ...mapMutations(['changeSetting', 'closeHovers']),
    submit: async function () {
      this.closeHovers();
      buttons.loading('delete')

      try {
        if (!this.isListing) {
          await api.remove(this.fileUrl);
          buttons.success('delete');
          this.fileUrl = url.removeLastDir(this.fileUrl) + '/';
          // this.$router.push({ path: url.removeLastDir(this.$route.path) + '/' })
          return
        }

        if (this.selectedCount === 0) {
          return
        }

        let promises = []
        for (let index of this.selected) {
          promises.push(api.remove(this.req.items[index].url))
        }

        await Promise.all(promises)
        buttons.success('delete')
        this.$store.commit('setReload', true)
      } catch (e) {
        buttons.done('delete')
        this.$showError(e)
        if (this.isListing) this.$store.commit('setReload', true)
      }
    }
  }
}
</script>
