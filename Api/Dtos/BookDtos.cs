namespace Api.Dtos;

public record BookReadDto(int Id, string Title, string Author, string PublishedDate);
public record BookCreateUpdateDto(int Id, string Title, string Author, string PublishedDate);
