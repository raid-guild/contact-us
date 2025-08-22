/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { CONSULTATIONS_CREATE_MUTATION } from "@/lib/queries";
import client from "@/lib/gql-client";

const useCreateConsults = (token: string) => {
  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (data: any) => {
      return client({ token }).request(CONSULTATIONS_CREATE_MUTATION, {
        consultations: { ...data },
      });
    },
    onSuccess: (data: any) => {
      console.log("success", data);
    },
    onError: (error: any) => {
      console.log("error", error);
    },
  });
  return { mutate, mutateAsync, isPending, isError, isSuccess };
};

export default useCreateConsults;
