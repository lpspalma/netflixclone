import React, {useEffect, useState} from 'react';
import tmdb from './tmdb';
import './App.css';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';

export default ()=>{
  const [movieList, setmovieList] = useState([]);
  const [featuredData, setFeaturedData ]= useState(null);
  useEffect(()=>{
    const loadAll = async ()=>{
      //pegando a lista total 
      let list = await tmdb.getHomeList();
      setmovieList(list);

      //pegando o featured
      let originals = list.filter(i=>i.slug ==='originals' );
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length-1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
      //parei 1:45:36


    }
    loadAll();
  }, []);


  
  return (
    <div className="page">
    {featuredData &&
    <FeaturedMovie item={featuredData}/>
    }
     <section className="lists">
      { movieList.map((item, key) =>(
        <MovieRow key={key} title={item.title} items={item.items}/>
      )

      )}
     </section>
    </div>
  )
}
