export interface Portfolio {
    portfolio_id: string,
    user_id: string,
    name: string,
    description: string,
    creation_date: string,
    title_image: string,
}

export interface User {
    user_id: string,
    full_name: string,
    login: string,
    password: string,
    birth_date: string,
    role: Role,
    token: string,
}

export enum Role {
    admin = 'admin',
    author = 'author',
    user = 'user',
}

export interface Comment {
    user_id: string, 
    portfolio_id: string, 
    comment: string,
}