import angry from '@/assets/images/icons/angry.png';
import routine from '@/assets/images/icons/routine.png';
import events from '@/assets/images/icons/events.png';
import health from '@/assets/images/icons/health.png';
import feelings from '@/assets/images/icons/feelings.png';
import changes from '@/assets/images/icons/change.png';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface Item {
    label: string;
    descricao?: string;
    icon?: StaticImport;
    itens?: Item[];
  }

export const observacoes = [
    {
        label: "Comportamentos interferentes",
        descricao: "Inclui comportamentos que podem afetar negativamente a interação social e o ambiente, como irritabilidade, agitação, choro, entre outros.",
        icon: angry,
        itens: [
            {
                label: "Irritabilidade, Agitação e Choro",
                itens: [
                    { label: "Fere-se de propósito", descricao: "A criança se machuca intencionalmente." },
                    { label: "Agressivo com outras crianças ou adultos (verbalmente ou fisicamente)", descricao: "Comportamento agressivo em relação a outras pessoas." },
                    { label: "Grita inapropriadamente", descricao: "Gritos que não se adequam à situação." },
                    { label: "Crises de birra/acesso de fúria", descricao: "Episódios intensos de choro e raiva." },
                    { label: "Irritável e queixoso", descricao: "Mau humor e reclamações frequentes." },
                    { label: "Não presta atenção às instruções", descricao: "Dificuldade em se concentrar nas instruções dadas." },
                    { label: "Grita em momentos inapropriados", descricao: "Elevação da voz em situações inadequadas." },
                    { label: "Chora por mínimos aborrecimentos e machucados", descricao: "Choro excessivo por pequenos aborrecimentos ou ferimentos." },
                    { label: "Chora e grita inapropriadamente", descricao: "Choro e gritos que não correspondem à situação." },
                    { label: "Reage negativamente ao contato afetivo", descricao: "Resposta negativa a expressões de afeto." },
                    { label: "Tem acessos de fúria ou birra quando contrariado", descricao: "Episódios intensos de raiva em resposta à contrariedade." },
                    { label: "Resiste a qualquer forma de contato físico", descricao: "Evita ou se opõe a toques físicos." },
                    { label: "Causa machucados em si mesmo", descricao: "Se machuca de maneira autoinfligida." },
                    { label: "Pratica violência contra si próprio", descricao: "Comete atos violentos contra si mesmo." },
                    { label: "Ignora propositalmente as instruções", descricao: "Deliberadamente não presta atenção às instruções dadas." }
                ]
            },
            {
                label: "Letargia e Esquiva Social",
                itens: [
                    { label: "Procura se isolar dos outros", descricao: "Busca ativamente o isolamento social." },
                    { label: "Retraído; prefere atividades solitárias", descricao: "Prefere atividades que podem ser realizadas sozinho." },
                    { label: "Estranho, comportamento esquisito", descricao: "Comportamento que é percebido como estranho ou incomum." },
                    { label: "Depressivo", descricao: "Experiência de tristeza e desânimo." },
                    { label: "Expressão facial imóvel, fixa; falta de resposta emocional", descricao: "Falta de expressão facial e resposta emocional." },
                    { label: "Incomoda os outros", descricao: "Comportamento que causa desconforto aos outros." },
                    { label: "Não faz nada a não ser ficar sentado e olhar os outros", descricao: "Inatividade, observando os outros sem participar ativamente." },
                    { label: "Não é cooperativo", descricao: "Falta de cooperação em atividades ou interações." },
                    { label: "Não permanece sentado (ex. durante as lições ou outras atividades, refeições etc.)", descricao: "Dificuldade em permanecer sentado em situações específicas." },
                    { label: "Não fica sentado nem por um tempo mínimo", descricao: "Incapacidade de ficar sentado por curtos períodos." },
                    { label: "Difícil alcançá-lo, contatá-lo ou chegar até ele", descricao: "Dificuldade em se envolver ou se comunicar com a criança." },
                    { label: "Não tenta se comunicar por palavras ou gestos", descricao: "Falta de esforço para se comunicar verbalmente ou por gestos." },
                    { label: "Não acompanha as atividades estruturadas (não reage)", descricao: "Não envolvimento ou reação às atividades estruturadas." },
                    { label: "Não presta atenção quando falam com ele", descricao: "Falta de atenção durante interações verbais." },
                    { label: "Inativo, nunca se move espontaneamente", descricao: "Falta de movimento espontâneo ou iniciativa." },
                    { label: "Não presta atenção quando falam com ele", descricao: "Falta de atenção durante interações verbais." }
                ]
            },
            {
                label: "Comportamento Estereotipado",
                itens: [
                    { label: "Movimentos corporais repetitivos e sem sentido", descricao: "Padrões repetitivos e sem propósito de movimentos corporais." },
                    { label: "Comportamentos estereotipados; movimentos anormais, repetitivos", descricao: "Padrões repetitivos e anormais de comportamento." },
                    { label: "Balança ou agita as mãos ou pés repetidamente", descricao: "Movimentos repetitivos de balançar ou agitar mãos ou pés." },
                    { label: "Movimentos repetitivos das mãos, do corpo ou da cabeça", descricao: "Padrões repetitivos de movimentos em diferentes partes do corpo." },
                    { label: "Fala repetitiva", descricao: "Repetição frequente de palavras ou frases." },
                    { label: "Repete várias vezes uma palavra ou frase", descricao: "Repetição persistente de uma palavra ou frase." },
                    { label: "Balança o corpo para trás e para frente repetidamente", descricao: "Movimento repetitivo de balançar o corpo para trás e para frente." }
                ]
            },
            {
                label: "Hiperatividade",
                itens: [
                    { label: "Excessivamente ativo em casa, na escola, no trabalho ou em qualquer lugar", descricao: "Níveis elevados de atividade em diversos contextos." },
                    { label: "Fala excessivamente", descricao: "Padrão de fala excessiva e rápida." },
                    { label: "Inquieto, incapaz de permanecer sentado", descricao: "Dificuldade em permanecer sentado ou parado." },
                    { label: "Tumultua as atividades em grupo", descricao: "Comportamento disruptivo em atividades em grupo." },
                    { label: "Fica sentado ou em pé na mesma posição por muito tempo", descricao: "Persistência em uma posição por períodos prolongados." },
                    { label: "Não fica sentado nem por um tempo mínimo", descricao: "Incapacidade de ficar sentado por curtos períodos." },
                    { label: "Constantemente corre ou pula em torno do cômodo", descricao: "Padrão constante de correr ou pular." },
                    { label: "Movimenta ou balança a cabeça de trás para frente repetidamente", descricao: "Movimento repetitivo de balançar ou mexer a cabeça para trás e para frente." },
                    { label: "Faz movimentos repetitivos das mãos, do corpo ou da cabeça", descricao: "Padrões repetitivos de movimentos em diferentes partes do corpo." },
                    { label: "O humor muda rapidamente", descricao: "Mudanças rápidas e imprevisíveis no humor." },
                    { label: "Fica agitado(a) em momentos inapropriados", descricao: "Agitação em situações inadequadas ou inconvenientes." },
                    { label: "Tende a ser excessivamente ativo(a)", descricao: "Padrão consistente de comportamento excessivamente ativo." },
                    { label: "Não presta atenção quando falam com ele", descricao: "Falta de atenção durante interações verbais." }
                ]
            },
            {
                label: "Fala Inapropriada",
                itens: [
                    { label: "Fala sozinho(a) em voz alta", descricao: "Expressão verbal em voz alta sem interlocutores presentes." },
                    { label: "Grita inapropriadamente", descricao: "Elevação da voz em situações inadequadas." },
                    { label: "Fala repetitiva", descricao: "Repetição frequente de palavras ou frases." },
                    { label: "Não tenta se comunicar por palavras ou gestos", descricao: "Falta de esforço para se comunicar verbalmente ou por gestos." }
                ]
            }
        ]
    }, {
        label: "Rotina Diária",
        descricao: "Engloba aspectos da rotina diária, como sono, alimentação, medicação, escola e banheiro.",
        icon: routine,
        itens: [
            {
                label: "Sono",
                itens: [
                    { label: "Dormiu", descricao: "Horário e qualidade do sono da criança." },
                    { label: "Acordou", descricao: "Horário em que a criança acorda." },
                    {
                        label: "Ocorrência durante o sono",
                        itens: [
                            { label: "Pesadelos", descricao: "Sonhos intensamente perturbadores e assustadores." },
                            { label: "Sonambulismo", descricao: "Caminhar ou realizar atividades enquanto ainda está dormindo." },
                            { label: "Terrores noturnos", descricao: "Episódios intensos de medo ou agitação durante o sono." },
                            { label: "Insônia", descricao: "Dificuldade em iniciar ou manter o sono." },
                            { label: "Ronco", descricao: "Ruído produzido durante o sono devido à vibração das vias aéreas." },
                            { label: "Apneia do sono", descricao: "Interrupção temporária da respiração durante o sono." },
                            { label: "Bruxismo (ranger dos dentes)", descricao: "Hábito de ranger os dentes durante o sono." },
                            { label: "Enurese noturna (xixi na cama)", descricao: "Incontinência urinária durante o sono." },
                            { label: "Falar durante o sono", descricao: "Falar em voz alta durante o sono." },
                            { label: "Mudanças de posição frequentes", descricao: "Alterações frequentes de posição durante o sono." },
                        ]
                    }
                ]
            },
            {
                label: "Alimentação",
                itens: [
                    { label: "Café da manhã", descricao: "Refeição matinal da criança." },
                    { label: "Almoço", descricao: "Refeição do meio do dia da criança." },
                    { label: "Jantar", descricao: "Refeição noturna da criança." },
                    { label: "Lanche ou outra refeição de rotina", descricao: "Lanches ou outras refeições regulares." },
                    { label: "Lanche ou outra refeição fora da rotina usual", descricao: "Lanches ou refeições que ocorrem fora da rotina habitual." },
                    { label: "Doces, guloseimas ou outras indulgências alimentares", descricao: "Consumo de doces, guloseimas ou outras indulgências alimentares." }
                ]
            },
            {
                label: "Medicação",
                itens: [
                    { label: "Iniciou novo tratamento", descricao: "Início de um novo regime de medicação." },
                    { label: "Administração de medicação regular", descricao: "Administração rotineira de medicação." },
                    { label: "Administração de medicação avulsa", descricao: "Administração de medicação não rotineira." },
                    { label: "Encerrou tratamento", descricao: "Fim de um tratamento médico." },
                ]
            },
            {
                label: "Escola",
                itens: [
                    { label: "Mudança de colega", descricao: "Alteração nos colegas de classe da criança." },
                    { label: "Mudança de sala", descricao: "Transferência para uma sala diferente na escola." },
                    { label: "Mudança de professora", descricao: "Alteração na professora responsável pela criança." },
                    { label: "Mudança de aula", descricao: "Mudança na estrutura ou conteúdo das aulas." },
                    { label: "Mudança de material", descricao: "Alteração no material didático utilizado." }
                ]
            },
            {
                label: "Banheiro",
                itens: [
                    {
                        label: "Cocô",
                        itens: [
                            { label: "Pedaços duros separados (difíceis de passar)", descricao: "Consistência das fezes indicando dificuldade de passagem." },
                            { label: "Grumoso, duro, em forma de salsicha", descricao: "Textura das fezes indicando dureza." },
                            { label: "Em forma de salsicha com rachaduras na superfície", descricao: "Formato das fezes com rachaduras na superfície." },
                            { label: "Em forma de salsicha ou cobra; liso e macio", descricao: "Formato das fezes indicando suavidade e regularidade." },
                            { label: "Bolhas macias com bordas bem definidas (fáceis de passar)", descricao: "Consistência das fezes indicando facilidade de passagem." },
                            { label: "Fezes fofas com bordas irregulares; mole", descricao: "Textura das fezes indicando suavidade e bordas irregulares." },
                            { label: "Totalmente líquido, aguado, sem pedaços sólidos", descricao: "Consistência líquida das fezes sem pedaços sólidos." }
                        ]
                    },
                    {
                        label: "Xixi",
                        itens: [
                            { label: "Claro", descricao: "Cor clara da urina." },
                            { label: "Amarelo", descricao: "Cor amarela da urina." },
                            { label: "Escuro", descricao: "Cor escura da urina." }
                        ]
                    },
                ]
            },
        ],
    }, 
    {
        label: "Eventos",
        descricao: "Refere-se a eventos externos e sociais, como aglomerações, festas, viagens e celebrações.",
        icon: events,
        itens: [
            {
                label: "Aglomeração Externa",
                itens: [
                    { label: "Passeata", descricao: "Participação em uma marcha ou caminhada em grupo." },
                    { label: "Carnaval", descricao: "Participação em eventos de carnaval." },
                    { label: "Desfile", descricao: "Presença em desfiles." },
                    { label: "Show ao ar livre", descricao: "Participação em shows ao ar livre." },
                    { label: "Parque de diversões", descricao: "Visita a parques de diversões." },
                    { label: "Feira ao ar livre", descricao: "Presença em feiras ao ar livre." },
                    { label: "Festival de música", descricao: "Participação em festivais de música." },
                    { label: "Evento esportivo ao ar livre", descricao: "Presença em eventos esportivos ao ar livre." },
                ]
            },
            {
                label: "Eventos Sociais",
                itens: [
                    { label: "Festa Infantil", descricao: "Participação em festas voltadas para crianças." },
                    { label: "Festa Adulto", descricao: "Participação em festas voltadas para adultos." },
                    { label: "Churrasco", descricao: "Presença em churrascos." },
                    { label: "Casamento", descricao: "Presença em cerimônias de casamento." },
                    { label: "Baile", descricao: "Participação em bailes." },
                    { label: "Jantar social", descricao: "Presença em jantares sociais." },
                ]
            },
            {
                label: "Eventos Especiais",
                itens: [
                    { label: "Aniversário", descricao: "Comemoração de aniversário." },
                    { label: "Chá de bebê", descricao: "Celebração do futuro nascimento de um bebê." },
                    { label: "Despedida de solteiro", descricao: "Evento de despedida de solteiro." },
                    { label: "Reunião de família", descricao: "Encontro familiar." },
                    { label: "Celebração religiosa", descricao: "Participação em celebrações religiosas." },
                    { label: "Evento corporativo especial", descricao: "Participação em eventos corporativos especiais." },
                    { label: "Formatura", descricao: "Participação em cerimônias de formatura." },
                ]
            },
            {
                label: "Viagens",
                itens: [
                    { label: "Chegada de Viagem de Alguém", descricao: "Retorno de alguém de uma viagem." },
                    { label: "Saída de Viagem de Alguém", descricao: "Partida de alguém para uma viagem." },
                    { label: "Férias em família", descricao: "Período de férias em família." },
                    { label: "Viagem escolar", descricao: "Viagem organizada pela escola." },
                    { label: "Excursão", descricao: "Participação em excursões." },
                ]
            },
        ]
    },
    {
        label: "Saúde",
        descricao: "Envolvendo sintomas, consultas médicas, procedimentos médicos e medicamentos.",
        icon: health,
        itens: [
            {
                label: "Sintomas",
                itens: [
                    { label: "Febre", descricao: "Aumento da temperatura corporal." },
                    { label: "Dor de cabeça", descricao: "Sensação de dor na cabeça." },
                    { label: "Dor no corpo", descricao: "Sensação de dor generalizada no corpo." },
                    { label: "Dor abdominal", descricao: "Sensação de dor na região abdominal." },
                    { label: "Tontura", descricao: "Sensação de desequilíbrio e vertigem." },
                    { label: "Náusea", descricao: "Sensação de desconforto no estômago com desejo de vomitar." },
                    { label: "Vômito", descricao: "Expulsão do conteúdo gástrico pela boca." },
                    { label: "Diarréia", descricao: "Fezes frequentes e líquidas." },
                    { label: "Prisão de ventre", descricao: "Dificuldade ou falta de evacuação intestinal." },
                    { label: "Fadiga", descricao: "Sensação de cansaço e falta de energia." },
                    { label: "Falta de apetite", descricao: "Ausência de desejo de comer." },
                    { label: "Aumento de apetite", descricao: "Aumento do desejo de comer." },
                ]
            },
            {
                label: "Consultas Médicas",
                itens: [
                    { label: "Rotina", descricao: "Consulta médica de rotina." },
                    { label: "Especialista", descricao: "Consulta a um médico especialista." },
                    { label: "Emergência", descricao: "Atendimento médico de emergência." },
                    { label: "Exames de rotina", descricao: "Realização de exames médicos de rotina." },
                    { label: "Exames específicos", descricao: "Realização de exames médicos específicos." },
                ]
            },
            {
                label: "Procedimentos Médicos",
                itens: [
                    { label: "Cirurgia", descricao: "Intervenção cirúrgica." },
                    { label: "Procedimento ambulatorial", descricao: "Procedimento médico realizado em ambiente ambulatorial." },
                    { label: "Internação hospitalar", descricao: "Permanência do paciente no hospital." },
                    { label: "Fisioterapia", descricao: "Tratamento por meio de exercícios físicos e manuais." },
                ]
            },
            {
                label: "Medicamentos",
                itens: [
                    { label: "Prescrição atualizada", descricao: "Atualização da receita médica." },
                    { label: "Mudança na dosagem", descricao: "Alteração na quantidade de medicamento prescrita." },
                    { label: "Efeitos colaterais", descricao: "Reações indesejadas associadas ao uso do medicamento." },
                ]
            },
        ]
    },
    {
        label: "Sentimentos e Emoções",
        descricao: "Aborda uma ampla gama de emoções e sentimentos, categorizados em positivos e negativos, energéticos e calmos.",
        icon: feelings,
        itens: [
            {
                label: "Emoções Energéticas Negativas",
                itens: [
                    {
                        label: "Raiva",
                        itens: [
                            { label: "Furioso", descricao: "Intenso sentimento de raiva e indignação." },
                            { label: "Resentido", descricao: "Sentimento de amargura e ressentimento." },
                            { label: "Envergonhado", descricao: "Sentimento de constrangimento e humilhação." },
                            { label: "Irritado", descricao: "Estado de impaciência e irritação." }
                        ]
                    },
                    {
                        label: "Insegurança",
                        itens: [
                            { label: "Com raiva", descricao: "Sensação de raiva e frustração." },
                            { label: "Com ciúmes", descricao: "Sentimento de inveja e ciúmes." },
                            { label: "Nervoso", descricao: "Estado de agitação e ansiedade." },
                            { label: "Amedrontado", descricao: "Sentimento de medo e apreensão." }
                        ]
                    },
                    {
                        label: "Frustração",
                        itens: [
                            { label: "Aborrecido", descricao: "Sentimento de aborrecimento e desagrado." },
                            { label: "Irritável", descricao: "Propenso a ficar facilmente irritado." },
                            { label: "Confuso", descricao: "Sensação de confusão e perplexidade." },
                            { label: "Ansioso", descricao: "Sentimento de preocupação e apreensão." }
                        ]
                    },
                    {
                        label: "Preocupação",
                        itens: [
                            { label: "Preocupado", descricao: "Sentimento de inquietação e preocupação." },
                            { label: "Desesperado", descricao: "Estado de desespero e falta de esperança." },
                            { label: "Desanimado", descricao: "Sentimento de desânimo e desesperança." },
                            { label: "Rejeitado", descricao: "Sentimento de ser excluído ou ignorado." }
                        ]
                    }
                ]
            },
            {
                label: "Emoções Energéticas Positivas",
                itens: [
                    {
                        label: "Empolgação",
                        itens: [
                            { label: "Curioso", descricao: "Interesse e desejo de descobrir algo novo." },
                            { label: "Motivado", descricao: "Sentimento de motivação e impulso para a ação." },
                            { label: "Entusiasmado", descricao: "Emoção de entusiasmo e fervor." },
                            { label: "Corajoso", descricao: "Estado de coragem e audácia." }
                        ]
                    },
                    {
                        label: "Confiança",
                        itens: [
                            { label: "Feliz", descricao: "Estado emocional de felicidade e contentamento." },
                            { label: "Confiante", descricao: "Sentimento de confiança e autoconfiança." },
                            { label: "Focado", descricao: "Concentração e foco em uma tarefa ou objetivo." },
                            { label: "Orgulhoso", descricao: "Sentimento de realização e orgulho." }
                        ]
                    }
                ]
            },
            {
                label: "Emoções Calmas Negativas",
                itens: [
                    {
                        label: "Desespero",
                        itens: [
                            { label: "Desapontado", descricao: "Sentimento de decepção e tristeza." },
                            { label: "Abatido", descricao: "Estado de abatimento e desânimo." },
                            { label: "Rejeitado", descricao: "Sentimento de rejeição e exclusão." },
                            { label: "Solitário", descricao: "Sentimento de solidão e isolamento." }
                        ]
                    },
                    {
                        label: "Solidão",
                        itens: [
                            { label: "Excluído", descricao: "Sentimento de exclusão e isolamento." },
                            { label: "Magoado", descricao: "Sentimento de dor emocional." },
                            { label: "Entediado", descricao: "Sensação de tédio e monotonia." },
                            { label: "Isolado", descricao: "Sentimento de estar isolado dos outros." }
                        ]
                    },
                    {
                        label: "Desânimo",
                        itens: [
                            { label: "Triste", descricao: "Estado emocional de tristeza e melancolia." },
                            { label: "Distraído", descricao: "Dificuldade de concentração devido à tristeza." },
                            { label: "Desencorajado", descricao: "Sentimento de desânimo e falta de motivação." },
                            { label: "Empático", descricao: "Sensibilidade às emoções dos outros, muitas vezes associada à tristeza." }
                        ]
                    }
                ]
            },
            {
                label: "Emoções Calmas Positivas",
                itens: [
                    {
                        label: "Gratidão",
                        itens: [
                            { label: "Agradecido", descricao: "Sentimento de apreço e reconhecimento." },
                            { label: "Atencioso", descricao: "Demonstração de atenção e consideração pelos outros." },
                            { label: "Aceito", descricao: "Sentimento de aceitação e pertencimento." },
                            { label: "Pacífico", descricao: "Estado de tranquilidade e paz interior." }
                        ]
                    },
                    {
                        label: "Paciência",
                        itens: [
                            { label: "Paciente", descricao: "Capacidade de esperar com calma e tolerância." },
                            { label: "Perdoando", descricao: "Capacidade de perdoar e liberar ressentimentos." },
                            { label: "Cuidadoso", descricao: "Atenção e cuidado em relação aos outros." },
                            { label: "Seguro", descricao: "Sentimento de segurança e confiança." }
                        ]
                    },
                    {
                        label: "Alegria",
                        itens: [
                            { label: "Alegre", descricao: "Sentimento de alegria e contentamento." },
                            { label: "Corajoso", descricao: "Estado de coragem e determinação." },
                            { label: "Energizado", descricao: "Sensação de vitalidade e energia." },
                            { label: "Excitado", descricao: "Emoção de empolgação e entusiasmo." }
                        ]
                    }
                ]
            }, 
        ]
    }, 
    {
        label: "Mudanças de Rotina",
        descricao: "Inclui alterações de ambiente, mudanças na rotina diária, eventos programados e mudanças nas relações.",
        icon: changes,
        itens: [
            {
                label: "Alterações de Ambiente",
                itens: [
                    { label: "Mudança de Casa", descricao: "Mudança física para uma nova residência." },
                    { label: "Viagem para Outro Local", descricao: "Deslocamento para uma localidade diferente." },
                    { label: "Estadia na Casa de Outra Pessoa", descricao: "Período de permanência na residência de outra pessoa." },
                    { label: "Viagem de Carro", descricao: "Deslocamento utilizando veículo automotivo." },
                    { label: "Ficar em Outra Casa", descricao: "Permanência temporária em uma residência diferente." }
                ]
            },
            {
                label: "Mudanças na Rotina Diária",
                itens: [
                    { label: "Mudança na Rotina Escolar", descricao: "Alteração nos hábitos diários relacionados à escola." },
                    { label: "Mudança na Rotina de Alimentação", descricao: "Modificação nos padrões alimentares diários." },
                    { label: "Mudança nos Horários de Sono", descricao: "Alteração nos períodos de descanso diário." },
                    { label: "Mudança nas Atividades Diárias", descricao: "Variação nas tarefas e ocupações cotidianas." },
                ]
            },
            {
                label: "Eventos Programados",
                itens: [
                    { label: "Aniversário", descricao: "Celebrar mais um ano de vida." },
                    { label: "Chegada de Viagem de Alguém", descricao: "Retorno de alguém de uma viagem programada." },
                    { label: "Saída de Viagem de Alguém", descricao: "Partida de alguém para uma viagem programada." },
                    { label: "Evento Social Especial", descricao: "Participação em eventos sociais previamente agendados." },
                ]
            },
            {
                label: "Mudanças nas Relações",
                itens: [
                    { label: "Mudança de Cuidador", descricao: "Substituição da pessoa responsável pelos cuidados." },
                    { label: "Doença do Cuidador", descricao: "Condição de saúde adversa do cuidador." },
                    { label: "Morte na Família", descricao: "Perda de um membro da família." },
                    { label: "Desafios Econômicos", descricao: "Dificuldades financeiras e econômicas." },
                    { label: "Reforma na Casa", descricao: "Modificações estruturais na residência." }
                ]
            }
        ]
    }
];



