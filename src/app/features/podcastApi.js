import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const podcastApi = createApi({
  reducerPath: "podcast",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    createPodcast: builder.mutation({
      queryFn: async (userId) => {
        console.log(userId);
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
    }),
    addEpisodeToPodcast: builder.mutation({
      queryFn: async (userId, podcastId) => {
        console.log(userId, podcastId);
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
    }),
    getPodcast: builder.query({
      queryFn: async (podcastId) => {
        console.log(podcastId);
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
    }),
    getUserPodcasts: builder.query({
      queryFn: async (userId) => {
        console.log(userId);
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
    }),
    getAllPodcasts: builder.query({
      queryFn: async () => {
        console.log("get all podcasts");
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
    }),
  }),
});

export const {
  useAddEpisodeToPodcastMutation,
  useCreatePodcastMutation,
  useGetAllPodcastsQuery,
  useGetPodcastQuery,
  useGetUserPodcastsQuery,
} = podcastApi;
