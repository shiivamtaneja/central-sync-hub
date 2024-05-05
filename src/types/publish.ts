export interface Post {
  id: string,
  title: string,
  image: string,
  audio: string,
  createdAt: string,
}

export interface Workspace {
  id: string,
  name: string,
  createdAt: string,
  post: Post[]
}

export interface CreateWorkspace {
  name: string,
  email: string
}