namespace Api.Dtos;

public record BookReadDto(int Id, string Title, string Author, string PublishedDate);
public record BookCreateDto(string Title, string Author, string PublishedDate);
public record BookUpdateDto(int Id, string Title, string Author, string PublishedDate);
