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
                    } else {
                        // Trata lugares com coordenadas pendentes
                        a.href = '#';
                        a.addEventListener('click', (e) => {
                            e.preventDefault();
                            alert(`As coordenadas para '${congr.bairro}' ainda não estão disponíveis no sistema. Em breve serão adicionadas!`);
                        });
                        // Opcional: Adicionar uma classe pra ficar cinza/desabilitado visualmente
                        a.style.opacity = '0.6';
                        a.style.cursor = 'help';
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
                    const originalText = li.textContent;
                    // Reset the innerHTML to remove any previous highlights before proceeding
                    li.innerHTML = '';
                    li.textContent = originalText;
                    
                    const textNormalized = originalText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const passesSearchFilter = textNormalized.includes(normalizedTerm) || normalizedTerm === '';

                    if (passesTypeFilter && passesSearchFilter) {
                        li.classList.remove('hidden');
                        cultoHasMatch = true;

                        // Apply fuzzy highlight if there is a search term
                        if (searchTerm.trim() !== '') {
                            // Find the original case and accents to preserve them
                            const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi");
                            let highlightedHtml = originalText;
                            
                            if (originalText.match(regex)) {
                              highlightedHtml = originalText.replace(regex, '<span class="highlight-text">$1</span>');
                            } else {
                              const startIndex = textNormalized.indexOf(normalizedTerm);
                              if (startIndex !== -1) {
                                  const originalMatch = originalText.substring(startIndex, startIndex + searchTerm.length);
                                  const safeOriginalMatch = originalMatch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                                  const exactRegex = new RegExp(`(${safeOriginalMatch})`, "g");
                                  highlightedHtml = originalText.replace(exactRegex, '<span class="highlight-text">$1</span>');
                              }
                            }

                            // We must reconstruct the anchor element to keep the link functionality
                            const existingAnchor = li.querySelector('a');
                            if (existingAnchor) {
                                existingAnchor.innerHTML = highlightedHtml;
                            } else {
                                li.innerHTML = highlightedHtml;
                            }
                        }
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
            
            // Dispara evento para o Google Analytics do filtro selecionado
            if (typeof gtag !== 'undefined') {
                gtag('event', 'filtro_clicado', {
                    'tipo_filtro': filterType
                });
            }

            applyFilters(currentSearch, filterType);
        });
    });

    // 4. Filtro de Busca Texto
    const searchInput = document.getElementById('search-input');
    let searchTimeout; // Variável para debounce da pesquisa no Analytics
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFilterBtn = document.querySelector('.filter-btn.active');
            const filterType = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'todos';
            const searchTerm = e.target.value;
            
            // Dispara evento para o Google Analytics apenas após parar de digitar (debounce)
            clearTimeout(searchTimeout);
            if (searchTerm.trim() !== '') {
                searchTimeout = setTimeout(() => {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'pesquisa_realizada', {
                            'search_term': searchTerm
                        });
                    }
                }, 1500); // Aguarda 1.5s após parar de digitar para computar a métrica
            }

            applyFilters(searchTerm, filterType);
        });
    }

    // 5. Botão Voltar ao Topo
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 6. Prompt de Instalação do PWA
    let deferredPrompt;
    const pwaBanner = document.getElementById('pwa-install-banner');
    const pwaInstallBtn = document.getElementById('pwa-install-btn');
    const pwaCloseBtn = document.getElementById('pwa-close-btn');

    window.addEventListener('beforeinstallprompt', (e) => {
        // Previne o mini-infobar do Chrome mobile de aparecer automaticamente
        e.preventDefault();
        deferredPrompt = e;
        
        // Verifica se o usuário não fechou o banner anteriormente nesta sessão
        if (!sessionStorage.getItem('pwaPromptClosed') && pwaBanner) {
            pwaBanner.classList.remove('hidden');
        }
    });

    if (pwaInstallBtn) {
        pwaInstallBtn.addEventListener('click', async () => {
            if (pwaBanner) pwaBanner.classList.add('hidden');
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response to the install prompt: ${outcome}`);
                deferredPrompt = null;
            }
        });
    }

    if (pwaCloseBtn) {
        pwaCloseBtn.addEventListener('click', () => {
            if (pwaBanner) pwaBanner.classList.add('hidden');
            sessionStorage.setItem('pwaPromptClosed', 'true');
        });
    }

    // 7. Funcionalidade da Igreja Mais Próxima Hoje
    const btnNearest = document.getElementById('btn-nearest-today');
    const nearestResult = document.getElementById('nearest-result');
    const nearestInfo = document.getElementById('nearest-info');
    const closeNearest = document.getElementById('close-nearest');

    // Haversine formula to calculate distance in km
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        const d = R * c; // Distance in km
        return d;
    }

    if (btnNearest) {
        btnNearest.addEventListener('click', () => {
            if (!navigator.geolocation) {
                alert('Geolocalização não é suportada por este navegador.');
                return;
            }

            // Provide visual feedback
            const originalText = btnNearest.textContent;
            btnNearest.textContent = 'Buscando...';
            btnNearest.disabled = true;

            navigator.geolocation.getCurrentPosition((position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;

                const hojeNome = diasSemana[new Date().getDay()];
                const hojeData = agendaSemanal.find(d => d.dia === hojeNome);
                
                if (!hojeData || !hojeData.cultos || hojeData.cultos.length === 0) {
                    nearestInfo.innerHTML = '<p>Não há cultos registrados para hoje.</p>';
                    nearestResult.classList.remove('hidden');
                    btnNearest.textContent = originalText;
                    btnNearest.disabled = false;
                    return;
                }

                let closestCongr = null;
                let minDistance = Infinity;
                let closestCultoDesc = '';

                hojeData.cultos.forEach(culto => {
                    culto.congrs.forEach(congr => {
                        const coordStr = locationLinks[congr.location];
                        if (coordStr) {
                            const coords = coordStr.split(',');
                            if (coords.length === 2 && coords[0] && coords[1]) {
                                const lat = parseFloat(coords[0]);
                                const lon = parseFloat(coords[1]);
                                
                                const dist = calculateDistance(userLat, userLon, lat, lon);
                                if (dist < minDistance) {
                                    minDistance = dist;
                                    closestCongr = congr;
                                    closestCultoDesc = culto.descricao;
                                }
                            }
                        }
                    });
                });

                if (closestCongr) {
                    const coordStr = locationLinks[closestCongr.location];
                    const distFormat = minDistance < 1 ? `${(minDistance * 1000).toFixed(0)} m` : `${minDistance.toFixed(1)} km`;
                    
                    nearestInfo.innerHTML = `
                        <div class="culto-info">
                            <strong>Congregação:</strong> ${closestCongr.bairro}
                        </div>
                        <div class="culto-info">
                            <strong>Horário do Culto:</strong> ${closestCultoDesc}
                        </div>
                        <div class="culto-info">
                            <strong>Distância:</strong> a aproximadamente ${distFormat} de você.
                        </div>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=${coordStr}" target="_blank" rel="noopener noreferrer" class="route-link">
                            Abrir no Google Maps
                        </a>
                    `;
                } else {
                    nearestInfo.innerHTML = '<p>Não foi possível encontrar congregações com horário de culto hoje perto de você.</p>';
                }

                nearestResult.classList.remove('hidden');
                nearestResult.scrollIntoView({ behavior: 'smooth', block: 'center' });

                btnNearest.textContent = originalText;
                btnNearest.disabled = false;

                if (typeof gtag !== 'undefined') {
                    gtag('event', 'nearest_church_used', {
                        'found': closestCongr ? true : false
                    });
                }
            }, (error) => {
                btnNearest.textContent = originalText;
                btnNearest.disabled = false;
                
                let errorMsg = 'Não foi possível obter sua localização.';
                if (error.code === 1) errorMsg = 'Você negou a permissão de localização. Por favor, permita o acesso para utilizar a funcionalidade.';
                alert(errorMsg);
            }, { 
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        });
    }

    if (closeNearest) {
        closeNearest.addEventListener('click', () => {
            nearestResult.classList.add('hidden');
        });
    }
});
