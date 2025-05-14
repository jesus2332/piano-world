export type Keyboard ={
    id:number,
    name:string,
    image:string,
    description:string,
    price:number
}

//export type CartItem = Keyboard & {quantity:number}

export type CartItem = Pick<Keyboard, 'id' | 'name'  | 'image' | 'price'> & {quantity:number}




export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
}

export type OrderPianoPivot = { 
    quantity: number;
    price_at_purchase: number;
    created_at?: string;
    updated_at?: string;
}

export type PianoInOrder = Keyboard & { 
    pivot: OrderPianoPivot;
}

export type Order = {
    id: number;
    user_id: number;
    total_amount: string; 
    status: string;
    created_at: string;
    updated_at: string;
    pianos: PianoInOrder[]; 
    user?: User; 
}