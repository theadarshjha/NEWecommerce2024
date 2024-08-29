  // components/Types/product.ts
  export interface Product {
    href: string;
    imageAlt: string | undefined;
    color?: ReactNode;
    quantity?: ReactNode;
    id: string;
    name: string;
    image: string;
    price: number;
    category: string;
    description: string;
    newArrival:boolean;
    discountPrice?: number; // Make discountPrice optional and number
  }
  