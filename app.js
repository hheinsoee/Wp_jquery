//website
if (wp_site = urlParams.site) {
    indexPage(`Checking ${wp_site}`)
    getWPinfo(wp_site, (data) => {
        if (data) {
            wpPage(wp_site)
        }
        else {
            indexPage(`${wp_site} is not using wordpress`)
        }
    })

} else {
    indexPage()
}