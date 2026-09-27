using System.ComponentModel.DataAnnotations;

namespace AutoSpec.Api.Models.Domain
{
    public class MaintenanceRecords
    {
        [Key]
        public int MaintenanceID { get; set; }

        public int VehicleProfileID { get; set; }

        public VehicleProfiles VehicleProfile { get; set; } = null!;

        [MaxLength(100)]
        public string Brand { get; set; } = string.Empty;

        public decimal Cost { get; set; }

        public DateTime Date { get; set; }

        public DateTime? DateCreated { get; set; }

        public int Mileage { get; set; }

        public string? Notes { get; set; }

        [MaxLength(100)]
        public string Type { get; set; } = string.Empty;
    }
}
