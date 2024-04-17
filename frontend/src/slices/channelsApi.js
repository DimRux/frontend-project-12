import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const channelsApi = createApi({
  reducerPath: 'tasks',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/channels' }),
  endpoints: (builder) => ({
    addChannel: builder.mutation({
      query: (token, channel) => ({
        method: 'POST',
        body: channel,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    editChannel: builder.mutation({
      query: (token, name, id) => ({
        method: 'PATCH',
        body: { name },
        url: id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    removeChannel: builder.mutation({
      query: (token, name, id) => ({
        method: 'DELETE',
        url: id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
export default channelsApi;
