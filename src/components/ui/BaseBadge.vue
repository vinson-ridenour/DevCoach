<template>
  <span class="badge" :class="type">{{ text }}</span>
</template>

<script>
export default {
  props: ['type', 'title'],
  computed: {
    text() {
      return this.title.toLowerCase();
    }
  }
};
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.4rem 1.2rem;
  display: inline-block;
  margin-right: 0.5rem;
}

.frontend {
  background-color: #ffc828;
  color: white;
}

.backend {
  background-color: #00be82;
  color: white;
}

.career {
  background-color: #ff7832;
  color: white;
}
</style>
