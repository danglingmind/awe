import { CounterContextProvider } from "@/app/(context)/context/sample";

// Ordered list of all the providers
const providerList = [CounterContextProvider];

export default function providers() {
  return providerList;
}
