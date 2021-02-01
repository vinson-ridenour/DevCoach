import { createApp } from 'vue';

import router from './router';
import store from './store/index';
import App from './App.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';

// create app
const app = createApp(App);

// initiate router & store
app.use(router);
app.use(store);

// global components
app.component('base-badge', BaseBadge);
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

// mount app
app.mount('#app');
