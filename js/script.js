document.addEventListener('DOMContentLoaded', () => {
    // --- 0. Sistema Suspenso (Manutenção) ---
    if (typeof SISTEMA_SUSPENSO !== 'undefined' && SISTEMA_SUSPENSO) {
        document.getElementById('app-content').style.display = 'none';
        document.getElementById('tela-suspensao').style.display = 'flex';
        return; // Aborta toda a renderização do JS daqui para baixo.
    }

    // --- 0. Acessibilidade (Tamanho da Fonte) ---
    const btnIncreaseFont = document.getElementById('btn-increase-font');
    const btnDecreaseFont = document.getElementById('btn-decrease-font');
    let currentFontSize = parseFloat(localStorage.getItem('ccb_font_size')) || 16;
    
    function applyFontSize() {
        document.documentElement.style.fontSize = `${currentFontSize}px`;
        localStorage.setItem('ccb_font_size', currentFontSize);
    }
    applyFontSize();
    
    if (btnIncreaseFont && btnDecreaseFont) {
        btnIncreaseFont.addEventListener('click', () => {
            if (currentFontSize < 26) { currentFontSize += 2; applyFontSize(); }
        });
        btnDecreaseFont.addEventListener('click', () => {
            if (currentFontSize > 12) { currentFontSize -= 2; applyFontSize(); }
        });
    }

    // --- 1. Variáveis de Estado e Modos de Visão ---
    const container = document.getElementById('dias-semana');
    let currentViewMode = 'dia'; // 'dia' ou 'igreja'
    
    function getFavoriteChurch() { return localStorage.getItem('ccb_favorita'); }
    function setFavoriteChurch(locationId) {
        if (getFavoriteChurch() === locationId) {
            localStorage.removeItem('ccb_favorita');
        } else {
            localStorage.setItem('ccb_favorita', locationId);
        }
    }
    
    function shareCulto(bairro, descricao, coordsStr) {
        if (navigator.share) {
            const url = coordsStr ? `https://www.google.com/maps/dir/?api=1&destination=${coordsStr}` : 'https://ccbdourados.org.br/';
            navigator.share({
                title: 'Agenda CCB Dourados',
                text: `Culto na CCB ${bairro}\nHorário: ${descricao.replace(/<br>/g, ' ')}\nVeja como chegar:`,
                url: url
            }).catch(console.error);
        } else {
            alert('Compartilhamento não suportado neste navegador.');
        }
    }
    
    function sortCongrs(congrs) {
        const favId = getFavoriteChurch();
        return [...congrs].sort((a, b) => {
            if (a.location === favId) return -1;
            if (b.location === favId) return 1;
            return 0;
        });
    }

    function renderCultoListItem(congr, descricaoCulto) {
        const li = document.createElement('li');
        const favId = getFavoriteChurch();
        if (favId === congr.location) li.classList.add('favorito-destaque');

        const divContent = document.createElement('div');
        divContent.className = 'culto-item-content';

        if (congr.location) {
            const a = document.createElement('a');
            a.className = 'map-link';
            a.setAttribute('data-location', congr.location);
            a.textContent = congr.bairro;
            const coords = locationLinks[congr.location];
            if (coords) {
                a.href = `https://www.google.com/maps/dir/?api=1&destination=${coords}`;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            } else {
                a.href = '#';
                a.addEventListener('click', (e) => { e.preventDefault(); alert('Coordenadas indisponíveis em breve!'); });
                a.style.opacity = '0.6';
            }
            divContent.appendChild(a);
        } else {
            divContent.textContent = congr.bairro;
        }
        li.appendChild(divContent);

        const divActions = document.createElement('div');
        divActions.className = 'culto-actions';

        if (congr.location) {
            const btnFav = document.createElement('button');
            btnFav.className = 'fav-btn';
            btnFav.innerHTML = '⭐';
            btnFav.title = 'Marcar Minha Comum';
            if (favId === congr.location) btnFav.classList.add('favorited');
            btnFav.addEventListener('click', (e) => {
                e.preventDefault();
                setFavoriteChurch(congr.location);
                renderCurrentView(); // Re-render imediato
            });
            divActions.appendChild(btnFav);

            const btnShare = document.createElement('button');
            btnShare.className = 'share-btn';
            btnShare.innerHTML = '📤';
            btnShare.title = 'Compartilhar Rota';
            btnShare.addEventListener('click', (e) => {
                e.preventDefault();
                shareCulto(congr.bairro, descricaoCulto, locationLinks[congr.location]);
            });
            divActions.appendChild(btnShare);
        }
        li.appendChild(divActions);
        return li;
    }

    // --- Lógica de Renderização ---
    function applyDailyHighlights() {
        const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const hojeNome = diasSemana[new Date().getDay()];
        const cardsDias = document.querySelectorAll('.dia-semana');
        cardsDias.forEach(card => {
            const h2 = card.querySelector('h2');
            if (h2 && h2.textContent.trim() === hojeNome) {
                card.classList.add('hoje');
                if (window.innerWidth < 768) {
                    setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 500);
                }
            }
        });
    }

    function renderByDay() {
        container.innerHTML = '';
        const diasSemanaMap = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const hojeDate = new Date();
        const hojeIdx = hojeDate.getDay(); 
        const domingoDestaSemana = new Date(hojeDate);
        domingoDestaSemana.setDate(hojeDate.getDate() - hojeIdx);

        const weekOfMonthByDay = {};
        diasSemanaMap.forEach((nomeDia, index) => {
            const d = new Date(domingoDestaSemana);
            d.setDate(domingoDestaSemana.getDate() + index);
            weekOfMonthByDay[nomeDia] = Math.ceil(d.getDate() / 7);
        });
        
        agendaSemanal.forEach(diaData => {
            const currentWeekOfMonth = weekOfMonthByDay[diaData.dia];
            const article = document.createElement('article');
            article.className = 'dia-semana';
            const h2 = document.createElement('h2');
            h2.textContent = diaData.dia;
            article.appendChild(h2);
            
            let countVisible = 0;
            diaData.cultos.forEach(culto => {
                if (culto.semanas && !culto.semanas.includes(currentWeekOfMonth)) return;
                countVisible++;
                
                const section = document.createElement('section');
                section.className = 'culto';
                const h3 = document.createElement('h3');
                h3.setAttribute('data-type', culto.tipo);
                h3.innerHTML = culto.descricao; 
                section.appendChild(h3);
                
                const ul = document.createElement('ul');
                const sortedCongrs = sortCongrs(culto.congrs);
                sortedCongrs.forEach(congr => {
                    ul.appendChild(renderCultoListItem(congr, culto.descricao));
                });
                section.appendChild(ul);
                article.appendChild(section);
            });
            if (countVisible > 0) container.appendChild(article);
        });
        applyDailyHighlights();
    }

    function renderByChurch() {
        container.innerHTML = '';
        const churchesMap = {};
        agendaSemanal.forEach(diaData => {
            diaData.cultos.forEach(culto => {
                culto.congrs.forEach(congr => {
                    if (!congr.location) return;
                    if (!churchesMap[congr.location]) {
                        churchesMap[congr.location] = { bairro: congr.bairro, location: congr.location, dias: [] };
                    }
                    churchesMap[congr.location].dias.push({ dia: diaData.dia, tipo: culto.tipo, descricao: culto.descricao });
                });
            });
        });

        let churchesArray = Object.values(churchesMap);
        const favId = getFavoriteChurch();
        churchesArray.sort((a, b) => {
            if (a.location === favId) return -1;
            if (b.location === favId) return 1;
            return a.bairro.localeCompare(b.bairro); // Ordem alfabetica
        });

        churchesArray.forEach(church => {
            const article = document.createElement('article');
            article.className = 'dia-semana'; 
            if (church.location === favId) {
                article.style.borderColor = 'gold';
                article.style.boxShadow = '0 8px 15px rgba(255, 215, 0, 0.2)';
            }
            
            const h2 = document.createElement('h2');
            h2.className = 'map-link'; 
            h2.setAttribute('data-location', church.location);
            h2.textContent = church.location === favId ? `⭐ ${church.bairro}` : church.bairro;
            
            // Reattach map link if available in church mode header
            if (locationLinks[church.location]) {
                const a = document.createElement('a');
                a.href = `https://www.google.com/maps/dir/?api=1&destination=${locationLinks[church.location]}`;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = h2.textContent;
                a.style.color = 'inherit';
                a.style.textDecoration = 'none';
                h2.innerHTML = '';
                h2.appendChild(a);
            }
            article.appendChild(h2);
            
            const section = document.createElement('section');
            section.className = 'culto';
            const ul = document.createElement('ul');
            
            church.dias.forEach(d => {
                const li = document.createElement('li');
                li.style.flexDirection = 'column';
                li.style.alignItems = 'flex-start';
                
                const divDia = document.createElement('div');
                divDia.innerHTML = `<strong>${d.dia}</strong>`;
                divDia.style.color = 'var(--cor-azul-escuro)';
                
                const divCulto = document.createElement('div');
                divCulto.innerHTML = d.descricao; 
                divCulto.setAttribute('data-type', d.tipo); 
                divCulto.className = 'culto-info-inner'; 

                li.appendChild(divDia);
                li.appendChild(divCulto);

                const divActions = document.createElement('div');
                divActions.style.width = '100%';
                divActions.style.display = 'flex';
                divActions.style.justifyContent = 'flex-end';
                
                const btnShare = document.createElement('button');
                btnShare.className = 'share-btn';
                btnShare.innerHTML = '📤';
                btnShare.title = 'Compartilhar Rota';
                btnShare.style.marginTop = '-15px';
                btnShare.addEventListener('click', (e) => {
                    e.preventDefault();
                    shareCulto(church.bairro, d.descricao, locationLinks[church.location]);
                });
                divActions.appendChild(btnShare);
                li.appendChild(divActions);

                ul.appendChild(li);
            });
            section.appendChild(ul);
            article.appendChild(section);
            container.appendChild(article);
        });
    }

    function renderCurrentView() {
        if (currentViewMode === 'dia') renderByDay();
        else renderByChurch();
        
        // Re-aplica filtros
        const filterType = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'todos';
        const searchTerm = document.getElementById('search-input') ? document.getElementById('search-input').value : '';
        applyFilters(searchTerm, filterType);
    }
    
    // --- Configuração dos Botões de Modo ---
    const btnModeDia = document.getElementById('view-mode-dia');
    const btnModeIgreja = document.getElementById('view-mode-igreja');
    if (btnModeDia && btnModeIgreja) {
        btnModeDia.addEventListener('click', () => {
            currentViewMode = 'dia';
            btnModeDia.classList.add('active');
            btnModeIgreja.classList.remove('active');
            renderCurrentView();
        });
        btnModeIgreja.addEventListener('click', () => {
            currentViewMode = 'igreja';
            btnModeIgreja.classList.add('active');
            btnModeDia.classList.remove('active');
            renderCurrentView();
        });
    }

    // --- Lógica de Filtros Unificada ---
    const filterBtns = document.querySelectorAll('.filter-btn');

    function applyFilters(searchTerm = '', filterType = 'todos') {
        const normalizedTerm = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const cardsDias = document.querySelectorAll('.dia-semana');

        cardsDias.forEach(card => {
            let cardHasMatch = false;

            if (currentViewMode === 'dia') {
                const cultosNoDia = card.querySelectorAll('.culto');
                cultosNoDia.forEach(culto => {
                    const tipoCulto = culto.querySelector('h3').getAttribute('data-type');
                    const listItems = culto.querySelectorAll('ul li');
                    let cultoHasMatch = false;
                    const passesTypeFilter = (filterType === 'todos' || tipoCulto === filterType);

                    listItems.forEach(li => {
                        const contentDiv = li.querySelector('.culto-item-content') || li;
                        const existingAnchor = contentDiv.querySelector('a');
                        const targetElement = existingAnchor ? existingAnchor : (contentDiv.querySelector('div') || contentDiv);
                        
                        // Garante o armazenamento e resgate do texto puro sem as tags criadas na busca fuzzy.
                        if (!targetElement.hasAttribute('data-original-text')) {
                             targetElement.setAttribute('data-original-text', targetElement.textContent);
                        }
                        const originalText = targetElement.getAttribute('data-original-text');
                        targetElement.textContent = originalText;
                        
                        const textNormalized = originalText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        const passesSearchFilter = textNormalized.includes(normalizedTerm) || normalizedTerm === '';

                        if (passesTypeFilter && passesSearchFilter) {
                            li.classList.remove('hidden');
                            cultoHasMatch = true;

                            if (searchTerm.trim() !== '') {
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
                                targetElement.innerHTML = highlightedHtml;
                            }
                        } else {
                            li.classList.add('hidden');
                        }
                    });

                    if (cultoHasMatch) { culto.classList.remove('hidden'); cardHasMatch = true; } 
                    else { culto.classList.add('hidden'); }
                });

            } else {
                // Filtro para MODO IGREJA
                const headerText = card.querySelector('h2').textContent;
                const headerTextNorm = headerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                
                const listItems = card.querySelectorAll('ul li');
                let churchHasMatch = false;

                listItems.forEach(li => {
                    const typeDiv = li.querySelector('.culto-info-inner');
                    const tipoCulto = typeDiv ? typeDiv.getAttribute('data-type') : '';
                    const passesTypeFilter = (filterType === 'todos' || tipoCulto === filterType);
                    const passesSearchFilter = headerTextNorm.includes(normalizedTerm) || normalizedTerm === '';

                    if (passesTypeFilter && passesSearchFilter) {
                        li.classList.remove('hidden');
                        churchHasMatch = true;
                    } else {
                        li.classList.add('hidden');
                    }
                });

                if (churchHasMatch) cardHasMatch = true;
            }

            if (cardHasMatch) card.classList.remove('hidden');
            else card.classList.add('hidden');
        });

        const anyMatch = Array.from(cardsDias).some(card => !card.classList.contains('hidden'));
        const noResultsEl = document.getElementById('no-results');
        if (noResultsEl) {
            const btnNearest = document.getElementById('btn-nearest-today');
            const isNearestActive = btnNearest && btnNearest.classList.contains('active');
            if (!anyMatch && !isNearestActive) noResultsEl.classList.remove('hidden');
            else noResultsEl.classList.add('hidden');
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterType = btn.getAttribute('data-filter');
            const currentSearch = document.getElementById('search-input') ? document.getElementById('search-input').value : '';
            if (typeof gtag !== 'undefined') gtag('event', 'filtro_clicado', { 'tipo_filtro': filterType });
            applyFilters(currentSearch, filterType);
        });
    });

    const searchInput = document.getElementById('search-input');
    let searchTimeout;
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFilterBtn = document.querySelector('.filter-btn.active');
            const filterType = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'todos';
            const searchTerm = e.target.value;
            clearTimeout(searchTimeout);
            if (searchTerm.trim() !== '') {
                searchTimeout = setTimeout(() => {
                    if (typeof gtag !== 'undefined') gtag('event', 'pesquisa_realizada', { 'search_term': searchTerm });
                }, 1500);
            }
            applyFilters(searchTerm, filterType);
        });
    }

    // Inicializa a visualização principal
    renderCurrentView();

    // 5. Botão Voltar ao Topo
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) backToTopBtn.classList.remove('hidden');
            else backToTopBtn.classList.add('hidden');
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 6. Prompt de Instalação do PWA
    let deferredPrompt;
    const pwaBanner = document.getElementById('pwa-install-banner');
    const pwaInstallBtn = document.getElementById('pwa-install-btn');
    const pwaCloseBtn = document.getElementById('pwa-close-btn');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
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

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; 
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        return R * c; 
    }

    if (btnNearest) {
        btnNearest.addEventListener('click', () => {
            if (!navigator.geolocation) { alert('Geolocalização não suportada.'); return; }

            const originalText = btnNearest.textContent;
            btnNearest.textContent = 'Buscando...';
            btnNearest.disabled = true;

            navigator.geolocation.getCurrentPosition((position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                const hojeNome = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'][new Date().getDay()];
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
                        <div class="culto-info"><strong>Congregação:</strong> ${closestCongr.bairro}</div>
                        <div class="culto-info"><strong>Horário do Culto:</strong> ${closestCultoDesc}</div>
                        <div class="culto-info"><strong>Distância:</strong> a aproximadamente ${distFormat} de você.</div>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=${coordStr}" target="_blank" rel="noopener noreferrer" class="route-link">Abrir no Google Maps</a>
                    `;
                } else {
                    nearestInfo.innerHTML = '<p>Não foi possível encontrar congregações com horário hoje perto de você.</p>';
                }

                nearestResult.classList.remove('hidden');
                nearestResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
                btnNearest.textContent = originalText;
                btnNearest.disabled = false;

                if (typeof gtag !== 'undefined') gtag('event', 'nearest_church_used', { 'found': !!closestCongr });
            }, (error) => {
                btnNearest.textContent = originalText;
                btnNearest.disabled = false;
                let errorMsg = 'Não foi possível obter sua localização.';
                if (error.code === 1) errorMsg = 'Você negou a permissão de localização. Por favor, permita o acesso para utilizar.';
                alert(errorMsg);
            }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
        });
    }

    if (closeNearest) {
        closeNearest.addEventListener('click', () => nearestResult.classList.add('hidden'));
    }
});
