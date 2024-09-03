// src/function/useExpenditureMutationAsync.js

import { useQueryClient, useMutation } from 'react-query';
import { axiosRequest } from '../service';

const useExpenditureMutationAsync = (request, queryKeys = []) => {
  const queryClient = useQueryClient();

  const mutationAsync = useMutation(
    async (data) => {
      const response = await axiosRequest(request.method, request.url, data);
      return response;
    },
    {
      onSuccess: (data) => {
        if (request.method === "patch") {
          queryClient.setQueryData(queryKeys, data);
        } else {
          queryClient.invalidateQueries(queryKeys);
        }
      },
      onError: (error) => {
        console.error("Error in mutation:", error);
      },
    }   
  );

  return { mutationAsync };
};

export default useExpenditureMutationAsync;
