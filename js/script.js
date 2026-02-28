const locationLinks = {
    'vila-planalto': '-22.222883,-54.802340',
    'vila-sao-francisco': '-22.221370,-54.772363',
    'jardim-climax': '-22.227437,-54.827302',
    'distrito-vila-vargas': '-22.133473,-54.618515',
    'distrito-panambi': '-22.115490,-54.697441',
    'parque-das-nacoes-2': '-22.239918,-54.751578',
    'jardim-agua-boa': '-22.250564,-54.807942',
    'jardim-dos-estados': '-22.209672,-54.788616',
    'jardim-joquei-clube': '-22.244721,-54.736986',
    'jardim-morada-do-salto': '-22.246912,-54.820591'
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
