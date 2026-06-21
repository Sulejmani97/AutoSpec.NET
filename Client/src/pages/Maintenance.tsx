import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import createMaintenanceRecord from "../hooks/createMaintenanceRecord";
import fetchMaintenanceRecords from "../hooks/fetchMaintenanceRecords";
import deleteMaintenanceRecord from "../hooks/deleteMaintenanceRecord";
import {
  Select,
  Option,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";

export interface MaintenanceRecord {
  MaintenanceID: number;
  Type: string;
  Date: string;
  Cost: number;
  Brand: string;
  Notes: string;
  Mileage: number;
}

function Maintenance() {
  const location = useLocation();
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);

  const [maintenanceType, setMaintenanceType] = useState("");
  const [date, setDate] = useState("");
  const [cost, setCost] = useState("");
  const [brand, setBrand] = useState("");
  const [notes, setNotes] = useState("");
  const [mileage, setMileage] = useState("");

  const maintenanceTypes = [
    "Oil Change",
    "Tire Rotation",
    "Brake Service",
    "Air Filter",
    "Transmission Service",
    "Battery Replacement",
    "Other",
    "Suspension Service",
  ];

  async function loadRecords() {
    try {
      await fetchMaintenanceRecords(
        location.state.VehicleProfileID,
        setRecords
      );
    } catch (error) {
      console.error("Error loading maintenance records:", error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    loadRecords();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const record = {
      VehicleProfileID: location.state.VehicleProfileID,
      maintenanceType,
      date,
      cost: parseFloat(cost),
      brand,
      notes,
      mileage: parseInt(mileage),
    };

    await createMaintenanceRecord(record);
    loadRecords();
  }

  return (
    <div className="flex h-full">
      <SideBar profile={location.state} />
      <div className="flex-1 p-8 ml-64">
        <h2 className="text-2xl font-bold mb-6">Maintenance Records</h2>

        {/* Add New Record Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Add New Record</h3>
            <div className="grid grid-cols-2 gap-6">
              <Select
                label="Maintenance Type"
                value={maintenanceType}
                onChange={(val) => setMaintenanceType(val || "")}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {maintenanceTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>

              <Input
                type="date"
                label="Date"
                onChange={(e) => setDate(e.target.value)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />

              <Input
                type="number"
                label="Cost ($)"
                onChange={(e) => setCost(e.target.value)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Input
                type="number"
                label="Mileage"
                onChange={(e) => setMileage(e.target.value)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />

              <Input
                type="text"
                label="Brand/Parts Used"
                onChange={(e) => setBrand(e.target.value)}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />

              <div className="col-span-2">
                <Textarea
                  label="Notes"
                  onChange={(e) => setNotes(e.target.value)}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              </div>

              <Button
                className="col-span-2"
                color="green"
                type="submit"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Add Record
              </Button>
            </div>
          </div>
        </form>

        {/* Records List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Maintenance History</h3>
          <div className="space-y-4">
            {records.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No maintenance records found
              </p>
            ) : (
              records?.map((record) => (
                <div
                  key={record.MaintenanceID}
                  className="border-b border-gray-200 pb-4 last:border-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{record.Type}</h4>
                      <p className="text-sm text-gray-600">
                        Date: {new Date(record.Date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Cost: ${record.Cost}
                      </p>
                      <p className="text-sm text-gray-600">
                        Brand: {record.Brand}
                      </p>
                      <p className="text-sm text-gray-600">
                        Mileage: {record.Mileage}
                      </p>
                      {record.Notes && (
                        <p className="text-sm text-gray-600 mt-2">
                          Notes: {record.Notes}
                        </p>
                      )}
                    </div>
                    <Button
                      color="red"
                      size="sm"
                      variant="text"
                      className="p-2"
                      onClick={async () => {
                        await deleteMaintenanceRecord(record.MaintenanceID);
                        loadRecords();
                      }}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
