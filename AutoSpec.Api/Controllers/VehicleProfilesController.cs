using AutoSpec.Api.Data;
using AutoSpec.Api.DTOs;
using AutoSpec.Api.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoSpec.Api.Controllers
{
    [ApiController]
    public class VehicleProfilesController : ControllerBase
    {
        private readonly AutoSpecApiDbContext _context;

        public VehicleProfilesController(AutoSpecApiDbContext context)
        {
            _context = context;
        }

        [HttpPost("/createVehicleProfile")]
        public async Task<IActionResult> CreateVehicleProfile(
            CreateVehicleProfileRequest request)
        {
            await using var transaction =
                await _context.Database.BeginTransactionAsync();

            try
            {
                var vehicle = new VehicleProfiles
                {
                    VehicleMake = request.SelectedMake,
                    VehicleYear = request.SelectedYear,
                    VehicleModel = request.SelectedModel,
                    VehicleTrim = request.SelectedTrim,
                    ProfileName = request.Name,
                    VehicleColor = request.Color,
                    PictureURL = request.PictureURL
                };

                _context.VehicleProfiles.Add(vehicle);

                await _context.SaveChangesAsync();

                var mileageRecord = new MileageTracking
                {
                    VehicleProfileID = vehicle.VehicleProfileID,
                    Mileage = request.Mileage,
                    Notes = "Initial mileage reading"
                };

                _context.MileageTracking.Add(mileageRecord);

                await _context.SaveChangesAsync();

                await transaction.CommitAsync();

                return NoContent();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();

                return StatusCode(500, new
                {
                    error = "An error occurred while creating the vehicle."
                });
            }
        }
    }
}