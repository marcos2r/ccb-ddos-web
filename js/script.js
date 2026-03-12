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
    'jardim-morada-do-salto': '-22.246912,-54.820591',
    'parque-nova-dourados': '-22.245035,-54.790202',
    'jardim-carisma': '-22.205778,-54.771661',
    'distrito-macauba': '-22.136598,-54.488110',
    'residencial-oliveira': '-22.2379605,-54.778121',
    'jardim-novo-horizonte': '-22.2358749,-54.8435411',
    'jardim-marcia': '-22.2253557,-54.7560981',
    'jardim-colibri': '-22.2558837,-54.7866707',
    'jardim-nova-esperanca': '-22.212501,-54.755093',
    'altos-do-indaia': '-22.2219187,-54.849964',
    'jardim-guaicurus': '-22.261809,-54.7785524',
    'distrito-itahum': '-22.084875,-55.351965',
    'distrito-indapolis': '-22.214141,-54.651771',
    'jardim-laranja-doce': '-22.199633,-54.777805',
    'sitiocas-campo-belo-3': '-22.281302,-54.830318',
    'greenville': '-22.270029,-54.788630',
    'residencial-bonanza': '-22.270512,-54.830325',
    'sitiocas-campina-verde': '-22.263890,-54.822272'
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Configurar Links do Google Maps
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

    // 2. Destacar Dia Atual
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const hojeIndex = new Date().getDay(); // 0 a 6
    const hojeNome = diasSemana[hojeIndex];

    const cardsDias = document.querySelectorAll('.dia-semana');
    cardsDias.forEach(card => {
        const h2 = card.querySelector('h2');
        if (h2 && h2.textContent.trim() === hojeNome) {
            card.classList.add('hoje');
            // Role suavemente até o card de hoje se for mobile ou se não estiver visível
            if (window.innerWidth < 768) {
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 500);
            }
        }
    });

    // 3. Filtro de Busca
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            cardsDias.forEach(card => {
                const listItems = card.querySelectorAll('ul li');
                let dayHasMatch = false;

                listItems.forEach(li => {
                    const text = li.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    if (text.includes(term)) {
                        li.classList.remove('hidden');
                        dayHasMatch = true;
                    } else {
                        li.classList.add('hidden');
                    }
                });

                // Se o dia não tem nenhuma congregação que bate com a busca, esconde o dia todo
                if (dayHasMatch || term === '') {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    }
});
