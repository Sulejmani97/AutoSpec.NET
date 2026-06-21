import { url } from "../data/Api";

export async function fetchMakes(setMakes: (makes: any[]) => void) {
  try {
    const response = await fetch(`${url}/addVehicle`);

    if (!response.ok) {
      throw new Error(`Error! Response status: ${response.status}`);
    }

    const result = await response.json();
    setMakes(result.data);
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unknown error occurred');
  }
}
