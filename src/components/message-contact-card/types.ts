import { TChat } from '../../utils/types';

export type TMessageContactCardProps = TChat & {
  onSelect: (selectedId: string | null) => void;
  isSelected?: boolean;
}
