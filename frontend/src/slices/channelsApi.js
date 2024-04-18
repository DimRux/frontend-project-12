import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

const channelsApi = createApi({
  reducerPath: 'channelApi',
  baseQuery: fetchBaseQuery({ baseUrl: routes.channelsApiPath }),
  endpoints: (builder) => ({
    addChannel: builder.mutation({
      query: ({ token, name }) => ({
        method: 'POST',
        body: name,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    editChannel: builder.mutation({
      query: ({ token, name, id }) => ({
        method: 'PATCH',
        body: name,
        url: id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteChannel: builder.mutation({
      query: ({ token, id }) => ({
        method: 'DELETE',
        url: id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addMessage: builder.mutation({
      query: ({ token, id }) => ({
        method: 'POST',
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
  useDeleteChannelMutation,
} = channelsApi;
export default channelsApi;
