using Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Api.Data;

public class ApplicationDbContext(DbContextOptions options) : IdentityDbContext<ApplicationUser>(options)
{
    public DbSet<Book> Books => Set<Book>();
    public DbSet<Quote> Quotes => Set<Quote>();
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        //builder.Entity<IdentityRole>().HasData(
        //    new IdentityRole { Id = "admin-id", Name = "Admin", NormalizedName = "ADMIN" },
        //    new IdentityRole { Id = "user-id", Name = "Uer", NormalizedName = "USER" }
        //    );
    }
}
