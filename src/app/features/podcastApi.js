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
      queryFn: async (userId, data) => {
        try {
          const docData = {
            createdBy: userId,
            ...data,
          };
          const docRef = await addDoc(collection(db, "podcasts"), docData);
          console.log(docRef, "this is the docRef");
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
      queryFn: async (userId, data) => {
        try {
          const docData = {
            createdBy: userId,
            ...data,
          };
          const docRef = await addDoc(collection(db, "episodes"), docData);
          console.log(docRef, "this is the docRef");
        } catch (error) {
          return { error: error.message };
        }
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
    }),
    getPodcast: builder.query({
      queryFn: async (podcastId) => {
        try {
          console.log(podcastId);
          const docRef = doc(db, "podcasts", podcastId);
          const docSnap = await getDoc(docRef);
          console.log(docSnap, "this is the docSnap");
          if (docSnap.exists()) {
            console.log(docSnap.data(), "this is the docSnap data");
            return docSnap.data();
          }
        } catch (error) {
          return { error: error.message };
        }
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
    }),
    getUserPodcasts: builder.query({
      queryFn: async (userId) => {
        try {
          const docRef = collection(db, "podcasts");
          const podcastQuery = query(docRef, where("createdBy", "==", userId));
          const docSnap = await getDoc(podcastQuery);
          console.log(docSnap, "this is the docSnap");
          if (docSnap.exists()) {
            console.log(docSnap.data(), "this is the docSnap data");
            return docSnap.data();
          }
        } catch (error) {
          return { error: error.message };
        }
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
    }),
    getAllPodcasts: builder.query({
      queryFn: async () => {
        try {
          console.log("get all podcasts");
          const docRef = collection(db, "podcasts");
          const querySnapshot = await getDocs(docRef);
          let result = [];
          querySnapshot.forEach((doc) => {
            result.push(doc.data());
          });
          return result;
        } catch (error) {
          return { error: error.message };
        }
      },
      transformResponse: (response) => {
        console.log(response, "this is the response");
        return response.data;
      },
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
    }),
    getUserSubscriptions: builder.query({
      queryFn: async (userId) => {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const docData = docSnap.data();
            return docData.subscriptions;
          } else {
            return { error: "No subscriptions found" };
          }
        } catch (error) {
          return { error: error.message };
        }
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
