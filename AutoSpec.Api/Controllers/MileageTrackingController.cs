using AutoSpec.Api.Data;
using AutoSpec.Api.DTOs;
using AutoSpec.Api.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            // Get all mileage records for this vehicle that have a date.
            // We need the previous record to calculate miles driven.
            var records = await _context.MileageTracking
                .Where(m =>
                    m.VehicleProfileID == vehicleProfileId &&
                    m.DateRecorded != null)
                .OrderBy(m => m.DateRecorded)
                .ToListAsync();

            // Names of the 12 months.
            var months = new[]
            {
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    };

            // One total for each month.
            // Index 0 = January, 1 = February, etc.
            var monthlyMiles = new int[12];

            var currentYear = DateTime.Now.Year;

            // Start at 1 because we compare each record to the previous record.
            for (int i = 1; i < records.Count; i++)
            {
                var currentRecord = records[i];
                var previousRecord = records[i - 1];

                var recordDate = currentRecord.DateRecorded!.Value;

                // Only include mileage entries whose current reading
                // occurred during the current year.
                if (recordDate.Year != currentYear)
                {
                    continue;
                }

                // Calculate how many miles were driven since the previous reading.
                var milesDriven = currentRecord.Mileage - previousRecord.Mileage;

                // Ignore negative or zero differences.
                if (milesDriven <= 0)
                {
                    continue;
                }

                // DateTime.Month is 1-12.
                // Arrays are 0-11, so subtract 1.
                var monthIndex = recordDate.Month - 1;

                monthlyMiles[monthIndex] += milesDriven;
            }

            // Turn the totals into the format your React client expects.
            var result = months
                .Select((month, index) => new
                {
                    month,
                    miles = monthlyMiles[index]
                })
                .ToList();

            return Ok(result);
        }

    }
}