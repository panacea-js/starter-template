<template>
  <div>
    <h1 class="title">{{ $t('starter-app.h1') }}</h1>
    <p>{{ $t('starter-app.description') }}</p>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t("starter-app.title"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("starter-app.description")
        }
      ]
    }
  }
}
</script>