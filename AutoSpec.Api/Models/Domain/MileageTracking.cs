using System.ComponentModel.DataAnnotations;

namespace AutoSpec.Api.Models.Domain
{
    public class MileageTracking
    {
        [Key]
        public int MileageID { get; set; }

        public int VehicleProfileID { get; set; }

        public VehicleProfiles VehicleProfile { get; set; } = null!;

        public DateTime? DateRecorded { get; set; }

        public int Mileage { get; set; }

        [MaxLength(255)]
        public string? Notes { get; set; }
    }
}
