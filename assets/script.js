var urlParams;
(window.onpopstate = function () {
    var match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
})();

$.date = function (dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + year;

    return date;
};
showPopUpPost = (id) => {

    $('#popUPModal').modal('show');
    $('#popUpContent').html("<div class='p-5'>loading..</div>")
    getThePosts(id, (data) => {
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
                ${post.image ? `<img class="card-img-top" src="${post.image}">` : ""}
                <div class="p-2 read">
                    <h2>${post.title.rendered}</h2>
                    <date>${$.date(post.date)}</date>
                    <div>${post.content.rendered}</div>
                </div>
                `
            )
        }else{
            $('#popUpContent').html("Something Wrong")
        }
    })
}