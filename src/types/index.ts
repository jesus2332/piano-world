export type Keyboard ={
    id:number,
    name:string,
    image:string,
    description:string,
    price:number
}

//export type CartItem = Keyboard & {quantity:number}

export type CartItem = Pick<Keyboard, 'id' | 'name'  | 'image' | 'price'> & {quantity:number}



