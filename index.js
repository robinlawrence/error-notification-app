/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

const rp = require('request-promise-native');
const { getRequest, postComment } = require('./helpers');

module.exports = app => {
  app.on('check_suite.completed', async context => {
    const {
      conclusion,
      head_sha,
      pull_requests,
      url: checkSuitesUrl
    } = context.payload.check_suite;

    if (conclusion === 'failure') {
      //get checkRunsURL from the checkSuitesUrl call
      const checkSuitesresponse = await rp(getRequest(checkSuitesUrl));
      const checkRunsUrl = checkSuitesresponse.check_runs_url;

      //get the annotations from the checkRunsUrl call
      const checkRunsResponse = await rp(getRequest(checkRunsUrl));
      const checkAnnotationsUrl = checkRunsResponse.check_runs[0].output.annotations_url;
      const annotations = await rp(getRequest(checkAnnotationsUrl));
      
      annotations.forEach(annotation => {
        if (annotation.annotation_level === 'failure') {
          const commentsUrl = `https://api.github.com/repos/robinlawrence/granola_generator/issues/${pull_requests[0].number}/comments`;
          const message = [`The build is failing as of ${head_sha}.`,
                            `<pre><code>${annotation.message}</code></pre>`
                          ].join(`\n\n`)
          rp(postComment(commentsUrl, message));
        }
      });
    }
  });
}
