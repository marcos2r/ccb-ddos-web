const locationLinks = {
    'vila-planalto': '-22.222883,-54.802340',
    'vila-sao-francisco': '-22.221370,-54.772363',
    'jardim-climax': '-22.227437,-54.827302',
    'distrito-vila-vargas': '-22.133473,-54.618515'
};

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.map-link');
    links.forEach(link => {
        const locationKey = link.getAttribute('data-location');
        const coordinates = locationLinks[locationKey];
        if (coordinates) {
            link.href = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });
});
