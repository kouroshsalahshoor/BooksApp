export type Book = {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  quotes?: any[];
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type BookCreateUpdateModel = {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
};
