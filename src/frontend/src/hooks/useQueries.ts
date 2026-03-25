import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Article, Project } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllArticles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: async ({
      actor,
      name,
      email,
      message,
    }: {
      actor: any;
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitContactForm(name, email, message);
    },
  });
}
