import { Poem } from 'writers_shared'

export interface PoemState {
  likes: { [key: string]: any }
  poemDraft?: Partial<Poem>
}
