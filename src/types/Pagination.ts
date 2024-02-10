export type Node<T> = T

export interface Edge<T> {
  node: Node<T>
}

export interface PageInfo {
  endCursor: string
  startCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface Pagination<T> {
  edges: Edge<T>[]
  totalCount: number
  pageInfo: PageInfo
}
