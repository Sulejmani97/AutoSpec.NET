import { MdDashboard } from "react-icons/md";
import { GrHostMaintenance } from "react-icons/gr";
import { NavLink } from "react-router-dom";

interface Profile {
  VehicleProfileID: number;
  VehicleMake: string;
  VehicleYear: number;
  VehicleModel: string;
  VehicleTrim: string;
  ProfileName: string;
  VehicleColor: string;
  PictureURL: string;
  Mileage: number;
  DateRecorded: string;
  // Add other relevant fields as needed
}

const SideBar = ({ profile }: { profile: Profile }) => {
  return (
    <>
      <div className="fixed h-screen bg-blue-gray-800 w-64">
        <div className="p-4 text-white text-xl pt-4 cursor-pointer">
          <div className="flex pb-4 hover:text-gray-400">
            <NavLink
              state={profile}
              to={"/DetailsPage"}
              style={({ isActive }) => {
                return isActive ? { color: "yellow" } : {};
              }}
            >
              <div className="flex">
                <div className="pt-1 pr-2">
                  <MdDashboard />
                </div>
                <div>Dashboard</div>
              </div>
            </NavLink>
          </div>

          <div className="flex hover:text-gray-400">
            <NavLink
              state={profile}
              to={"/Maintenance"}
              style={({ isActive }) => {
                return isActive ? { color: "yellow" } : {};
              }}
            >
              <div className="flex">
                <div className="pt-1 pr-2">
                  <GrHostMaintenance />
                </div>
                <div>Maintenance</div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
