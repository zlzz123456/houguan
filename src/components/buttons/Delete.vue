<template>
  <button @click="show" :aria-label="$t('buttons.delete')" :title="$t('buttons.delete')" class="action" id="delete-button">
    <i class="material-icons" style="color: #ffffff;">delete</i>
<!--    <span>{{ $t('buttons.delete') }}</span>-->
  </button>
</template>

<script>
export default {
  name: 'delete-button',
  methods: {
    show: function () {
      this.$store.commit('showHover', 'delete')
    }
  }
}
</script>
