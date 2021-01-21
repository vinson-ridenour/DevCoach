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
    // pass formData from CoachForm (from emit) to store action
    saveData(payload) {
      // namespace/action name
      this.$store.dispatch('coaches/registerCoach', payload);
      // .replace() so they can't go back to the form
      this.$router.replace('/coaches');
      // this.$router.push('/coaches')
    },
  },
};
</script>
