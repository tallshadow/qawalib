declare module "html-to-docx" {
    export default function htmlDocx(
      html: string,
      options?: {
        title?: string;
        subject?: string;
        creator?: string;
        keywords?: string;
      }
    ): Promise<Blob>;
  }