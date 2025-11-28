namespace Api.Models;

public class Quote : BaseModel
{
    public int Id { get; set; }
    public string Text { get; set; } = default!;
    public int PageNumber { get; set; }
    public int RowNumber { get; set; }
    public int BookId { get; set; }
    public Book? Book { get; set; }
}
