//website
if (wp_site = urlParams.site) {
    wpPage(wp_site)
} else {
    indexPage(`
    <ul>
        <li>https://dvb.no</li>
        <li>https://arakanprincess.media</li>
        <li>https://sportsmyanmar.com</li>
        <li>https://channelmyanmar.org</li>
    </ul>
    `)
}