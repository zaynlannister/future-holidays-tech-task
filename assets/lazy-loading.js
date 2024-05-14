document.addEventListener('DOMContentLoaded', () => {
  const lazyVideos = [].slice.call(document.querySelectorAll('video.lazy'));

  if ('IntersectionObserver' in window) {
    let lazyVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          let sources = video.target.querySelectorAll('source[data-src]');
          sources.forEach(function (source) {
            source.src = source.dataset.src;
          });

          video.target.load();
          video.target.classList.remove('lazy');
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});
