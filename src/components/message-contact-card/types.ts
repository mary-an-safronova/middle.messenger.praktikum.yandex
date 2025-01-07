import { TMessage } from '../../utils/types';

export type TMessageContactCardProps = TMessage & {
  onSelect: (selectedId: string | null) => void;
  isSelected: boolean;
}
