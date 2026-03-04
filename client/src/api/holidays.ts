import axios from "axios";
import { Holiday } from "../types/index.js";

const NAGER_API = "https://date.nager.at/api/v3";

export async function fetchHolidays(
  year: number,
  countryCode: string
): Promise<Holiday[]> {
  const { data } = await axios.get<Holiday[]>(
    `${NAGER_API}/PublicHolidays/${year}/${countryCode}`
  );
  return data;
}

export async function fetchAvailableCountries(): Promise<
  { countryCode: string; name: string }[]
> {
  const { data } = await axios.get<{ countryCode: string; name: string }[]>(
    `${NAGER_API}/AvailableCountries`
  );
  return data;
}
