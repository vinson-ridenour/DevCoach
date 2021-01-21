<template>
  <!-- this form data will be passed to CoachRegistration to be sent to store -->
  <!-- can be sent to store from this cpmnt but helps re-usability of this cmpnt -->
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">first name</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid" :class="{ invalid: !firstName.isValid }">
        no first name? c'mon now.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">last name</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">last name missing! SIGH.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">about you</label>
      <textarea
        v-model="description.val"
        id="description"
        rows="5"
        placeholder="tell us a little about yourself!"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">must. brag. here.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">hourly rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.val"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rate.isValid">you gotta be worth more than that...</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>areas of expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">frontend development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">backend development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="career">career development</label>
      </div>
      <p v-if="!areas.isValid">pick at least one area!</p>
    </div>
    <p v-if="!formIsValid"><i>please fix the above errors and try again!</i></p>
    <base-button>register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        val: '',
        isValid: true
      },
      lastName: {
        val: '',
        isValid: true
      },
      description: {
        val: '',
        isValid: true
      },
      rate: {
        val: null,
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      formIsValid: true
    };
  },
  methods: {
    validateForm() {
      // go through each input and see if valid
      this.formIsValid = true; // reset
      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      // if rate null/0 or neg
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      // end submit if invalid form
      if (!this.formIsValid) {
        return;
      }
      // groups all form data together
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val
      };
      // console.log(formData);
      this.$emit('save-data', formData);
    },
    clearValidity(input) {
      this[input].isValid = true;
    }
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  /* background-color: #ccc; */
  outline: none;
  border: 2px solid #ff3c78;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #ff3c78 solid 2px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

/* .invalid label, */
.invalid p {
  color: red;
}

.invalid input[type='text'],
.invalid textarea {
  border: 1px solid red;
}
</style>
