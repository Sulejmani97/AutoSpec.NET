using System.Net.Http.Json;
using System.Text.Json;

namespace AutoSpec.Api.Services
{
    public class PexelsService
    {
        private readonly HttpClient _httpClient;

        public PexelsService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<JsonElement> SearchPhotosAsync(
            string make,
            string year,
            string model,
            string color)
        {
            var query = $"{make} {model} {year} {color} car";

            var url = $"search?query={Uri.EscapeDataString(query)}";

            return await _httpClient.GetFromJsonAsync<JsonElement>(url);
        }
    }
}