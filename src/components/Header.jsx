import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import SearchBar from './SearchBar';
import headerLogo from '../assets/images/header-logo.png';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b-2 border-[#4CAF50]">
      {/* Div per il logo allineato a sinistra */}
      <div className="flex-1">
        <Link to="/">
          <img src={headerLogo} alt="header logo" className="h-16 w-auto" />
        </Link>
      </div>

      {/* Div per gli altri elementi allineati a destra */}
      <div className="flex items-center gap-6 px-3">
        <DropdownMenu />
        <SearchBar />
        <Link
          to="/advanced-search"
          className="text-[#4CAF50] font-medium no-underline whitespace-nowrap"
          id="advanced-search_link"
        >
          Advanced Search
        </Link>
      </div>
    </header>
  );
};

export default Header;
