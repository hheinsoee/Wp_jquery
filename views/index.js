indexPage = (msg = '') => {
    $('#app').html(
        `<div class="d-flex justify-content-center align-items-center" style="min-height:100vh;">
        <div>
            <h5>input any wordpress website URL</h5>
            <small>http:// or https:// ပါရပါမည်</small>
            <form class="d-flex py-4">
            <input class="form-control me-2" name="site" type="text" placeholder="eg: https://dvb.no" aria-label="WP url" value="${urlParams.site || ''}">
            <button class="btn btn-outline-success" type="submit">GO</button>
            </form>
            <div>${msg}</div>
            </div>
        </div>`
    )
}
showPopUpPost = (id) => {
    $('#popUPModal').modal('show');
    $('#popUpContent').html("<div class='modal-body'><center>loading..</center></div>")
    getThePost(id, (data) => {
        if (data) {
            var post = {
                id: data.id,
                title: data.title,
                date: data.date,
                excerpt: data.excerpt,
                content: data.content,
                image: data.jetpack_featured_media_url || null
            }
            $('#popUpContent').html(
                `
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${post.title.rendered}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-lsbel="Close"></button>
                    </div>
                    ${post.image ? `<img class="card-img-top" src="${post.image}">` : ""}
                    <div class="modal-body read">
                        <date>${$.date(post.date)}</date>
                        <div>${post.content.rendered}</div>
                    </div>
                </div>
                `
            )
        } else {
            $('#popUpContent').html("Something Wrong")
        }
    })
}
wpPage = () => {
    var site = urlParams.site
    $('#app').html(
        `
        <div id="allCats"><center>loading..</center></div>
        <div class="container">
            <div id="postsContainer" class="row">
            </div>
        </div>
        `
    )
    getCategories((allCats) => {
        if (allCats) {
            $("#postsContainer").html('<div class"h1"><center>Loading..</center></div>');
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
            getPosts(null, (posts) => {
                if (posts) {
                    var postsThumbnails = '';
                    $.each(posts, (i, v) => {

                        var post = {
                            id: v.id,
                            title: v.title,
                            date: v.date,
                            image: v._embedded && v._embedded["wp:featuredmedia"] ? v._embedded["wp:featuredmedia"][0].source_url : null
                        }
                        postsThumbnails +=
                            `
                                <div class=" col-12 col-sm-6 col-md-4 col-lg-3">
                                    <div class="card mb-2" onclick='showPopUpPost(${post.id})'>
                                    ${post.image ? `<img class="card-img-top limitHeight" src="${post.image}">` : "<div class='bg-dark' style='200px'></div>"}
                                    <div class="card-body">
                                        <date>${$.date(post.date)}</date>
                                        <h5 class="card-title">
                                        ${post.title.rendered}
                                        </h5>
                                    </div>
                                </div>
                                </div>
            
                                `
                    })
                    $('#postsContainer').html(postsThumbnails)
                } else {
                    indexPage(`${site} မှာ သုံးထားရေ plug-in တစ်ချို့ကြောင့် မရပါ`)
                }
            })
        } else {
            indexPage(`${site} သည် wordpress ကိုမသုံးထားပါ`)
        }
    })

}
