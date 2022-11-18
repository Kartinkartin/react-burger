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
}

export type TUser = {
    readonly name: string,
    readonly email: string,
    password?: string 
}