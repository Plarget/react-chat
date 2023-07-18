import { setupStore } from "@/shared/store"
import { TComponentFn } from "@/app/providers/types.ts"
import { Provider } from "react-redux"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

const store = setupStore()
const persistor = persistStore(store)

export const withStore = (component: TComponentFn) => () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {component()}
      </PersistGate>
    </Provider>
  )
}
