// export interface TemplateInput {
//     name: string;
//     category: string;
//     description?: string | undefined;
//     fileBuffer: Buffer;
//     mimeType: string;
// }

export interface TemplateInput {
    name: string;
    category: string;
    description?: string;
    s3Url: string;
  }