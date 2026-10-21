namespace AutoSpec.Api.Services
{
    // One odometer reading: the day it was taken and the mileage it showed.
    public record MileageReading(DateOnly Date, int Mileage);

    public static class MileageCalculator
    {
        // Estimates how many miles were driven in each month of the given year.
        // Returns 12 values: index 0 = January, index 11 = December.
        public static double[] EstimateMonthlyMiles(
            IEnumerable<MileageReading> readings, int year)
        {
            var monthlyMiles = new double[12];

            // Oldest reading first. If two readings share a date,
            // the lower mileage came first (an odometer only goes up).
            var sorted = readings
                .OrderBy(r => r.Date)
                .ThenBy(r => r.Mileage)
                .ToList();

            // Start at 1 because each reading is compared to the one before it.
            for (int i = 1; i < sorted.Count; i++)
            {
                var previous = sorted[i - 1];
                var current = sorted[i];

                int milesDriven = current.Mileage - previous.Mileage;
                if (milesDriven <= 0)
                {
                    continue;
                }

                // The miles were driven on the days after the previous reading,
                // up to and including the day of the current reading.
                int days = current.Date.DayNumber - previous.Date.DayNumber;

                // Both readings on the same day: all the miles belong to that day.
                if (days == 0)
                {
                    if (current.Date.Year == year)
                    {
                        monthlyMiles[current.Date.Month - 1] += milesDriven;
                    }
                    continue;
                }

                // Cast to double first, or C# does integer division
                // and throws away the remainder.
                double milesPerDay = (double)milesDriven / days;

                // Give each day in the gap its share, in whatever month that day falls.
                for (var day = previous.Date.AddDays(1); day <= current.Date; day = day.AddDays(1))
                {
                    if (day.Year == year)
                    {
                        monthlyMiles[day.Month - 1] += milesPerDay;
                    }
                }
            }

            return monthlyMiles;
        }
    }
}