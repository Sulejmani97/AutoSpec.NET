using System.ComponentModel.DataAnnotations;

namespace AutoSpec.Api.DTOs
{
    public class AddMileageRecordRequest
    {
        [Range(1, int.MaxValue)]
        public int VehicleProfileId { get; set; }

        [Range(0, int.MaxValue)]
        public int Mileage { get; set; }

        public string? Notes { get; set; }
    }
}