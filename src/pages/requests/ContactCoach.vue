<template>
  <!-- child route - so won't be loaded to replace current cpmnt - needs router-view in parent cmpnt (CoachDetail) -->
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">email address</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">message</label>
      <textarea rows="5" id="message" v-model.trim="message"></textarea>
    </div>
    <p class="errors" v-if="!formIsValid">enter a valid email and message!</p>
    <div class="actions">
      <base-button>send message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      formIsValid: true
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.message === ''
      ) {
        this.formIsValid = false;
        return;
      }
      // request is a piece of data to manage with store
      // namespace/action, payload passed
      this.$store.dispatch('requests/contactCoach', {
        email: this.email,
        message: this.message,
        // can also get this using props: true
        coachId: this.$route.params.id
      });
      // console.log('msg sent!');
      // feature -> add err msging / loadspinner here b4 redirect
      this.$router.replace('/coaches');
    }
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #ff3c78;
  background-color: #fff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
