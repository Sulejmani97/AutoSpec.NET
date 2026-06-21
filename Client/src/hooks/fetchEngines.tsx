import { url } from "../data/Api";

interface Engine {
  id: string;
  trim_description: string;
}

export async function fetchEngines(
  setEngines: React.Dispatch<React.SetStateAction<Engine[]>>,
  selectedMake: string,
  selectedModel: string,
  selectedYear: string
) {
  console.log(
    "Fetching engines for:",
    selectedMake,
    selectedModel,
    selectedYear
  );
  try {
    const response = await fetch(
      `${url}/getEngines?make=${selectedMake}&model=${selectedModel}&year=${selectedYear}`
    );

    if (!response.ok) {
      throw new Error(`Error! Response status: ${response.status}`);
    }

    const result = await response.json();
    setEngines(result.data);
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unknown error occurred');
  }
}
