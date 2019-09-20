<template>
  <button :title="$t('sidebar.newFolder')" :aria-label="$t('sidebar.newFolder')" class="action" @click="add">
    <i class="material-icons" style="color: #ffffff;">create_new_folder</i>
<!--    <span>{{ $t('sidebar.newFolder') }}</span>-->
  </button>
</template>

<script>
export default {
  name: 'folder-button',
  methods: {
    add: function (event) {
      this.$store.commit('showHover', 'newDir')
    }
  }
}
</script>
