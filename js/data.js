const locationLinks = {
    'vila-planalto': '-22.222883,-54.802340',
    'vila-sao-francisco': '-22.221370,-54.772363',
    'jardim-climax': '-22.227437,-54.827302',
    'distrito-vila-vargas': '-22.133473,-54.618515',
    'distrito-panambi': '-22.115490,-54.697441',
    'parque-das-nacoes-2': '-22.239918,-54.751578',
    'jardim-agua-boa': '-22.250564,-54.807942',
    'jardim-dos-estados': '-22.209672,-54.788616',
    'jardim-joquei-clube': '-22.244721,-54.736986',
    'jardim-morada-do-salto': '-22.246912,-54.820591',
    'parque-nova-dourados': '-22.245035,-54.790202',
    'jardim-carisma': '-22.205778,-54.771661',
    'distrito-macauba': '-22.136598,-54.488110',
    'residencial-oliveira': '-22.2379605,-54.778121',
    'jardim-novo-horizonte': '-22.2358749,-54.8435411',
    'jardim-marcia': '-22.2253557,-54.7560981',
    'jardim-colibri': '-22.2558837,-54.7866707',
    'jardim-nova-esperanca': '-22.212501,-54.755093',
    'altos-do-indaia': '-22.2219187,-54.849964',
    'jardim-guaicurus': '-22.261809,-54.7785524',
    'distrito-itahum': '-22.084875,-55.351965',
    'distrito-indapolis': '-22.214141,-54.651771',
    'jardim-laranja-doce': '-22.199633,-54.777805',
    'sitiocas-campo-belo-3': '-22.281302,-54.830318',
    'greenville': '-22.270029,-54.788630',
    'residencial-bonanza': '-22.270512,-54.830325',
    'sitiocas-campina-verde': '-22.263890,-54.822272',
    'aldeia-bororo-2': '-22.168685,-54.850104',
    'aldeia-bororo': '-22.1532788,-54.8580426',
    'aldeia-jaguapiru': '', // Coordenadas pendentes
    'jardim-syria-rasselen': '', // Coordenadas pendentes
    'distrito-de-carapa': '-22.441832,-55.017601'
};

const agendaSemanal = [
    {
        dia: "Domingo",
        cultos: [
            {
                tipo: "rjm",
                descricao: "09:30 - RJM",
                congrs: [
                    { bairro: "Vila Planalto - Central", location: "vila-planalto" },
                    { bairro: "Vila São Francisco", location: "vila-sao-francisco" },
                    { bairro: "Jardim Clímax (Tropical)", location: "jardim-climax" },
                    { bairro: "Distrito Vila Vargas", location: "distrito-vila-vargas" },
                    { bairro: "Parque Das Nações II", location: "parque-das-nacoes-2" },
                    { bairro: "Jardim Água Boa", location: "jardim-agua-boa" },
                    { bairro: "Jardim Dos Estados", location: "jardim-dos-estados" },
                    { bairro: "Jardim Jóquei Clube", location: "jardim-joquei-clube" },
                    { bairro: "Jardim Morada do Salto", location: "jardim-morada-do-salto" },
                    { bairro: "Parque Nova Dourados", location: "parque-nova-dourados" },
                    { bairro: "Distrito Macaúba", location: "distrito-macauba" },
                    { bairro: "Jardim Carisma", location: "jardim-carisma" },
                    { bairro: "Jardim Novo Horizonte", location: "jardim-novo-horizonte" },
                    { bairro: "Jardim Márcia", location: "jardim-marcia" },
                    { bairro: "Aldeia Jaguapiru", location: "aldeia-jaguapiru" },
                    { bairro: "Aldeia Bororó", location: "aldeia-bororo" },
                    { bairro: "Jardim Nova Esperança", location: "jardim-nova-esperanca" },
                    { bairro: "Altos do Indaiá", location: "altos-do-indaia" },
                    { bairro: "Jardim Guaicurus", location: "jardim-guaicurus" },
                    { bairro: "Sitiocas Campina Verde", location: "sitiocas-campina-verde" },
                    { bairro: "Distrito de Itahum", location: "distrito-itahum" }
                ]
            },
            {
                tipo: "rjm",
                descricao: "15:00 - RJM",
                congrs: [
                    { bairro: "Sitiocas Campo Belo III", location: "sitiocas-campo-belo-3" }
                ]
            },
            {
                tipo: "oficial",
                descricao: "18:00 - Culto Oficial",
                congrs: [
                    { bairro: "Aldeia Bororó", location: "aldeia-bororo" }
                ]
            },
            {
                tipo: "oficial",
                descricao: "19:00 - Culto Oficial",
                congrs: [
                    { bairro: "Vila Planalto - Central", location: "vila-planalto" },
                    { bairro: "Vila São Francisco", location: "vila-sao-francisco" },
                    { bairro: "Jardim Clímax (Tropical) - TSS", location: "jardim-climax" },
                    { bairro: "Distrito Vila Vargas", location: "distrito-vila-vargas" },
                    { bairro: "Parque Das Nações II", location: "parque-das-nacoes-2" },
                    { bairro: "Jardim Água Boa", location: "jardim-agua-boa" },
                    { bairro: "Jardim Dos Estados", location: "jardim-dos-estados" },
                    { bairro: "Jardim Carisma", location: "jardim-carisma" },
                    { bairro: "Jardim Márcia", location: "jardim-marcia" },
                    { bairro: "Altos do Indaiá", location: "altos-do-indaia" },
                    { bairro: "Jardim Guaicurus", location: "jardim-guaicurus" },
                    { bairro: "Sitiocas Campina Verde", location: "sitiocas-campina-verde" },
                    { bairro: "Distrito de Itahum - TSS", location: "distrito-itahum" }
                ]
            }
        ]
    },
    {
        dia: "Segunda-feira",
        cultos: [
            {
                tipo: "reuniao",
                descricao: "19:30 - Reunião Evang.",
                congrs: [
                    { bairro: "Residencial Bonanza", location: "residencial-bonanza" }
                ]
            }
        ]
    },
    {
        dia: "Terça-feira",
        cultos: [
            {
                tipo: "oficial",
                descricao: "19:30 - Culto Oficial",
                congrs: [
                    { bairro: "Jardim Água Boa", location: "jardim-agua-boa" },
                    { bairro: "Jardim Jóquei Clube", location: "jardim-joquei-clube" },
                    { bairro: "Jardim Carisma", location: "jardim-carisma" },
                    { bairro: "Residencial Oliveira", location: "residencial-oliveira" },
                    { bairro: "Jardim Novo Horizonte", location: "jardim-novo-horizonte" },
                    { bairro: "Jardim Colibri", location: "jardim-colibri" },
                    { bairro: "Jardim Nova Esperança", location: "jardim-nova-esperanca" },
                    { bairro: "Aldeia Bororó II", location: "aldeia-bororo-2" }
                ]
            }
        ]
    },
    {
        dia: "Quarta-feira",
        cultos: [
            {
                tipo: "oficial",
                descricao: "15:00 - Culto Oficial",
                congrs: [
                    { bairro: "Parque Nova Dourados", location: "parque-nova-dourados" }
                ]
            },
            {
                tipo: "oficial",
                descricao: "19:30 - Culto Oficial",
                congrs: [
                    { bairro: "Vila Planalto - Central", location: "vila-planalto" },
                    { bairro: "Distrito Vila Vargas", location: "distrito-vila-vargas" },
                    { bairro: "Distrito Macaúba", location: "distrito-macauba" },
                    { bairro: "Jardim Márcia", location: "jardim-marcia" },
                    { bairro: "Aldeia Jaguapiru", location: "aldeia-jaguapiru" },
                    { bairro: "Altos do indaiá", location: "altos-do-indaia" },
                    { bairro: "Sitiocas Campina Verde", location: "sitiocas-campina-verde" },
                    { bairro: "Distrito de Itahum", location: "distrito-itahum" }
                ]
            }
        ]
    },
    {
        dia: "Quinta-feira",
        cultos: [
            {
                tipo: "oficial",
                descricao: "19:30 - Culto Oficial",
                congrs: [
                    { bairro: "Vila São Francisco", location: "vila-sao-francisco" },
                    { bairro: "Jardim Clímax", location: "jardim-climax" },
                    { bairro: "Parque das Nações II", location: "parque-das-nacoes-2" },
                    { bairro: "Jardim Morada do Salto", location: "jardim-morada-do-salto" },
                    { bairro: "Parque Nova Dourados", location: "parque-nova-dourados" },
                    { bairro: "Jardim Guaicurus", location: "jardim-guaicurus" },
                    { bairro: "Sitiocas Campo Belo III", location: "sitiocas-campo-belo-3" }
                ]
            }
        ]
    },
    {
        dia: "Sexta-feira",
        cultos: [
            {
                tipo: "oficial",
                descricao: "19:30 - Culto Oficial",
                congrs: [
                    { bairro: "Jardim Água Boa", location: "jardim-agua-boa" },
                    { bairro: "Jardim dos Estados", location: "jardim-dos-estados" }
                ]
            }
        ]
    },
    {
        dia: "Sábado",
        cultos: [
            {
                tipo: "rjm",
                descricao: "19:30 - RJM",
                congrs: [
                    { bairro: "Distrito Indápolis", location: "distrito-indapolis" },
                    { bairro: "Jardim Syria Rasselen", location: "jardim-syria-rasselen" }
                ]
            },
            {
                tipo: "ensaio",
                descricao: "19:30 - Culto com Ensaio<br>(1º Sábado do Mês)",
                congrs: [
                    { bairro: "Distrito Panambi", location: "distrito-panambi" }
                ]
            },
            {
                tipo: "rjm",
                descricao: "19:30 - RJM<br>(4º Sábado do Mês)",
                congrs: [
                    { bairro: "Distrito Panambi", location: "distrito-panambi" }
                ]
            },
            {
                tipo: "oficial",
                descricao: "19:30 - Culto Oficial",
                congrs: [
                    { bairro: "Vila Planalto - Central", location: "vila-planalto" },
                    { bairro: "Distrito Panambi", location: "distrito-panambi" },
                    { bairro: "Distrito Vila Vargas", location: "distrito-vila-vargas" },
                    { bairro: "Jardim Jóquei Clube", location: "jardim-joquei-clube" },
                    { bairro: "Jardim Morada do Salto", location: "jardim-morada-do-salto" },
                    { bairro: "Distrito Indápolis", location: "distrito-indapolis" },
                    { bairro: "Distrito Macaúba", location: "distrito-macauba" },
                    { bairro: "Residencial Oliveira", location: "residencial-oliveira" },
                    { bairro: "Jardim Novo Horizonte", location: "jardim-novo-horizonte" },
                    { bairro: "Jardim Laranja Doce", location: "jardim-laranja-doce" },
                    { bairro: "Jardim Colibri", location: "jardim-colibri" },
                    { bairro: "Jardim Syria Rasselen", location: "jardim-syria-rasselen" },
                    { bairro: "Sitiocas Campo Belo III", location: "sitiocas-campo-belo-3" },
                    { bairro: "Aldeia Bororó II", location: "aldeia-bororo-2" },
                    { bairro: "Distrito de Carapã", location: "distrito-de-carapa" }
                ]
            },
            {
                tipo: "reuniao",
                descricao: "19:30 - Reunião Evang.",
                congrs: [
                    { bairro: "GreenVille", location: "greenville" }
                ]
            }
        ]
    }
];
