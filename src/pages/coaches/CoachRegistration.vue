<template>
  <section>
    <base-card>
      <h2>register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  methods: {
    saveData(payload) {
      // namespace/action name
      this.$store.dispatch('coaches/registerCoach', payload);
      this.$router.replace('/coaches');
    },
  },
};
</script>
