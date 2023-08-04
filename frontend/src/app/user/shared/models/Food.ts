// export class Food{
//     id!:string;
//     name!:string;
//     price!:number;
//     tags?: string[];
//     favorite!:boolean;
//     stars!: number;
//     imageUrl!: string;
//     origins!: string[];
//     cookTime!:string;
//   }

export class Food {
  [x: string]: any;
  id!: string;
  name!: string;
  price!: number;
  tags?: string[];
  favorite!: boolean;
  stars!: number;
  imageUrl!: string; // New property for image URL
  origins!: string[];
  cookTime!: string; // New property for cook time
}
