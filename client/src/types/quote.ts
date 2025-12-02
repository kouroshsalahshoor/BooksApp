export type QuoteModel = {
  id: number;
  text: string;
  pageNumber: string;
  rowNumber: string;
  bookId: number;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
};

export type QuoteCreateUpdateModel = {
  id: number;
  text: string;
  pageNumber: string;
  rowNumber: string;
  bookId: number;
};
