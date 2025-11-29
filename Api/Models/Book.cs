namespace Api.Models;

public class Book : BaseModel
{
    public int Id { get; set; }
    public required string Title { get; set; } = default!;
    public required string Author { get; set; } = default!;
    public required DateOnly PublishedDate { get; set; }
    public List<Quote> Quotes { get; set; } = new();
}
