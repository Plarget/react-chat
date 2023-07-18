import { QueryClient, QueryClientProvider } from "react-query"
import { TComponentFn } from "./types.ts"

const queryClient: QueryClient = new QueryClient()
export const withQuery = (component: TComponentFn) => () => {
  return (
    <QueryClientProvider client={queryClient}>
      {component()}
    </QueryClientProvider>
  )
}