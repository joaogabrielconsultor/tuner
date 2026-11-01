// MIDO Performance — Configuração do site
// Edite diretamente aqui (o painel admin.html foi removido)

const BRP_CONFIG = {
  empresa: {
    nome: 'MIDO Performance',
    slogan: 'Professional Chiptuning',
    morada_linha1: 'Zuberoa Etorb. 8, 10',
    morada_linha2: '48012 Errekalde, Bilbao, Bizkaia',
    telefone: '+39 375 817 2444',
    telefone_link: 'tel:+393758172444',
    email: '', // sem e-mail por enquanto (o da BR foi retirado)
    horario: 'Lunes–Sábado: 9:00–15:00 | Domingo: Cerrado'
  },
  redes: {
    facebook: '',
    youtube: '',
    instagram: ''
  },
  seo: {
    titulo_home: 'Home - MIDO Performance - Reprogramación de centralitas',
    descricao: 'Chiptuning y reprogramación profesional de centralitas en Bilbao.'
  },
  links: {
    condicoes_venda: 'condiciones-de-venta.html',
    politica_privacidade: 'politica-de-privacidad.html'
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
