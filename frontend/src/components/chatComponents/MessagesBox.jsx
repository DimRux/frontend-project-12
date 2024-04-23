import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useGetMessagesQuery } from '../../slices/messageApi';
import { useGetChannelsQuery } from '../../slices/channelsApi';
import Messages from './Messages';
import FormMessage from './FormMessage';
import Spinner from './Spinner';

const MessagesBox = () => {
  const allChannels = useSelector((state) => state.channels.activeChannelId);
  const { t } = useTranslation();
  const { data: allMessages, isLoading: messagesLoading } = useGetMessagesQuery();
  const { data: channels, isLoading } = useGetChannelsQuery();
  if (isLoading || messagesLoading) {
    return <Spinner />;
  }

  console.log(channels);
  const [activeChannel] = channels
    .filter(({ id }) => {
      console.log('id', id);
      console.log('allChannels', allChannels);
      return id === allChannels;
    });

  console.log(channels);
  console.log(allChannels);
  const messagesCount = allMessages
    .filter(({ channelId }) => String(channelId) === activeChannel.id).length;
  const channelActive = activeChannel.name;
  const headChatMessage = `# ${channelActive}`;

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{headChatMessage}</b>
          </p>
          <span className="text-muted">
            {t('chat.counter.count', { count: messagesCount })}
          </span>
        </div>
        <div id="message-box" className="chat-messages overflow-auto px-5">
          <Messages />
        </div>
        <div className="mt-auto px-5 py-3">
          <FormMessage />
        </div>
      </div>
    </div>
  );
};

export default MessagesBox;
