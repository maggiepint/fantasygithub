const GitHubApi = require('github');

function statisticAggregator(token, repos) {
  this.github = new GitHubApi({
    // optional args
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    pathPrefix: "/api/v3", // for some GHEs; none for GitHub
    headers: {
      "user-agent": "FantasyGitHub" // GitHub is happy with a unique user agent
    },
    timeout: 5000
  });
  // user token
  this.github.authenticate({
    type: "token",
    token: "userToken",
  });

  this.repos = repos;
};


function repository(gitHub, repo) {
  this.github = gitHub;
  this.owner = repo.split('/')[0];
  this.repo = repo.split('/')[1];
}

repository.prototype.getCommits = function (startDate, endDate) {
  return github.repo.getCommits({ owner: this.owner, repo: this.repo, since: startDate, until: endDate });
}

