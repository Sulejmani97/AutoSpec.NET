using AutoSpec.Api.Services;
using Xunit;

namespace AutoSpec.Api.Tests
{
    public class MileageCalculatorTests
    {
        // Shortcut so each test can create a reading in one short line.
        private static MileageReading Reading(int year, int month, int day, int mileage) =>
            new(new DateOnly(year, month, day), mileage);

        [Fact]
        public void EstimateMonthlyMiles_SplitsMilesAcrossMonthsByDay()
        {
            // Arrange: 1,120 miles over the 56 days from Aug 15 to Oct 10 (20 per day)
            var readings = new[]
            {
                Reading(2026, 8, 15, 10000),
                Reading(2026, 10, 10, 11120),
            };

            // Act
            var result = MileageCalculator.EstimateMonthlyMiles(readings, 2026);

            // Assert
            Assert.Equal(320, result[7], 2); // August: 16 days
            Assert.Equal(600, result[8], 2); // September: 30 days
            Assert.Equal(200, result[9], 2); // October: 10 days
        }

        [Fact]
        public void EstimateMonthlyMiles_SameDayReadings_PutsAllMilesInThatMonth()
        {
            // Arrange
            var readings = new[]
            {
                Reading(2026, 10, 5, 10000),
                Reading(2026, 10, 5, 10050),
            };

            // Act
            var result = MileageCalculator.EstimateMonthlyMiles(readings, 2026);

            // Assert
            Assert.Equal(50, result[9], 2); // October
        }

        [Fact]
        public void EstimateMonthlyMiles_GapAcrossNewYear_CountsOnlyDaysInRequestedYear()
        {
            // Arrange: 2,100 miles over 21 days (100 per day):
            // 11 days in December 2025, 10 days in January 2026
            var readings = new[]
            {
                Reading(2025, 12, 20, 10000),
                Reading(2026, 1, 10, 12100),
            };

            // Act
            var result = MileageCalculator.EstimateMonthlyMiles(readings, 2026);

            // Assert
            Assert.Equal(1000, result[0], 2); // January 2026 gets only its 10 days
            Assert.Equal(0, result[11], 2);   // December 2025 isn't part of 2026
        }

        [Fact]
        public void EstimateMonthlyMiles_ReadingsOutOfOrder_GivesSameResult()
        {
            // Arrange
            var inOrder = new[] { Reading(2026, 1, 20, 10000), Reading(2026, 3, 10, 11500) };
            var outOfOrder = new[] { Reading(2026, 3, 10, 11500), Reading(2026, 1, 20, 10000) };

            // Act
            var expected = MileageCalculator.EstimateMonthlyMiles(inOrder, 2026);
            var actual = MileageCalculator.EstimateMonthlyMiles(outOfOrder, 2026);

            // Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void EstimateMonthlyMiles_SingleReading_ReturnsAllZeros()
        {
            // Arrange
            var readings = new[] { Reading(2026, 6, 1, 10000) };

            // Act
            var result = MileageCalculator.EstimateMonthlyMiles(readings, 2026);

            // Assert
            Assert.Equal(new double[12], result);
        }

        [Fact]
        public void EstimateMonthlyMiles_TotalMatchesMilesDriven()
        {
            // Arrange: 1,500 miles over 49 days doesn't divide evenly (about 30.6 per day),
            // but splitting them up should never lose or invent miles.
            var readings = new[]
            {
                Reading(2026, 1, 20, 10000),
                Reading(2026, 3, 10, 11500),
            };

            // Act
            var result = MileageCalculator.EstimateMonthlyMiles(readings, 2026);

            // Assert
            Assert.Equal(1500, result.Sum(), 2);
        }

        [Theory]
        [InlineData(10000)] // same as the earlier reading
        [InlineData(9500)]  // lower than the earlier reading (bad data)
        public void EstimateMonthlyMiles_MileageDidNotIncrease_CountsNoMiles(int laterMileage)
        {
            // Arrange
            var readings = new[]
            {
                Reading(2026, 3, 1, 10000),
                Reading(2026, 3, 20, laterMileage),
            };

            // Act
            var result = MileageCalculator.EstimateMonthlyMiles(readings, 2026);

            // Assert
            Assert.Equal(new double[12], result);
        }
    }
} 