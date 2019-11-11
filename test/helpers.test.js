const { getRequest, postComment } = require('../helpers')

jest.mock('../authToken', () => ({
  authToken: 'mockAuthToken'
}))

const { authToken } = require('../authToken');
const mockUrl = 'www.mockTest.com'

describe('getRequest', () => {
  test('correctly generates the get request options', () => {
    expect(getRequest(mockUrl)).toEqual({
      uri: mockUrl,
      headers: {
        'User-Agent': 'robinlawrence',
        Accept: 'application/vnd.github.antiope-preview+json'
      },
      json: true
    })
  })
})

describe('postComment', () => {
  test('correctly generates the postComment request options', () => {
    expect(postComment(mockUrl, 'mock message')).toEqual({
      method: 'POST',
      uri: mockUrl,
      headers: {
        'User-Agent': 'robinlawrence',
        Accept: 'application/vnd.github.antiope-preview+json',
        Authorization: `token ${authToken}`
      },
      body: {
        body: 'mock message'
      },
      json: true
    })
  })
})
