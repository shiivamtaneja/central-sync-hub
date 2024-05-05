import { Workspace } from "./publish";

export interface Subscriptions {
  Workspaces: Workspace
  User: {
    email: string,
    first_name: string
  }
}