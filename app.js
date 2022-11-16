//website
if (wp_site = urlParams.site) {
    wpPage(wp_site)
} else {
    indexPage(`
    <div class="font-weight-light text-mute">
        <a href="?site=https://dvb.no">https://dvb.no</a><br/>
        <a href="?site=https://arakanprincess.media">https://arakanprincess.media</a><br/>
        <a href="?site=https://sportsmyanmar.com">https://sportsmyanmar.com</a><br/>
        <a href="?site=https://channelmyanmar.org">https://channelmyanmar.org</a><br/>
    </div>
    `)
}