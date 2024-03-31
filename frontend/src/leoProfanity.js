import filter from 'leo-profanity';

const initLeoprofanity = () => {
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));
};

export default initLeoprofanity;
