const ru = {
  translation: {
    nav: {
      logo: 'Hexlet Chat',
      button: 'Выйти',
    },
    singUp: {
      h1: 'Регистрация',
      name: 'Имя пользователя',
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
      postFeedback: 'Канал добавлен',
      buttonAdd: 'Отправить',
      buttonClose: 'Отменить',
    },
    editChannelModal: {
      title: 'Переименовать канал',
      name: 'Имя канала',
      postFeedback: 'Канал изменен',
      buttonAdd: 'Отправить',
      buttonClose: 'Отменить',
    },
    removeChannelModal: {
      title: 'Удалить канал',
      postFeedback: 'Канал удален',
      p: 'Уверены?',
      buttonAdd: 'Удалить',
      buttonClose: 'Отменить',
    },
    channelUser: {
      delEdit: 'Удалить/Переименовать',
      del: 'Удалить',
      edit: 'Изменить',
    },
    formMessage: 'Введите сообщение...',
    errors: {
      singUp: {
        name: 'от 3 до 20 символов',
        password: 'не менее 6 символов',
        confirmPassword: 'Пароли должны совпадать',
        axios: 'Такой пользователь уже существует',
      },
      logIn: 'Неверное имя пользователя или пароль',
      addChannelModal: {
        name: {
          req: 'Обязательное поле',
          minMax: 'от 3 до 20 символов',
          uniq: 'Должно быть уникальным',
        },
      },
      editChannelModal: {
        name: {
          req: 'Обязательное поле',
          minMax: 'от 3 до 20 символов',
          uniq: 'Должно быть уникальным',
        },
      },
      network: 'Ошибка сети',
    },
  },
};

export default ru;
