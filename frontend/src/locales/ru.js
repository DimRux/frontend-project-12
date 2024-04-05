const ru = {
  translation: {
    nav: {
      logo: 'Hexlet Chat',
      button: 'Выйти',
    },
    singUp: {
      h1: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      button: 'Зарегистрироваться',
    },
    logIn: {
      h1: 'Войти',
      name: 'Ваш ник',
      password: 'Пароль',
      button: 'Войти',
      footer: {
        span: 'Нет аккаунта? ',
        a: 'Регистрация',
      },
    },
    chat: {
      channels: 'Каналы',
      counter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },
    addChannelModal: {
      title: 'Добавить канал',
      name: 'Имя канала',
      postFeedback: 'Канал создан',
      buttonAdd: 'Отправить',
      buttonClose: 'Отменить',
    },
    editChannelModal: {
      title: 'Переименовать канал',
      name: 'Имя канала',
      postFeedback: 'Канал переименован',
      buttonAdd: 'Отправить',
      buttonClose: 'Отменить',
    },
    removeChannelModal: {
      title: 'Удалить канал',
      postFeedback: 'Канал удалён',
      p: 'Уверены?',
      buttonAdd: 'Удалить',
      buttonClose: 'Отменить',
    },
    channelUser: {
      delEdit: 'Управление каналом',
      del: 'Удалить',
      edit: 'Переименовать',
    },
    formMessage: 'Введите сообщение...',
    errors: {
      singUp: {
        username: 'От 3 до 20 символов',
        password: 'Не менее 6 символов',
        confirmPassword: 'Пароли должны совпадать',
        axios: 'Такой пользователь уже существует',
      },
      logIn: 'Неверные имя пользователя или пароль',
      addChannelModal: {
        name: {
          req: 'Обязательное поле',
          minMax: 'От 3 до 20 символов',
          uniq: 'Должно быть уникальным',
        },
      },
      editChannelModal: {
        name: {
          req: 'Обязательное поле',
          minMax: 'От 3 до 20 символов',
          uniq: 'Должно быть уникальным',
        },
      },
      network: 'Ошибка соединения',
    },
  },
};

export default ru;
