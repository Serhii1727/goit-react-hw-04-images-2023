import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { IconContext } from 'react-icons/lib';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleForm = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.warn('Please enter your request');
    }

    onSubmit(searchQuery);
    resetSearchQuery();
  };

  const onChangeInput = event => {
    event.preventDefault();
    const { value } = event.currentTarget;

    setSearchQuery(value);
  };

  const resetSearchQuery = () => {
    setSearchQuery('');
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleForm}>
        <button type="submit" className={css.searchFormButton}>
          <IconContext.Provider
            value={{ style: { height: '25px', width: '25px' } }}
          >
            <FaSearch />
          </IconContext.Provider>
        </button>

        <input
          onChange={onChangeInput}
          className={css.searchFormInput}
          value={searchQuery}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
