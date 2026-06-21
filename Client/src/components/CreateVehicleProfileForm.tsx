import { Button, Input } from "@material-tailwind/react";
import { useState, FormEvent } from "react";
import { fetchModels } from "../hooks/fetchModels";
import { fetchEngines } from "../hooks/fetchEngines";
import { createVehicleProfile } from "../hooks/createVehicleProfile";
import { fetchProfilePicture } from "../hooks/fetchProfilePicture";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

// Type definitions
interface Make {
  id: string;
  name: string;
}

interface Model {
  id: string;
  make_id: string;
  make: string;
  name: string;
}

interface Engine {
  id: string;
  trim_description: string;
}

interface SelectOption {
  value: string | number;
  label: string | number;
}

interface CreateVehicleProfileFormProps {
  makes: Make[];
}

export default function CreateVehicleProfileForm({
  makes,
}: CreateVehicleProfileFormProps) {
  const navigate = useNavigate();

  const [models, setModels] = useState<Model[]>([
    { id: "", make_id: "", make: "", name: "Model" },
  ]);
  const [engines, setEngines] = useState<Engine[]>([
    { id: "", trim_description: "Engine" },
  ]);

  const years = [2015, 2016, 2017, 2018, 2019, 2020];

  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedTrim, setSelectedTrim] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [mileage, setMileage] = useState<string>("");
  const [YearMenuOpen, setYearMenuOpen] = useState<boolean>(false);
  const [ModelMenuOpen, setModelMenuOpen] = useState<boolean>(false);
  const [EngineMenuOpen, setEngineMenuOpen] = useState<boolean>(false);

  function handleMakeChange(selectedMake: SelectOption | null): void {
    if (selectedMake) {
      setSelectedMake(selectedMake.value as string);
    }
  }

  function handleYearChange(selectedYear: SelectOption | null): void {
    if (selectedYear && selectedMake) {
      setSelectedYear(selectedYear.value as number);
      fetchModels(setModels, selectedMake, selectedYear.value.toString());
    }
  }

  function handleModelChange(selectedModel: SelectOption | null): void {
    if (selectedModel && selectedMake && selectedYear) {
      setSelectedModel(selectedModel.value as string);
      fetchEngines(
        setEngines,
        selectedMake,
        selectedModel.value as string,
        selectedYear.toString()
      );
    }
  }

  function handleTrimChange(selectedTrim: SelectOption | null): void {
    if (selectedTrim) {
      setSelectedTrim(selectedTrim.value as string);
    }
  }

  function goToProfilesPage(): void {
    navigate("/Profiles");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (!selectedMake || !selectedModel || !selectedYear) {
      console.error("Please select all required vehicle information");
      return;
    }

    const pictureURL = await fetchProfilePicture(
      selectedMake,
      selectedModel,
      selectedYear.toString(),
      color
    );

    const profile = {
      selectedMake,
      selectedYear,
      selectedModel,
      selectedTrim,
      name,
      color,
      mileage,
      pictureURL,
    };

    await createVehicleProfile(profile);

    goToProfilesPage();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-lg shadow-md p-6 m-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Vehicle Information
        </h1>
        <div className="grid grid-cols-4 p-5 mx-52">
          {/* Start of Make select */}
          <div className="pr-5">
            <Select<SelectOption>
              className="cursor-pointer"
              defaultValue={
                selectedMake
                  ? { value: selectedMake, label: selectedMake }
                  : null
              }
              onChange={handleMakeChange}
              placeholder="1 | Make"
              onMenuClose={() => setYearMenuOpen(true)}
              options={makes?.map((make: Make) => ({
                value: make.name,
                label: make.name,
              }))}
            />
          </div>
          {/* End of Make */}

          {/* Start of Year select */}
          <div className="pr-5">
            <Select<SelectOption>
              className="cursor-pointer"
              defaultValue={
                selectedYear
                  ? { value: selectedYear, label: selectedYear }
                  : null
              }
              menuIsOpen={YearMenuOpen}
              onChange={handleYearChange}
              placeholder="2 | Year"
              onMenuClose={() => {
                setModelMenuOpen(true);
                setYearMenuOpen(false);
              }}
              options={years?.map((year: number) => ({
                value: year,
                label: year,
              }))}
            />
            <br />
          </div>
          {/* End of year select */}

          {/* Start of Model select */}
          <div className="pr-5">
            <Select<SelectOption>
              className="cursor-pointer"
              defaultValue={
                selectedModel
                  ? { value: selectedModel, label: selectedModel }
                  : null
              }
              menuIsOpen={ModelMenuOpen}
              onChange={handleModelChange}
              placeholder="3 | Model"
              onMenuClose={() => {
                setEngineMenuOpen(true);
                setModelMenuOpen(false);
              }}
              options={models?.map((model: Model) => ({
                value: model.name,
                label: model.name,
              }))}
            />
          </div>
          {/* End of Model select */}
          {/* Start of Engine/Trim select */}
          <div>
            <Select<SelectOption>
              className="cursor-pointer"
              defaultValue={
                selectedTrim
                  ? { value: selectedTrim, label: selectedTrim }
                  : null
              }
              menuIsOpen={EngineMenuOpen}
              onMenuClose={() => setEngineMenuOpen(false)}
              onChange={handleTrimChange}
              placeholder="4 | Engine/Trim"
              options={engines?.map((engine: Engine) => ({
                value: engine.trim_description,
                label: engine.trim_description,
              }))}
            />
          </div>
          {/* End of Engine/Trim selection */}
        </div>

        {/* text input section */}
        <div className="grid grid-cols-3 gap-6 mx-52 px-5 mb-10">
          <div>
            <Input
              title="name"
              label="Name"
              type="text"
              required
              className="border border-black indent-1 w-full"
              onChange={(e) => setName(e.target.value)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div>
            <Input
              title="color"
              label="Color"
              type="text"
              required
              className="border border-black indent-1 w-full"
              onChange={(e) => setColor(e.target.value)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <div>
            <Input
              title="mileage"
              label="Mileage"
              type="number"
              required
              className="border border-black indent-1 w-full"
              onChange={(e) => {
                setMileage(e.target.value);
              }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>

        <div className="flex p-5 justify-center">
          <Button
            className="w-full mx-52"
            type="submit"
            variant="filled"
            color="green"
            placeholder=""
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
