import { Link } from 'react-router-dom';
import styles from './404.module.css';
import notFoundImg from '../../images/404-page.png'
export const NotFoundPage = () => {
    return (
        <div className={styles.main} >
            <img src={notFoundImg} alt='Not Found 404' />
            <Link to='/' className={`${styles.link} text text_type_main-default`} >На главную</Link>
        </div>
    );
}
