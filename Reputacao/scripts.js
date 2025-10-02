document.addEventListener('DOMContentLoaded', function () {
        
    // --- DADOS SIMULADOS (MOCK DATA) ---
    // Esta é a nossa "base de dados" em memória. Tudo será baseado nela.
    const mockComments = [
        { source: 'google', author: 'Ana Silva', rating: 5, comment: 'Atendimento espetacular e ambiente muito agradável. Recomendo fortemente!', date: '2025-10-01', sentiment: 'positive' },
        { source: 'instagram', author: 'bruno_costa', rating: 4, comment: 'Gostei muito da experiência, só achei o preço um pouco elevado.', date: '2025-09-30', sentiment: 'neutral' },
        { source: 'facebook', author: 'Carla Mendes', rating: 5, comment: 'Melhor lugar da cidade! Sempre que posso, eu volto. Equipe nota 1000.', date: '2025-09-29', sentiment: 'positive' },
        { source: 'google', author: 'Diego Martins', rating: 2, comment: 'Infelizmente tive uma péssima experiência. Houve muita demora no atendimento e o pedido veio errado.', date: '2025-09-28', sentiment: 'negative' },
    ];

    // --- Variáveis globais para os gráficos, para que possam ser atualizados ---
    let reputationLineChart, sentimentDoughnutChart;

    // --- FUNÇÕES DE ATUALIZAÇÃO DO PAINEL ---

    function updateKPIs() {
        const totalReviews = mockComments.length;
        document.getElementById('kpi-total-avaliacoes').innerText = totalReviews;

        const totalRating = mockComments.reduce((sum, comment) => sum + comment.rating, 0);
        const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : "0.0";
        document.getElementById('kpi-nota-media').innerText = averageRating;

        const positiveReviews = mockComments.filter(c => c.sentiment === 'positive').length;
        const positivePercentage = totalReviews > 0 ? Math.round((positiveReviews / totalReviews) * 100) : 0;
        document.getElementById('kpi-positivas').innerText = `${positivePercentage}%`;

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const newReviewsCount = mockComments.filter(c => new Date(c.date) > sevenDaysAgo).length;
        document.getElementById('kpi-novas-avaliacoes').innerText = `+${newReviewsCount}`;
    }

    function renderComments(filter = 'all') {
        const commentContainer = document.getElementById('comment-feed-container');
        commentContainer.innerHTML = ''; // Limpa o container

        const filteredComments = mockComments.filter(comment => {
            if (filter === 'all') return true;
            return comment.sentiment === filter;
        });

        if (filteredComments.length === 0) {
            commentContainer.innerHTML = '<p class="text-center text-muted">Nenhum comentário encontrado.</p>';
            return;
        }

        filteredComments.forEach(item => {
            const ratingStars = '<i class="bi bi-star-fill"></i>'.repeat(item.rating) + '<i class="bi bi-star"></i>'.repeat(5 - item.rating);
            const commentElement = `
                <div class="comment-item sentiment-${item.sentiment}">
                    <i class="source-icon bi bi-${item.source}"></i>
                    <div class="w-100">
                        <div class="d-flex justify-content-between">
                            <h6 class="mb-1">${item.author}</h6>
                            <small class="text-muted">${new Date(item.date).toLocaleDateString('pt-BR')}</small>
                        </div>
                        <div class="mb-1">${ratingStars} <span class="fw-bold">${item.rating}.0</span></div>
                        <p class="mb-0 small">${item.comment}</p>
                    </div>
                </div>
            `;
            commentContainer.innerHTML += commentElement;
        });
    }

    function updateCharts() {
        const positiveCount = mockComments.filter(c => c.sentiment === 'positive').length;
        const neutralCount = mockComments.filter(c => c.sentiment === 'neutral').length;
        const negativeCount = mockComments.filter(c => c.sentiment === 'negative').length;

        sentimentDoughnutChart.data.datasets[0].data = [positiveCount, neutralCount, negativeCount];
        sentimentDoughnutChart.update();
        
        // Nota: Para o gráfico de linha, uma atualização real exigiria uma lógica mais complexa
        // de agrupar as notas por período (dia/mês). Por enquanto, ele permanecerá estático.
    }

    // Função principal que atualiza todo o painel
    function updateDashboard() {
        updateKPIs();
        renderComments(); // Renderiza com o filtro 'todos' por padrão
        updateCharts();
    }


    // --- INICIALIZAÇÃO DOS GRÁFICOS ---
    function initializeCharts() {
        const reputationCtx = document.getElementById('reputationChart').getContext('2d');
        reputationLineChart = new Chart(reputationCtx, {
            type: 'line', data: { labels: ['Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'], datasets: [{ label: 'Nota Média', data: [4.2, 4.4, 4.3, 4.5, 4.7, 4.5, 4.6], borderColor: '#0d6efd', backgroundColor: 'rgba(13, 110, 253, 0.1)', fill: true, tension: 0.3 }] }, options: { responsive: true, maintainAspectRatio: false }
        });

        const sentimentCtx = document.getElementById('sentimentChart').getContext('2d');
        sentimentDoughnutChart = new Chart(sentimentCtx, {
            type: 'doughnut', data: { labels: ['Positivo', 'Neutro', 'Negativo'], datasets: [{ label: 'Sentimento', data: [0,0,0], backgroundColor: ['#198754', '#ffc107', '#dc3545'] }] }, options: { responsive: true, maintainAspectRatio: false }
        });
    }
    
    // --- EVENT LISTENERS (INTERATIVIDADE) ---
    
    // Filtros de comentários
    const filterButtons = document.querySelectorAll('.btn-group [data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderComments(this.getAttribute('data-filter'));
        });
    });

    // Formulário de adicionar novo comentário
    const addCommentForm = document.getElementById('addCommentForm');
    addCommentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede que a página recarregue

        const newComment = {
            source: document.getElementById('newSource').value,
            author: document.getElementById('newAuthor').value,
            rating: parseInt(document.getElementById('newRating').value),
            comment: document.getElementById('newCommentText').value,
            date: new Date().toISOString().split('T')[0], // Data de hoje
            sentiment: document.getElementById('newSentiment').value,
        };

        // Adiciona o novo comentário no início da lista
        mockComments.unshift(newComment);

        // Atualiza todo o painel
        updateDashboard();

        // Reseta o formulário
        addCommentForm.reset();
    });


    // --- EXECUÇÃO INICIAL ---
    initializeCharts();
    updateDashboard();

});