using AutoSpec.Api.Data;
using AutoSpec.Api.DTOs;
using AutoSpec.Api.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoSpec.Api.Controllers
{
    [ApiController]
    public class MaintenanceRecordsController : ControllerBase
    {
        private readonly AutoSpecApiDbContext _context;

        public MaintenanceRecordsController(AutoSpecApiDbContext context)
        {
            _context = context;
        }

        [HttpPost("/createMaintenanceRecord")]
        public async Task<IActionResult> CreateMaintenanceRecord(
            CreateMaintenanceRecordRequest request)
        {
            var vehicleExists = await _context.VehicleProfiles
                .AnyAsync(v => v.VehicleProfileID == request.VehicleProfileID);

            if (!vehicleExists)
            {
                return NotFound(new
                {
                    error = "Vehicle profile not found."
                });
            }

            var maintenanceRecord = new MaintenanceRecords
            {
                VehicleProfileID = request.VehicleProfileID,
                Type = request.MaintenanceType,
                Date = request.Date,
                Cost = request.Cost,
                Brand = request.Brand,
                Notes = request.Notes,
                Mileage = request.Mileage
            };

            _context.MaintenanceRecords.Add(maintenanceRecord);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("/getMaintenanceRecords/{vehicleProfileID}")]
        public async Task<IActionResult> GetMaintenanceRecords(
            int vehicleProfileID)
        {
            var records = await _context.MaintenanceRecords
                .Where(m => m.VehicleProfileID == vehicleProfileID)
                .ToListAsync();

            return Ok(records);
        }

        [HttpDelete("/deleteMaintenanceRecord/{maintenanceRecordID}")]
        public async Task<IActionResult> DeleteMaintenanceRecord(
            int maintenanceRecordID)
        {
            var record = await _context.MaintenanceRecords
                .FirstOrDefaultAsync(m =>
                    m.MaintenanceID == maintenanceRecordID);

            if (record == null)
            {
                return NotFound();
            }

            _context.MaintenanceRecords.Remove(record);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true
            });
        }

    }
}