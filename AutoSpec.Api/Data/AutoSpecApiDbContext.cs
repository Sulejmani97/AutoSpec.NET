using AutoSpec.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace AutoSpec.Api.Data
{
    public class AutoSpecApiDbContext: DbContext
    {
        public AutoSpecApiDbContext(DbContextOptions dbContextOptions): base(dbContextOptions)
        {
            
        }
        public DbSet<VehicleProfiles> VehicleProfiles { get; set; }
        public DbSet<MileageTracking> MileageTracking { get; set; }
        public DbSet<MaintenanceRecords> MaintenanceRecords { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // MaintenanceRecords

            modelBuilder.Entity<MaintenanceRecords>()
                .Property(m => m.Cost)
                .HasPrecision(10, 2);

            modelBuilder.Entity<MaintenanceRecords>()
                .Property(m => m.Date)
                .HasColumnType("date");

            modelBuilder.Entity<MaintenanceRecords>()
                .Property(m => m.DateCreated)
                .HasColumnType("datetime2")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<MaintenanceRecords>()
                .HasOne(m => m.VehicleProfile)
                .WithMany(v => v.MaintenanceRecords)
                .HasForeignKey(m => m.VehicleProfileID)
                .OnDelete(DeleteBehavior.Cascade);

            // MileageTracking

            modelBuilder.Entity<MileageTracking>()
                .Property(m => m.DateRecorded)
                .HasColumnType("datetime2")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<MileageTracking>()
                .HasOne(m => m.VehicleProfile)
                .WithMany(v => v.MileageTracking)
                .HasForeignKey(m => m.VehicleProfileID)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
