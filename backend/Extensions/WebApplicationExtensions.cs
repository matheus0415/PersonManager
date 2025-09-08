using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PersonManage.Data;

namespace PersonManage.Extensions;

public static class WebApplicationExtensions
{
    /// <summary>
    /// Applies pending EF Core migrations at startup.
    /// </summary>
    public static void ApplyMigrations(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        try
        {
            db.Database.Migrate();
            app.Logger.LogInformation("Applied pending EF Core migrations.");
        }
        catch (Exception ex)
        {
            app.Logger.LogError(ex, "Error applying EF Core migrations.");
            throw;
        }
    }
}
