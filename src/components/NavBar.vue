<template>
  <v-app-bar id="navbar">
    <v-img
      src="icon.png"
      :height="50"
      :width="180"
      style="margin-left: 50px; cursor: pointer"
      @click="$router.push('/')"
    ></v-img>
    <v-app-bar-title @click="$router.push('/')" style="cursor: pointer"
      >Movies</v-app-bar-title
    >
    <v-app-bar-title @click="$router.push('/shows')" style="cursor: pointer"
      >TV Shows</v-app-bar-title
    >
    <v-app-bar-title @click="$router.push('/popular')" style="cursor: pointer"
      >Popular</v-app-bar-title
    >
    <v-app-bar-title @click="$router.push('/trending')" style="cursor: pointer"
      >Trending today</v-app-bar-title
    >
    <v-app-bar-title
      @click="$router.push('/favourites')"
      style="cursor: pointer"
      >Favourites</v-app-bar-title
    >
    <v-app-bar-title @click="$router.push('/search')" style="cursor: pointer"
      >Search</v-app-bar-title
    >
  </v-app-bar>
</template>
<script>
export default {
  setup() {
    // const OpenPage = () => {
    //   router.push("/favourites");
    // };
    // return { OpenPage };
  },
};
</script>
<style scoped>
#navbar {
  /* height: 90px;
  display: flex;
  align-content: center; */
  background: linear-gradient(
    90.53deg,
    rgba(0, 0, 0, 0.75) 0.45%,
    rgba(102, 80, 165, 0.75) 105.51%
  );
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  color: #a1b1cb;
}
</style>
