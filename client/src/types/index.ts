export interface Template {
  id: number;
  name: string;
  category?: string;
  subcategory?: string;
  description?: string;
  templateFile: string;
}

export interface TemplatesByCategory {
  [category: string]: Template[];
}

// export type TemplateCategory = {
//     id: string;
//     name: string;
//     description: string;
//   };
  
  // export type TemplateSelectorProps = {
  //   categories: TemplateCategory[];
  //   onSelect: (categoryId: string) => void;
  // };
  


// export interface Category {
//   id: number;
//   name: string;
// }



// export interface Template {
//   id: string;  // This now consistently represents the ID as a string
//   name: string;
//   category: string;
//   description?: string;
//   templateFile: string;
// }


// export type TemplatesByCategory = {
//   [category: string]: Template[];
// };
