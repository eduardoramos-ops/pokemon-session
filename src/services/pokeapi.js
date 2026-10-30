async function buscarPokemon(nome) {
    const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nome.toLowerCase())}`;

    const resposta = await fetch(url);

    if (resposta.status === 404) {
        const erro = new Error("Pokémon não encontrado.");
        erro.status = 404;
        throw erro;
    }

    if (!resposta.ok) {
        const erro = new Error("Erro ao consultar a PokéAPI.");
        erro.status = 502;
        throw erro;
    }

    const pokemon = await resposta.json();

    return {
        id: pokemon.id,
        nome: pokemon.name,
        altura: pokemon.height / 10,
        peso: pokemon.weight / 10,

        tipos: pokemon.types.map(item => item.type.name),

        habilidades: pokemon.abilities.map(
            item => item.ability.name
        ),

        imagem: pokemon.sprites.front_default
    };
}

module.exports = { buscarPokemon };
