<template>
  <button :title="$t('sidebar.newFile')" :aria-label="$t('sidebar.newFile')" class="action" @click="add">
    <i class="material-icons" style="color: #ffffff;">note_add</i>
<!--    <span>{{ $t('sidebar.newFile') }}</span>-->
  </button>
</template>

<script>
export default {
  name: 'note-button',
  methods: {
    add: function (event) {
      this.$store.commit('showHover', 'newFile')
    }
  }
}
</script>
