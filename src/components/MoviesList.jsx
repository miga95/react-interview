import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../redux'
import MovieCard from './MovieCard'
import CategoryFilter from './CategoryFilter'
import { selectSelectedCategories } from '../redux'
import Pagination from './Pagination'


export default function MoviesList() {
  const dispatch = useDispatch()
  const movies = useSelector((state) => state.movie.movies);
  const [itemsPerPage, setItemsPerPage] = useState(4); 
  const [currentPage, setCurrentPage] = useState(1);

  const selectedCategories = useSelector(selectSelectedCategories);
  const filteredMovies = selectedCategories.length > 0
    ? movies.filter((movie) => selectedCategories.includes(movie.category))
    : movies;


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Obtenir les films de la page actuelle
  const moviesToShow = filteredMovies.slice(startIndex, endIndex);



  useEffect( () => {
   dispatch(fetchMovies())
  }, []);

  return (
    <div className='w-3/4 m-auto py-16'>
      <CategoryFilter />
      <div className='flex flex-wrap justify-center p-4'>
       {moviesToShow.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination 
        movies={filteredMovies}
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        />
    </div>
  )
}
