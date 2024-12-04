import { TMessageModalItems } from '../../utils/types';

export type TMessageModalProps = {
  position: 'top' | 'bottom';
  modalItems: TMessageModalItems;
  onClick: (evt: MouseEvent) => void;
}
