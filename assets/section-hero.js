function scriptExists(url) {
  return document.querySelectorAll(`script[src="${url}"]`).length > 0;
}

window.onload = () => {
  if (!customElements.get('hero')) {
    customElements.define('hero-section', class Hero extends HTMLElement {
      constructor() {
        super();

        this.videoWistia = this.querySelector('.js-video-wistia');
        this.initVideoWistia = this.initVideoWistia.bind(this)

        if (this.videoWistia !== null) {
          this.initVideoWistia();
        }
      }

      initVideoWistia() {
        const wistia_video_id = this.videoWistia.getAttribute('data-video-id');
        const pauseButton = document.getElementById('custom-pause-button');
        const wistaScript = "//fast.wistia.com/assets/external/E-v1.js?chromeless=true";

        //If Wista API exists
        if (wistia_video_id && !scriptExists(wistaScript)) {
          let tagWistaScript = document.createElement('script');
          tagWistaScript.src = wistaScript;
          let firstWistaScriptTag = document.getElementsByTagName('script')[0];
          firstWistaScriptTag.parentNode.insertBefore(tagWistaScript, firstWistaScriptTag);
        }

        window._wq = window._wq || [];
        _wq.push({
          id: wistia_video_id,
          options: {
            "endVideoBehavior": "loop",
            "autoPlay": true,
            "muted": true,
          },
          onReady: function (video) {
            video.width(1440, { constrain: true });
            pauseButton.addEventListener('click', (event) => {
              
              if (pauseButton.innerHTML == "pause") {
                video.pause();
                pauseButton.innerHTML = "play";
              } else {
                video.play();
                pauseButton.innerHTML = "pause";
              }
            });
          },
        });
      }
    });
  }
}

