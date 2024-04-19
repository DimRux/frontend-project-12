import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useGetMessagesQuery } from '../../slices/messageApi';
import { useGetChannelsQuery } from '../../slices/channelsApi';
import Messages from './Messages';
import FormMessage from './FormMessage';
import Spinner from './Spinner';

const MessagesBox = () => {
  const allChannels = useSelector((state) => state.channels);
  const { t } = useTranslation();
  const { data: allMessages } = useGetMessagesQuery(undefined);
  const { data: channels } = useGetChannelsQuery(undefined);
  if (!channels) {
    return <Spinner />;
  }

  if (!allMessages) {
    return null;
  }

  const [activeChannel] = channels
    .filter(({ id }) => id === String(allChannels.activeChannelId));

  const messagesCount = allMessages
    .filter(({ channelId }) => channelId === activeChannel.id).length;
  console.log(activeChannel);
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
