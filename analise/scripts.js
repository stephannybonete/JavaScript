document.addEventListener('DOMContentLoaded', function() {

    // --- BANCO DE DADOS SIMULADO ---
    let analisesConcorrentes = [
        { id: 1, concorrente: 'Hotel Atlântico', produto: 'Pacote Fim de Semana', preco: 'R$ 799,00', estrategia: 'Marketing forte no Instagram com influenciadores.', pontosFortes: 'Piscina aquecida.', pontosFracos: 'Distante do centro.', data: '2025-09-15' },
        { id: 2, concorrente: 'Pousada Bela Vista', produto: 'Diária Casal', preco: 'R$ 450,00', estrategia: 'Foco em casais, com pacotes românticos.', pontosFortes: 'Vista incrível, avaliações altas.', pontosFracos: 'Poucos quartos, sempre lotado.', data: '2025-09-20' }
    ];
    let proximoId = 3; // Controla o ID para novos registros
    let modoEdicao = false;

    // --- MAPEAMENTO DOS ELEMENTOS DO FORMULÁRIO (CACHE) ---
    const form = document.getElementById('competitorForm');
    const analysisIdInput = document.getElementById('analysisId');
    const competitorNameInput = document.getElementById('competitorName');
    const productNameInput = document.getElementById('productName');
    const competitorPriceInput = document.getElementById('competitorPrice');
    const strategyDescriptionInput = document.getElementById('strategyDescription');
    const strengthsInput = document.getElementById('strengths');
    const weaknessesInput = document.getElementById('weaknesses');
    const analysisDateInput = document.getElementById('analysisDate');
    const searchInput = document.getElementById('searchInput');

    const btnInserir = document.getElementById('btn_inserir');
    const btnGravar = document.getElementById('btn_gravar');
    const btnCancelar = document.getElementById('btn_cancelar');

    // --- FUNÇÕES DE CONTROLE DO FORMULÁRIO (Adaptado do seu código) ---
    
    function HabilitaCampos(habilitar) {
        const campos = [competitorNameInput, productNameInput, competitorPriceInput, strategyDescriptionInput, strengthsInput, weaknessesInput, analysisDateInput];
        campos.forEach(campo => campo.disabled = !habilitar);
    }

    function LimpaCampos() {
        form.reset();
        analysisIdInput.value = '';
        form.classList.remove('was-validated');
    }

    function ResetarEstadoFormulario() {
        LimpaCampos();
        HabilitaCampos(false);
        modoEdicao = false;

        btnInserir.disabled = false;
        btnGravar.disabled = true;
        btnCancelar.disabled = true;
    }

    // --- FUNÇÕES DE RENDERIZAÇÃO E CRUD ---

    function renderTable(filter = '') {
        const tableBody = document.getElementById('competitorTableBody');
        tableBody.innerHTML = '';

        const filteredData = analisesConcorrentes.filter(item => 
            item.concorrente.toLowerCase().includes(filter.toLowerCase()) ||
            item.produto.toLowerCase().includes(filter.toLowerCase())
        );
        
        if (filteredData.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center">Nenhuma análise encontrada.</td></tr>';
            return;
        }

        filteredData.forEach(item => {
            const row = `
                <tr>
                    <td>${item.concorrente}</td>
                    <td>${item.produto}</td>
                    <td>${item.preco}</td>
                    <td>${new Date(item.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="editAnalysis(${item.id})"><i class="bi bi-pencil-fill"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="deleteAnalysis(${item.id})"><i class="bi bi-trash-fill"></i></button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    window.editAnalysis = function(id) {
        const item = analisesConcorrentes.find(i => i.id === id);
        if (!item) return;

        modoEdicao = true;
        HabilitaCampos(true);

        analysisIdInput.value = item.id;
        competitorNameInput.value = item.concorrente;
        productNameInput.value = item.produto;
        competitorPriceInput.value = item.preco;
        strategyDescriptionInput.value = item.estrategia;
        strengthsInput.value = item.pontosFortes;
        weaknessesInput.value = item.pontosFracos;
        analysisDateInput.value = item.data;
        
        btnInserir.disabled = true;
        btnGravar.disabled = false;
        btnCancelar.disabled = false;
        
        window.scrollTo(0,0); // Rola a tela para o topo para ver o formulário
    }

    window.deleteAnalysis = function(id) {
        if (confirm('Tem certeza que deseja excluir esta análise?')) {
            analisesConcorrentes = analisesConcorrentes.filter(i => i.id !== id);
            renderTable(searchInput.value);
        }
    }


    // --- EVENT LISTENERS ---

    btnInserir.addEventListener('click', () => {
        modoEdicao = false;
        LimpaCampos();
        HabilitaCampos(true);

        btnInserir.disabled = true;
        btnGravar.disabled = false;
        btnCancelar.disabled = false;
        
        competitorNameInput.focus();
    });

    btnCancelar.addEventListener('click', ResetarEstadoFormulario);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Validação simples
        if (!competitorNameInput.value || !productNameInput.value || !competitorPriceInput.value) {
            alert('Por favor, preencha os campos obrigatórios: Concorrente, Produto e Preço.');
            return;
        }

        const data = {
            id: modoEdicao ? parseInt(analysisIdInput.value) : proximoId,
            concorrente: competitorNameInput.value,
            produto: productNameInput.value,
            preco: competitorPriceInput.value,
            estrategia: strategyDescriptionInput.value,
            pontosFortes: strengthsInput.value,
            pontosFracos: weaknessesInput.value,
            data: analysisDateInput.value
        };

        if (modoEdicao) {
            // Atualiza o item existente
            const index = analisesConcorrentes.findIndex(i => i.id === data.id);
            analisesConcorrentes[index] = data;
        } else {
            // Adiciona um novo item
            analisesConcorrentes.push(data);
            proximoId++;
        }

        renderTable();
        ResetarEstadoFormulario();
    });

    searchInput.addEventListener('input', () => {
        renderTable(searchInput.value);
    });

    // --- INICIALIZAÇÃO ---
    $('#competitorPrice').mask('000.000.000,00', {reverse: true}); // Aplica máscara de dinheiro
    ResetarEstadoFormulario();
    renderTable();
});