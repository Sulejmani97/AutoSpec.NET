using AutoSpec.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AutoSpec.Api.Controllers
{
    [ApiController]
    public class VehicleDataController : ControllerBase
    {
        private readonly CarApiService _carApiService;

        public VehicleDataController(CarApiService carApiService)
        {
            _carApiService = carApiService;
        }

        [HttpGet("/addVehicle")]
        public async Task<IActionResult> GetMakes()
        {
            var makes = await _carApiService.GetMakesAsync();

            return Ok(makes);
        }

        [HttpGet("/getModels")]
        public async Task<IActionResult> GetModels(
            [FromQuery] string make,
            [FromQuery] string year)
        {
            var models = await _carApiService.GetModelsAsync(
                make,
                year);

            return Ok(models);
        }

        [HttpGet("/getEngines")]
        public async Task<IActionResult> GetEngines(
            [FromQuery] string make,
            [FromQuery] string model,
            [FromQuery] string year)
        {
            var engines = await _carApiService.GetEnginesAsync(
                make,
                model,
                year);

            return Ok(engines);
        }
    }
}