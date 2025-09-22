import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import CKEditor from 'ckeditor4-vue';

import rules from './rules'

Vue.use(CKEditor);

Vue.config.productionTip = false

Vue.mixin({
    methods: {
        openSnackbar(text, color = '#696CFF') {
            this.$store.commit('setSnackbarStatus', true)
            this.$store.commit('setSnackbarText', text)
            this.$store.commit('setSnackbarColor', color)
        },
        showValidationErrors(errors) {
            let errorText = ''
            Object.entries(errors.response.data.errors).forEach((err) => {
                err[1].forEach((item) => {
                    errorText = errorText + item + '<br>'
                })
            })
            this.openSnackbar(errorText, '#d40d45')
        },
        objectParametersToString(params) {
            let stringedParams = '';
            Object.entries(params).forEach((param) => {
                if (param[1]) {
                    if (Array.isArray(param[1]) && param[1].length) {
                        param[1].forEach((item) => {
                            stringedParams = stringedParams + '&' + param[0] + '[]' + '=' + item
                        })
                    } else {
                        stringedParams = stringedParams + '&' + param[0] + '=' + param[1]
                    }
                }
            })
            return stringedParams;
        }
    },
})

window.urlBuilder = function (entities, url, options, headers) {
    if (Object.keys(options).length) {
        url = url + '?page=' + options.page ?? 1
        url = url + '&per_page=' + options.itemsPerPage ?? 10
    }
    if (options?.sortBy?.length) {
        const header = headers.find(h => h.value === options.sortBy[0]);
        const sortBy = header?.original_value || options.sortBy[0];
        const sortType = options.sortDesc[0] ? 'desc' : 'asc';
        url += `&sort_by=${sortBy}&sort_type=${sortType}`;
    }
    return url;
};

Vue.prototype.$ckeditor = {
    editorUrl: process.env.VUE_APP_FRONT_BASE_URL.replace(/\/$/, "") + '/ckeditor/ckeditor.js'
};

Vue.prototype.$rules = rules

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')