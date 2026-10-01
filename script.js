/**
 * ===================================================================
 * MYTRIP - Gerenciador de Estado e Funcionalidades do Diário de Viagens
 * Armazenamento Local via LocalStorage e Manipulação de Dados
 * ===================================================================
 */

// Chaves de armazenamento LocalStorage
const STORAGE_KEYS = {
  TRIPS: 'mytrip_trips_data_v1',
  MEMORIES: 'mytrip_memories_data_v1',
  PROFILE: 'mytrip_profile_data_v1'
};

// Imagens predefinidas em alta qualidade para viagens e memórias
const PRESET_IMAGES = [
  {
    name: 'Paris',
    url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=250&q=80'
  },
  {
    name: 'Montanhas & Lagos',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=250&q=80'
  },
  {
    name: 'Praia & Costa',
    url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=250&q=80'
  },
  {
    name: 'Templos & Cultura',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=250&q=80'
  },
  {
    name: 'Cidade Moderna',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=250&q=80'
  },
  {
    name: 'Pôr do Sol Mágico',
    url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=250&q=80'
  }
];

// Dados iniciais de demonstração (caso o LocalStorage esteja vazio)
const DEFAULT_TRIPS = [
  {
    id: 'trip-1',
    destination: 'Paris',
    country: 'França',
    flag: '🇫🇷',
    startDate: '2026-06-10',
    endDate: '2026-06-20',
    status: 'concluida', // 'concluida' ou 'proxima'
    description: 'Dez dias caminhando pelas margens do Sena, admirando os museus de arte e saboreando os melhores croissants da cidade.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80',
    mapCoords: { x: 49.5, y: 28.0 }
  },
  {
    id: 'trip-2',
    destination: 'Rio de Janeiro',
    country: 'Brasil',
    flag: '🇧🇷',
    startDate: '2026-03-15',
    endDate: '2026-03-22',
    status: 'concluida',
    description: 'Energia contagiante, pôr do sol inesquecível no Arpoador e uma vista deslumbrante de toda a cidade maravilhosa.',
    image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=900&q=80',
    mapCoords: { x: 33.5, y: 70.0 }
  },
  {
    id: 'trip-3',
    destination: 'Banff',
    country: 'Canadá',
    flag: '🇨🇦',
    startDate: '2026-12-10',
    endDate: '2026-12-20',
    status: 'proxima',
    description: 'Roteiro de inverno com lagos cristalinos congelados, montanhas rochosas com neve fofa e cabanas aconchegantes.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    mapCoords: { x: 20.0, y: 25.5 }
  },
  {
    id: 'trip-4',
    destination: 'Quioto',
    country: 'Japão',
    flag: '🇯🇵',
    startDate: '2025-10-05',
    endDate: '2025-10-15',
    status: 'concluida',
    description: 'Templos milenares, jardins zen tranquilos e as folhas de outono pintando as colinas em tons dourados e vermelhos.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
    mapCoords: { x: 82.5, y: 35.0 }
  }
];

const DEFAULT_MEMORIES = [
  {
    id: 'mem-1',
    tripId: 'trip-1',
    title: 'Pôr do sol na Torre Eiffel',
    date: '2026-06-14',
    tag: 'Pôr do Sol',
    text: 'Assistimos às luzes piscando enquanto fazíamos um piquenique com queijos franceses e vinho leve.',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mem-2',
    tripId: 'trip-2',
    title: 'Trilha do Morro Dois Irmãos',
    date: '2026-03-18',
    tag: 'Aventura',
    text: 'A subida foi desafiadora, mas a vista panorâmica de Ipanema e da Lagoa compensou cada passo!',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mem-3',
    tripId: 'trip-1',
    title: 'Café da manhã em Saint-Germain',
    date: '2026-06-12',
    tag: 'Gastronomia',
    text: 'O melhor croissant de amêndoas da vida, acompanhado de um espresso perfeito e observando a rotina parisiense.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mem-4',
    tripId: 'trip-4',
    title: 'Bosque de Bambu de Arashiyama',
    date: '2025-10-09',
    tag: 'Cultura',
    text: 'O som suave do vento passando pelos troncos gigantescos de bambu transmite uma paz difícil de explicar.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
  }
];

const DEFAULT_PROFILE = {
  name: 'Fernanda Ribeiro',
  bio: 'Apaixonada por colecionar momentos, carimbos no passaporte e pores do sol ao redor do mundo.',
  avatarInitial: 'F',
  homeCity: 'São Paulo, Brasil',
  travelStyle: 'Exploradora Cultural & Natureza',
  memberSince: '2024'
};

// ===================================================================
// GERENCIADOR DE DADOS (LOCALSTORAGE)
// ===================================================================

const DataManager = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.TRIPS)) {
      localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(DEFAULT_TRIPS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MEMORIES)) {
      localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(DEFAULT_MEMORIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
    }
  },

  getTrips() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.TRIPS)) || [];
    } catch (e) {
      console.error('Erro ao ler viagens:', e);
      return [];
    }
  },

  saveTrips(trips) {
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips));
  },

  getTripById(id) {
    const trips = this.getTrips();
    return trips.find(t => t.id === id) || null;
  },

  addTrip(tripData) {
    const trips = this.getTrips();
    const newTrip = {
      id: 'trip-' + Date.now(),
      destination: tripData.destination.trim(),
      country: tripData.country.trim(),
      flag: tripData.flag || getCountryFlag(tripData.country),
      startDate: tripData.startDate,
      endDate: tripData.endDate || tripData.startDate,
      status: tripData.status || 'proxima',
      description: tripData.description.trim(),
      image: tripData.image || PRESET_IMAGES[0].url,
      mapCoords: tripData.mapCoords || estimateCountryCoordinates(tripData.country)
    };
    trips.unshift(newTrip);
    this.saveTrips(trips);
    return newTrip;
  },

  updateTrip(id, updatedFields) {
    const trips = this.getTrips();
    const index = trips.findIndex(t => t.id === id);
    if (index !== -1) {
      trips[index] = { ...trips[index], ...updatedFields };
      this.saveTrips(trips);
      return trips[index];
    }
    return null;
  },

  deleteTrip(id) {
    let trips = this.getTrips();
    trips = trips.filter(t => t.id !== id);
    this.saveTrips(trips);

    // Também remover memórias vinculadas a esta viagem
    let memories = this.getMemories();
    memories = memories.filter(m => m.tripId !== id);
    this.saveMemories(memories);
  },

  getMemories() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.MEMORIES)) || [];
    } catch (e) {
      console.error('Erro ao ler memórias:', e);
      return [];
    }
  },

  saveMemories(memories) {
    localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories));
  },

  addMemory(memoryData) {
    const memories = this.getMemories();
    const newMemory = {
      id: 'mem-' + Date.now(),
      tripId: memoryData.tripId,
      title: memoryData.title.trim(),
      date: memoryData.date || new Date().toISOString().split('T')[0],
      tag: memoryData.tag || 'Momento',
      text: memoryData.text.trim(),
      image: memoryData.image || PRESET_IMAGES[1].url
    };
    memories.unshift(newMemory);
    this.saveMemories(memories);
    return newMemory;
  },

  deleteMemory(id) {
    let memories = this.getMemories();
    memories = memories.filter(m => m.id !== id);
    this.saveMemories(memories);
  },

  getProfile() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROFILE)) || DEFAULT_PROFILE;
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profileData) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profileData));
  },

  resetAllData() {
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(DEFAULT_TRIPS));
    localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(DEFAULT_MEMORIES));
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
  },

  calculateStats() {
    const trips = this.getTrips();
    const memories = this.getMemories();

    const tripsCount = trips.length;
    
    // Contagem de países únicos (case insensitive)
    const countriesSet = new Set(trips.map(t => t.country.trim().toLowerCase()));
    const countriesCount = countriesSet.size;

    // Contagem de destinos/cidades únicos
    const citiesSet = new Set(trips.map(t => t.destination.trim().toLowerCase()));
    const citiesCount = citiesSet.size;

    const memoriesCount = memories.length;

    const completedTrips = trips.filter(t => t.status === 'concluida');
    const upcomingTrips = trips.filter(t => t.status === 'proxima');

    // Lista de países únicos com nome formatado
    const countriesList = [];
    const seen = new Set();
    trips.forEach(t => {
      const lower = t.country.trim().toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        countriesList.push({
          name: t.country.trim(),
          flag: t.flag || '📍'
        });
      }
    });

    return {
      tripsCount,
      countriesCount,
      citiesCount,
      memoriesCount,
      completedCount: completedTrips.length,
      upcomingCount: upcomingTrips.length,
      countriesList
    };
  }
};

// ===================================================================
// UTILITÁRIOS & HELPERS
// ===================================================================

function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parts[2];
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${day} ${months[monthIndex]} ${year}`;
  }
  return dateStr;
}

function formatDateRange(startDate, endDate) {
  if (!startDate) return '';
  if (!endDate || startDate === endDate) {
    return formatDate(startDate);
  }
  const sParts = startDate.split('-');
  const eParts = endDate.split('-');
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  if (sParts[0] === eParts[0] && sParts[1] === eParts[1]) {
    // Mesmo mês e ano
    const m = months[parseInt(sParts[1], 10) - 1];
    return `${sParts[2]} — ${eParts[2]} ${m} ${sParts[0]}`;
  } else if (sParts[0] === eParts[0]) {
    // Mesmo ano, meses diferentes
    const m1 = months[parseInt(sParts[1], 10) - 1];
    const m2 = months[parseInt(eParts[1], 10) - 1];
    return `${sParts[2]} ${m1} — ${eParts[2]} ${m2} ${sParts[0]}`;
  } else {
    return `${formatDate(startDate)} — ${formatDate(endDate)}`;
  }
}

function getCountryFlag(countryName) {
  if (!countryName) return '✈️';
  const c = countryName.toLowerCase();
  if (c.includes('brasil')) return '🇧🇷';
  if (c.includes('frança') || c.includes('franca') || c.includes('france')) return '🇫🇷';
  if (c.includes('canadá') || c.includes('canada')) return '🇨🇦';
  if (c.includes('japão') || c.includes('japao') || c.includes('japan')) return '🇯🇵';
  if (c.includes('estados unidos') || c.includes('eua') || c.includes('usa')) return '🇺🇸';
  if (c.includes('itália') || c.includes('italia') || c.includes('italy')) return '🇮🇹';
  if (c.includes('espanha') || c.includes('spain')) return '🇪🇸';
  if (c.includes('portugal')) return '🇵🇹';
  if (c.includes('alemanha') || c.includes('germany')) return '🇩🇪';
  if (c.includes('reino unido') || c.includes('inglaterra') || c.includes('uk')) return '🇬🇧';
  if (c.includes('argentina')) return '🇦🇷';
  if (c.includes('chile')) return '🇨🇱';
  if (c.includes('grécia') || c.includes('grecia')) return '🇬🇷';
  if (c.includes('tailândia') || c.includes('tailandia')) return '🇹🇭';
  if (c.includes('australia') || c.includes('austrália')) return '🇦🇺';
  if (c.includes('méxico') || c.includes('mexico')) return '🇲🇽';
  return '📍';
}

function estimateCountryCoordinates(countryName) {
  if (!countryName) return { x: 50, y: 50 };
  const c = countryName.toLowerCase();
  if (c.includes('brasil')) return { x: 33.5, y: 70.0 };
  if (c.includes('frança') || c.includes('franca')) return { x: 49.5, y: 28.0 };
  if (c.includes('canadá') || c.includes('canada')) return { x: 20.0, y: 25.5 };
  if (c.includes('japão') || c.includes('japao')) return { x: 82.5, y: 35.0 };
  if (c.includes('estados unidos') || c.includes('eua')) return { x: 23.0, y: 36.0 };
  if (c.includes('itália') || c.includes('italia')) return { x: 52.0, y: 32.0 };
  if (c.includes('espanha')) return { x: 47.0, y: 33.0 };
  if (c.includes('portugal')) return { x: 45.0, y: 33.0 };
  if (c.includes('alemanha')) return { x: 51.0, y: 26.0 };
  if (c.includes('inglaterra') || c.includes('reino unido')) return { x: 48.0, y: 24.0 };
  if (c.includes('argentina')) return { x: 32.0, y: 80.0 };
  if (c.includes('chile')) return { x: 28.5, y: 78.0 };
  if (c.includes('austrália') || c.includes('australia')) return { x: 84.0, y: 75.0 };
  if (c.includes('méxico') || c.includes('mexico')) return { x: 21.0, y: 44.0 };
  if (c.includes('áfrica do sul') || c.includes('africa do sul')) return { x: 55.0, y: 78.0 };
  if (c.includes('tailândia') || c.includes('tailandia')) return { x: 74.0, y: 48.0 };
  
  // Coordenada pseudo-aleatória consistente baseada no hash do nome
  let hash = 0;
  for (let i = 0; i < countryName.length; i++) {
    hash = countryName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const x = 20 + (Math.abs(hash) % 65);
  const y = 20 + (Math.abs(hash >> 3) % 60);
  return { x, y };
}

// Toaster Notification
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? '✓' : 'ℹ';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastSlideOut 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Mobile Menu Toggle
function setupMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      toggleBtn.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
    });
  }
}

// Animação de entrada suave no Scroll (Reveal)
function setupScrollObserver() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('visible'));
  }
}

// ===================================================================
// CONTROLADOR DA HOME (index.html)
// ===================================================================

function initHomePage() {
  const stats = DataManager.calculateStats();
  const trips = DataManager.getTrips();
  const memories = DataManager.getMemories();

  // Atualizar contadores
  const statTripsEl = document.getElementById('stat-trips');
  const statCountriesEl = document.getElementById('stat-countries');
  const statCitiesEl = document.getElementById('stat-cities');
  const statMemoriesEl = document.getElementById('stat-memories');

  if (statTripsEl) statTripsEl.textContent = stats.tripsCount;
  if (statCountriesEl) statCountriesEl.textContent = stats.countriesCount;
  if (statCitiesEl) statCitiesEl.textContent = stats.citiesCount;
  if (statMemoriesEl) statMemoriesEl.textContent = stats.memoriesCount;

  // Atualizar Destaque do Próximo Destino no Hero
  const nextTrip = trips.find(t => t.status === 'proxima') || trips[0];
  const heroArtCard = document.getElementById('hero-art-card');
  if (heroArtCard && nextTrip) {
    const memCount = memories.filter(m => m.tripId === nextTrip.id).length;
    heroArtCard.innerHTML = `
      <img class="hero-art-img" src="${nextTrip.image}" alt="${nextTrip.destination}">
      <div class="hero-art-overlay"></div>
      <div class="hero-art-content">
        <div class="hero-badge-float">
          <span>${nextTrip.status === 'proxima' ? '✈️ PRÓXIMA VIAGEM' : '★ DESTAQUE'}</span>
        </div>
        <h3 class="hero-art-title">${nextTrip.destination}, ${nextTrip.country} ${nextTrip.flag || ''}</h3>
        <p class="hero-art-subtitle">📅 ${formatDateRange(nextTrip.startDate, nextTrip.endDate)} • 📸 ${memCount} memórias</p>
      </div>
    `;
  }

  // Renderizar Viagens Recentes (máximo 3)
  const recentGrid = document.getElementById('recent-trips-grid');
  if (recentGrid) {
    const recent = trips.slice(0, 3);
    if (recent.length === 0) {
      recentGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">🎒</div>
          <h3>Nenhuma viagem cadastrada ainda</h3>
          <p>Comece a planejar ou registrar suas aventuras agora mesmo.</p>
          <a href="nova-viagem.html" class="btn btn-primary">+ Criar primeira viagem</a>
        </div>
      `;
    } else {
      recentGrid.innerHTML = recent.map(trip => renderTripCardHTML(trip, memories)).join('');
    }
  }

  // Renderizar Últimas Memórias (máximo 4)
  const recentMemoriesGrid = document.getElementById('recent-memories-grid');
  if (recentMemoriesGrid) {
    const latestMem = memories.slice(0, 4);
    if (latestMem.length === 0) {
      recentMemoriesGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">📸</div>
          <h3>Nenhuma memória registrada ainda</h3>
          <p>Adicione momentos inesquecíveis das suas viagens.</p>
          <a href="memorias.html" class="btn btn-secondary">Ir para memórias</a>
        </div>
      `;
    } else {
      recentMemoriesGrid.innerHTML = latestMem.map(mem => renderMemoryCardHTML(mem, trips)).join('');
    }
  }

  // Atualizar Callout do Mapa
  const mapBadgesEl = document.getElementById('home-map-badges');
  if (mapBadgesEl && stats.countriesList.length > 0) {
    mapBadgesEl.innerHTML = stats.countriesList.slice(0, 6).map(c => `
      <span class="tag-pill" style="background: rgba(255,255,255,0.15); color: #FFF; border: none;">
        ${c.flag} ${c.name}
      </span>
    `).join('');
  }
}

// ===================================================================
// CONTROLADOR DA PÁGINA VIAGENS (viagens.html)
// ===================================================================

let currentTripFilter = 'todas';
let currentTripSearch = '';

function initViagensPage() {
  renderTripsList();

  // Configuração dos botões de filtro
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTripFilter = btn.dataset.filter || 'todas';
      renderTripsList();
    });
  });

  // Configuração da barra de busca
  const searchInput = document.getElementById('trips-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentTripSearch = e.target.value.toLowerCase().trim();
      renderTripsList();
    });
  }

  // Configuração do Modal de Edição
  setupTripEditModal();
}

function renderTripsList() {
  const container = document.getElementById('trips-container');
  if (!container) return;

  const trips = DataManager.getTrips();
  const memories = DataManager.getMemories();

  // Aplicar filtros de status e busca
  let filtered = trips.filter(trip => {
    const matchesFilter = 
      currentTripFilter === 'todas' ||
      (currentTripFilter === 'proximas' && trip.status === 'proxima') ||
      (currentTripFilter === 'concluidas' && trip.status === 'concluida');

    const matchesSearch = 
      !currentTripSearch ||
      trip.destination.toLowerCase().includes(currentTripSearch) ||
      trip.country.toLowerCase().includes(currentTripSearch) ||
      trip.description.toLowerCase().includes(currentTripSearch);

    return matchesFilter && matchesSearch;
  });

  // Atualizar contador do cabeçalho se existir
  const countBadge = document.getElementById('trips-count-badge');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} ${filtered.length === 1 ? 'viagem' : 'viagens'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">🌍</div>
        <h3>Nenhuma viagem encontrada</h3>
        <p>Não encontramos viagens correspondentes a este filtro ou termo de busca.</p>
        <a href="nova-viagem.html" class="btn btn-primary">+ Criar nova viagem</a>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(trip => renderTripCardHTML(trip, memories, true)).join('');

  // Atrelar eventos dos botões dos cards
  container.querySelectorAll('.btn-delete-trip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const trip = DataManager.getTripById(id);
      if (confirm(`Tem certeza que deseja excluir a viagem para ${trip ? trip.destination : 'este destino'}? Todas as memórias vinculadas também serão excluídas.`)) {
        DataManager.deleteTrip(id);
        showToast('Viagem excluída com sucesso.', 'success');
        renderTripsList();
      }
    });
  });

  container.querySelectorAll('.btn-edit-trip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      openTripEditModal(id);
    });
  });
}

function renderTripCardHTML(trip, memories = [], showControls = false) {
  const tripMemories = memories.filter(m => m.tripId === trip.id);
  const isCompleted = trip.status === 'concluida';
  const statusBadge = isCompleted
    ? `<span class="badge badge-concluida">✓ Concluída</span>`
    : `<span class="badge badge-proxima">✈️ Próxima</span>`;

  return `
    <article class="trip-card fade-in visible" data-id="${trip.id}">
      <div class="trip-card-image">
        <img src="${trip.image}" alt="${trip.destination}" loading="lazy" onerror="this.src='${PRESET_IMAGES[0].url}'">
        <div class="trip-card-image-overlay"></div>
        <div class="trip-card-badges">
          <span class="trip-card-country-tag">${trip.flag || '📍'} ${trip.country}</span>
          ${statusBadge}
        </div>
      </div>
      <div class="trip-card-body">
        <h3 class="trip-card-title">${trip.destination}</h3>
        <div class="trip-card-date">
          <span>📅</span>
          <span>${formatDateRange(trip.startDate, trip.endDate)}</span>
        </div>
        <p class="trip-card-desc">${trip.description || 'Sem descrição cadastrada.'}</p>
        
        <div class="trip-card-footer">
          <span class="trip-card-memories-count">
            📸 ${tripMemories.length} ${tripMemories.length === 1 ? 'memória' : 'memórias'}
          </span>
          
          <div class="trip-card-actions">
            ${showControls ? `
              <button class="btn btn-outline btn-sm btn-edit-trip" data-id="${trip.id}" title="Editar viagem">
                ✏️ Editar
              </button>
              <button class="btn btn-danger-outline btn-sm btn-delete-trip" data-id="${trip.id}" title="Excluir viagem">
                🗑️
              </button>
            ` : `
              <a href="viagens.html" class="btn btn-outline btn-sm">Ver viagem →</a>
            `}
          </div>
        </div>
      </div>
    </article>
  `;
}

// Modal de Edição de Viagem
function setupTripEditModal() {
  const backdrop = document.getElementById('edit-trip-modal');
  const closeBtn = document.getElementById('close-edit-modal-btn');
  const form = document.getElementById('edit-trip-form');

  if (closeBtn && backdrop) {
    closeBtn.addEventListener('click', () => {
      backdrop.classList.remove('active');
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-trip-id').value;
      const updated = {
        destination: document.getElementById('edit-destination').value.trim(),
        country: document.getElementById('edit-country').value.trim(),
        flag: getCountryFlag(document.getElementById('edit-country').value.trim()),
        startDate: document.getElementById('edit-start-date').value,
        endDate: document.getElementById('edit-end-date').value,
        status: document.getElementById('edit-status').value,
        description: document.getElementById('edit-description').value.trim(),
        image: document.getElementById('edit-image').value.trim()
      };

      DataManager.updateTrip(id, updated);
      backdrop.classList.remove('active');
      showToast('Viagem atualizada com sucesso!', 'success');
      renderTripsList();
    });
  }
}

function openTripEditModal(tripId) {
  const trip = DataManager.getTripById(tripId);
  if (!trip) return;

  const backdrop = document.getElementById('edit-trip-modal');
  if (!backdrop) return;

  document.getElementById('edit-trip-id').value = trip.id;
  document.getElementById('edit-destination').value = trip.destination;
  document.getElementById('edit-country').value = trip.country;
  document.getElementById('edit-start-date').value = trip.startDate || '';
  document.getElementById('edit-end-date').value = trip.endDate || '';
  document.getElementById('edit-status').value = trip.status || 'proxima';
  document.getElementById('edit-description').value = trip.description || '';
  document.getElementById('edit-image').value = trip.image || '';

  backdrop.classList.add('active');
}

// ===================================================================
// CONTROLADOR DA PÁGINA NOVA VIAGEM (nova-viagem.html)
// ===================================================================

function initNovaViagemPage() {
  const form = document.getElementById('new-trip-form');
  const presetsContainer = document.getElementById('cover-presets-container');
  const imageInput = document.getElementById('trip-image-input');
  const imagePreview = document.getElementById('cover-preview-img');

  // Renderizar presets de fotos
  if (presetsContainer) {
    presetsContainer.innerHTML = PRESET_IMAGES.map((preset, index) => `
      <div class="preset-item ${index === 0 ? 'selected' : ''}" data-url="${preset.url}">
        <img src="${preset.thumb}" alt="${preset.name}" title="${preset.name}">
      </div>
    `).join('');

    // Definir o primeiro preset por padrão
    if (imageInput && !imageInput.value) {
      imageInput.value = PRESET_IMAGES[0].url;
      if (imagePreview) imagePreview.src = PRESET_IMAGES[0].url;
    }

    presetsContainer.querySelectorAll('.preset-item').forEach(item => {
      item.addEventListener('click', () => {
        presetsContainer.querySelectorAll('.preset-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        const url = item.dataset.url;
        if (imageInput) imageInput.value = url;
        if (imagePreview) imagePreview.src = url;
      });
    });
  }

  // Atualização em tempo real quando o usuário digita uma URL personalizada
  if (imageInput) {
    imageInput.addEventListener('input', (e) => {
      const url = e.target.value.trim();
      if (url && imagePreview) {
        imagePreview.src = url;
      }
      // Desmarcar seletores de preset se for uma url diferente
      if (presetsContainer) {
        presetsContainer.querySelectorAll('.preset-item').forEach(i => {
          if (i.dataset.url === url) {
            i.classList.add('selected');
          } else {
            i.classList.remove('selected');
          }
        });
      }
    });
  }

  // Submissão do Formulário
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const destination = document.getElementById('trip-destination').value.trim();
      const country = document.getElementById('trip-country').value.trim();
      const startDate = document.getElementById('trip-start-date').value;
      const endDate = document.getElementById('trip-end-date').value || startDate;
      const status = document.getElementById('trip-status').value;
      const description = document.getElementById('trip-description').value.trim();
      const image = imageInput ? imageInput.value.trim() : PRESET_IMAGES[0].url;

      if (!destination || !country || !startDate) {
        showToast('Por favor preencha todos os campos obrigatórios.', 'error');
        return;
      }

      DataManager.addTrip({
        destination,
        country,
        startDate,
        endDate,
        status,
        description,
        image
      });

      showToast('Viagem criada com sucesso! Redirecionando...', 'success');
      setTimeout(() => {
        window.location.href = 'viagens.html';
      }, 700);
    });
  }
}

// ===================================================================
// CONTROLADOR DA PÁGINA MAPA (mapa.html)
// ===================================================================

function initMapaPage() {
  const mapStage = document.getElementById('map-stage');
  const destinationsList = document.getElementById('map-destinations-list');
  const tooltip = document.getElementById('map-tooltip');

  if (!mapStage) return;

  const trips = DataManager.getTrips();
  const memories = DataManager.getMemories();

  // Limpar pins existentes
  mapStage.querySelectorAll('.map-pin').forEach(p => p.remove());

  // Renderizar Pins no Mapa
  trips.forEach(trip => {
    const coords = trip.mapCoords || estimateCountryCoordinates(trip.country);
    const pin = document.createElement('div');
    pin.className = `map-pin ${trip.status === 'proxima' ? 'pin-upcoming' : ''}`;
    pin.style.left = `${coords.x}%`;
    pin.style.top = `${coords.y}%`;
    pin.dataset.tripId = trip.id;

    pin.innerHTML = `
      <div class="map-pin-pulse"></div>
      <div class="map-pin-circle">${trip.flag || '📍'}</div>
    `;

    // Tooltip interativo
    const tripMemoriesCount = memories.filter(m => m.tripId === trip.id).length;
    pin.addEventListener('mouseenter', () => {
      if (tooltip) {
        tooltip.innerHTML = `
          <strong>${trip.destination}, ${trip.country} ${trip.flag || ''}</strong>
          <span>${trip.status === 'concluida' ? '✓ Concluída' : '✈️ Planejada'} • ${tripMemoriesCount} memórias</span>
        `;
        tooltip.style.left = `${coords.x}%`;
        tooltip.style.top = `${coords.y}%`;
        tooltip.classList.add('visible');
      }
      highlightSidebarItem(trip.id);
    });

    pin.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.classList.remove('visible');
    });

    pin.addEventListener('click', () => {
      window.location.href = `viagens.html`;
    });

    mapStage.appendChild(pin);
  });

  // Renderizar Lista Lateral de Destinos
  if (destinationsList) {
    if (trips.length === 0) {
      destinationsList.innerHTML = `
        <div class="empty-state" style="padding: 24px 10px;">
          <p>Nenhum destino para exibir no mapa.</p>
        </div>
      `;
    } else {
      destinationsList.innerHTML = trips.map(trip => {
        const isNext = trip.status === 'proxima';
        const memCount = memories.filter(m => m.tripId === trip.id).length;
        return `
          <div class="map-dest-item" data-id="${trip.id}">
            <div class="map-dest-info">
              <h4>${trip.flag || '📍'} ${trip.destination}, ${trip.country}</h4>
              <p>${formatDateRange(trip.startDate, trip.endDate)} • ${memCount} memórias</p>
            </div>
            <span class="badge ${isNext ? 'badge-proxima' : 'badge-concluida'}">
              ${isNext ? 'Planejada' : 'Visitada'}
            </span>
          </div>
        `;
      }).join('');

      // Eventos de hover na lista para focar no pin do mapa
      destinationsList.querySelectorAll('.map-dest-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
          const id = item.dataset.id;
          const pin = mapStage.querySelector(`.map-pin[data-trip-id="${id}"]`);
          if (pin) {
            mapStage.querySelectorAll('.map-pin').forEach(p => p.classList.remove('active'));
            pin.classList.add('active');
          }
        });
        item.addEventListener('mouseleave', () => {
          mapStage.querySelectorAll('.map-pin').forEach(p => p.classList.remove('active'));
        });
        item.addEventListener('click', () => {
          window.location.href = 'viagens.html';
        });
      });
    }
  }

  function highlightSidebarItem(tripId) {
    if (!destinationsList) return;
    destinationsList.querySelectorAll('.map-dest-item').forEach(item => {
      if (item.dataset.id === tripId) {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });
  }
}

// ===================================================================
// CONTROLADOR DA PÁGINA MEMÓRIAS (memorias.html)
// ===================================================================

let currentMemoryTripFilter = 'todas';

function initMemoriasPage() {
  const trips = DataManager.getTrips();
  const filterSelect = document.getElementById('memory-trip-filter');

  // Preencher seletor de filtro por viagem
  if (filterSelect) {
    filterSelect.innerHTML = `
      <option value="todas">Todas as viagens</option>
      ${trips.map(t => `<option value="${t.id}">${t.destination} (${t.country})</option>`).join('')}
    `;

    filterSelect.addEventListener('change', (e) => {
      currentMemoryTripFilter = e.target.value;
      renderMemoriesList();
    });
  }

  renderMemoriesList();
  setupNewMemoryModal();
}

function renderMemoriesList() {
  const container = document.getElementById('memories-container');
  if (!container) return;

  const memories = DataManager.getMemories();
  const trips = DataManager.getTrips();

  const filtered = memories.filter(m => {
    return currentMemoryTripFilter === 'todas' || m.tripId === currentMemoryTripFilter;
  });

  const countEl = document.getElementById('memories-count-badge');
  if (countEl) {
    countEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'memória' : 'memórias'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">📷</div>
        <h3>Nenhuma memória encontrada</h3>
        <p>Grave suas lembranças, fotos especiais e momentos únicos das suas viagens.</p>
        <button class="btn btn-primary" onclick="openNewMemoryModal()">+ Adicionar memória</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(mem => renderMemoryCardHTML(mem, trips, true)).join('');

  // Atrelar exclusão de memórias
  container.querySelectorAll('.btn-delete-memory').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      if (confirm('Deseja excluir esta memória?')) {
        DataManager.deleteMemory(id);
        showToast('Memória removida com sucesso.', 'success');
        renderMemoriesList();
      }
    });
  });
}

function renderMemoryCardHTML(memory, trips = [], showControls = false) {
  const trip = trips.find(t => t.id === memory.tripId);
  const tripLabel = trip ? `${trip.destination}, ${trip.country} ${trip.flag || ''}` : 'Viagem';

  return `
    <article class="memory-card fade-in visible" data-id="${memory.id}">
      <div class="memory-card-image">
        <img src="${memory.image}" alt="${memory.title}" loading="lazy" onerror="this.src='${PRESET_IMAGES[1].url}'">
        ${memory.tag ? `<span class="memory-tag">${memory.tag}</span>` : ''}
      </div>
      <div class="memory-card-body">
        <span class="memory-trip-ref">📍 ${tripLabel}</span>
        <h4 class="memory-title">${memory.title}</h4>
        <span class="memory-date">📅 ${formatDate(memory.date)}</span>
        <p class="memory-text">${memory.text}</p>
        
        ${showControls ? `
          <div class="memory-card-footer">
            <button class="btn btn-danger-outline btn-sm btn-delete-memory" data-id="${memory.id}" title="Excluir memória">
              🗑️ Excluir
            </button>
          </div>
        ` : ''}
      </div>
    </article>
  `;
}

// Modal de Criação de Memória
function setupNewMemoryModal() {
  const backdrop = document.getElementById('new-memory-modal');
  const openBtn = document.getElementById('btn-open-memory-modal');
  const closeBtn = document.getElementById('close-memory-modal-btn');
  const form = document.getElementById('new-memory-form');
  const tripSelect = document.getElementById('memory-trip-select');
  const presetsContainer = document.getElementById('memory-presets-container');
  const imageInput = document.getElementById('memory-image-input');

  if (openBtn) {
    openBtn.addEventListener('click', openNewMemoryModal);
  }

  if (closeBtn && backdrop) {
    closeBtn.addEventListener('click', () => backdrop.classList.remove('active'));
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    });
  }

  // Preencher presets de foto da memória
  if (presetsContainer) {
    presetsContainer.innerHTML = PRESET_IMAGES.map((preset, i) => `
      <div class="preset-item ${i === 1 ? 'selected' : ''}" data-url="${preset.url}">
        <img src="${preset.thumb}" alt="${preset.name}">
      </div>
    `).join('');

    if (imageInput && !imageInput.value) {
      imageInput.value = PRESET_IMAGES[1].url;
    }

    presetsContainer.querySelectorAll('.preset-item').forEach(item => {
      item.addEventListener('click', () => {
        presetsContainer.querySelectorAll('.preset-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        if (imageInput) imageInput.value = item.dataset.url;
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const tripId = tripSelect.value;
      const title = document.getElementById('memory-title').value.trim();
      const date = document.getElementById('memory-date').value;
      const tag = document.getElementById('memory-tag').value;
      const text = document.getElementById('memory-text').value.trim();
      const image = imageInput ? imageInput.value.trim() : PRESET_IMAGES[1].url;

      if (!tripId || !title || !text) {
        showToast('Por favor preencha os campos obrigatórios.', 'error');
        return;
      }

      DataManager.addMemory({
        tripId,
        title,
        date,
        tag,
        text,
        image
      });

      backdrop.classList.remove('active');
      form.reset();
      showToast('Memória guardada com sucesso!', 'success');
      renderMemoriesList();
    });
  }
}

function openNewMemoryModal() {
  const backdrop = document.getElementById('new-memory-modal');
  const tripSelect = document.getElementById('memory-trip-select');
  const trips = DataManager.getTrips();

  if (!backdrop || !tripSelect) return;

  if (trips.length === 0) {
    alert('Você precisa ter pelo menos uma viagem cadastrada antes de adicionar memórias.');
    window.location.href = 'nova-viagem.html';
    return;
  }

  tripSelect.innerHTML = trips.map(t => `
    <option value="${t.id}">${t.destination}, ${t.country} (${formatDate(t.startDate)})</option>
  `).join('');

  const dateInput = document.getElementById('memory-date');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  backdrop.classList.add('active');
}

// ===================================================================
// CONTROLADOR DA PÁGINA PERFIL (perfil.html)
// ===================================================================

function initPerfilPage() {
  renderProfileData();
  setupProfileEditModal();
  setupDataManagementActions();
}

function renderProfileData() {
  const profile = DataManager.getProfile();
  const stats = DataManager.calculateStats();

  // Informações do viajante
  const nameEl = document.getElementById('profile-name');
  const bioEl = document.getElementById('profile-bio');
  const avatarEl = document.getElementById('profile-avatar');
  const styleEl = document.getElementById('profile-travel-style');
  const cityEl = document.getElementById('profile-home-city');

  if (nameEl) nameEl.textContent = profile.name;
  if (bioEl) bioEl.textContent = profile.bio;
  if (avatarEl) avatarEl.textContent = profile.avatarInitial || profile.name.charAt(0).toUpperCase();
  if (styleEl) styleEl.textContent = profile.travelStyle || 'Explorador';
  if (cityEl) cityEl.textContent = profile.homeCity || 'Mundo';

  // Estatísticas no perfil
  const statTrips = document.getElementById('prof-stat-trips');
  const statCountries = document.getElementById('prof-stat-countries');
  const statCities = document.getElementById('prof-stat-cities');
  const statMemories = document.getElementById('prof-stat-memories');
  const statUpcoming = document.getElementById('prof-stat-upcoming');
  const statCompleted = document.getElementById('prof-stat-completed');

  if (statTrips) statTrips.textContent = stats.tripsCount;
  if (statCountries) statCountries.textContent = stats.countriesCount;
  if (statCities) statCities.textContent = stats.citiesCount;
  if (statMemories) statMemories.textContent = stats.memoriesCount;
  if (statUpcoming) statUpcoming.textContent = stats.upcomingCount;
  if (statCompleted) statCompleted.textContent = stats.completedCount;

  // Coleção de países visitados (chips)
  const countriesWrapper = document.getElementById('profile-countries-list');
  if (countriesWrapper) {
    if (stats.countriesList.length === 0) {
      countriesWrapper.innerHTML = `<p style="color: var(--text-muted);">Nenhum país registrado ainda.</p>`;
    } else {
      countriesWrapper.innerHTML = stats.countriesList.map(c => `
        <span class="country-chip">
          <span>${c.flag}</span>
          <span>${c.name}</span>
        </span>
      `).join('');
    }
  }
}

function setupProfileEditModal() {
  const backdrop = document.getElementById('edit-profile-modal');
  const openBtn = document.getElementById('btn-open-edit-profile');
  const closeBtn = document.getElementById('close-profile-modal-btn');
  const form = document.getElementById('edit-profile-form');

  if (openBtn && backdrop) {
    openBtn.addEventListener('click', () => {
      const profile = DataManager.getProfile();
      document.getElementById('profile-input-name').value = profile.name;
      document.getElementById('profile-input-bio').value = profile.bio;
      document.getElementById('profile-input-city').value = profile.homeCity || '';
      document.getElementById('profile-input-style').value = profile.travelStyle || '';
      backdrop.classList.add('active');
    });
  }

  if (closeBtn && backdrop) {
    closeBtn.addEventListener('click', () => backdrop.classList.remove('active'));
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('profile-input-name').value.trim();
      const bio = document.getElementById('profile-input-bio').value.trim();
      const homeCity = document.getElementById('profile-input-city').value.trim();
      const travelStyle = document.getElementById('profile-input-style').value.trim();

      const profile = {
        name: name || 'Viajante',
        bio: bio,
        avatarInitial: (name || 'V').charAt(0).toUpperCase(),
        homeCity,
        travelStyle,
        memberSince: '2024'
      };

      DataManager.saveProfile(profile);
      backdrop.classList.remove('active');
      showToast('Perfil atualizado com sucesso!', 'success');
      renderProfileData();
    });
  }
}

function setupDataManagementActions() {
  const resetBtn = document.getElementById('btn-reset-demo-data');
  const exportBtn = document.getElementById('btn-export-data');

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Deseja restaurar os dados de demonstração originais? Suas viagens atuais serão substituídas.')) {
        DataManager.resetAllData();
        showToast('Dados de demonstração restaurados.', 'success');
        setTimeout(() => location.reload(), 600);
      }
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const exportObject = {
        trips: DataManager.getTrips(),
        memories: DataManager.getMemories(),
        profile: DataManager.getProfile(),
        exportedAt: new Date().toISOString()
      };
      const jsonStr = JSON.stringify(exportObject, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mytrip-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Arquivo de backup gerado com sucesso!', 'success');
    });
  }
}

// ===================================================================
// INICIALIZADOR GLOBAL POR PÁGINA
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar banco de dados LocalStorage se necessário
  DataManager.init();

  // Configurar menu mobile e observadores visuais
  setupMobileMenu();
  setupScrollObserver();

  // Identificar página atual
  const path = window.location.pathname.toLowerCase();
  const pageType = document.body.dataset.page;

  if (pageType === 'home' || path.endsWith('index.html') || path.endsWith('/') || path === '') {
    initHomePage();
  } else if (pageType === 'viagens' || path.endsWith('viagens.html')) {
    initViagensPage();
  } else if (pageType === 'nova-viagem' || path.endsWith('nova-viagem.html')) {
    initNovaViagemPage();
  } else if (pageType === 'mapa' || path.endsWith('mapa.html')) {
    initMapaPage();
  } else if (pageType === 'memorias' || path.endsWith('memorias.html')) {
    initMemoriasPage();
  } else if (pageType === 'perfil' || path.endsWith('perfil.html')) {
    initPerfilPage();
  }
});