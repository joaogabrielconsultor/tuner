// Carbon Performance — Configuração do site
// Edite via /admin.html ou diretamente aqui

const BRP_CONFIG = {
  empresa: {
    nome: 'Carbon Performance',
    slogan: 'Professional Chiptuning',
    morada_linha1: 'Zuberoa Etorb. 8, 10',
    morada_linha2: '48012 Errekalde, Bilbao, Bizkaia',
    telefone: '+34 680 911 007',
    telefone_link: 'tel:34680911007',
    email: 'barcelona@br-performance.com',
    horario: 'Lunes–Viernes: 9:00–18:00 | Sábado: Con cita previa'
  },
  redes: {
    facebook: 'https://www.facebook.com/BRPerformanceBarcelona',
    youtube: 'http://www.youtube.com/user/BRPerformances',
    instagram: 'https://www.instagram.com/brperformance_bcn'
  },
  seo: {
    titulo_home: 'Home - Carbon Performance - Reprogramación de centralitas',
    descricao: 'Chiptuning y reprogramación profesional de centralitas en Barcelona. TÜV Rheinland certificado.'
  },
  links: {
    condicoes_venda: 'https://www.br-performance.com/brp-barcelona/condiciones-de-venta/',
    politica_privacidade: 'https://www.br-performance.com/brp-barcelona/privacy-policy',
    langselect: 'https://www.br-performance.eu/langselect/'
  }
};

// Mescla com localStorage se existir
(function () {
  try {
    const saved = localStorage.getItem('brp_config');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.keys(parsed).forEach(section => {
        if (BRP_CONFIG[section]) {
          Object.assign(BRP_CONFIG[section], parsed[section]);
        }
      });
    }
  } catch (e) {}

  // Aplica no DOM quando a página carregar
  document.addEventListener('DOMContentLoaded', function () {
    applyConfig(BRP_CONFIG);
  });
})();

function applyConfig(cfg) {
  // Telefone
  document.querySelectorAll('[data-cfg="telefone"]').forEach(el => el.textContent = cfg.empresa.telefone);
  document.querySelectorAll('[data-cfg="telefone-href"]').forEach(el => el.href = cfg.empresa.telefone_link);
  // Email
  document.querySelectorAll('[data-cfg="email"]').forEach(el => el.href = 'mailto:' + cfg.empresa.email);
  document.querySelectorAll('[data-cfg="email-text"]').forEach(el => el.textContent = cfg.empresa.email);
  // Morada
  document.querySelectorAll('[data-cfg="morada1"]').forEach(el => el.textContent = cfg.empresa.morada_linha1);
  document.querySelectorAll('[data-cfg="morada2"]').forEach(el => el.textContent = cfg.empresa.morada_linha2);
  // Redes sociais
  document.querySelectorAll('[data-cfg="facebook"]').forEach(el => el.href = cfg.redes.facebook);
  document.querySelectorAll('[data-cfg="youtube"]').forEach(el => el.href = cfg.redes.youtube);
  document.querySelectorAll('[data-cfg="instagram"]').forEach(el => el.href = cfg.redes.instagram);
  // Slogan
  document.querySelectorAll('[data-cfg="slogan"]').forEach(el => el.textContent = cfg.empresa.slogan);
}
