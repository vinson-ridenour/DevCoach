<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  // object form of props (over array form) gives more explicit
  props: {
    // to put styling on cmpnt
    mode: {
      type: String,
      required: false,
      default: null,
    },
    // determines whether we render button (false) or link (true)
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    // if we render a router-link with link
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
};
</script>

<style scoped>
/* remember: router-link will render <a> tag */
button,
a {
  text-decoration: none;
  padding: 0.6rem 1rem;
  font: inherit;
  background-color: #325aff;
  border: 1px solid #325aff;
  color: #fff;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #033ab1;
  border-color: #033ab1;
}

.flat {
  background-color: transparent;
  color: #2a91f7;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #033ab1;
  color: #033ab1;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #dbc1c9;
}
</style>
