// script-composicao.js

// Estado da aplicação
const state = {
    modo: 'composicao', // 'composicao' ou 'agregacao'
    todoAtivo: true,
    partes: [],
    exemploAtual: 0
};

// Exemplos pré-definidos
const exemplos = [
    {
        todo: '🌳 Árvore',
        partes: ['🍃 Folha', '🍃 Folha', '🍃 Folha', '🌺 Flor', '🌺 Flor', '🍎 Fruto'],
        todoNome: 'Árvore',
        parteNome: 'Folhas/Flores/Frutos'
    },
    {
        todo: '📚 Livro',
        partes: ['📄 Página', '📄 Página', '📄 Página', '📖 Capítulo', '🔖 Marcador'],
        todoNome: 'Livro',
        parteNome: 'Páginas/Capítulos'
    },
    {
        todo: '🏠 Casa',
        partes: ['🚪 Porta', '🪟 Janela', '🪟 Janela', '💡 Lâmpada', '🛋️ Sofá'],
        todoNome: 'Casa',
        parteNome: 'Cômodos/Móveis'
    },
    {
        todo: '🚗 Carro',
        partes: ['🛞 Roda', '🛞 Roda', '🛞 Roda', '🛞 Roda', '🚪 Porta', '💡 Farol'],
        todoNome: 'Carro',
        parteNome: 'Rodas/Portas'
    }
];

// Elementos DOM
const btnComposicao = document.getElementById('btnComposicao');
const btnAgregacao = document.getElementById('btnAgregacao');
const explanation = document.getElementById('explanation');
const modoNome = document.getElementById('modoNome');
const modoDescricao = document.getElementById('modoDescricao');
const todoElement = document.getElementById('todoElement');
const todoExample = document.getElementById('todoExample');
const partesContainer = document.getElementById('partesContainer');
const apagarTodoBtn = document.getElementById('apagarTodoBtn');
const resetBtn = document.getElementById('resetBtn');
const mudarExemploBtn = document.getElementById('mudarExemploBtn');

// 1. Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarExemplo(state.exemploAtual);
    atualizarUI();
});

// 2. Seletor de Modo
btnComposicao.addEventListener('click', () => {
    state.modo = 'composicao';
    atualizarModo();
});

btnAgregacao.addEventListener('click', () => {
    state.modo = 'agregacao';
    atualizarModo();
});

function atualizarModo() {
    // Atualizar botões
    btnComposicao.classList.toggle('active', state.modo === 'composicao');
    btnAgregacao.classList.toggle('active', state.modo === 'agregacao');
    
    // Atualizar explicação
    if (state.modo === 'composicao') {
        modoNome.textContent = 'Composição';
        modoDescricao.innerHTML = 'Na <strong>composição</strong>, as partes <strong>NÃO</strong> podem existir sem o todo. Ao apagar o todo, as partes serão <strong>destruídas</strong>.';
    } else {
        modoNome.textContent = 'Agregação';
        modoDescricao.innerHTML = 'Na <strong>agregação</strong>, as partes <strong>podem</strong> existir independentemente. Ao apagar o todo, as partes <strong>permanecem</strong> como órfãs.';
    }
    
    // Reiniciar simulação se necessário
    if (!state.todoAtivo) {
        reiniciarSimulacao();
    }
}

// 3. Carregar Exemplo
function carregarExemplo(indice) {
    const exemplo = exemplos[indice];
    state.partes = [...exemplo.partes];
    
    todoExample.textContent = exemplo.todo;
    todoExample.setAttribute('data-nome', exemplo.todoNome);
    
    renderizarPartes();
}

function renderizarPartes() {
    partesContainer.innerHTML = '';
    
    state.partes.forEach((parte, index) => {
        const parteElement = document.createElement('div');
        parteElement.className = 'parte';
        parteElement.innerHTML = `
            <div class="emoji">${parte.split(' ')[0]}</div>
            <h4>${parte.split(' ').slice(1).join(' ')}</h4>
            <small>Parte ${index + 1}</small>
        `;
        partesContainer.appendChild(parteElement);
    });
}

// 4. Apagar o Todo (Ação Principal)
apagarTodoBtn.addEventListener('click', () => {
    if (!state.todoAtivo) return;
    
    state.todoAtivo = false;
    apagarTodoBtn.disabled = true;
    
    // Animação de desaparecimento do Todo
    todoElement.classList.add('desaparecendo');
    
    setTimeout(() => {
        if (state.modo === 'composicao') {
            // Composição: partes desaparecem junto
            apagarPartesComposicao();
        } else {
            // Agregação: partes ficam órfãs
            tornarPartesOrfas();
        }
    }, 500);
});

function apagarPartesComposicao() {
    const partesElements = document.querySelectorAll('.parte');
    
    partesElements.forEach((parte, index) => {
        setTimeout(() => {
            parte.classList.add('desaparecendo');
        }, index * 200);
    });
    
    setTimeout(() => {
        mostrarMensagemResultado('❌ Na COMPOSIÇÃO, as partes foram destruídas junto com o todo!');
    }, partesElements.length * 200 + 500);
}

function tornarPartesOrfas() {
    const partesElements = document.querySelectorAll('.parte');
    
    partesElements.forEach(parte => {
        parte.classList.add('orfa');
    });
    
    setTimeout(() => {
        mostrarMensagemResultado('⚠️ Na AGREGAÇÃO, as partes permanecem como órfãs!');
    }, 500);
}

function mostrarMensagemResultado(mensagem) {
    const mensagemElement = document.createElement('div');
    mensagemElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 1.5em;
        font-weight: bold;
        z-index: 1000;
        text-align: center;
    `;
    mensagemElement.textContent = mensagem;
    
    document.body.appendChild(mensagemElement);
    
    setTimeout(() => {
        mensagemElement.remove();
    }, 3000);
}

// 5. Reiniciar Simulação
resetBtn.addEventListener('click', reiniciarSimulacao);

function reiniciarSimulacao() {
    state.todoAtivo = true;
    apagarTodoBtn.disabled = false;
    
    // Remover classes de animação
    todoElement.classList.remove('desaparecendo');
    
    // Re-renderizar partes
    carregarExemplo(state.exemploAtual);
    
    // Pequena animação de "reset"
    todoElement.style.animation = 'none';
    setTimeout(() => {
        todoElement.style.animation = 'aparecer 0.5s ease-out';
    }, 10);
}

// 6. Mudar Exemplo
mudarExemploBtn.addEventListener('click', () => {
    state.exemploAtual = (state.exemploAtual + 1) % exemplos.length;
    reiniciarSimulacao();
    atualizarUI();
});

// 7. Atualizar Interface
function atualizarUI() {
    const exemplo = exemplos[state.exemploAtual];
    document.querySelector('.todo h3').textContent = exemplo.todoNome;
}

// 8. Teclas de Atalho
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') { // Espaço - Apagar/Resetar
        e.preventDefault();
        if (state.todoAtivo) {
            apagarTodoBtn.click();
        } else {
            resetBtn.click();
        }
    } else if (e.key === 'c') { // C - Modo Composição
        btnComposicao.click();
    } else if (e.key === 'a') { // A - Modo Agregação
        btnAgregacao.click();
    } else if (e.key === 'e') { // E - Mudar Exemplo
        mudarExemploBtn.click();
    }
});