import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "@src/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
export const podcastApi = createApi({
  reducerPath: "podcast",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    createPodcast: builder.mutation({
      queryFn: async (data) => {
        try {
          const docData = {
            ...data,
          };
          const docRef = await addDoc(collection(db, "podcasts"), docData);
          console.log(docRef, "this is the docRef");
          return { data: docRef.id };
        } catch (error) {
          return { error: error.message };
        }
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
      invalidatesTags: ["Podcasts"],
    }),
    addEpisodeToPodcast: builder.mutation({
      queryFn: async (data) => {
        try {
          const docData = {
            ...data,
          };
          const docRef = await addDoc(collection(db, "episodes"), docData);
          console.log(docRef.id, "episode uploaded");
          return { data: docRef.id };
        } catch (error) {
          return { error: error.message };
        }
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
      invalidatesTags: ["Podcasts"],
    }),
    getPodcastEpisodes: builder.query({
      queryFn: async (podcastId) => {
        try {
          const docRef = collection(db, "episodes");
          const podcastQuery = query(
            docRef,
            where("podcastId", "==", podcastId)
          );
          const querySnapshot = await getDocs(podcastQuery);
          let result = [];
          querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
          });
          return { data: result };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    getPodcast: builder.query({
      queryFn: async (podcastId) => {
        const data = {
          podcast: [],
          episodes: [],
        };
        try {
          const docRef = doc(db, "podcasts", podcastId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            data.podcast = docSnap.data();
          }
        } catch (error) {
          return { error: error.message };
        }
        try {
          const docRef = collection(db, "episodes");
          const podcastQuery = query(
            docRef,
            where("podcastId", "==", podcastId)
          );
          const querySnapshot = await getDocs(podcastQuery);
          let result = [];
          querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
          });
          data.episodes = result;
        } catch (error) {
          return { error: error.message };
        }
        return { data: data };
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
      providesTags: ["Podcasts"],
    }),
    getUserPodcasts: builder.query({
      queryFn: async (userId) => {
        try {
          console.log("is this executing", userId);
          const docRef = collection(db, "podcasts");
          const podcastQuery = query(docRef, where("createdBy", "==", userId));
          const querySnapshot = await getDocs(podcastQuery);
          const result = [];
          querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
          });
          return { data: result };
        } catch (error) {
          return { error: error.message };
        }
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
      providesTags: ["Podcasts"],
    }),
    getAllPodcasts: builder.query({
      queryFn: async () => {
        try {
          console.log("get all podcasts");
          const docRef = collection(db, "podcasts");
          const querySnapshot = await getDocs(docRef);
          let result = [];
          querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
          });
          return { data: result };
        } catch (error) {
          return { error: error.message };
        }
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
      providesTags: ["Podcasts"],
    }),
    addToSubscription: builder.mutation({
      queryFn: async (userId, podcastId) => {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            await updateDoc(docRef, {
              subscriptions: arrayUnion(podcastId),
            });
          } else {
            const docRef = doc(db, "users", userId);
            await addDoc(docRef, {
              subscriptions: [podcastId],
            });
          }
        } catch (error) {
          return { error: error.message };
        }
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
      invalidatesTags: ["subscriptions"],
    }),
    removePodcastFromSubscription: builder.mutation({
      queryFn: async (userId, podcastId) => {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            await updateDoc(docRef, {
              subscriptions: arrayRemove(podcastId),
            });
          } else {
            return { error: "No subscriptions found" };
          }
        } catch (error) {
          return { error: error.message };
        }
      },
      invalidatesTags: ["subscriptions"],
    }),
    getUserSubscriptions: builder.query({
      queryFn: async (userId) => {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const docData = docSnap.data();
            return { data: docData.subscriptions };
          } else {
            return { error: "No subscriptions found" };
          }
        } catch (error) {
          return { error: error.message };
        }
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
      providesTags: "subscriptions",
    }),
  }),
});

export const {
  useAddEpisodeToPodcastMutation,
  useCreatePodcastMutation,
  useGetAllPodcastsQuery,
  useGetPodcastQuery,
  useGetUserPodcastsQuery,
  useGetUserSubscriptionsQuery,
  useAddToSubscriptionMutation,
  useRemovePodcastFromSubscriptionMutation,
  useGetPodcastEpisodesQuery,
} = podcastApi;
