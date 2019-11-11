const authToken = require('./authToken').authToken;

const getRequest = (uri) => {
  return {
    uri,
    headers: {
        'User-Agent': 'robinlawrence',
        Accept: 'application/vnd.github.antiope-preview+json'
    },
    json: true
  };
};

const postComment = (uri, message) => {
  return {
    method: 'POST',
    uri,
    headers: {
      'User-Agent': 'robinlawrence',
      Accept: 'application/vnd.github.antiope-preview+json',
      Authorization: `token ${authToken}`
    },
    body: {
      "body": message
    },
    json: true,
  };
};

module.exports = {
  getRequest,
  postComment,
}
