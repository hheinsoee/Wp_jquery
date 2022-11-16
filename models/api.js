function getWPinfo(cb) {
    $.get(`${suteUrl}/?rest_route=/wp/v2`, function (data) {
        cb(data);
    }).fail(function () {
        cb(false);
    })
}
function getCategories(cb) {
    $.get(`${urlParams.site}/?rest_route=/wp/v2/categories`, function (data) {
        cb(data);
    }).fail(function (err) {
        console.log(err)
        cb(false);
    })
}
function getPosts(query, cb) {
    var endPoint = `${urlParams.site}/?rest_route=/wp/v2/posts`;
    var query = {
        orderby: 'date',
        // offset: 10,
        // per_page: 5,
        page: 1,
        _embed: 'wp:featuredmedia',
        _fields: 'id,title,date,_links,content,excerpt' //,author,excerpt,link,//contentကိုပုံရှာဖို့လိုရေ
    };
    if (cat = urlParams.category) {
        query.categories = urlParams.category
    }

    var url = endPoint + "&" + jQuery.param(query);
    $.get(url, function (data) {
        cb(data);
    }).fail(function () {
        cb(false);
    })
}
function getThePost(id, cb) {
    var endPoint = `${urlParams.site}/?rest_route=/wp/v2/posts/${id}`;
    $.get(endPoint, function (data) {
        cb(data);
    }).fail(function () {
        cb(false);
    })
}

