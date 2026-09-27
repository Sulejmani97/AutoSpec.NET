using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoSpec.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VehicleProfiles",
                columns: table => new
                {
                    VehicleProfileID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PictureURL = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    ProfileName = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    VehicleColor = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    VehicleMake = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    VehicleModel = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    VehicleTrim = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    VehicleYear = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleProfiles", x => x.VehicleProfileID);
                });

            migrationBuilder.CreateTable(
                name: "MaintenanceRecords",
                columns: table => new
                {
                    MaintenanceID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VehicleProfileID = table.Column<int>(type: "int", nullable: false),
                    Brand = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    Date = table.Column<DateTime>(type: "date", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Mileage = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaintenanceRecords", x => x.MaintenanceID);
                    table.ForeignKey(
                        name: "FK_MaintenanceRecords_VehicleProfiles_VehicleProfileID",
                        column: x => x.VehicleProfileID,
                        principalTable: "VehicleProfiles",
                        principalColumn: "VehicleProfileID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MileageTracking",
                columns: table => new
                {
                    MileageID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VehicleProfileID = table.Column<int>(type: "int", nullable: false),
                    DateRecorded = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
                    Mileage = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MileageTracking", x => x.MileageID);
                    table.ForeignKey(
                        name: "FK_MileageTracking_VehicleProfiles_VehicleProfileID",
                        column: x => x.VehicleProfileID,
                        principalTable: "VehicleProfiles",
                        principalColumn: "VehicleProfileID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MaintenanceRecords_VehicleProfileID",
                table: "MaintenanceRecords",
                column: "VehicleProfileID");

            migrationBuilder.CreateIndex(
                name: "IX_MileageTracking_VehicleProfileID",
                table: "MileageTracking",
                column: "VehicleProfileID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaintenanceRecords");

            migrationBuilder.DropTable(
                name: "MileageTracking");

            migrationBuilder.DropTable(
                name: "VehicleProfiles");
        }
    }
}
