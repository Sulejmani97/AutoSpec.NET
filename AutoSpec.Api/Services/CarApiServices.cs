using System.Text.Json;

namespace AutoSpec.Api.Services
{
    public class CarApiService
    {
        private readonly HttpClient _httpClient;

        public CarApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<JsonElement> GetMakesAsync()
        {
            return await _httpClient.GetFromJsonAsync<JsonElement>(
                "api/makes/v2");
        }

        public async Task<JsonElement> GetModelsAsync(
            string make,
            string year)
        {
            var url =
                $"api/models/v2" +
                $"?make={Uri.EscapeDataString(make)}" +
                $"&year={Uri.EscapeDataString(year)}";

            return await _httpClient.GetFromJsonAsync<JsonElement>(url);
        }

        public async Task<JsonElement> GetEnginesAsync(
            string make,
            string model,
            string year)
        {
            var url =
                $"api/engines/v2" +
                $"?make={Uri.EscapeDataString(make)}" +
                $"&model={Uri.EscapeDataString(model)}" +
                $"&year={Uri.EscapeDataString(year)}";

            return await _httpClient.GetFromJsonAsync<JsonElement>(url);
        }
    }
}