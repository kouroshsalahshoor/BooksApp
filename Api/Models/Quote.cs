namespace Api.Models;

public class Quote : BaseModel
{
    public int Id { get; set; }
    public required string Text { get; set; } = default!;
    public int PageNumber { get; set; }
    public int RowNumber { get; set; }
    public bool IsFavorite { get; set; }

    public int BookId { get; set; }
    public Book? Book { get; set; }
}
