import { TChatModalItems } from '../../utils/types';

export type TMessageModalProps = {
  position: 'top' | 'bottom';
  modalItems: TChatModalItems;
  onClick: (evt: MouseEvent) => void;
}
