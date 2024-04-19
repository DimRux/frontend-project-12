import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../slices/messageApi';

const Messages = () => {
  const activeChannel = useSelector((state) => state.channels.activeChannelId);
  const { data } = useGetMessagesQuery(undefined);
  console.log(data);
  if (!data) {
    return null;
  }

  const messages = data.filter(({ channelId }) => channelId === activeChannel);

  return (
    messages.map(({ body, username, id }) => (
      <div key={id} className="text-breack mb-2">
        <b>{username}</b>
        {': '}
        {body}
      </div>
    ))
  );
};

export default Messages;
