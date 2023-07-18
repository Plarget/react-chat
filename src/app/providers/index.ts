import compose from "compose-function"
import { withRouter } from "./withRouter"
import { withQuery } from "./withQuery"
import { TWithProviders } from "./types.ts"
import { withStore } from "@/app/providers/withStore.tsx"

export const withProviders: TWithProviders = compose(withRouter, withQuery, withStore)