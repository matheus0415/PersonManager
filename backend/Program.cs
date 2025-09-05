using Microsoft.EntityFrameworkCore;
using PersonManage.Data;
using PersonManage.Repositories;
using PersonManage.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure DbContext (use InMemory for demo, change to SqlServer for production)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("PersonDb"));

// Dependency Injection
builder.Services.AddScoped<IPersonRepository, PersonRepository>();
builder.Services.AddScoped<IPersonService, PersonService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
