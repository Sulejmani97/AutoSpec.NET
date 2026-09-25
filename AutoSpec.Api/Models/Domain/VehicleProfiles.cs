using System.ComponentModel.DataAnnotations;

namespace AutoSpec.Api.Models.Domain
{
    public class VehicleProfiles
    {
        [Key]
        public int VehicleProfileID { get; set; }

        [MaxLength(250)]
        public string PictureURL { get; set; } = string.Empty;

        [MaxLength(45)]
        public string ProfileName { get; set; } = string.Empty;

        [MaxLength(45)]
        public string VehicleColor { get; set; } = string.Empty;

        [MaxLength(45)]
        public string VehicleMake { get; set; } = string.Empty;

        [MaxLength(45)]
        public string VehicleModel { get; set; } = string.Empty;

        [MaxLength(100)]
        public string VehicleTrim { get; set; } = string.Empty;

        [MaxLength(45)]
        public string VehicleYear { get; set; } = string.Empty;

        public ICollection<MaintenanceRecords> MaintenanceRecords { get; set; }
            = new List<MaintenanceRecords>();

        public ICollection<MileageTracking> MileageTracking { get; set; }
            = new List<MileageTracking>();
    }
}
