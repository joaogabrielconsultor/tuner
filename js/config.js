// Carbon Performance — Configuração do site
// Edite diretamente aqui (o painel admin.html foi removido)

const BRP_CONFIG = {
  empresa: {
    nome: 'Carbon Performance',
    slogan: 'Professional Chiptuning',
    morada_linha1: 'Zuberoa Etorb. 8, 10',
    morada_linha2: '48012 Errekalde, Bilbao, Bizkaia',
    telefone: '+34 680 911 007',
    telefone_link: 'tel:+34680911007',
    email: 'barcelona@br-performance.com',
    horario: 'Lunes–Sábado: 9:00–13:00 y 14:00–18:00 | Domingo: Cerrado'
  },
  redes: {
    facebook: '',
    youtube: '',
    instagram: ''
  },
  seo: {
    titulo_home: 'Home - Carbon Performance - Reprogramación de centralitas',
    descricao: 'Chiptuning y reprogramación profesional de centralitas en Bilbao. TÜV Rheinland certificado.'
  },
  links: {
    condicoes_venda: 'https://www.br-performance.com/brp-barcelona/condiciones-de-venta/',
    politica_privacidade: 'https://www.br-performance.com/brp-barcelona/privacy-policy'
  }
};

(function () {
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
  // Redes sociais (só quando houver endereço)
  ['facebook', 'youtube', 'instagram'].forEach(function (k) {
    if (cfg.redes[k]) document.querySelectorAll('[data-cfg="' + k + '"]').forEach(el => el.href = cfg.redes[k]);
  });
  // Slogan
  document.querySelectorAll('[data-cfg="slogan"]').forEach(el => el.textContent = cfg.empresa.slogan);
}
