namespace Api.Dtos;

public record QuoteReadDto(int Id, string Text, int PageNumber, int RowNumber, int BookId);
public record QuoteCreateUpdateDto(int Id, string Text, int PageNumber, int RowNumber, int BookId);
