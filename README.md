# error-notification-app

> A GitHub App built with [Probot](https://github.com/probot/probot) that posts details of a build failure.


## Local Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Process and Challenged Encountered

1. **Learn about Probot.** I went through the docs and an initial set up of the probot. I must've missed the note that Smee only accepts "application/json" and I had the webhook configured to send "appplication/x-www-form-urlencoded." It took me a while to debug why there was no payload getting sent to the app.

2. **Determine which CI provider to use.** I was somewhat familiar with Circle CI so I started there but then I found out about Github Actions. I wanted to check out Github's in-house solution for CI so I learned to set up a workflow and have it triggered when a pull request opened. Another challenge was figuring out how to download the logs. CircleCI has a clearly defined endpoint that will return the logs but all I saw in the Actions tab was a button to download the logs and that wasn't going to work. I soon discovered the Github Upload Artifact action.

3. **Trial and Error with webhooks, Checks API, Status API, etc** I figured out how to set up the workflow and the webhooks, but I didn't quite know how to connect the two. I played around with exposing an Probot HTTP endpoint and creating a webhook to post to that endpoint (too complex and unnecessary since Smee does most of the heavy lifting). When I opened Postman and started testing the checks_suite_url, checks_run_url endpoints, I discovered that since I had my artifact uploaded, the annotations endpoint would return the test data I needed! A bulk of my time was spent in this phase trying to extract the data I needed from the many enpoints that Github has.

4. **Post a Comment to the PR** I struggled a bit with authentication. When I posted a comment within the `app.on('check_suite)` block, I kept getting a "Bad Credentials" response. I went down a rabbit hole of using octokit/auth.js and JWT but I had no success with it and was confused with how to use my personal token to authenticate. I'm still not entirely sure why the context seems to be different in this webhook event, but I ended up solving the problem by making a post request to the endpoint that creates a comment associated with the pr. I'm not using the probot context but it works!

5. **Tests && Formatting** Made some basic tests for the helper functions and simple formatting upgrades to the comment.

## Next Steps
Outlined in the Issues of the app.

## License

[ISC](LICENSE) © 2019 Robin Lawrence <robin.yk.lawrence@gmail.com>
