/* eslint-disable no-console */
import { TMessageModalItems } from '../../../utils/types';

export default function clickOnModalItem(
  evt: MouseEvent,
  items: TMessageModalItems,
) {
  evt.stopPropagation();
  const targetItem = (evt.target as HTMLElement);
  const itemText = targetItem.innerText;
  const itemClass = targetItem.closest('.icon-text__wrap');

  items.forEach((item) => {
    if (itemText === item.text && itemClass) {
      console.log(`${item.text} on click`);
    }
  });
}
