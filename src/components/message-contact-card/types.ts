import { TMessage } from '../../utils/types';

export type TMessageContactCardProps = TMessage & {
  onSelect: (selectedId: string) => void;
  isSelected: boolean;
}
