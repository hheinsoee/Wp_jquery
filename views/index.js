indexPage = (msg='') => {
    $('#app').html(
        `<div class="d-flex justify-content-center align-items-center" style="min-height:100vh;">
        <div>
            <h5>input any wordpress website URL</h5>
            <form class="d-flex">
            <input class="form-control" name="site" type="text" placeholder="https://dvb.no" aria-label="WP url" value="${urlParams.site}">
            <button class="btn btn-outline-success" type="submit">GO</button>
            </form>
            <div>${msg}</div>
            </div>
        </div>`
    )
}

wpPage = (site) => {

    $('#app').html(
        `
        <div id="allCats">loading..</div>
        <div class="container">
            <div id="postsContainer" class="row">
                <div class"h1">Loading</div>
            </div>
        </div>
        `
    )
    getCategories(site, (allCats) => {
        var categoryButtons = '';
        $.each(allCats, function (index, value) {
            categoryButtons += `
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="?site=${site}&category=${value.id}" title="${value.count} posts">${value.name}</a>
            </li>
            `
        })
        $('#allCats').html(
            `
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="?">Home</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        ${categoryButtons}
                    </ul>
                    </div>
                </div>
            </nav>`            
            )
    })
    getPosts(site, (posts) => {
        var postsThumbnails = '';
        $.each(posts, (i, v) => {

            var post = {
                title: v.title.rendered,
                date: v.date,
                excerpt: v.excerpt.rendered,
                content: v.content.rendered,
                image: v._embedded["wp:featuredmedia"][0].source_url
            }
            postsThumbnails +=
                `
                <div class=" col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card mb-2" onclick='showPopUpPost(${JSON.stringify(post)})'>
                    <img class="card-img-top limitHeight" src="${post.image}">
                    <div class="card-body">
                        <date>${$.date(post.date)}</date>
                        <h5 class="card-title">
                        ${post.title}
                        </h5>
                    </div>
                </div>
                </div>

                `
        })
        $('#postsContainer').html(postsThumbnails)
    })
}
