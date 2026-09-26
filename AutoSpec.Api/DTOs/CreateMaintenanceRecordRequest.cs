using System.ComponentModel.DataAnnotations;

namespace AutoSpec.Api.DTOs
{
    public class CreateMaintenanceRecordRequest
    {
        [Required]
        public int VehicleProfileID { get; set; }

        [Required]
        public string MaintenanceType { get; set; } = string.Empty;

        [Required]
        public DateTime Date { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Cost { get; set; }

        [Required]
        public string Brand { get; set; } = string.Empty;

        public string? Notes { get; set; }

        [Range(0, int.MaxValue)]
        public int Mileage { get; set; }
    }
}