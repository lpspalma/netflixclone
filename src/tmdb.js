const api_key ='1cab3614502bbe1ce6391e1e107514a0';

const api_base = 'https://api.themoviedb.org/3';

/*
criar uma funcao que ira pegar na API do tmdb os seguintes itens
-originais netflix
-recomendados (trending)
-em alta (top rated)
-acao 
-comedia
-terror
-romance
-documentario
*/
const basicFetch = async (endpoint)=>{
    const req = await fetch(`${api_base}${endpoint}`);
    const json = await req.json();
    return json;
}
export default {
    getHomeList:async ()=>{
        return[
            {
                slug: 'originals',
                title: 'Originais Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${api_key}`) //tirado da documentacao do tmdb
            },
            {
                slug: 'trendings',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${api_key}`) //tirado da documentacao do tmdb
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${api_key}`) //tirado da documentacao do tmdb
            },
            {
                slug: 'action',
                title: 'Acao',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${api_key}`) //tirado da documentacao do tmdb
            },
            {
                slug: 'comedy',
                title: 'Comedia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${api_key}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${api_key}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${api_key}`)
            },
            {
                slug: 'documentary',
                title: 'Documentario',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${api_key}`)
            },
            

            

        ];
    },
    //funcao para pegar mais informacoes que serao utilizadas no featured

    getMovieInfo: async(movieId, type) =>{
        let info ={};
        if (movieId){
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${api_key}`)

                break ;

                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${api_key}`)

                break;
            }
        }
        return info;
    }
}