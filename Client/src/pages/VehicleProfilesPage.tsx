import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VehicleProfilesList from "../components/VehicleProfilesList";
import fetchVehicleProfiles from "../hooks/fetchVehicleProfiles";

export interface VehicleProfile {
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

function VehicleProfilesPage() {
  const [profiles, setProfiles] = useState<VehicleProfile[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  function goToDetailsPage(profile: VehicleProfile) {
    navigate("/DetailsPage", { state: profile });
  }

  useEffect(() => {
    const fetch = async () => {
      await fetchVehicleProfiles(setProfiles, setError, setIsLoading);
    };

    fetch();
  }, []);

  return (
    <>
      <div>
        <VehicleProfilesList
          profiles={profiles}
          goToDetailsPage={goToDetailsPage}
          setProfiles={setProfiles}
          error={error?.message}
          setError={setError}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </>
  );
}

export default VehicleProfilesPage;
