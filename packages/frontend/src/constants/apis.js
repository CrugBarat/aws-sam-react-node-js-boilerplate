export const API_URLS = {
  getExamples:
    process.env.NODE_ENV === 'development'
      ? '/api/examples'
      : '/prod/api/examples',
};
