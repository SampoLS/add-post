import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const postsApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  // Global configuration for the api.
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getPosts: builder.query({
      // The arg passed in the query callback used to generate the url.
      query: () => '/posts',
      // configuration for an individual endpoint, overriding the api setting.
      keepUnusedDataFor: 40
    }),
    addPost: builder.mutation({
      query: (data) => {
        return {
          url: `/posts`,
          method: 'POST',
          body: data
        }
      }
    }),
    deletePost: builder.mutation({
      query: (id) => {
        return {
          url: `/posts/${id}`,
          method: 'DELETE'
        }
      }
    }),
    updatePost: builder.mutation({
      query: (data) => {
        return {
          url: `/posts/${data.id}`,
          method: 'PUT',
          body: data
        }
      }
    })
  })
})

// background fetching, the results mustated will be promise.
export const {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation
} = postsApi;