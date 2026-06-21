import { useEffect, useState } from "react";
import { fetchMakes } from "../hooks/fetchMakes";
import CreateVehicleProfileForm from "../components/CreateVehicleProfileForm";

function AddVehiclePage() {
  // Input selection for vehicle
  const [makes, setMakes] = useState([{ id: "", name: "" }]);

  useEffect(() => {
    fetchMakes(setMakes);
  }, []);

  return (
    <>
      <div>
        <CreateVehicleProfileForm makes={makes} />
      </div>
    </>
  );
}

export default AddVehiclePage;
