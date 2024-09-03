import { useQuery } from "react-query";
import { axiosRequest } from "../service";

// Fetch classes from the API
const fetchClasses = async () => {
  const response = await axiosRequest("get", "/api/v1/expenditure/");
  return response.data; // Ensure to return data directly
};

export const useFetchClasses = () => {
  return useQuery("classes", fetchClasses);
};

const fetchSubclassesByClassExp = async (classExp) => {
  console.log("Fetching subclasses for classExp:", classExp); // Debugging line
  if (!classExp) {
    throw new Error("classExp is required");
  }
  const response = await axiosRequest("get", `/api/v1/expenditure/class/${classExp}/`);
  return response.data; // Ensure to return data directly
};
export const useFetchSubclasses = (classExp) => {
  return useQuery(
    ['subclasses', classExp], // Query key
    () => fetchSubclassesByClassExp(classExp), // Query function
    {
      enabled: !!classExp, // Only fetch if classExp is not null or undefined
      refetchOnWindowFocus: true,
      refetchOnMount : true,
      refetchIntervalInBackground : 2000, // Refetch on window focus
      retry: 3, // Retry up to 3 times on failure
    }
  );
};