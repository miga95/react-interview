import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movies$ } from "../movies";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        loading: false,
        movies: [],
        categories: [],
        selectedCategories: [],
        error: ''
    },
    reducers: {
        deleteMovie: (state, action) => {
            const movieToDelete = state.movies.find((movie) => movie.id === action.payload);

            if (movieToDelete) {
                state.movies = state.movies.filter((movie) => movie.id !== action.payload);
       
                let shouldDeleteCategory = true;
                for(const otherMovieWithSameCategory of  state.movies){
                    if(otherMovieWithSameCategory.category === movieToDelete.category){
                        shouldDeleteCategory = false;
                        break;
                    }
                }
                if (shouldDeleteCategory) state.categories = state.categories.filter((category) => category !== movieToDelete.category);
         
            }
        },
        toggleLikeMovie: (state, action) => {
            const movie = state.movies.find((movie)=> movie.id === action.payload.id)
            if(action.payload.toggleLike===false){
                movie.likes = movie.likes + 1
            }else{
                movie.likes = movie.likes - 1
            }
            
        },
        toggleDisLikeMovie: (state, action) => {
            const movie = state.movies.find((movie)=> movie.id === action.payload.id)
            if(action.payload.toggleDisLike===false){
                movie.dislikes = movie.dislikes + 1
            }else{
                movie.dislikes = movie.dislikes - 1
            }
        },
        selectCategory: (state, action) => {
            state.selectedCategories = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending,(state) => {
            state.loading = true
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false 
            state.movies = action.payload
            const uniqueCategories = [...new Set(action.payload.map((movie) => movie.category))];
            state.categories = uniqueCategories;
            state.error = ''
        })
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false,
            state.movies = [],
            state.error = action.error.message
        })
    }
})

export const fetchMovies = createAsyncThunk ('movie/fetchMovies', () => {
    return movies$.then(res => res)
}) 
    
export const { deleteMovie, toggleLikeMovie, toggleDisLikeMovie, selectCategory} = movieSlice.actions
export const selectCategories = (state) => state.movie.categories;
export const selectSelectedCategories = (state) => state.movie.selectedCategories;
export const store = configureStore({
                        reducer: {
                            movie: movieSlice.reducer
                        }
                    })