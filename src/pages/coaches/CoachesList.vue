<template>
  <div>
    <!-- convert truthy string to true boolean-->
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <!-- unnamed slot -->
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button @click="loadCoaches(true)" mode="outline"
            >refresh</base-button
          >
          <!-- add query param on link -->
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >login to become a coach</base-button
          >
          <!-- replace router-link here with base-button -->
          <!-- <router-link to="/register">register as a coach</router-link> -->
          <!-- only show this button if user is NOT a coach yet -->
          <base-button
            v-if="isLoggedIn && !isCoach && !isLoading"
            link
            to="/register"
            >become a coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <!-- available coaches: -->
        <ul v-else-if="hasCoaches">
          <!-- <li v-for="coach in filteredCoaches" :key="coach.id">
        {{ coach.firstName }}
      </li> -->
          <!-- passing props we get from CoachItem into this cmpnt-->
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>no coaches found!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

// import { mapGetters } from 'vuex';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      // defaults, set to updatedFilters @change
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
      isLoading: false,
      error: null,
    };
  },
  computed: {
    isLoggedIn() {
      // not namespaced so can grab it w/o anything else
      return this.$store.getters.isAuthenticated;
    },
    // returns result of getter
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    // reaches out to coaches getter
    filteredCoaches() {
      // namespace in store/index.js/getter name (coaches/coaches)
      const coaches = this.$store.getters['coaches/coaches'];
      // filter array of all coaches based on area
      return coaches.filter((coach) => {
        // filter  coaches that have frontend area
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      // if loading, don't show list
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    // can also use map helpers (namespace/getter name)
    // ...mapGetters('coaches', ['coaches']),
  },
  created() {
    this.loadCoaches(); // call w/o refresh arg
  },
  methods: {
    // get this as arg from CoachFilter cmpnt $emit
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      // once promise resolves from dispatch
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
