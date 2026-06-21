import { url } from "../data/Api";

export async function fetchProfilePicture(
  selectedMake: string,
  selectedModel: string,
  selectedYear: string,
  color: string
): Promise<string | undefined> {
  let pictureUrl;

  try {
    const response = await fetch(
      `${url}/getProfilePhoto?make=${selectedMake}&model=${selectedModel}&year=${selectedYear}&color=${color}`
    );
    if (!response.ok) {
      throw new Error(`Error! Response status: ${response.status}`);
    }

    const result = await response.json();
    pictureUrl = result.photos[0].src.original;
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'An unknown error occurred');
  }

  return pictureUrl;
}
