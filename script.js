window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 2000);
});

// --- Lógica para o Menu Mobile (Hambúrguer) ---
class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";
        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
        this.navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (this.navList.classList.contains(this.activeClass)) {
                    this.handleClick();
                }
            });
        });
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    ".mobile-menu-icon",
    ".nav-list",
    ".nav-list li",
);
mobileNavbar.init();


// --- LÓGICA ATUALIZADA PARA O BOTÃO WHATSAPP ---
document.getElementById('whatsapp-button').addEventListener('click', function() {
    
    // 1. Pegar os dados dos campos do formulário
    const nome = document.getElementById('nome').value;
    // Pega o valor do menu de seleção agora
    const servico = document.getElementById('servico-selecao').value;

    const numeroTel = document.getElementById('number').value;

// Regex para (11) 91234-5678
const telefoneValido = /^\(\d{2}\)\s?\d{5}\d{4}$/.test(numeroTel);

if (!telefoneValido) {
    alert("Por favor, insira um número válido no formato (11) 91234-5678.");
    return;
}

    // Validação para garantir que o nome e o serviço foram preenchidos
    if (nome === "" || servico === "") {
        alert("Por favor, preencha seu nome e selecione um serviço.");
        return; 
    }

    let mensagem;
    if(servico === "Outro Serviço") {
        mensagem = `Olá! Meu nome é ${nome}. Gostaria de saber mais sobre os serviços oferecidos além do que está no site.\n Meu telefone para contato é: ${numeroTel}`;
    } else {
        mensagem = `Olá! Meu nome é ${nome}. Gostaria de agendar o seguinte serviço: *${servico}*.\n Meu telefone para contato é: ${numeroTel}.`;
    }
    // 3. O SEU NÚMERO DE TELEFONE
    const seuNumero = "5511992668746"; // <--- SUBSTITUA PELO SEU NÚMERO DE WHATSAPP

    // 4. Codificar a mensagem para o formato de URL
    const mensagemCodificada = encodeURIComponent(mensagem);

    // 5. Criar o link final do WhatsApp
    const linkWhatsApp = `https://wa.me/${seuNumero}?text=${mensagemCodificada}`;

    // 6. Abrir o link em uma nova aba
    window.open(linkWhatsApp, '_blank');
});

// --- 5. ANIMAÇÃO AO ROLAR A PÁGINA (COM REPETIÇÃO) ---
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Se a seção está visível na tela, ADICIONA a classe.
            entry.target.classList.add('visible');
        } else {
            // Se a seção NÃO está mais visível, REMOVE a classe.
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1 // A animação começa quando 10% da seção está visível
});

sections.forEach(section => {
    observer.observe(section);
});
