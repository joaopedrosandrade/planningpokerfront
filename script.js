// Selecionar elementos do DOM
const nameInput = document.getElementById('name');
const pointsSelect = document.getElementById('points');
const submitButton = document.getElementById('submit');
const voteList = document.getElementById('vote-list');
const revealButton = document.getElementById('reveal');

// Array para armazenar os votos
let votes = [];

// Função para atualizar a lista de votos
function updateVoteList() {
  // Limpar a lista atual
  voteList.innerHTML = '';

  // Adicionar cada voto à lista
  votes.forEach((vote) => {
    const listItem = document.createElement('li');
    const formattedVote = vote.points === '?' ? vote.points : `${vote.points} pontos`;
    const voteValue = vote.revealed ? formattedVote : '✅';
    listItem.textContent = `${vote.name}: ${voteValue}`;

    voteList.appendChild(listItem);
  });
}

// Função para lidar com o envio do formulário de voto
function submitVote(e) {
  e.preventDefault();

  // Obter o nome e pontos do usuário
  const name = nameInput.value.trim();
  const points = pointsSelect.value;

  // Validar entrada do usuário
  if (!name || !points) {
    alert('Por favor, insira um nome e selecione pontos.');
    return;
  }

  // Adicionar o voto ao array de votos
  votes.push({ name, points, revealed: false });

  // Limpar o formulário
  nameInput.value = '';
  pointsSelect.selectedIndex = 0;

  // Atualizar a lista de votos
  updateVoteList();

  // Ativar o botão "Revelar Votos"
  revealButton.disabled = false;
}

// Função para calcular a média dos pontos revelados
function calculateAverage() {
  // Filtrar os votos revelados
  const revealedVotes = votes.filter((vote) => vote.revealed && vote.points !== '?');

  // Calcular a média dos pontos
  const totalPoints = revealedVotes.reduce((sum, vote) => sum + Number(vote.points), 0);
  const averagePoints = totalPoints / revealedVotes.length;

  // Atualizar o texto do botão "Revelar Votos" com a média dos pontos
  revealButton.textContent = `Revelar Votos (Média: ${averagePoints.toFixed(2)})`;
}

// Função para lidar com a revelação dos votos
function revealVotes() {
  // Marcar todos os votos como revelados
  votes = votes.map((vote) => {
    vote.revealed = true;
    return vote;
  });

    // Calcular e exibir a média dos pontos revelados
    calculateAverage();

  // Atualizar a lista de votos
  updateVoteList();

  // Desativar o botão "Revelar Votos"
  revealButton.disabled = true;
}


// Adicionar um ouvinte de evento ao botão "Votar"
submitButton.addEventListener('click', submitVote);

// Adicionar um ouvinte de evento ao botão "Revelar Votos"
revealButton.addEventListener('click', revealVotes);

// Desativar o botão "Revelar Votos" até que pelo menos um voto seja registrado
revealButton.disabled = true;
