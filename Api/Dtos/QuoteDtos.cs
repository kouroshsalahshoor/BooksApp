namespace Api.Dtos;

public record QuoteReadDto(int Id, string Text, int PageNumber, int RowNumber, int BookId, bool isFavorite);
public record QuoteCreateUpdateDto(int Id, string Text, int PageNumber, int RowNumber, int BookId, bool isFavorite);
