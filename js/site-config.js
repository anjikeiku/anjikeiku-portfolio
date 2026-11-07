const SITE_BASE =
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1'
        ? ''
        : '/anjikeiku-portfolio';

function sitePath(path) {
    return `${SITE_BASE}/${path.replace(/^\/+/, '')}`;
}