using System.ComponentModel.DataAnnotations;

namespace AutoSpec.Api.DTOs
{
    public class CreateVehicleProfileRequest
    {
        [Required]
        public string SelectedMake { get; set; } = string.Empty;

        [Required, Range(1900, 2100)]
        public int SelectedYear { get; set; }

        [Required]
        public string SelectedModel { get; set; } = string.Empty;

        [Required]
        public string SelectedTrim { get; set; } = string.Empty;

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Color { get; set; } = string.Empty;

        [Range(0, int.MaxValue)]
        public int Mileage { get; set; }

        [Required]
        public string PictureURL { get; set; } = string.Empty;
    }
}