import { useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";

interface MileageRecord {
  miles: number;
  date: string;
  notes: string;
}
import { addMileageRecord } from "../hooks/addMileageRecord";

import { fetchMileageRecords } from "../hooks/fetchMileageRecords";
import MileageChart from "../components/MileageChart";

function DetailsPage() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [newMileage, setNewMileage] = useState<number>(0);
  const [profile, setProfile] = useState(location.state);
  const [mileageRecords, setMileageRecords] = useState<MileageRecord[]>([]);

  const today = new Date();

  const barChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Miles driven per month in " + today.getFullYear().toString(),
        data: mileageRecords.map((record) => record.miles),
        backgroundColor: "#b90000",
        borderColor: "#b90000",
        borderWidth: 2,
      },
    ],
  };

  const handleOpen = () => setOpen(!open);

  const handleMileageUpdate = async () => {
    // 1. Compare against the latest known mileage, not the page-load value
    if (newMileage <= profile.Mileage) {
      alert("New mileage must be greater than current mileage.");
      return; // dialog stays open so the user can fix the number
    }

    // 2. try/catch so a failed request shows a message instead of failing silently
    try {
      await addMileageRecord(
        profile.VehicleProfileID,
        newMileage,
        "Mileage updated",
      );

      setProfile({ ...profile, Mileage: newMileage });

      // 3. await the reload so the chart updates before the alert appears
      const records = await fetchMileageRecords(profile.VehicleProfileID);
      setMileageRecords(records);

      // 4. Only close the dialog once everything succeeded
      setOpen(false);
      alert("Mileage updated successfully!");
    } catch {
      alert("Couldn't update the mileage. Please try again.");
    }
  };

  // Reset scroll position on page load
  useEffect(() => {
    const fetchData = async () => {
      const records = await fetchMileageRecords(
        location.state.VehicleProfileID,
      );
      setMileageRecords(records);
    };

    fetchData();

    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex h-full">
        <SideBar profile={profile} />
        <div className="flex-1 ml-64">
          <div className="p-8">
            <div className="flex flex-col space-y-8">
              {/* Hero section with image and welcome message */}
              <div className="relative h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-300">
                <img
                  className="w-full h-full object-cover"
                  src={profile.PictureURL}
                  alt="Picture of car"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                  <h1 className="text-4xl font-bold text-white">
                    Welcome, {profile.ProfileName}
                  </h1>
                </div>
              </div>

              {/* Stats or quick info cards */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Make & Model
                  </h3>
                  <p className="text-gray-600">
                    {profile.VehicleMake} {profile.VehicleModel}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
                  <h3 className="text-lg font-semibold text-gray-800">Year</h3>
                  <p className="text-gray-600">{location.state.VehicleYear}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Mileage
                    </h3>

                    <p className="text-gray-600">{profile.Mileage} miles</p>
                  </div>
                  <div className="mt-4">
                    <Button
                      size="sm"
                      color="green"
                      variant="filled"
                      className="p-2"
                      onClick={handleOpen}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Update Mileage
                    </Button>
                  </div>
                </div>
              </div>
              <Dialog
                open={open}
                handler={handleOpen}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <DialogHeader
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Update Current Mileage
                </DialogHeader>
                <DialogBody
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Input
                    type="number"
                    label="New Mileage"
                    onChange={(e) => {
                      setNewMileage(Number(e.target.value));
                    }}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    crossOrigin={undefined}
                  />
                </DialogBody>
                <DialogFooter
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Button
                    className="mr-2"
                    variant="filled"
                    color="green"
                    onClick={() => {
                      handleMileageUpdate();
                    }}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Update
                  </Button>
                  <Button
                    variant="filled"
                    color="red"
                    onClick={handleOpen}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>
            <div className="mx-auto mt-12 w-full">
              <MileageChart data={barChartData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsPage;
