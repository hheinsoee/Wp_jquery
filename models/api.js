function getCategories(suteUrl, cb) {
    $.get(`${suteUrl}/wp-json/wp/v2/categories`, function (data) {
        cb(data);
    })
}
function getPosts(suteUrl, cb) {
    var endPoint = `${suteUrl}//?rest_route=/wp/v2/posts`;
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
    })
}

