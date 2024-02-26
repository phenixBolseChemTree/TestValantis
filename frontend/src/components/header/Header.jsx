import styles from './header.module.css';
import Button from '@mui/material/Button';

const Header = () => {
  return (
    <div className={styles.root}>
      <div className={styles.btnPosition}>
        <Button style={{ backgroundColor: 'black', color: 'white' }} variant="contained">
          LOGO
        </Button>
      </div>
    </div>
  );
};

export default Header;
