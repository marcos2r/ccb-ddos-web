document.addEventListener('DOMContentLoaded', () => {
    // 1. Renderizar Dinamicamente os Dias e Congregações
    const container = document.getElementById('dias-semana');
    
    agendaSemanal.forEach(diaData => {
        const article = document.createElement('article');
        article.className = 'dia-semana';
        
        const h2 = document.createElement('h2');
        h2.textContent = diaData.dia;
        article.appendChild(h2);
        
        diaData.cultos.forEach(culto => {
            const section = document.createElement('section');
            section.className = 'culto';
            
            const h3 = document.createElement('h3');
            h3.setAttribute('data-type', culto.tipo);
            h3.innerHTML = culto.descricao; // usa innerHTML por causa da tag <br>
            section.appendChild(h3);
            
            const ul = document.createElement('ul');
            culto.congrs.forEach(congr => {
                const li = document.createElement('li');
                if (congr.location) {
                    const a = document.createElement('a');
                    a.className = 'map-link';
                    a.setAttribute('data-location', congr.location);
                    a.textContent = congr.bairro;
                    const coordinates = locationLinks[congr.location];
                    if (coordinates) {
                        a.href = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;
                        a.target = '_blank';
                        a.rel = 'noopener noreferrer';
                    }
                    li.appendChild(a);
                } else {
                    li.textContent = congr.bairro;
                }
                ul.appendChild(li);
            });
            section.appendChild(ul);
            article.appendChild(section);
        });
        container.appendChild(article);
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

    // 3. Filtros Rápidos (Botões)
    const filterBtns = document.querySelectorAll('.filter-btn');

    function applyFilters(searchTerm = '', filterType = 'todos') {
        const normalizedTerm = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        cardsDias.forEach(card => {
            let dayHasMatch = false;
            const cultosNoDia = card.querySelectorAll('.culto');

            cultosNoDia.forEach(culto => {
                const tipoCulto = culto.querySelector('h3').getAttribute('data-type');
                const listItems = culto.querySelectorAll('ul li');
                let cultoHasMatch = false;

                // Verifica se o culto atual passa no filtro de botões
                const passesTypeFilter = (filterType === 'todos' || tipoCulto === filterType);

                listItems.forEach(li => {
                    const text = li.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const passesSearchFilter = text.includes(normalizedTerm) || normalizedTerm === '';

                    if (passesTypeFilter && passesSearchFilter) {
                        li.classList.remove('hidden');
                        cultoHasMatch = true;
                    } else {
                        li.classList.add('hidden');
                    }
                });

                // Mostra/esconde a seção inteira do culto
                if (cultoHasMatch) {
                    culto.classList.remove('hidden');
                    dayHasMatch = true;
                } else {
                    culto.classList.add('hidden');
                }
            });

            // Mostra/esconde o dia inteiro
            if (dayHasMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        // Toggle No Results Message
        const anyMatch = Array.from(cardsDias).some(card => !card.classList.contains('hidden'));
        const noResultsEl = document.getElementById('no-results');
        if (noResultsEl) {
            if (!anyMatch) {
                noResultsEl.classList.remove('hidden');
            } else {
                noResultsEl.classList.add('hidden');
            }
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adiciona no clicado
            btn.classList.add('active');

            const filterType = btn.getAttribute('data-filter');
            const currentSearch = document.getElementById('search-input') ? document.getElementById('search-input').value : '';
            
            applyFilters(currentSearch, filterType);
        });
    });

    // 4. Filtro de Busca Texto
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFilterBtn = document.querySelector('.filter-btn.active');
            const filterType = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'todos';
            
            applyFilters(e.target.value, filterType);
        });
    }
});
