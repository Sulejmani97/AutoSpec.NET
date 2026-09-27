using AutoSpec.Api.Data;
using AutoSpec.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var pexelsApiKey = builder.Configuration["Pexels:ApiKey"]
    ?? throw new InvalidOperationException(
        "Pexels API key is not configured.");

// Add services to the container.
// Disable the default camelCase naming policy for JSON serialization
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AutoSpecApiDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactClient", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddHttpClient<CarApiService>(client =>
{
    client.BaseAddress = new Uri("https://carapi.app/");
});

builder.Services.AddHttpClient<PexelsService>(client =>
{
    client.BaseAddress = new Uri("https://api.pexels.com/v1/");
    client.DefaultRequestHeaders.Add("Authorization", pexelsApiKey);
});

var app = builder.Build();

app.UseCors("ReactClient");

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
