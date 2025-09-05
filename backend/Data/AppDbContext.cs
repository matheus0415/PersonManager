
using Microsoft.EntityFrameworkCore;
using PersonManage.Models;

namespace PersonManage.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

		public DbSet<Person> Persons { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Person>()
				.HasIndex(p => p.CPF)
				.IsUnique();
		}
	}
}
