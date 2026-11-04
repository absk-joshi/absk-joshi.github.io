/* Keep third-party players off the page until the visitor asks to watch. */
document.querySelectorAll('[data-youtube-id]').forEach(preview => {
  preview.addEventListener('click', event => {
    // Preserve normal open-in-new-tab and modifier-click behavior.
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const player = document.createElement('iframe');
    player.src = 'https://www.youtube-nocookie.com/embed/' +
      encodeURIComponent(preview.dataset.youtubeId) + '?autoplay=1';
    player.title = preview.getAttribute('aria-label').replace(/^Play /, '');
    player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    player.allowFullscreen = true;
    player.className = 'youtube-player';
    player.setAttribute('tabindex', '0');
    // Unwrap the iframe so it is not nested inside a link.
    const wrapper = document.createElement('div');
    wrapper.className = 'youtube-preview is-playing';
    preview.replaceWith(wrapper);
    wrapper.append(player);
    player.focus();
  });
});