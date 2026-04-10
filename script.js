const openButtons = document.querySelectorAll('.more-info-btn');
const overlays = document.querySelectorAll('.modal-overlay');
const projectVideos = document.querySelectorAll('.project-video');

function toYouTubeEmbedUrl(url) {
  if (!url) return '';

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');
    let videoId = '';

    if (host === 'youtu.be') {
      videoId = parsed.pathname.slice(1);
    } else if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname === '/watch') {
        videoId = parsed.searchParams.get('v') || '';
      } else if (parsed.pathname.startsWith('/shorts/')) {
        videoId = parsed.pathname.split('/')[2] || '';
      } else if (parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.split('/')[2] || '';
      }
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } catch {
    return url;
  }
}

function withYouTubeParams(embedUrl) {
  if (!embedUrl) return '';

  try {
    const parsed = new URL(embedUrl);
    parsed.searchParams.set('rel', '0');
    parsed.searchParams.set('playsinline', '1');

    if (window.location.protocol !== 'file:') {
      parsed.searchParams.set('origin', window.location.origin);
    }

    return parsed.toString();
  } catch {
    return embedUrl;
  }
}

projectVideos.forEach((frame) => {
  const source = frame.dataset.youtube;
  const embedUrl = withYouTubeParams(toYouTubeEmbedUrl(source));

  if (!embedUrl) return;
  frame.src = embedUrl;
});

if (window.location.protocol === 'file:') {
  console.warn(
    'YouTube embeds can fail with error 153 when this page is opened directly as a local file. Use a local server or GitHub Pages for testing.'
  );
}

function closeAllModals() {
  overlays.forEach((overlay) => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  });
  document.body.style.overflow = '';
}

openButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.dataset.modal;
    const overlay = document.getElementById(modalId);
    if (!overlay) return;
    closeAllModals();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

document.querySelectorAll('.modal-close').forEach((button) => {
  button.addEventListener('click', closeAllModals);
});

overlays.forEach((overlay) => {
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeAllModals();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeAllModals();
});
