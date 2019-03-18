import { NETWORK_STATUS_CHANGE } from './../actions/types'
import { persistOfflineActions } from './../actions/index'

export default store => {
  store.dispatch({ type: NETWORK_STATUS_CHANGE, payload: navigator.onLine ? 'online' : 'offline' })

  window.addEventListener('offline', event => {
    store.dispatch({ type: NETWORK_STATUS_CHANGE, payload: 'offline' })
  });

  window.addEventListener('online', event => {
    store.dispatch({ type: NETWORK_STATUS_CHANGE, payload: 'online' })

    store.dispatch(persistOfflineActions());
  });
}