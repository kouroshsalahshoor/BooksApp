namespace Api.Models;

public class Book : BaseModel
{
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public string Author { get; set; } = default!;
    public DateOnly PublishedDate { get; set; }
    public List<Quote> Quotes { get; set; } = new();
}
