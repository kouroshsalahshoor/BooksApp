namespace Api.Models;

public abstract class BaseModel
{
    public string CreatedBy { get; set; } = default!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string UpdatedBy { get; set; } = default!;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
