import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({ baseUrl: routes.messagesApiPath }),
  endpoints: (builder) => ({
    addMessage: builder.mutation({
      query: ({ token, newMessage }) => ({
        method: 'POST',
        body: newMessage,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useAddMessageMutation } = messageApi;
export default messageApi;
