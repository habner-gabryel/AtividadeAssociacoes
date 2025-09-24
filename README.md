# 🎯 MVP Lab - Associações em POO

**Laboratório interativo para ensino e prática de associações entre classes em Programação Orientada a Objetos**

[![POO](https://img.shields.io/badge/POO-Associações-blue)](https://github.com/seu-usuario/mvp-poo-lab)
[![Educational](https://img.shields.io/badge/Educational-UTFPR-green)](https://github.com/seu-usuario/mvp-poo-lab)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://github.com/seu-usuario/mvp-poo-lab)

## 📖 Sobre o Projeto

Este projeto consiste em uma suite de **Mini Aplicações Visuais (MVPs)** desenvolvidas para apoiar o aprendizado de **associações entre classes** na disciplina de Programação Orientada a Objetos. Cada MVP aborda um conceito específico através de interfaces interativas que facilitam a compreensão prática dos temas.

### 🎯 Objetivo
Fornecer ferramentas visuais e interativas que complementem o material teórico, permitindo que estudantes:
- Visualizem conceitos abstratos de forma concreta
- Testem hipóteses e vejam resultados imediatos
- Desenvolvam intuição para decisões de modelagem
- Participem de debates fundamentados com evidências visuais

## 🚀 MVPs Disponíveis

### 1. 🔁 **Editor de Navegabilidade Mínima** - *Atividade 4*
**Arquivo:** `navegabilidade-minima.html`

Ferramenta visual para definir e refinar direções de associação entre classes, promovendo o mínimo de acoplamento necessário.

**Funcionalidades:**
- 🎯 Seleção interativa de direções de setas (→, ←, ↔)
- 📊 Medidor de complexidade em tempo real
- 💡 Dicas inteligentes para redução de acoplamento
- 📐 Visualização gráfica do grafo de classes

**Uso educacional:** Ensina quando a bidirecionalidade é necessária vs quando é acoplamento desnecessário.

### 2. 🎯 **Promotor de Classe de Associação** - *Atividade 5*
**Arquivo:** `classe-associacao.html`

Identifica quando um vínculo entre classes deve se tornar uma entidade própria com atributos e ciclo de vida independentes.

**Funcionalidades:**
- ➕ Adição dinâmica de atributos ao vínculo
- 🔍 Detecção automática da necessidade de promoção
- ⚖️ Comparação visual Antes/Depois
- ✅ Checklist interativo de critérios

**Uso educacional:** Ilustra o conceito de "quando o vínculo vira coisa" através de transformação visual.

### 3. ⚖️ **Simulador de Composição vs Agregação** - *Atividade 6*
**Arquivo:** `composicao-agregacao.html`

Experimenta visualmente a diferença crucial entre composição e agregação através da simulação de ciclo de vida.

**Funcionalidades:**
- 🎮 Simulação interativa de "Apagar o Todo"
- 🌳 Múltiplos exemplos do mundo real
- ✨ Animações que mostram o ciclo de vida
- 📝 Feedback imediato com explicações

**Uso educacional:** Demonstra praticamente a diferença de dependência de vida entre todo e parte.

## 🏗️ Estrutura do Projeto

```
mvp-poo-lab/
│
├── 📄 hub-mvp-poo.html                 # Hub central de navegação
│
├── 🎯 MVP 3 - Navegabilidade Mínima
│   ├── navegabilidade-minima.html      # Aplicação principal
│   ├── style-navegabilidade.css        # Estilos específicos
│   └── script-navegabilidade.js        # Lógica interativa
│
├── 🎯 MVP 4 - Classe de Associação
│   ├── classe-associacao.html          # Aplicação principal
│   ├── style-associacao.css            # Estilos específicos
│   └── script-associacao.js            # Lógica interativa
│
├── 🎯 MVP 5 - Composição vs Agregação
│   ├── composicao-agregacao.html       # Aplicação principal
│   ├── style-composicao.css            # Estilos específicos
│   └── script-composicao.js            # Lógica interativa
│
└── 📚 README.md                        # Este arquivo
```

## 🚀 Como Utilizar

### ⚡ **Acesso Rápido**
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/mvp-poo-lab.git
   ```

2. **Abra o Hub Central:**
   ```bash
   cd mvp-poo-lab
   open hub-mvp-poo.html  # Ou arraste o arquivo para o navegador
   ```

3. **Explore os MVPs:**
   - Clique em qualquer card para abrir o MVP correspondente
   - Utilize os exemplos pré-configurados
   - Experimente com diferentes cenários

### 🎮 **Modo de Uso em Sala de Aula**

**Para Professores:**
- Use o Hub Central para demonstrar conceitos em tempo real
- Carregue exemplos específicos para cada tópico
- Utilize a comparação visual para debates em grupo

**Para Estudantes:**
- Teste hipóteses antes de implementar
- Compare diferentes abordagens de modelagem
- Use como ferramenta de estudo e revisão

### ⌨️ **Atalhos de Teclado**
- **Tecla 1**: Abrir MVP 3 (Navegabilidade)
- **Tecla 2**: Abrir MVP 4 (Classe de Associação)
- **Tecla 3**: Abrir MVP 5 (Composição/Agregação)
- **Tecla H**: Voltar ao Hub Central

## 🎯 Contexto Educacional

### 📚 Base Teórica
Este projeto foi desenvolvido para complementar o material "POO 2025/2 — Atividade Única: Associações", abordando especificamente:

- **Atividade 4**: Navegabilidade Mínima
- **Atividade 5**: Classe de Associação  
- **Atividade 6**: Composição × Agregação

### 🎓 Competências Desenvolvidas
Ao utilizar estas ferramentas, os estudantes desenvolvem:

- **Pensamento Sistêmico**: Visualização de relações entre classes
- **Tomada de Decisão**: Escolhas fundamentadas em critérios objetivos
- **Abstração**: Transformação de conceitos abstratos em modelos concretos
- **Comunicação**: Discussão de designs com vocabulário técnico preciso

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Gráficos**: SVG nativo para visualizações
- **Design**: CSS Grid, Flexbox, Gradientes, Animações CSS
- **Interatividade**: Eventos DOM, Local Storage (para persistência)

## 🌟 Características Técnicas

### ✅ **Design Responsivo**
- Adaptável a desktop, tablet e mobile
- Interface touch-friendly para dispositivos móveis
- Layout flexível que se adapta a diferentes tamanhos de tela

### ✅ **Experiência do Usuário**
- Feedback visual imediato para todas as ações
- Animações suaves que facilitam a compreensão
- Navegação intuitiva e aprendizado progressivo

### ✅ **Performance**
- Aplicações client-side (sem necessidade de backend)
- Carregamento rápido e responsivo
- Código otimizado para execução no navegador

## 🤝 Contribuindo

Contribuições são bem-vindas! Areas onde você pode ajudar:

- **Novos MVPs**: Para outras atividades do material
- **Melhorias de UI/UX**: Refinamento das interfaces existentes
- **Novos Exemplos**: Cenários adicionais para prática
- **Documentação**: Melhoria deste README ou criação de tutoriais

### 📋 Processo de Contribuição
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🙏 Agradecimentos

- **Prof. Everton Coimbra Araújo** - Orientação e material didático
- **UTFPR - Universidade Tecnológica Federal do Paraná** - Suporte institucional
- **Comunidade de POO** - Feedback e validação dos conceitos

---

## 📞 Contato

**Projeto Educacional** - [Repositório GitHub](https://github.com/habner-gabryel/AtividadeAssociacoes)

**Universidade**: UTFPR - Campus Medianeira  
**Disciplina**: Programação Orientada a Objetos  
**Período**: 2025/2

---

<div align="center">

*"O aprendizado acontece quando a teoria ganha vida através da prática."* 🎯

</div>