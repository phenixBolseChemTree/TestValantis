import styles from './searchSortWidget.module.css';
import TextField from '@mui/material/TextField';

const SearchSortWidget = () => {
  return (
    <div className={styles.root}>
      <form style={{ width: '85%' }} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Введите текст"
          variant="outlined"
          fullWidth
          // Дополнительные стили можно добавить здесь
        />
      </form>
    </div>
  );
};

export default SearchSortWidget;
