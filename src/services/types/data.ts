import { Ingredient } from "../../components/ingredient/ingredient"

export type TIngredient = {
    readonly "_id": string,
    readonly "name": string,
    readonly "type": string,
    readonly "proteins": number,
    readonly "fat": number,
    readonly "carbohydrates": number,
    readonly "calories": number,
    readonly "price": number,
    readonly "image": string,
    readonly "image_mobile": string,
    readonly "image_large": string,
    readonly "__v": 0,
    key?: string
}
export type TOrderApi = {
    _id: string,
    ingredients: Array<string>,
    status: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number
}

export type TUser = {
    readonly name: string,
    readonly email: string,
    password?: string
}

export interface TResponse<T> extends Body {
    readonly body: any;
    readonly bodyUsed: boolean;
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
    json(): Promise<T>
}

interface TResBody {
    success: boolean
}
export interface TGetCardsResponse extends TResBody {
    data: Array<TIngredient>
}
export interface TAuthResponse extends TResBody {
    message: string
}
export interface TTokenResponse extends TResBody {
    accessToken: string;
    refreshToken: string
}
export interface TUserResponse extends TResBody {
    user: {
        email: string,
        name: string
    }
}
export interface TLoginResponse extends TTokenResponse, TUserResponse { }
export interface TPostOrderResponse extends TResBody {
    name: string,
    order: {
        createdAt: string,
        ingredients: Array<TIngredient>,
        name: string,
        number: number,
        owner: {
            createdAt: string,
            email: string,
            name: string,
            updatedAt: string
        },
        price: number,
        status: string,
        updatedAt: string,
        _id: string
    }
}