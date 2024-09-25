const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/repositories', async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/orgs/takenet/repos');
        const repos = response.data
            .filter(repo => repo.language === 'C#') // Filtrando repositórios de C#
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // Ordenando por data de criação
            .slice(0, 5) // Pegando os 5 mais antigos

        const formattedRepos = repos.map(repo => ({
            title: repo.full_name,
            subtitle: repo.description,
            image: repo.avatar_url // URL do avatar da Blip
        }));

        res.json(formattedRepos);
    } catch (error) {
        res.status(500).send('Erro ao buscar repositórios');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
