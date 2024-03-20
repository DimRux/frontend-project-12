import { Formik, useFormik } from 'formik';
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PlusSquare, ArrowRightSquare } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { initMessages, addMessage } from './slices/messagesSlice';
import { initChannels, changeChannelId, addChannel, editChannel } from './slices/channelsSlice';
import { Form, Button, InputGroup, Modal, ButtonGroup, Dropdown } from 'react-bootstrap';
import imageLogin from './images/page-login1.jpg';
import { AuthorizationContext } from './context/AuthorizationContext';

const Messages = () => {
  const dispatch = useDispatch();
  const { getToken, socket } = useContext(AuthorizationContext);
  const token = getToken();
  const activeChannel = useSelector((state) => state.channels.activeChannelId);
  const allMessages = useSelector((state) => state.messages);
  const messages = allMessages.messages.filter(({ channelId }) => channelId === activeChannel);

  useEffect(() => {
    const requestData = async () => {
      const data = await axios.get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(initMessages(data.data));
    };
    if (token) {
      requestData();
    }
  }, []);

  const handleNewMessage = (message) => {
    const existingMessage = allMessages.messages.find((m) => m.id === message.id);
    if (!existingMessage) {
      dispatch(addMessage(message));
    }
  };

  useEffect(() => {
    socket.on('newMessage', handleNewMessage);
    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, allMessages]);



  return (
    messages.map(({ body, username }) => (
      <div className='text-breack mb-2'>
        <b>{username}</b>
        {': '}
        {body}
      </div>
    ))
  );
}

const FormMessage = () => {
  const { getToken, getUsername } = useContext(AuthorizationContext);
  const channelId = useSelector((state) => state.channels.activeChannelId);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async ({ body }) => {
      const newMessage = { body, channelId, username: getUsername() };
      await axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
    },
  });

  return (
    <Form noValidate className="py-1 rounded-2" onSubmit={formik.handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          name="body"
          onChange={formik.handleChange}
          value={formik.values.body}
          placeholder="Введите сообщение..."
          aria-label="Введите сообщение"
        />
        <Button variant="group-vertical" type="submit">
          <ArrowRightSquare size={20} />
          <span className="visually-hidden" />
        </Button>
      </InputGroup>
    </Form>
  )
}

const ChanelServer = ({ name, id }) => {
  const dispatch = useDispatch();

  const changeChannel = () => dispatch(changeChannelId({ activeChannelId: id}));
  

  return (
    <li className='nav-item w-100'>
      <Button
        onClick={changeChannel}
        type="button"
        className="w-100 rounded-0 text-start btn btn-secondary"
      >
        <span className="me-1">#</span>
        {name}
      </Button>
    </li>
  )
}

const ChanelUser = ({ name, id, setModalVariant }) => {
  const dispatch = useDispatch();

  const changeChannel = () => dispatch(changeChannelId({ activeChannelId: id}));
  const renameChannel = () => setModalVariant('editChannel');

  return (
    <li className='nav-item w-100'>
    <Dropdown as={ButtonGroup} className="d-flex" onClick={changeChannel}>
        <Button
          type="button"
          className="w-100 rounded-0 text-start text-truncate btn"
          variant={'secondary'}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
        
          
            <Dropdown.Toggle
              split
              className="flex-grow-0"
              variant={'secondary'}
            >
              <span className="visually-hidden">
                Удалить/Переименовать
              </span>
            </Dropdown.Toggle>
            
            <Dropdown.Menu>
              <Dropdown.Item >
                Удалить
              </Dropdown.Item>
              <Dropdown.Item onClick={renameChannel}>
                Изменить
              </Dropdown.Item>
            </Dropdown.Menu>
          
      </Dropdown>
    </li>
  )
}

const EditChannelModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.channels.activeChannelId);
  const channels = useSelector((state) => state.channels.channels);
  const { getToken } = useContext(AuthorizationContext);
  const token = getToken();
  

  const signupSchema = Yup.object().shape({
    name: Yup.string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'от 3 до 20 символов')
    .max(20, 'от 3 до 20 символов')
    .notOneOf(channels.map(({ name }) => name), 'Должно быть уникальным'),
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Переименовать канал</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={signupSchema}
          onSubmit={async (values) => {
            const { name } = values;
            const response = await axios.patch(`/api/v1/channels/${channelId}`, { name }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              });
              console.log(response);
              dispatch(editChannel(response.data));
              handleClose();
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="name"
                  className="mb-2"
                  autoFocus="true"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={errors.name}
                />
                <label className="visually-hidden" htmlFor="name">
                  Имя канала
                </label>
                {errors.name ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  className="me-2"
                  variant="secondary"
                  type="button"
                  onClick={handleClose}
                >
                  Отменить
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                >
                  Отправить
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

const ModalWindow = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const { getToken } = useContext(AuthorizationContext);
  const token = getToken();
  

  const signupSchema = Yup.object().shape({
    name: Yup.string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'от 3 до 20 символов')
    .max(20, 'от 3 до 20 символов')
    .notOneOf(channels.map(({ name }) => name), 'Должно быть уникальным'),
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={signupSchema}
          onSubmit={async (values) => {
            const { name } = values;
            const response = await axios.post('/api/v1/channels', { name }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              });
              const newChannel = { channel: response.data, activeChannelId: response.data.id };
              dispatch(addChannel(newChannel))
              handleClose();
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="name"
                  className="mb-2"
                  autoFocus="true"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={errors.name}
                />
                <label className="visually-hidden" htmlFor="name">
                  Имя канала
                </label>
                {errors.name ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  className="me-2"
                  variant="secondary"
                  type="button"
                  onClick={handleClose}
                >
                  Отменить
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                >
                  Отправить
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getToken } = useContext(AuthorizationContext);
  const token = getToken();
  const [modalVariant, setModalVariant] = useState('addChannel');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setModalVariant('addChannel');
    setShow(true);
  }


  useEffect(() => {
    const isAuthenticated = getToken();
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [getToken, navigate]);

  useEffect(() => {
    const requestData = async () => {
      const data = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newChannels = { channels: data.data, activeChannelId: data.data[0].id };
      dispatch(initChannels(newChannels));
    };
    if (token) {
      requestData();
    }
    
  }, [token, dispatch]);

  const allChannels = useSelector((state) => state.channels);
  const allMessages = useSelector((state) => state.messages);
  const [ activeChannel ] = allChannels.channels.filter(({ id }) => id === allChannels.activeChannelId);
  if (!activeChannel) {
    return <div className="spinner-border" role="status" />
  }
  const messagesCount = allMessages.messages.filter(({ channelId }) => channelId === activeChannel.id).length;
  const channelActive = activeChannel.name;
  const headChatMessage = `# ${channelActive}`;

  const renderModal = () => {
    if (modalVariant === 'addChannel') {
      return <ModalWindow show={show} handleClose={handleClose} />;
    }
    if (modalVariant === 'editChannel') {
      return <EditChannelModal show={show} handleClose={handleClose} />;
    }
  };

  return (
    <div className='h-100'>
      <div className='h-100' id="chat">
        <div className='d-flex flex-column h-100'>
          <div className='container h-100 my-4 overflow-hidden rounded shadow'>
            <div className='row h-100 bg-white flex-md-row'>
              <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
                <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                  <b>Каналы</b>
                  <Button
                    type="button"
                    variant="group-vertical"
                    className="p-0 text-primary"
                    onClick={handleShow}
                    >
                    <PlusSquare size={20} />
                    <span className="visually-hidden">+</span>
                  </Button>
                </div>
                <ul className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block' id='channels-box'>
                  {allChannels.channels.map(({ name, removable, id }) => removable ? <ChanelUser name={name} id={id} key={id} setModalVariant={setModalVariant} />
                  : 
                  <ChanelServer name={name} id={id} key={id} setModalVariant={setModalVariant}/>)}
                </ul>
              </div>
              <div className='col p-0 h-100'>
                <div className='d-flex flex-column h-100'>
                  <div className='bg-light mb-4 p-3 shadow-sm small'>
                    <p className='m-0'>
                      <b>{headChatMessage}</b>
                    </p>
                    <span className='text-muted'>{messagesCount} сообщения</span>
                  </div>
                  <div id='message-box' className='chat-messages overflow-auto px-5'>
                    <Messages />
                  </div>
                  <div className='mt-auto px-5 py-3'>
                    <FormMessage />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderModal()}
    </div>
  )
}

export const LogIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const signupSchema = Yup.object().shape({
    name: Yup.string().required(),
    password: Yup.string().required()
  });

  return  (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={imageLogin}
                  className="rounded-circle"
                  alt="Войти"
                />
              </div>
                <Formik
                  initialValues={{
                    name: '',
                    password: '',
                  }}
                  validationSchema={signupSchema}
                  onSubmit={ async (values) => {
                    try {
                    const { name, password } = values;
                    const response = await axios.post('/api/v1/login', { username: name, password });
                    localStorage.setItem('user', JSON.stringify(response.data));
                    setError('');
                    navigate('/');
                    } catch (e) {
                    setError('Неверное имя пользователя или пароль');
                    } 
                  }}
                >
                  {({ errors, touched, values, handleSubmit, handleChange }) => (
                    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Войти</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        name="name"
                        id="name"
                        autoComplete="name"
                        placeholder="Ваш ник"
                        className="form-control"
                        value={values.name}
                        onChange={handleChange}
                        isValid={touched.name && !errors.name}
                        isInvalid={error !== ''}
                      />
                      <label className="form-label" htmlFor="name">Ваш ник</label>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="password"
                        placeholder="Пароль"
                        className="form-control"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={error !== ''}
                      />
                      {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
                      <label className="form-label" htmlFor="password">Пароль</label>
                    </Form.Group>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="w-100 mb-3"
                    >
                      Войти
                    </Button>
                    </Form>
                  )}
                </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
