global using HealthCheck.Server;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHealthChecks()
    .AddCheck("ICMP", new ICMPHealthCheck("www.google.com",1000))
    .AddCheck("ICMP_02",new ICMPHealthCheck("www.google.com", 100))
    .AddCheck("ICMP_03",new ICMPHealthCheck($"www.{Guid.NewGuid():N}.com", 100));


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowAll");

app.UseHealthChecks(new PathString("/api/health"), new CustomHealthCheckOptions()); //added before MapContorllers

app.MapControllers();

app.MapFallbackToFile("/index.html");


app.Run();
