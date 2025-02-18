import { useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import AdvancedSearchForm from "../components/AdvancedSearchForm.jsx"; // Importa il componente SearchForm

const AdvancedSearch = () => {
  const [error, setError] = useState("");

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div>
      <Header />

      <div className="container mx-auto mt-10 mb-20 px-4">
      <h2 className="text-2xl font-semibold mb-8 text-center">Advanced Search</h2>

        <AdvancedSearchForm onError={handleError} />

        {error && (
          <div className="mt-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AdvancedSearch;
