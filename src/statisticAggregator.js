const GitHubApi = require('github');
const Q = require('q');

function statisticAggregator(token, repos, startDate, endDate) {
    var self = this;
    self.github = new GitHubApi({
        // optional args
        debug: true,
        protocol: "https",
        host: "api.github.com", // should be api.github.com for GitHub
        headers: {
            "user-agent": "FantasyGitHub" // GitHub is happy with a unique user agent
        },
        timeout: 5000
    });
    // user token
    self.github.authenticate({
        type: "token",
        token: token,
    });

    self.startDate = startDate;
    self.endDate = endDate;
    self.repos = repos.filter((r) => { return r; }).map((r) => { return new repository(self.github, r, self.startDate, self.endDate); })
};

statisticAggregator.prototype.getAllCommits = function() {
    return Q.all(this.repos.map((r) => { return r.getCommits(this.startDate, this.endDate); }))
}


function repository(gitHub, repo, startDate, endDate) {
    this.github = gitHub;
    this.owner = repo.split('/')[0];
    this.repo = repo.split('/')[1];
    this.startDate = startDate;
    this.endDate = endDate;
}

repository.prototype.getCommits = function() {
    var self = this;
    var deferred = Q.defer();
    self.github.repos.getCommits({ owner: self.owner, repo: self.repo, since: self.startDate, until: self.endDate }, function(err, resp) {
        if (err) {
            deferred.reject(err);
        } else {
            self.commits = resp.length;
            deferred.resolve();
        }
    });
    return deferred.promise;
}

repository.prototype.getPullRequests = function() {
    var self = this;
    var deferred = Q.defer();
    self.github.repos.getCommits({ owner: self.owner, repo: self.repo, since: self.startDate, until: self.endDate }, function(err, resp) {
        if (err) {
            deferred.reject(err);
        } else {
            self.pulls = resp.length;
            deferred.resolve();
        }
    });
    return deferred.promise;
}

module.exports = statisticAggregator;