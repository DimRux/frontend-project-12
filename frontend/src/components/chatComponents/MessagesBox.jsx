import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Messages from './Messages';
import FormMessage from './FormMessage';
import Spinner from './Spinner';

const MessagesBox = () => {
  const { t } = useTranslation();
  const allChannels = useSelector((state) => state.channels);
  const allMessages = useSelector((state) => state.messages);
  const [activeChannel] = allChannels.channels
    .filter(({ id }) => id === allChannels.activeChannelId);
  if (!activeChannel) {
    return <Spinner />;
  }
  const messagesCount = allMessages.messages
    .filter(({ channelId }) => channelId === activeChannel.id).length;
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
