export type TUser = {
    id?: number,
    first_name: string,
    second_name: string,
    display_name?: string,
    phone?: string,
    login: string,
    avatar?: string,
    email: string,
}

export type TUserPass = {
    oldPassword: string,
    newPassword: string,
}

type TLastMessage = {
    user: TUser,
    time: string,
    content: string,
}

export type TMessage = {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    created_by: number,
    last_message: TLastMessage,
}
