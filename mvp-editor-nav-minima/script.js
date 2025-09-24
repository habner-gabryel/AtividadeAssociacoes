// script.js

// Estado da aplicação
const state = {
    classes: [],
    associations: [],
    selectedClass: null // Classe selecionada para criar associação
};

// Elementos DOM
const classNameInput = document.getElementById('className');
const addClassBtn = document.getElementById('addClassBtn');
const graphCanvas = document.getElementById('graphCanvas');
const arrowCountEl = document.getElementById('arrowCount');
const densityEl = document.getElementById('density');
const helpTextEl = document.getElementById('helpText');
const resetBtn = document.getElementById('resetBtn');

// 1. Adicionar uma nova classe ao canvas
addClassBtn.addEventListener('click', () => {
    const name = classNameInput.value.trim();
    if (name) {
        addClass(name);
        classNameInput.value = '';
        updateStats();
    }
});

classNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addClassBtn.click();
    }
});

// Função para adicionar uma classe visualmente
function addClass(name) {
    const newClass = {
        id: `class-${Date.now()}`,
        name: name,
        x: Math.random() * 700 + 50,
        y: Math.random() * 400 + 50
    };
    
    state.classes.push(newClass);
    renderClass(newClass);
}

// 2. Renderizar uma classe como um retângulo no SVG
function renderClass(cls) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('id', cls.id);
    group.setAttribute('transform', `translate(${cls.x}, ${cls.y})`);
    
    // Retângulo da classe
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '120');
    rect.setAttribute('height', '60');
    rect.setAttribute('fill', '#bbdefb');
    rect.setAttribute('stroke', '#1976d2');
    rect.setAttribute('rx', '5');
    rect.setAttribute('cursor', 'pointer');
    
    // Texto do nome da classe
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '60');
    text.setAttribute('y', '35');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#0d47a1');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('pointer-events', 'none'); // Não interferir com clicks
    text.textContent = cls.name;
    
    group.appendChild(rect);
    group.appendChild(text);
    
    // Tornar a classe clicável para seleção e arrastável
    makeSelectable(group, cls);
    makeDraggable(group, cls);
    
    graphCanvas.appendChild(group);
}

// 3. Tornar a classe selecionável para criar associações
function makeSelectable(element, classData) {
    const rect = element.querySelector('rect');
    
    rect.addEventListener('click', (e) => {
        e.stopPropagation(); // Impedir que o click propague para o SVG

        // Desselecionar todas as classes
        state.classes.forEach(cls => {
            const el = document.getElementById(cls.id);
            if (el) {
                const rect = el.querySelector('rect');
                rect.setAttribute('stroke', '#1976d2');
                rect.setAttribute('stroke-width', '1');
            }
        });

        // Salva a classe previamente selecionada
        const previouslySelected = state.selectedClass;

        // Se clicar na mesma classe, desseleciona
        if (previouslySelected && previouslySelected.id === classData.id) {
            state.selectedClass = null;
            rect.setAttribute('stroke', '#1976d2');
            rect.setAttribute('stroke-width', '1');
            helpTextEl.textContent = 'Classe desselecionada. Clique em uma classe para selecionar.';
        } else if (previouslySelected && previouslySelected.id !== classData.id) {
            // Se já havia uma classe selecionada e é diferente, cria associação
            createAssociation(previouslySelected, classData);
            state.selectedClass = null;
        } else {
            // Seleciona esta classe
            state.selectedClass = classData;
            rect.setAttribute('stroke', '#ff9800');
            rect.setAttribute('stroke-width', '3');
            helpTextEl.textContent = `Classe "${classData.name}" selecionada. Clique em outra classe para conectar.`;
        }
    });
}

// 4. Tornar elementos arrastáveis
function makeDraggable(element, data) {
    let isDragging = false;
    let offsetX, offsetY;
    
    element.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'rect') {
            isDragging = true;
            offsetX = e.clientX - data.x;
            offsetY = e.clientY - data.y;
            element.setAttribute('cursor', 'grabbing');
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        data.x = e.clientX - offsetX;
        data.y = e.clientY - offsetY;
        element.setAttribute('transform', `translate(${data.x}, ${data.y})`);
        updateAssociations();
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        element.setAttribute('cursor', 'pointer');
    });
}

// 5. Criar associação entre duas classes
function createAssociation(classA, classB) {
    // Verifica se a associação já existe
    const exists = state.associations.find(a => 
        (a.from === classA.id && a.to === classB.id) || 
        (a.from === classB.id && a.to === classA.id)
    );
    
    if (exists) {
        helpTextEl.textContent = '⚠️ Estas classes já estão conectadas!';
        return;
    }
    
    const newAssoc = {
        id: `assoc-${Date.now()}`,
        from: classA.id,
        to: classB.id,
        navigation: 'forward' // Começa com seta unidirecional
    };
    
    state.associations.push(newAssoc);
    renderAssociation(newAssoc);
    updateStats();
    
    helpTextEl.textContent = `✅ Associação criada entre ${classA.name} e ${classB.name}. Clique na seta para alterar a direção.`;
}

// 6. Renderizar a associação como uma seta clicável
function renderAssociation(assoc) {
    const classA = state.classes.find(c => c.id === assoc.from);
    const classB = state.classes.find(c => c.id === assoc.to);
    
    if (!classA || !classB) return;
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('id', assoc.id);
    line.setAttribute('x1', classA.x + 60);
    line.setAttribute('y1', classA.y + 30);
    line.setAttribute('x2', classB.x + 60);
    line.setAttribute('y2', classB.y + 30);
    line.setAttribute('stroke', '#4CAF50');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('cursor', 'pointer');
    line.setAttribute('marker-end', 'url(#arrowhead)');
    
    // Tornar a linha clicável para mudar navegabilidade
    line.addEventListener('click', (e) => {
        e.stopPropagation();
        cycleNavigation(assoc);
    });
    
    graphCanvas.appendChild(line);
}

// 7. Ciclar entre os modos de navegabilidade
function cycleNavigation(assoc) {
    const modes = ['none', 'forward', 'backward', 'bidirectional'];
    const currentIndex = modes.indexOf(assoc.navigation);
    assoc.navigation = modes[(currentIndex + 1) % modes.length];
    
    updateAssociationVisual(assoc);
    updateStats();
    showSmartHint(assoc);
}

// 8. Atualizar a aparência visual da seta
function updateAssociationVisual(assoc) {
    const line = document.getElementById(assoc.id);
    if (!line) return;
    
    // Remove marcadores anteriores
    line.removeAttribute('marker-start');
    line.removeAttribute('marker-end');
    
    const classA = state.classes.find(c => c.id === assoc.from);
    const classB = state.classes.find(c => c.id === assoc.to);
    
    switch(assoc.navigation) {
        case 'none':
            line.setAttribute('stroke', '#ccc');
            line.setAttribute('stroke-dasharray', '5,5');
            break;
        case 'forward':
            line.setAttribute('stroke', '#4CAF50');
            line.setAttribute('stroke-dasharray', 'none');
            line.setAttribute('marker-end', 'url(#arrowhead)');
            break;
        case 'backward':
            line.setAttribute('stroke', '#FF9800');
            line.setAttribute('stroke-dasharray', 'none');
            line.setAttribute('marker-start', 'url(#arrowhead)');
            // Inverte visualmente a direção
            line.setAttribute('x1', classB.x + 60);
            line.setAttribute('y1', classB.y + 30);
            line.setAttribute('x2', classA.x + 60);
            line.setAttribute('y2', classA.y + 30);
            break;
        case 'bidirectional':
            line.setAttribute('stroke', '#F44336');
            line.setAttribute('stroke-dasharray', 'none');
            line.setAttribute('marker-start', 'url(#arrowhead)');
            line.setAttribute('marker-end', 'url(#arrowhead)');
            // Restaura direção original para bidirectional
            line.setAttribute('x1', classA.x + 60);
            line.setAttribute('y1', classA.y + 30);
            line.setAttribute('x2', classB.x + 60);
            line.setAttribute('y2', classB.y + 30);
            break;
    }
}

// 9. Atualizar estatísticas de complexidade
function updateStats() {
    const activeArrows = state.associations.filter(a => a.navigation !== 'none').length;
    arrowCountEl.textContent = activeArrows;
    
    // Densidade simplificada: setas/classes
    const density = state.classes.length > 0 ? (activeArrows / state.classes.length).toFixed(2) : '0.00';
    densityEl.textContent = density;
    
    // Feedback de complexidade
    if (density > 1.5) {
        densityEl.style.color = '#f44336';
    } else if (density > 0.8) {
        densityEl.style.color = '#FF9800';
    } else {
        densityEl.style.color = '#4CAF50';
    }
}

// 10. Dica inteligente baseada na navegabilidade
function showSmartHint(assoc) {
    const classA = state.classes.find(c => c.id === assoc.from);
    const classB = state.classes.find(c => c.id === assoc.to);
    
    let hint = "";
    
    switch(assoc.navigation) {
        case 'bidirectional':
            hint = `💡 Você realmente precisa navegar de ${classB.name} para ${classA.name}? Isso aumenta o acoplamento.`;
            break;
        case 'backward':
            hint = `💡 A navegação apenas de ${classB.name} para ${classA.name} é incomum. É esse o fluxo principal?`;
            break;
        case 'none':
            hint = `ℹ️  Sem navegabilidade entre ${classA.name} e ${classB.name}. Isso é intencional?`;
            break;
        default:
            hint = `✅ Navegabilidade mínima de ${classA.name} para ${classB.name}. Bom trabalho!`;
    }
    
    helpTextEl.textContent = hint;
}

// 11. Atualizar posições das setas quando classes são movidas
function updateAssociations() {
    state.associations.forEach(assoc => {
        const line = document.getElementById(assoc.id);
        if (!line) return;
        
        const classA = state.classes.find(c => c.id === assoc.from);
        const classB = state.classes.find(c => c.id === assoc.to);
        
        if (classA && classB) {
            // Atualiza posições baseado na direção atual
            if (assoc.navigation === 'backward') {
                line.setAttribute('x1', classB.x + 60);
                line.setAttribute('y1', classB.y + 30);
                line.setAttribute('x2', classA.x + 60);
                line.setAttribute('y2', classA.y + 30);
            } else {
                line.setAttribute('x1', classA.x + 60);
                line.setAttribute('y1', classA.y + 30);
                line.setAttribute('x2', classB.x + 60);
                line.setAttribute('y2', classB.y + 30);
            }
        }
    });
}

// 12. Definir o marcador de seta no SVG
function initArrowMarker() {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '7');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '3.5');
    marker.setAttribute('orient', 'auto');
    
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
    polygon.setAttribute('fill', 'context-stroke');
    
    marker.appendChild(polygon);
    defs.appendChild(marker);
    graphCanvas.appendChild(defs);
}

// 13. Reiniciar o diagrama
resetBtn.addEventListener('click', () => {
    state.classes = [];
    state.associations = [];
    state.selectedClass = null;
    graphCanvas.innerHTML = '';
    initArrowMarker();
    updateStats();
    helpTextEl.textContent = 'Diagrama reiniciado. Adicione classes e conecte-as.';
});

// 14. Desselecionar classe ao clicar em área vazia
graphCanvas.addEventListener('click', (e) => {
    if (e.target.tagName === 'svg') {
        // Desselecionar todas as classes
        state.classes.forEach(cls => {
            const el = document.getElementById(cls.id);
            if (el) {
                const rect = el.querySelector('rect');
                rect.setAttribute('stroke', '#1976d2');
                rect.setAttribute('stroke-width', '1');
            }
        });
        state.selectedClass = null;
        helpTextEl.textContent = 'Classe desselecionada. Clique em uma classe para selecionar.';
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initArrowMarker();
    helpTextEl.textContent = 'Adicione classes usando o campo acima. Clique em uma classe para selecioná-la, depois clique em outra para conectá-las.';
});