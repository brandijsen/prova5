import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import Recipe from './pages/Recipe';
import SimilarRecipes from './pages/SimilarRecipes';
import FilteredRecipes from './pages/FilteredRecipes';
import AdvancedSearch from "./pages/AdvancedSearch";
import AdvancedSearchResults from "./pages/AdvancedSearchResults.jsx";
import './App.css'

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advanced-search" element={<AdvancedSearch />} />
        <Route path="/advanced-search-results" element={<AdvancedSearchResults />} />
        <Route path="/search-results" element={<SearchResult />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/similar-recipes" element={<SimilarRecipes />} />
        <Route path="/recipes/:diet" element={<FilteredRecipes />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
