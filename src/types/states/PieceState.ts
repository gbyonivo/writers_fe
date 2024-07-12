import { Piece } from 'writers_shared'

export interface PieceState {
  likes: { [key: string]: any }
  pieceDraft?: Partial<Piece>
}
