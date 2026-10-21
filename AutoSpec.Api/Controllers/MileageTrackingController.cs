using AutoSpec.Api.Data;
using AutoSpec.Api.DTOs;
using AutoSpec.Api.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoSpec.Api.Services;
namespace AutoSpec.Api.Controllers
{
    [ApiController]
    public class MileageTrackingController : ControllerBase
    {
        private readonly AutoSpecApiDbContext _context;

        public MileageTrackingController(AutoSpecApiDbContext context)
        {
            _context = context;
        }

        [HttpPost("/addMileageRecord")]
        public async Task<IActionResult> AddMileageRecord(
            AddMileageRecordRequest request)
        {
            var vehicleExists = await _context.VehicleProfiles
                .AnyAsync(v => v.VehicleProfileID == request.VehicleProfileId);

            if (!vehicleExists)
            {
                return NotFound(new
                {
                    error = "Vehicle profile not found."
                });
            }

            // Find the highest reading we already have for this vehicle.
            // Cast to int? so a vehicle with no readings returns null instead of throwing.
            var highestMileage = await _context.MileageTracking
                .Where(m => m.VehicleProfileID == request.VehicleProfileId)
                .MaxAsync(m => (int?)m.Mileage);

            if (highestMileage.HasValue && request.Mileage <= highestMileage.Value)
            {
                return BadRequest(new
                {
                    error = $"Mileage must be greater than the current reading of {highestMileage.Value}."
                });
            }

            var mileageRecord = new MileageTracking
            {
                VehicleProfileID = request.VehicleProfileId,
                Mileage = request.Mileage,
                Notes = request.Notes
            };

            _context.MileageTracking.Add(mileageRecord);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                mileageId = mileageRecord.MileageID
            });
        }

        [HttpGet("/getMileageRecords/{vehicleProfileId}")]
        public async Task<IActionResult> GetMileageRecords(int vehicleProfileId)
        {
            // Load only the date and mileage of each reading for this vehicle.
            var records = await _context.MileageTracking
                .Where(m =>
                    m.VehicleProfileID == vehicleProfileId &&
                    m.DateRecorded != null)
                .Select(m => new { m.DateRecorded, m.Mileage })
                .ToListAsync();

            // Keep just the day of each reading (not the time of day).
            var readings = records.Select(r => new MileageReading(
                DateOnly.FromDateTime(r.DateRecorded!.Value),
                r.Mileage));

            var monthlyMiles = MileageCalculator.EstimateMonthlyMiles(
                readings, DateTime.Now.Year);

            // Names of the 12 months.
            var months = new[]
            {
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            };

            // Round to whole miles for the chart.
            var result = months
                .Select((month, index) => new
                {
                    month,
                    miles = (int)Math.Round(monthlyMiles[index])
                })
                .ToList();

            return Ok(result);
        }

    }
}