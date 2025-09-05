import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { PersonDto, CreatePersonDto } from "../types/person";
import {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
} from "../api/person-api";

export function usePersons() {
  return useQuery<PersonDto[]>({
    queryKey: ["persons"],
    queryFn: getPersons,
  });
}

export function usePerson(id: number) {
  return useQuery<PersonDto>({
    queryKey: ["person", id],
    queryFn: () => getPerson(id),
    enabled: !!id,
  });
}

export function useCreatePerson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (person: CreatePersonDto) => createPerson(person),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["persons"] });
    },
  });
}

export function useUpdatePerson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) =>
      updatePerson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["persons"] });
    },
  });
}

export function useDeletePerson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePerson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["persons"] });
    },
  });
}
