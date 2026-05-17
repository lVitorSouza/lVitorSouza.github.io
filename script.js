// ========== PROJECTS DATA - COMPLETO ==========
const projects = [
    // ILUSTRAÇÕES (10 projetos)
    {
        category: 'ilustracao',
        title: 'Releitura Rembrandt',
        description: 'Aquarela inspirada em obra clássica de Rembrandt',
        image: 'rembrandt.jpg'
    },
    {
        category: 'ilustracao',
        title: 'Guerreiro Android',
        description: 'Desenho a nanquim de personagem futurista',
        image: 'guerreiro.jpg'
    },
    {
        category: 'ilustracao',
        title: 'Detetive Conan',
        description: 'Grande detetive do mundo dos animes',
        image: 'conan.jpg'
    },
    {
        category: 'ilustracao',
        title: 'Turma do Pererê',
        description: 'Ilustração colorida de personagens brasileiros',
        image: 'turma do perere.jpg'
    },
    {
        category: 'ilustracao',
        title: 'Deusa do Amor',
        description: 'Arte em grafite com traços expressivas',
        image: 'deusa do amor.jpg'
    },
    {
        category: 'ilustracao',
        title: 'Flamingo',
        description: 'Aquarela suave de ave tropical',
        image: 'flamingo.jpg'
    },
    {
        category: 'ilustracao',
        title: 'Meliodas Fan Art',
        description: 'Ilustração digital de personagem para projeto de cliente',
        image: 'meliodas.jpg'
    },
    {
        category: 'ilustracao',
        title: 'Arte Conceitual',
        description: 'Visões do Oceano',
        image: 'paisagem.jpg'
    },
    {
        category: 'ilustracao',
        title: 'Da Vinci',
        description: 'Releitura de obra clássica',
        image: 'DAVINCI.jpg'
    },
    {
        category: 'ilustracao',
        title: 'Mestra Genkai Fan Art',
        description: 'Ilustração de uma personagem icônica',
        image: 'mestra genkai.jpg'
    },
    
    // EDIÇÃO (7 projetos)
    {
        category: 'edicao',
        title: 'Natal Iluminado',
        description: 'Captura de decoração natalina com luzes',
        image: '21.jpg'
    },
    {
        category: 'edicao',
        title: 'Flores Vermelhas',
        description: 'Fotografia macro de flores em ambiente natural',
        image: '22.jpg'
    },
    {
        category: 'edicao',
        title: 'Céu e Natureza',
        description: 'Paisagem com árvores e céu dramático',
        image: '23.jpg'
    },
    {
        category: 'edicao',
        title: 'Jardim Tranquilo',
        description: 'Composição de jardim residencial',
        image: '24.jpg'
    },
    {
        category: 'edicao',
        title: 'Céu Tropical',
        description: 'Palmeiras com céu nublado ao fundo',
        image: '25.jpg'
    },
    {
        category: 'edicao',
        title: 'Flor Solitária',
        description: 'Detalhe artístico de flor vermelha',
        image: '26.jpg'
    },
    {
        category: 'edicao',
        title: 'Monumento Urbano',
        description: 'Arquitetura e arte urbana',
        image: '27.jpg'
    },
    
    // IDENTIDADE VISUAL (10 projetos)
    {
        category: 'identidade',
        title: 'Dicas para sua segurança na internet',
        description: 'Conteúdo introdutório sobre segurança digital',
        image: 'imagem1.png'
    },
    {
        category: 'identidade',
        title: '5 Dicas de Segurança em Compras Online',
        description: 'Texto informativo sobre segurança em compras online',
        image: 'imagem2.png'
    },
    {
        category: 'identidade',
        title: 'Desconfie de ofertas muito boas para ser verdade',
        description: 'Orientações sobre golpes e ofertas enganosas',
        image: 'imagem3.png'
    },
    {
        category: 'identidade',
        title: 'Cuidado com as irregularidades em sua conta',
        description: 'Texto explicativo sobre monitoramento financeiro',
        image: 'imagem4.png'
    },
    {
        category: 'identidade',
        title: 'Desconfie de ofertas mirabolantes',
        description: 'Orientações sobre golpes e ofertas enganosas',
        image: 'imagem5.png'
    },
    {
        category: 'identidade',
        title: '3 Dicas para proteger suas senhas',
        description: 'Recomendações para proteção de dados pessoais',
        image: 'imagem6.png'
    },
    {
        category: 'identidade',
        title: 'Design de Logotipo Froggi',
        description: 'Design criativo para identidade visual de marca',
        image: 'logotipofroggi.png'
    },
    {
        category: 'identidade',
        title: 'Campanha de Segurança Digital',
        description: 'Peça visual para campanha de conscientização digital',
        image: 'pequenoss.png'
    },
    {
        category: 'identidade',
        title: 'Logomarca P & S — Ícone',
        description: 'Ícone para a construção da logomarca',
        image: 'froggi.png'
    },
    {
        category: 'identidade',
        title: 'Logomarca P & S — Versão Completa',
        description: 'Aplicação completa da logomarca com tipografia',
        image: 'froggi learnirg.png'
    },
];

// ========== RENDER PROJECTS ==========
const grid = document.getElementById('grid');

function renderProjects(filter = 'todos') {
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const filtered = filter === 'todos' 
        ? projects 
        : projects.filter(p => p.category === filter);
    
    filtered.forEach((project) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
            <div class="project-info">
                <div class="project-category">${getCategoryName(project.category)}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function getCategoryName(cat) {
    const names = {
        'ilustracao': 'Ilustração',
        'edicao': 'Edição',
        'identidade': 'Identidade Visual'
    };
    return names[cat] || cat;
}

// Renderizar ao carregar
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
});

// ========== FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.category);
    });
});

// ========== PORTFOLIO MODAL ==========
const portfolioImages = [
    'quem-sou-eu.jpg',
    'fundador.jpg',
    'te-ajudo.jpg',
    'precisa-de-ajuda.jpg',
    'eu-preto-e-branco.png',
    'vitu-studio-banner.png'
];

let currentImageIndex = 0;
const modal = document.getElementById('portfolioModal');
const modalImage = document.getElementById('modalImage');
const modalCounter = document.getElementById('modalCounter');
const logoLink = document.getElementById('logoLink');

if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(0);
    });
}

function openModal(index) {
    currentImageIndex = index;
    updateModalImage();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateModalImage() {
    modalImage.src = portfolioImages[currentImageIndex];
    modalCounter.textContent = `${currentImageIndex + 1} / ${portfolioImages.length}`;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
    updateModalImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
    updateModalImage();
}

document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.modal-close');
    const nextBtn = document.querySelector('.modal-next');
    const prevBtn = document.querySelector('.modal-prev');
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});

document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== HEADER SCROLL ==========
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.pageYOffset > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ========== CUSTOM CURSOR ==========
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 20 + 'px';
        cursor.style.top = e.clientY - 20 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(1.5)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
    });
}

// ========== CONTACT FORM ==========
const cfSubmit = document.getElementById('cf-submit');

if (cfSubmit) {
    cfSubmit.addEventListener('click', async () => {
        const name    = document.getElementById('cf-name').value.trim();
        const email   = document.getElementById('cf-email').value.trim();
        const message = document.getElementById('cf-message').value.trim();
        const website = document.getElementById('cf-honeypot')?.value || '';

        const feedback = document.getElementById('cf-feedback');
        feedback.textContent = '';
        feedback.className = 'cf-feedback';

        if (!name || !email || !message) {
            feedback.textContent = 'Preencha todos os campos.';
            feedback.classList.add('error');
            return;
        }

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, website })
            });

            const data = await res.json();

            if (res.ok) {
                feedback.textContent = '✓ Mensagem enviada com sucesso!';
                feedback.classList.add('success');
                document.getElementById('cf-name').value    = '';
                document.getElementById('cf-email').value   = '';
                document.getElementById('cf-message').value = '';
            } else {
                feedback.textContent = data.error || 'Erro ao enviar.';
                feedback.classList.add('error');
            }

        } catch (err) {
            feedback.textContent = 'Erro de conexão.';
            feedback.classList.add('error');
        }
    });
}