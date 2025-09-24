// script-associacao.js

// Estado da aplicação
const state = {
    classeA: null,
    classeB: null,
    attributes: [],
    promoted: false
};

// Elementos DOM
const classNameA = document.getElementById('classNameA');
const classNameB = document.getElementById('classNameB');
const criarAssociacaoBtn = document.getElementById('criarAssociacaoBtn');
const currentAssociation = document.getElementById('currentAssociation');
const assocNome = document.getElementById('assocNome');
const attrName = document.getElementById('attrName');
const attrType = document.getElementById('attrType');
const addAttributeBtn = document.getElementById('addAttributeBtn');
const attributesList = document.getElementById('attributesList');
const promotionAlert = document.getElementById('promotionAlert');
const promoverBtn = document.getElementById('promoverBtn');
const diagramAntes = document.getElementById('diagramAntes');
const diagramDepois = document.getElementById('diagramDepois');
const problemasAntes = document.getElementById('problemasAntes');
const beneficiosDepois = document.getElementById('beneficiosDepois');

// 1. Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Carregar exemplos
    setupExamples();
    
    // Event listeners
    criarAssociacaoBtn.addEventListener('click', criarAssociacao);
    addAttributeBtn.addEventListener('click', adicionarAtributo);
    promoverBtn.addEventListener('click', promoverParaClasse);
    
    // Enter key support
    classNameA.addEventListener('keypress', (e) => e.key === 'Enter' && classNameB.focus());
    classNameB.addEventListener('keypress', (e) => e.key === 'Enter' && criarAssociacao());
    attrName.addEventListener('keypress', (e) => e.key === 'Enter' && attrType.focus());
    attrType.addEventListener('keypress', (e) => e.key === 'Enter' && adicionarAtributo());
});

// 2. Criar Associação entre Classes
function criarAssociacao() {
    const nomeA = classNameA.value.trim();
    const nomeB = classNameB.value.trim();
    
    if (!nomeA || !nomeB) {
        alert('Por favor, digite os nomes de ambas as classes.');
        return;
    }
    
    state.classeA = nomeA;
    state.classeB = nomeB;
    state.attributes = [];
    state.promoted = false;
    
    // Mostrar painel de associação atual
    currentAssociation.style.display = 'block';
    assocNome.textContent = `${nomeA} → ${nomeB}`;
    
    // Limpar atributos anteriores
    attributesList.innerHTML = '';
    promotionAlert.style.display = 'none';
    
    // Atualizar diagramas
    atualizarDiagramaAntes();
    atualizarDiagramaDepois();
    atualizarChecklist();
}

// 3. Adicionar Atributo ao Vínculo
function adicionarAtributo() {
    const nome = attrName.value.trim();
    const tipo = attrType.value.trim();
    
    if (!nome || !tipo) {
        alert('Por favor, digite nome e tipo do atributo.');
        return;
    }
    
    if (!state.classeA || !state.classeB) {
        alert('Crie uma associação primeiro!');
        return;
    }
    
    // Adicionar ao estado
    state.attributes.push({ nome, tipo });
    
    // Atualizar lista visual
    atualizarListaAtributos();
    
    // Limpar campos
    attrName.value = '';
    attrType.value = '';
    attrName.focus();
    
    // Verificar se deve mostrar alerta de promoção
    verificarPromocao();
    
    // Atualizar diagramas e checklist
    atualizarDiagramaAntes();
    atualizarDiagramaDepois();
    atualizarChecklist();
}

function atualizarListaAtributos() {
    attributesList.innerHTML = '';
    
    state.attributes.forEach((attr, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${attr.nome}: ${attr.tipo}</span>
            <button class="remove-attr" onclick="removerAtributo(${index})">×</button>
        `;
        attributesList.appendChild(li);
    });
}

// 4. Remover Atributo
function removerAtributo(index) {
    state.attributes.splice(index, 1);
    atualizarListaAtributos();
    verificarPromocao();
    atualizarDiagramaAntes();
    atualizarDiagramaDepois();
    atualizarChecklist();
}

// 5. Verificar se deve promover para classe
function verificarPromocao() {
    const devePromover = state.attributes.length > 0;
    
    if (devePromover && !state.promoted) {
        promotionAlert.style.display = 'block';
    } else {
        promotionAlert.style.display = 'none';
    }
}

// 6. Promover para Classe de Associação
function promoverParaClasse() {
    state.promoted = true;
    promotionAlert.style.display = 'none';
    atualizarDiagramaDepois();
    atualizarChecklist();
}

// 7. Atualizar Diagrama "Antes"
function atualizarDiagramaAntes() {
    diagramAntes.innerHTML = '';
    
    if (!state.classeA || !state.classeB) return;
    
    // Desenhar Classe A
    desenharClasse(diagramAntes, 100, 80, state.classeA, 'class-rect', 'class-text');
    
    // Desenhar Classe B
    desenharClasse(diagramAntes, 300, 80, state.classeB, 'class-rect', 'class-text');
    
    // Desenhar linha de associação
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '180');
    line.setAttribute('y1', '80');
    line.setAttribute('x2', '220');
    line.setAttribute('y2', '80');
    line.setAttribute('class', 'association-line');
    diagramAntes.appendChild(line);
    
    // Adicionar atributos como texto junto à linha (se houver)
    if (state.attributes.length > 0) {
        const attrText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        attrText.setAttribute('x', '200');
        attrText.setAttribute('y', '75');
        attrText.setAttribute('class', 'attribute-text');
        attrText.textContent = state.attributes.map(attr => attr.nome).join(', ');
        diagramAntes.appendChild(attrText);
    }
    
    // Atualizar problemas identificados
    atualizarProblemasIdentificados();
}

// 8. Atualizar Diagrama "Depois"
function atualizarDiagramaDepois() {
    diagramDepois.innerHTML = '';
    
    if (!state.classeA || !state.classeB) return;
    
    if (state.promoted && state.attributes.length > 0) {
        // DIAGRAMA COM CLASSE DE ASSOCIAÇÃO
        
        // Classe A
        desenharClasse(diagramDepois, 50, 80, state.classeA, 'class-rect', 'class-text');
        
        // Classe de Associação (no centro)
        const className = `${state.classeA}${state.classeB}`;
        desenharClasse(diagramDepois, 200, 80, className, 'association-class', 'association-class-text');
        
        // Classe B
        desenharClasse(diagramDepois, 350, 80, state.classeB, 'class-rect', 'class-text');
        
        // Linhas de associação
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line1.setAttribute('x1', '130');
        line1.setAttribute('y1', '80');
        line1.setAttribute('x2', '170');
        line1.setAttribute('y2', '80');
        line1.setAttribute('class', 'association-line');
        diagramDepois.appendChild(line1);
        
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line2.setAttribute('x1', '230');
        line2.setAttribute('y1', '80');
        line2.setAttribute('x2', '270');
        line2.setAttribute('y2', '80');
        line2.setAttribute('class', 'association-line');
        diagramDepois.appendChild(line2);
        
        // Atributos da classe de associação
        const attrY = 110;
        state.attributes.forEach((attr, index) => {
            const attrText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            attrText.setAttribute('x', '200');
            attrText.setAttribute('y', attrY + (index * 15));
            attrText.setAttribute('class', 'attribute-text');
            attrText.textContent = `${attr.nome}: ${attr.tipo}`;
            diagramDepois.appendChild(attrText);
        });
        
    } else {
        // DIAGRAMA SIMPLES (igual ao "antes")
        desenharClasse(diagramDepois, 100, 80, state.classeA, 'class-rect', 'class-text');
        desenharClasse(diagramDepois, 300, 80, state.classeB, 'class-rect', 'class-text');
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '180');
        line.setAttribute('y1', '80');
        line.setAttribute('x2', '220');
        line.setAttribute('y2', '80');
        line.setAttribute('class', 'association-line');
        diagramDepois.appendChild(line);
    }
    
    // Atualizar benefícios
    atualizarBeneficios();
}

// 9. Função auxiliar para desenhar classes
function desenharClasse(svg, x, y, nome, rectClass, textClass) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x - 60);
    rect.setAttribute('y', y - 30);
    rect.setAttribute('width', '120');
    rect.setAttribute('height', '60');
    rect.setAttribute('class', rectClass);
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('class', textClass);
    text.textContent = nome;
    
    group.appendChild(rect);
    group.appendChild(text);
    svg.appendChild(group);
}

// 10. Atualizar problemas e benefícios
function atualizarProblemasIdentificados() {
    problemasAntes.innerHTML = '';
    
    if (state.attributes.length === 0) {
        problemasAntes.innerHTML = '<li>Nenhum problema identificado - vínculo simples</li>';
        return;
    }
    
    const problemas = [
        'Atributos estão "pendurados" sem classe específica',
        'Dificuldade em implementar regras de negócio',
        'Falta de identidade própria para o relacionamento',
        'Complexidade aumentada nas classes originais'
    ];
    
    problemas.forEach(problema => {
        const li = document.createElement('li');
        li.textContent = problema;
        problemasAntes.appendChild(li);
    });
}

function atualizarBeneficios() {
    beneficiosDepois.innerHTML = '';
    
    if (!state.promoted || state.attributes.length === 0) {
        beneficiosDepois.innerHTML = '<li>Promova o vínculo para ver os benefícios</li>';
        return;
    }
    
    const beneficios = [
        'Atributos organizados em uma classe específica',
        'Regras de negócio podem ser encapsuladas',
        'Ciclo de vida independente do relacionamento',
        'Maior clareza e mantenabilidade do código',
        'Facilita extensões futuras'
    ];
    
    beneficios.forEach(beneficio => {
        const li = document.createElement('li');
        li.textContent = beneficio;
        beneficiosDepois.appendChild(li);
    });
}

// 11. Atualizar Checklist
function atualizarChecklist() {
    const criteria = ['atributos', 'regras', 'ciclo', 'identidade'];
    
    criteria.forEach(criterion => {
        const item = document.querySelector(`[data-criteria="${criterion}"]`);
        const checkbox = item.querySelector('input');
        
        let checked = false;
        
        switch(criterion) {
            case 'atributos':
                checked = state.attributes.length > 0;
                break;
            case 'regras':
                checked = state.attributes.length >= 2; // Simplificação: 2+ attrs = provavelmente tem regras
                break;
            case 'ciclo':
                checked = state.attributes.some(attr => 
                    attr.nome.toLowerCase().includes('data') || 
                    attr.nome.toLowerCase().includes('periodo')
                );
                break;
            case 'identidade':
                checked = state.promoted;
                break;
        }
        
        checkbox.checked = checked;
        if (checked) {
            item.classList.add('checked');
        } else {
            item.classList.remove('checked');
        }
    });
}

// 12. Exemplos Práticos
function setupExamples() {
    const exampleCards = document.querySelectorAll('.example-card');
    
    exampleCards.forEach(card => {
        const button = card.querySelector('.load-example-btn');
        button.addEventListener('click', () => {
            const classeA = card.dataset.a;
            const classeB = card.dataset.b;
            const attrs = card.dataset.attrs;
            
            // Preencher os campos
            classNameA.value = classeA;
            classNameB.value = classeB;
            
            // Criar associação
            criarAssociacao();
            
            // Adicionar atributos do exemplo
            if (attrs) {
                attrs.split(',').forEach(attrPair => {
                    const [nome, tipo] = attrPair.split(':');
                    if (nome && tipo) {
                        state.attributes.push({ nome: nome.trim(), tipo: tipo.trim() });
                    }
                });
                atualizarListaAtributos();
                verificarPromocao();
                atualizarDiagramaAntes();
                atualizarDiagramaDepois();
                atualizarChecklist();
            }
        });
    });
}