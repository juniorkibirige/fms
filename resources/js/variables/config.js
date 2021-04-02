import axios from 'axios'
(function () {
    let state = localStorage['appState']
    if (state) {
        let AppState = JSON.parse(state)
        let token = AppState.user.api_token;
        if (token) {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            // axios.defaults.headers.common['Authorization'] = token;
        } else {
            axios.defaults.headers.common['Authorization'] = null;
            /*if setting null does not remove `Authorization` header then try     
              delete axios.defaults.headers.common['Authorization'];
            */
        }
    }
})()