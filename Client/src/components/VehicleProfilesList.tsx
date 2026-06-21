import { Button } from "@material-tailwind/react";
import deleteVehicleProfile from "../hooks/deleteVehicleProfile";
import Loading from "./Loading";
import { Dispatch, SetStateAction } from "react";

// Type definitions
interface VehicleProfile {
  ProfileName: string;
  VehicleMake: string;
  VehicleModel: string;
  VehicleYear: number;
  VehicleTrim: string;
  VehicleColor: string;
  Mileage: number;
  PictureURL: string;
  VehicleProfileID: number;
  DateRecorded: string;
}

interface VehicleProfilesListProps {
  isLoading: boolean;
  error: string | undefined;
  profiles: VehicleProfile[];
  goToDetailsPage: (profile: VehicleProfile) => void;
  setProfiles: Dispatch<SetStateAction<VehicleProfile[]>>;
  setError: Dispatch<SetStateAction<Error | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function VehicleProfilesList({
  isLoading,
  error,
  profiles,
  goToDetailsPage,
  setProfiles,
  setError,
  setIsLoading,
}: VehicleProfilesListProps) {
  if (profiles.length === 0 && !error && !isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-3xl font-semibold text-gray-600">
          No Vehicle Profiles Found
        </h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {isLoading && <Loading />}
      {error && (
        <div className="text-red-500 text-center p-4 mb-4 bg-red-50 rounded">
          Error! {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {profiles?.map((profile: VehicleProfile) => (
          <div
            key={profile.VehicleProfileID}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-300"
          >
            <div className="relative h-64">
              <img
                className="w-full h-full object-cover"
                src={profile.PictureURL}
                alt={`${profile.ProfileName}'s vehicle`}
              />
              <div className="absolute top-0 right-0 m-4">
                <h3 className="bg-white/90 px-4 py-2 rounded-full text-lg font-semibold">
                  {profile.ProfileName}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p className="font-semibold">Make</p>
                  <p>{profile.VehicleMake}</p>
                </div>
                <div>
                  <p className="font-semibold">Model</p>
                  <p>{profile.VehicleModel}</p>
                </div>
                <div>
                  <p className="font-semibold">Year</p>
                  <p>{profile.VehicleYear}</p>
                </div>
                <div>
                  <p className="font-semibold">Color</p>
                  <p>{profile.VehicleColor}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-semibold">Trim/Engine</p>
                  <p>{profile.VehicleTrim}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-semibold">Mileage</p>
                  <p>{profile.Mileage} miles</p>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  className="flex-1 mr-2"
                  onClick={() => goToDetailsPage(profile)}
                  placeholder=""
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Details
                </Button>
                <Button
                  color="red"
                  className="flex-1 ml-2"
                  onClick={() =>
                    deleteVehicleProfile(
                      profile.VehicleProfileID,
                      setProfiles,
                      setError,
                      setIsLoading
                    )
                  }
                  placeholder=""
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
