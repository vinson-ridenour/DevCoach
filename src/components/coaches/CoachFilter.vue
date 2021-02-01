<template>
  <base-card>
    <h2>find your &lt;DevCoach/&gt;</h2>
    <span class="filter-option">
      <input @change="setFilter" type="checkbox" id="frontend" checked />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input @change="setFilter" type="checkbox" id="backend" checked />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input @change="setFilter" type="checkbox" id="career" checked />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    // internal data to manage
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    // get e object from a default dom event (change)
    setFilter(e) {
      const inputId = e.target.id; // frontend, etc
      const isActive = e.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
