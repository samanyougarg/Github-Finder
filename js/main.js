$(document).ready(function() {
    $('#searchUser').on('keyup', function(e) {
        let username = e.target.value;

        //ajax request
        $.ajax({
            url:'https://api.github.com/users/' + username,
            data: {
                client_id:'acaa8a1b6b358a61309c',
                client_secret: 'a18854a45522ed9e5d0eea493dc63d629e33d8d2'
            }
        }).done(function(user) {
            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data: {
                    client_id:'acaa8a1b6b358a61309c',
                    client_secret: 'a18854a45522ed9e5d0eea493dc63d629e33d8d2',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos) {
                $.each(repos, function(index, repo) {
                    $('#repos').append(`
                        <div class="card mb-2">
                            <div class="card-body">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong>: ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                                    <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                                    <span class="badge badge-warning mb-2">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-outline-primary">Repo Page</a>
                                </div>
                            </div>
                            </div>
                        </div>
                    `);
                });
            });
            $('#profile').html(`
                <div class="card mb-5">
                  <div class="card-header">
                    ${user.name}
                  </div>
                  <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img class="thumbnail avatar mb-2" src="${user.avatar_url}">
                            <a class="btn btn-primary btn-block" target="_black" href="${user.html_url}">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <span class="badge badge-success">Public Repos: ${user.public_repos}</span>
                            <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
                            <span class="badge badge-warning">Followers: ${user.followers}</span>
                            <span class="badge badge-danger">Following: ${user.following}</span>
                            <br><br>
                            <ul class="list-group">
                                <li class="list-group-item">Company: ${user.company}</li>
                                <li class="list-group-item">Blog: ${user.blog}</li>
                                <li class="list-group-item">Location: ${user.location}</li>
                                <li class="list-group-item">Member Since: ${user.created_at}</li>
                            </ul>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="card mb-5">
                  <div class="card-header">
                    Latest Repos
                  </div>
                  <div class="card-body">
                    <div id="repos"></div>
                  </div>
                `);
        });
    });
});
