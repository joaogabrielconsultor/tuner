const BRANDS = {
  'alfa-romeo': {
    name: 'Alfa Romeo',
    logo: 'images/alfa-romeo_3.png',
    models: [
      { name: '147', periods: [
        { id: '2001-2005', label: '2001 > 2005', fuels: [
          { type: 'Gasoline', engines: [
            { name: '2.0 TS', cv: 150, stages: [
              { id: 'brp-eco', label: 'ECO', cssClass: 'brp-eco',
                power_orig: 150, power_mod: 152, power_diff: '2', power_unit: 'cv',
                torque_orig: 172, torque_mod: 185, torque_diff: '13', torque_unit: 'Nm',
                price: 360 },
              { id: 'stage1', label: 'Stage 1', cssClass: 'stage1',
                power_orig: 150, power_mod: 165, power_diff: '15', power_unit: 'cv',
                torque_orig: 172, torque_mod: 192, torque_diff: '20', torque_unit: 'Nm',
                price: 460 }
            ]},
            { name: '3.2 V6 GTA', cv: 250, stages: [
              { id: 'stage1', label: 'Stage 1', cssClass: 'stage1',
                power_orig: 250, power_mod: 280, power_diff: '+30', power_unit: 'hp',
                torque_orig: 300, torque_mod: 335, torque_diff: '+35', torque_unit: 'Nm',
                price: 560 }
            ]}
          ]},
          { type: 'Diesel', engines: [
            { name: '1.9 Jtd', cv: 100, stages: [
              { id: 'stage1', label: 'Stage 1', cssClass: 'stage1',
                power_orig: 100, power_mod: 120, power_diff: '+20', power_unit: 'hp',
                torque_orig: 200, torque_mod: 240, torque_diff: '+40', torque_unit: 'Nm',
                price: 360 }
            ]},
            { name: '1.9 Jtd', cv: 115, stages: [
              { id: 'stage1', label: 'Stage 1', cssClass: 'stage1',
                power_orig: 115, power_mod: 140, power_diff: '+25', power_unit: 'hp',
                torque_orig: 255, torque_mod: 300, torque_diff: '+45', torque_unit: 'Nm',
                price: 360 }
            ]},
            { name: '1.9 Jtd', cv: 136, stages: [
              { id: 'stage1', label: 'Stage 1', cssClass: 'stage1',
                power_orig: 136, power_mod: 165, power_diff: '+29', power_unit: 'hp',
                torque_orig: 305, torque_mod: 360, torque_diff: '+55', torque_unit: 'Nm',
                price: 420 }
            ]},
            { name: '1.9 Jtd', cv: 140, stages: [
              { id: 'stage1', label: 'Stage 1', cssClass: 'stage1',
                power_orig: 140, power_mod: 170, power_diff: '+30', power_unit: 'hp',
                torque_orig: 320, torque_mod: 380, torque_diff: '+60', torque_unit: 'Nm',
                price: 420 }
            ]}
          ]}
        ]},
        { id: '2005-', label: '2005 > ...', fuels: [] }
      ]},
      { name: '156', periods: [
        { id: '1997-2003', label: '1997 > 2003', fuels: [
          { type: 'Gasoline', engines: [
            { name: '1.6 TS', cv: 120 },
            { name: '1.8 TS', cv: 144 },
            { name: '2.0 TS', cv: 155 },
            { name: '2.5 V6', cv: 192 },
            { name: '3.2 V6 GTA', cv: 250 }
          ]},
          { type: 'Diesel', engines: [
            { name: '1.9 Jtd', cv: 105 },
            { name: '1.9 Jtd', cv: 115 },
            { name: '2.4 Jtd', cv: 136 },
            { name: '2.4 Jtd', cv: 150 }
          ]}
        ]},
        { id: '2003-2006', label: '2003 > 2006', fuels: [] }
      ]},
      { name: '159', periods: [
        { id: '2005-2012', label: '2005 > 2012', fuels: [
          { type: 'Gasoline', engines: [
            { name: '1.8 MPI', cv: 140 },
            { name: '2.2 JTS', cv: 185 },
            { name: '3.2 V6 JTS', cv: 260 }
          ]},
          { type: 'Diesel', engines: [
            { name: '1.9 JTDm', cv: 120 },
            { name: '1.9 JTDm', cv: 150 },
            { name: '2.4 JTDm', cv: 200 }
          ]}
        ]}
      ]},
      { name: '166', periods: [
        { id: '1998-2007', label: '1998 > 2007', fuels: [
          { type: 'Gasoline', engines: [
            { name: '2.0 TS', cv: 155 },
            { name: '2.5 V6', cv: 192 },
            { name: '3.0 V6', cv: 220 }
          ]},
          { type: 'Diesel', engines: [
            { name: '2.4 Jtd', cv: 136 },
            { name: '2.4 Jtd', cv: 150 },
            { name: '2.4 Jtd', cv: 185 }
          ]}
        ]}
      ]},
      { name: '4C', periods: [
        { id: '2013-2020', label: '2013 > 2020', fuels: [
          { type: 'Gasoline', engines: [
            { name: '1.75 TBi', cv: 240 }
          ]}
        ]}
      ]},
      { name: 'Brennero', periods: [] },
      { name: 'Brera', periods: [
        { id: '2005-2010', label: '2005 > 2010', fuels: [
          { type: 'Gasoline', engines: [
            { name: '2.2 JTS', cv: 185 },
            { name: '3.2 V6 JTS', cv: 260 }
          ]},
          { type: 'Diesel', engines: [
            { name: '2.4 JTDm', cv: 200 }
          ]}
        ]}
      ]},
      { name: 'CrossWagon', periods: [] },
      { name: 'Giulia', periods: [
        { id: '2016-', label: '2016 > ...', fuels: [
          { type: 'Gasoline', engines: [
            { name: '2.0 GME', cv: 200 },
            { name: '2.9 V6 Bi-Turbo Quadrifoglio', cv: 510 }
          ]},
          { type: 'Diesel', engines: [
            { name: '2.2 JTD', cv: 150 },
            { name: '2.2 JTD', cv: 180 },
            { name: '2.2 JTD', cv: 210 }
          ]}
        ]}
      ]},
      { name: 'Giulietta', periods: [
        { id: '2010-', label: '2010 > ...', fuels: [
          { type: 'Gasoline', engines: [
            { name: '1.4 TB MultiAir', cv: 120 },
            { name: '1.4 TB MultiAir', cv: 170 },
            { name: '1.75 TB MultiAir QV', cv: 235 }
          ]},
          { type: 'Diesel', engines: [
            { name: '2.0 JTDm', cv: 140 },
            { name: '2.0 JTDm', cv: 150 },
            { name: '2.0 JTDm', cv: 175 }
          ]}
        ]}
      ]},
      { name: 'GT', periods: [
        { id: '2003-2010', label: '2003 > 2010', fuels: [
          { type: 'Gasoline', engines: [
            { name: '2.0 JTS', cv: 165 },
            { name: '3.2 V6 GTA', cv: 240 }
          ]},
          { type: 'Diesel', engines: [
            { name: '1.9 JTD', cv: 150 },
            { name: '2.4 JTD', cv: 200 }
          ]}
        ]}
      ]},
      { name: 'Junior', periods: [] },
      { name: 'Milano', periods: [] },
      { name: 'MiTo', periods: [
        { id: '2008-2018', label: '2008 > 2018', fuels: [
          { type: 'Gasoline', engines: [
            { name: '1.4 TB', cv: 120 },
            { name: '1.4 TB MultiAir', cv: 135 },
            { name: '1.4 TB QV', cv: 170 }
          ]},
          { type: 'Diesel', engines: [
            { name: '1.3 JTDm', cv: 85 },
            { name: '1.6 JTDm', cv: 120 }
          ]}
        ]}
      ]},
      { name: 'Spider', periods: [
        { id: '2006-2011', label: '2006 > 2011', fuels: [
          { type: 'Gasoline', engines: [
            { name: '2.2 JTS', cv: 185 },
            { name: '3.2 V6 JTS', cv: 260 }
          ]},
          { type: 'Diesel', engines: [
            { name: '2.4 JTDm', cv: 200 }
          ]}
        ]}
      ]},
      { name: 'Stelvio', periods: [
        { id: '2017-', label: '2017 > ...', fuels: [
          { type: 'Gasoline', engines: [
            { name: '2.0 GME', cv: 200 },
            { name: '2.9 V6 Bi-Turbo Quadrifoglio', cv: 510 }
          ]},
          { type: 'Diesel', engines: [
            { name: '2.2 JTD', cv: 160 },
            { name: '2.2 JTD', cv: 180 },
            { name: '2.2 JTD', cv: 210 }
          ]}
        ]}
      ]},
      { name: 'Tonale', periods: [
        { id: '2022-', label: '2022 > ...', fuels: [
          { type: 'Gasoline', engines: [
            { name: '1.5 MHEV', cv: 130 },
            { name: '1.5 MHEV', cv: 160 }
          ]},
          { type: 'Diesel', engines: [
            { name: '1.6 Multijet', cv: 130 }
          ]}
        ]}
      ]}
    ]
  },
  'alpina': { name: 'Alpina', logo: 'images/alpina-2.png', models: [] },
  'alpine': { name: 'Alpine', logo: 'images/alpine_3.png', models: [] },
  'ariel-motors': { name: 'Ariel Motors', logo: 'images/ariel-2.png', models: [] },
  'artega': { name: 'Artega', logo: 'images/artega-light.png', models: [] },
  'aston-martin': { name: 'Aston Martin', logo: 'images/aston-martin_3.png', models: [] },
  'audi': { name: 'Audi', logo: 'images/audi_2.png', models: [] },
  'bentley': { name: 'Bentley', logo: 'images/bentley_2.png', models: [] },
  'bmw': { name: 'BMW', logo: 'images/bmw_2.png', models: [] },
  'borgward': { name: 'Borgward', logo: 'images/borgward_3.png', models: [] },
  'bugatti': { name: 'Bugatti', logo: 'images/bugatti_2.png', models: [] },
  'buick': { name: 'Buick', logo: 'images/buick_2.png', models: [] },
  'byd': { name: 'BYD', logo: 'images/byd-at-4x.png', models: [] },
  'cadillac': { name: 'Cadillac', logo: 'images/cadillac_2.png', models: [] },
  'caterham': { name: 'Caterham', logo: 'images/caterham.png', models: [] },
  'chevrolet': { name: 'Chevrolet', logo: 'images/chevrolet_2.png', models: [] },
  'chrysler': { name: 'Chrysler', logo: 'images/chrysler_2.png', models: [] },
  'citroen': { name: 'Citroën', logo: 'images/citroen-white.png', models: [] },
  'cupra': { name: 'Cupra', logo: 'images/cupra-3.png', models: [] },
  'dacia': { name: 'Dacia', logo: 'images/dacia-white_2.png', models: [] },
  'daewoo': { name: 'Daewoo', logo: 'images/daewoo_2.png', models: [] },
  'dodge': { name: 'Dodge', logo: 'images/dodge_2.png', models: [] },
  'ds': { name: 'DS', logo: 'images/ds-2.png', models: [] },
  'ferrari': { name: 'Ferrari', logo: 'images/ferrari_2.png', models: [] },
  'fiat': { name: 'Fiat', logo: 'images/fiat_2.png', models: [] },
  'ford': { name: 'Ford', logo: 'images/ford_2.png', models: [] },
  'geely': { name: 'Geely', logo: 'images/geely_4.png', models: [] },
  'genesis': { name: 'Genesis', logo: 'images/genesis-white.svg', models: [] },
  'gwm': { name: 'GWM', logo: 'images/gwm_2.png', models: [] },
  'holden': { name: 'Holden', logo: 'images/holden_3.png', models: [] },
  'honda': { name: 'Honda', logo: 'images/honda_2.png', models: [] },
  'hyundai': { name: 'Hyundai', logo: 'images/hyundai_2.png', models: [] },
  'ineos': { name: 'Ineos', logo: 'images/ineos-grenadier-stacked-logo-white.png', models: [] },
  'infiniti': { name: 'Infiniti', logo: 'images/infiniti_2.png', models: [] },
  'isuzu': { name: 'Isuzu', logo: 'images/isuzu_2.png', models: [] },
  'iveco': { name: 'Iveco', logo: 'images/iveco_2.png', models: [] },
  'jac': { name: 'JAC', logo: 'images/jac-motors_2.png', models: [] },
  'jaguar': { name: 'Jaguar', logo: 'images/jaguar_2.png', models: [] },
  'jeep': { name: 'Jeep', logo: 'images/jeep_3.png', models: [] },
  'kia': { name: 'Kia', logo: 'images/kia-white.png', models: [] },
  'ktm': { name: 'KTM', logo: 'images/ktm_2.png', models: [] },
  'lamborghini': { name: 'Lamborghini', logo: 'images/lamborghini_2.png', models: [] },
  'lancia': { name: 'Lancia', logo: 'images/lancia_2.png', models: [] },
  'landrover': { name: 'Landrover', logo: 'images/land-rover_2.png', models: [] },
  'lexus': { name: 'Lexus', logo: 'images/lexus_2.png', models: [] },
  'lincoln': { name: 'Lincoln', logo: 'images/lincoln_2.png', models: [] },
  'lotus': { name: 'Lotus', logo: 'images/lotus_2.png', models: [] },
  'mahindra': { name: 'Mahindra', logo: 'images/mahindra_2.png', models: [] },
  'man': { name: 'MAN', logo: 'images/man_3.png', models: [] },
  'maserati': { name: 'Maserati', logo: 'images/maserati_3.png', models: [] },
  'mazda': { name: 'Mazda', logo: 'images/mazda_2.png', models: [] },
  'mclaren': { name: 'McLaren', logo: 'images/mclaren_3.png', models: [] },
  'mercedes': { name: 'Mercedes', logo: 'images/mercedes_2.png', models: [] },
  'mg': { name: 'MG', logo: 'images/mg_2.png', models: [] },
  'mini': { name: 'Mini', logo: 'images/mini_2.png', models: [] },
  'mitsubishi': { name: 'Mitsubishi', logo: 'images/mitsubishi_2.png', models: [] },
  'morgan': { name: 'Morgan', logo: 'images/morgan.png', models: [] },
  'mpm': { name: 'MPM', logo: 'images/logo-mpm.png', models: [] },
  'nissan': { name: 'Nissan', logo: 'images/960px-nissan-2020-logo-white.png', models: [] },
  'opel': { name: 'Opel', logo: 'images/opel-logo-2017-white.png', models: [] },
  'pagani': { name: 'Pagani', logo: 'images/pagani_2.png', models: [] },
  'peugeot': { name: 'Peugeot', logo: 'images/peugeot_3.png', models: [] },
  'pgo': { name: 'PGO', logo: 'images/pgo_2.png', models: [] },
  'piaggio': { name: 'Piaggio', logo: 'images/piaggio_2.png', models: [] },
  'polestar': { name: 'Polestar', logo: 'images/polestar-white.png', models: [] },
  'porsche': { name: 'Porsche', logo: 'images/porsche_2.png', models: [] },
  'renault': { name: 'Renault', logo: 'images/renault-light.png', models: [] },
  'rolls-royce': { name: 'Rolls Royce', logo: 'images/rolls-royce_2.png', models: [] },
  'saab': { name: 'Saab', logo: 'images/saab_2.png', models: [] },
  'samsung': { name: 'Samsung', logo: 'images/samsung_2.png', models: [] },
  'scion': { name: 'Scion', logo: 'images/scion-2.png', models: [] },
  'seat': { name: 'Seat', logo: 'images/960px-seat-logo-from-2017-white.png', models: [] },
  'secma': { name: 'Secma', logo: 'images/secma.png', models: [] },
  'skoda': { name: 'Skoda', logo: 'images/skoda-logo.png', models: [] },
  'smart': { name: 'Smart', logo: 'images/smart-logo-white.png', models: [] },
  'ssangyong': { name: 'SsangYong', logo: 'images/ssangyong_3.png', models: [] },
  'subaru': { name: 'Subaru', logo: 'images/subaru_2.png', models: [] },
  'suzuki': { name: 'Suzuki', logo: 'images/suzuki_3.png', models: [] },
  'tata': { name: 'Tata', logo: 'images/tata_2.png', models: [] },
  'tesla': { name: 'Tesla', logo: 'images/tesla.png', models: [] },
  'toyota': { name: 'Toyota', logo: 'images/toyota-white.png', models: [] },
  'volkswagen': { name: 'Volkswagen', logo: 'images/vw-white.png', models: [] },
  'volvo': { name: 'Volvo', logo: 'images/volvo_2.png', models: [] },
  'westfield': { name: 'Westfield', logo: 'images/westfield_3.png', models: [] },
  'wiesmann': { name: 'Wiesmann', logo: 'images/wiesmann_2.png', models: [] },

  // Motos / Quad
  'ajp': { name: 'AJP', logo: 'images/ajp-at-2x.png', models: [] },
  'aprilia': { name: 'Aprilia', logo: 'images/aprilia_2.svg', models: [] },
  'argo': { name: 'Argo', logo: 'images/argo.png', models: [] },
  'benelli': { name: 'Benelli', logo: 'images/benelli.png', models: [] },
  'bimota': { name: 'Bimota', logo: 'images/bimota.png', models: [] },
  'bmw-motorrad': { name: 'BMW Motorrad', logo: 'images/bmw_2.png', models: [] },
  'brixton': { name: 'Brixton', logo: 'images/brixton-motorcycles-at-05x.png', models: [] },
  'buell': { name: 'Buell', logo: 'images/buell_2.png', models: [] },
  'campagna-motors': { name: 'Campagna Motors', logo: 'images/campagna-motors_3.png', models: [] },
  'can-am': { name: 'Can-Am', logo: 'images/can-am_3.png', models: [] },
  'ccm': { name: 'CCM Motorcycle', logo: 'images/ccm-at-2x.png', models: [] },
  'cfmoto': { name: 'CF Moto', logo: 'images/cfmoto.png', models: [] },
  'ducati': { name: 'Ducati', logo: 'images/ducati_2.png', models: [] },
  'easy-trike': { name: 'Easy Trike', logo: 'images/easy-trike_2.png', models: [] },
  'energica': { name: 'Energica', logo: 'images/energica.png', models: [] },
  'fantic': { name: 'Fantic', logo: 'images/fantic.png', models: [] },
  'gasgas': { name: 'GasGas', logo: 'images/logo-gasgas.png', models: [] },
  'gilera': { name: 'Gilera', logo: 'images/gilera_2.svg', models: [] },
  'goes': { name: 'Goes', logo: 'images/goes.png', models: [] },
  'harley-davidson': { name: 'Harley Davidson', logo: 'images/harley-davidson_2.svg', models: [] },
  'honda-motorcycles': { name: 'Honda Motorcycles', logo: 'images/honda-motorcycles_2.svg', models: [] },
  'husqvarna': { name: 'Husqvarna', logo: 'images/husqvarna-dark.png', models: [] },
  'hyosung': { name: 'Hyosung', logo: 'images/hyosung-at-2x.png', models: [] },
  'hytrack': { name: 'Hytrack', logo: 'images/hytrack-at-2x.png', models: [] },
  'indian': { name: 'Indian', logo: 'images/indian.png', models: [] },
  'kawasaki': { name: 'Kawasaki', logo: 'images/kawasaki-white_4.png', models: [] },
  'kymco': { name: 'Kymco', logo: 'images/kymco-at-05x.png', models: [] },
  'linhai': { name: 'Linhai', logo: 'images/linhai-at-3x.png', models: [] },
  'loncin': { name: 'Loncin', logo: 'images/loncin-white.svg', models: [] },
  'macbor': { name: 'Macbor', logo: 'images/macbor-2.png', models: [] },
  'magpower': { name: 'Magpower', logo: 'images/x4-magpower-at-4x-1.png', models: [] },
  'masai': { name: 'Masai', logo: 'images/masai.png', models: [] },
  'mash': { name: 'Mash Motorcycle', logo: 'images/mash-white-at-2x.png', models: [] },
  'moto-guzzi': { name: 'Moto Guzzi', logo: 'images/moto-guzzi_2.png', models: [] },
  'moto-morini': { name: 'Moto Morini', logo: 'images/mm-logo-d9820611.png', models: [] },
  'motron': { name: 'Motron', logo: 'images/motron.png', models: [] },
  'mv-agusta': { name: 'MV Agusta', logo: 'images/mv-agusta_2.png', models: [] },
  'norton': { name: 'Norton Motorcycle', logo: 'images/norton-at-3x.png', models: [] },
  'odes': { name: 'Odes', logo: 'images/odes.png', models: [] },
  'orcal': { name: 'Orcal', logo: 'images/orcal.png', models: [] },
  'qj-motors': { name: 'QJ Motors', logo: 'images/qj-motors-2_2.png', models: [] },
  'quadro': { name: 'Quadro', logo: 'images/plan-de-travail-2-at-2x.png', models: [] },
  'rewaco': { name: 'Rewaco', logo: 'images/rewaco.png', models: [] },
  'royal-enfield': { name: 'Royal Enfield', logo: 'images/royalenfield-logo.png', models: [] },
  'segway': { name: 'Segway Motors', logo: 'images/segway-white.png', models: [] },
  'sherco': { name: 'Sherco', logo: 'images/sherco.png', models: [] },
  'stels': { name: 'Stels', logo: 'images/stels-at-05x.png', models: [] },
  'suzuki-moto': { name: 'Suzuki Moto', logo: 'images/suzuki_2.png', models: [] },
  'swm': { name: 'SWM', logo: 'images/swm.png', models: [] },
  'sym': { name: 'SYM', logo: 'images/sym-logo_2.png', models: [] },
  'tgb': { name: 'TGB', logo: 'images/tgb-at-05x.png', models: [] },
  'triumph': { name: 'Triumph', logo: 'images/triumph_3.png', models: [] },
  'vespa': { name: 'Vespa', logo: 'images/vespa_2.png', models: [] },
  'voge': { name: 'Voge', logo: 'images/voge_4.png', models: [] },
  'yamaha-moto': { name: 'Yamaha Moto', logo: 'images/yamaha_2.png', models: [] },
  'zero-motorcycle': { name: 'Zero Motorcycle', logo: 'images/zero-motorcycles-logo.png', models: [] },
  'zontes': { name: 'Zontes', logo: 'images/zontes-light.svg', models: [] },

  // Moto de Agua / Jet Ski
  'kawasaki-moto-agua': { name: 'Kawasaki', logo: 'images/kawasaki_2.svg', models: [] },
  'sea-doo': { name: 'Sea-Doo', logo: 'images/sea-doo_3.svg', models: [] },
  'taiga': { name: 'Taiga', logo: 'images/taiga-white.png', models: [] },
  'yamaha-moto-agua': { name: 'Yamaha', logo: 'images/yamaha_2.png', models: [] },

  // Lancha / Barco
  'caterpillar-marine': { name: 'Caterpillar Marine', logo: 'images/caterpillar-white.png', models: [] },
  'cummins-marine': { name: 'Cummins Marine', logo: 'images/cummins-marine_3.png', models: [] },
  'daedong-marine': { name: 'Daedong Marine Tech', logo: 'images/daedong-marine-tech_3.png', models: [] },
  'deutz-marine': { name: 'Deutz Marine', logo: 'images/deutz-white_5.png', models: [] },
  'fpt-marine': { name: 'FPT Marine', logo: 'images/fpt-white.png', models: [] },
  'honda-marine': { name: 'Honda Marine', logo: 'images/honda-marine_4.png', models: [] },
  'hyundai-seasall': { name: 'Hyundai Seasall', logo: 'images/hyundai-seasall-white.png', models: [] },
  'johnson-marine': { name: 'Johnson Marine', logo: 'images/johnson-white.png', models: [] },
  'lombardini-marine': { name: 'Lombardini Marine', logo: 'images/lombardini-white.png', models: [] },
  'man-marine': { name: 'MAN Marine', logo: 'images/man_4.png', models: [] },
  'mercury-marine': { name: 'Mercury Marine', logo: 'images/mercury_3.png', models: [] },
  'scania-marine': { name: 'Scania Marine', logo: 'images/scania_3.png', models: [] },
  'selva-marine': { name: 'Selva Marine', logo: 'images/selva-white.png', models: [] },
  'suzuki-marine': { name: 'Suzuki Marine', logo: 'images/suzuki-marine.png', models: [] },
  'volvo-penta': { name: 'Volvo Penta', logo: 'images/volvo-penta_2.png', models: [] },
  'vw-marine': { name: 'Volkswagen Marine', logo: 'images/vw-marine-white.png', models: [] },
  'yamaha-marine': { name: 'Yamaha Marine', logo: 'images/yamaha_2.png', models: [] },
  'yanmar': { name: 'Yanmar', logo: 'images/yanmar_7.png', models: [] }
};

function getBrand(slug) { return BRANDS[slug] || null; }

const VEHICLE_TYPES = {
  'coche': [
    'alfa-romeo','alpina','alpine','ariel-motors','artega','aston-martin','audi','bentley','bmw',
    'borgward','bugatti','buick','byd','cadillac','caterham','chevrolet','chrysler','citroen',
    'cupra','dacia','daewoo','dodge','ds','ferrari','fiat','ford','geely','genesis','gwm',
    'holden','honda','hyundai','ineos','infiniti','isuzu','iveco','jac','jaguar','jeep','kia',
    'ktm','lamborghini','lancia','landrover','lexus','lincoln','lotus','mahindra','man',
    'maserati','mazda','mclaren','mercedes','mg','mini','mitsubishi','morgan','mpm','nissan',
    'opel','pagani','peugeot','pgo','piaggio','polestar','porsche','renault','rolls-royce',
    'saab','samsung','scion','seat','secma','skoda','smart','ssangyong','subaru','suzuki',
    'tata','tesla','toyota','volkswagen','volvo','westfield','wiesmann'
  ],
  'moto': [
    'ajp','aprilia','argo','benelli','bimota','bmw-motorrad','brixton','buell',
    'campagna-motors','can-am','ccm','cfmoto','ducati','easy-trike','energica','fantic',
    'gasgas','gilera','goes','harley-davidson','honda-motorcycles','husqvarna','hyosung',
    'hytrack','indian','kawasaki','ktm','kymco','linhai','loncin','macbor','magpower',
    'masai','mash','moto-guzzi','moto-morini','motron','mv-agusta','norton','odes','orcal',
    'piaggio','polaris','qj-motors','quadro','rewaco','royal-enfield','segway','sherco',
    'stels','suzuki-moto','swm','sym','tgb','triumph','vespa','voge','yamaha-moto',
    'zero-motorcycle','zontes'
  ],
  'moto-agua': [
    'kawasaki-moto-agua','sea-doo','taiga','yamaha-moto-agua'
  ],
  'lancha': [
    'caterpillar-marine','cummins-marine','daedong-marine','deutz-marine','fpt-marine',
    'honda-marine','hyundai-seasall','johnson-marine','lombardini-marine','man-marine',
    'mercury-marine','scania-marine','selva-marine','suzuki-marine','volvo-penta',
    'vw-marine','yamaha-marine','yanmar'
  ]
};

(function () {
  try {
    var custom = localStorage.getItem('brp_brands_custom');
    if (custom) {
      var c = JSON.parse(custom);
      Object.keys(c).forEach(function (k) { BRANDS[k] = c[k]; });
    }
  } catch (e) {}
})();
