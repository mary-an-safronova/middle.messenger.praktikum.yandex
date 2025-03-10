/* eslint-disable no-console */
import { TChatModalItems } from '../../../utils/types';

export default function clickOnModalItem(
  evt: MouseEvent,
  items: TChatModalItems,
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
