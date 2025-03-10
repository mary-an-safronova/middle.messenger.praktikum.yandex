import { noAvatar } from '../assets';
import { baseURL } from './constants';
import { TChatUser, TCurrentChat, TCurrentUser } from './types';

export const handleAvatarImg = (chat?: TCurrentChat, currentUser?: TCurrentUser) => {
  // Получаем количество собеседников в чате
  const chatUsersLength = chat?.chat_users?.length;
  const chatPartner = chat?.chat_users?.filter((user: TChatUser) => user?.id !== currentUser?.data?.id);

  // Если в чате только 2 собеседника и не добавлен аватар чата, то отображаем аватар собеседника в качестве аватара чата
  if (chatUsersLength === 2 && chat?.avatar_image === '' && (chatPartner as TChatUser[])[0].avatar) {
    return `${baseURL}/resources${(chatPartner as TChatUser[])[0].avatar}`;
  // Если аватара чата нет, отображаем картинку пустого аватара
  } if (chat?.avatar_image === '') {
    return noAvatar;
  }
  // Иначе возвращаем картинку аватара чата
  return chat?.avatar_image;
};
