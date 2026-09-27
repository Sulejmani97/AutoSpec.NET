using AutoSpec.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AutoSpec.Api.Controllers
{
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly PexelsService _pexelsService;

        public PhotosController(PexelsService pexelsService)
        {
            _pexelsService = pexelsService;
        }

        [HttpGet("/getProfilePhoto")]
        public async Task<IActionResult> GetProfilePhoto(
            [FromQuery] string make,
            [FromQuery] string year,
            [FromQuery] string model,
            [FromQuery] string color)
        {
            var photos = await _pexelsService.SearchPhotosAsync(
                make,
                year,
                model,
                color);

            return Ok(photos);
        }
    }
}