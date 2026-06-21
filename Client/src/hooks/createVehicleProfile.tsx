import { url } from "../data/Api";

export async function createVehicleProfile(profile: any) {
  try {
    const response = await fetch(`${url}/createVehicleProfile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    if (!response.ok) {
      console.log(`Error! Status: ${response.status}`);
      return;
    }
  } catch (error) {
    console.log("Couldnt create profile. Error:" + error);
  }
}
