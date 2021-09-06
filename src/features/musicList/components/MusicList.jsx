import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Alert, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import 'react-dates/initialize';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import ScrollToTop from '../../../commonComponents/scrollToTop/components/ScrollToTop';
import { componentDidMount, selectors, setFavorite } from '../musicListSlice';
import CardComponent from '../../../commonComponents/cardComponent/components/CardComponent';
import styles from '../../../styles/featureComponents/musicList/musicList.module.css';

function SearchBar({ searchKey, handleSearchType }) {
  return (
    <div className={styles.search}>
      <Form.Control type="text" placeholder="Search album" value={searchKey} onChange={(e) => handleSearchType(e)} />
    </div>
  );
}

function CategoriesFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className={styles.categoryFilter}>
      <Form.Label>Categories</Form.Label>
      <Form.Control as="select" aria-label="Default select example" defaultValue={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All</option>
        {
          categories.map((category) => <option key={category} value={category}>{category}</option>)
        }
      </Form.Control>
    </div>
  );
}

function DateFilter({
  startDate, endDate, setStartDate, setEndDate,
}) {
  const [focusedInput, setFocusedInput] = useState();
  return (
    <div className={styles.dateFilter}>
      <Form.Label>Release Date</Form.Label>
      <DateRangePicker
        orientation="vertical"
        startDate={startDate}
        startDateId="start-date"
        endDate={endDate}
        endDateId="end-date"
        isOutsideRange={(day) => !isInclusivelyBeforeDay(day, moment())}
        maxDate={new Date()}
        // eslint-disable-next-line no-shadow
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={(focusedInputValue) => setFocusedInput(focusedInputValue)}
      />
    </div>
  );
}

function Filters({
  categories,
  selectedCategory,
  setSelectedCategory,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  return (
    <div className={styles.filterDiv}>
      <CategoriesFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <DateFilter
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </div>
  );
}

function MusicList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const albumList = useSelector(selectors.base).albums || [];
  const errors = useSelector(selectors.base).errors || [];

  const [searchKey, setSearchKey] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);

  useEffect(() => {
    if (albumList.length === 0) {
      dispatch(componentDidMount());
    }
  }, []);

  // Function handling favorite checkbox click
  const handleFavoriteClick = (id) => {
    dispatch(setFavorite(id));
  };

  // Function handling album click
  const handleAlbumClick = (details) => {
    const redirectLocation = '/album-details';
    history.push(redirectLocation, { details });
  };

  // Function handling typing search bar
  const handleSearchType = (e) => {
    setSearchKey(e.target.value);
  };

  // Lists down all the music categories available in the dataset
  const getCategories = (list) => {
    const categorySet = new Set();

    for (let i = 0; i < list.length; i += 1) {
      categorySet.add(list[i].category.attributes.label);
    }
    return Array.from(categorySet);
  };

  const getFilteredAlbumList = () => {
    const startDateInMS = Date.parse(new Date(startDate)) || 0;
    const endDateInDateMS = Date.parse(new Date(endDate)) || Date.parse(new Date());

    const filteredAlbumList = albumList.filter((album) => album['im:name'].label.toLowerCase().includes(searchKey.toLowerCase())
    && (Date.parse(album['im:releaseDate'].label) >= startDateInMS && Date.parse(album['im:releaseDate'].label) <= endDateInDateMS)
    && (selectedCategory === '' || album.category.attributes.label === selectedCategory));

    return filteredAlbumList.map((album) => (
      <CardComponent
        key={album.id.attributes['im:id']}
        details={album}
        handleFavoriteClick={handleFavoriteClick}
        handleAlbumClick={handleAlbumClick}
      />
    ));
  };

  const getAlert = () => {
    if (errors.length > 0) {
      return errors.map((error) => (
        <Alert key={error} variant="danger">
          {error}
        </Alert>
      ));
    }

    return null;
  };

  return (
    <div>
      <SearchBar searchKey={searchKey} handleSearchType={handleSearchType} />
      <Filters
        categories={getCategories(albumList)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      {getAlert()}
      <div className={styles.musicListContainer}>
        {getFilteredAlbumList()}
      </div>
      <ScrollToTop />
    </div>
  );
}

export default MusicList;

SearchBar.propTypes = {
  searchKey: PropTypes.string.isRequired,
  handleSearchType: PropTypes.func.isRequired,
};

CategoriesFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

DateFilter.propTypes = {
  startDate: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  endDate: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
};

Filters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  startDate: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  endDate: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
};
