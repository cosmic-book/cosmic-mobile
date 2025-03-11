import { ItemType, OwnershipStatus, ReadingStatus } from '@/enums';
import { TEdition } from './Edition';

export type TReading = {
  id: number;
  id_user: number;
  id_edition: number;
  status: number | null;
  type: number;
  category: number;
  read_pages: number;
  rating?: number | null;
  review?: string | null;
  like?: boolean;
  start_date?: string | null;
  finish_date?: string | null;
  favorite: number | null;
  edition?: TEdition;
};
