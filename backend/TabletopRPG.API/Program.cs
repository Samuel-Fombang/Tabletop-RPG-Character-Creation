var builder = WebApplication.CreateBuilder(args);

// 1. Controller & OpenAPI (Swagger) registrieren
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2. CORS Richtlinie konfigurieren (Erlaubt React-Anfragen)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000") // Typische React / Vite Ports
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 3. Swagger Middleware aktivieren (im Development-Modus)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 4. CORS Middleware vor Authorization aktivieren
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();