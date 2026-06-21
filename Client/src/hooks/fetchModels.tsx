import { url } from "../data/Api";

export async function fetchModels(setModels: React.Dispatch<React.SetStateAction<any[]>>, selectedMake: string, selectedYear: string) {
  try {
    const response = await fetch(
      `${url}/getModels?make=${selectedMake}&year=${selectedYear}`
    );

    if (!response.ok) {
      throw new Error(`Error! Response status: ${response.status}`);
    }

    const result = await response.json();
    setModels(result.data);
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unknown error occurred');
  }
}
