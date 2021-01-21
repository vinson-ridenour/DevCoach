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
        career: true
      }
    };
  },
  methods: {
    // get e object from a default dom event (change)
    setFilter(e) {
      const inputId = e.target.id; // id bound to the inputs (frontend, etc)
      const isActive = e.target.checked; // checked or not
      const updatedFilters = {
        // copy all properties into new object
        ...this.filters,
        // override 1 property dynamically
        [inputId]: isActive
      };
      this.filters = updatedFilters;
      // lets parent cmpnt know about updated filters
      this.$emit('change-filter', updatedFilters);
    }
  }
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
