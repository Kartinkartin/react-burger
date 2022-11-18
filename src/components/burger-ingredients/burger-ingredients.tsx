import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import MenuCategory from "../menu-category/menu-category";
import { getApiIngredients } from "../../services/selectors/selectors";


export default function BurgerIngredients() {
    const items = useSelector(getApiIngredients); // загрузка в App
    
    const [current, setCurrent] = React.useState('bun');
    const containerRef: any = useRef();
    const bunRef: any = useRef();
    const mainRef: any = useRef();
    const sauceRef: any = useRef();

    const hightlightTab = () => {
        const refs = [bunRef, mainRef, sauceRef];
        const positions: any = refs.map((item: any) => {
            return Math.abs(item.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top)
        })
        const currentTabRef = refs[positions.indexOf(Math.min.apply(null, positions))];
        const currentSection = currentTabRef.current.dataset.type; 
        // dataset.type - чтение атрибута data-type, см. MenuCategory -> h2.data-type (так и называется data-* атрибуты)
        setCurrent(currentSection)
    }
    const handlerScroll = (value: string) => {
        setCurrent(value);
        if (value === 'bun') { bunRef.current.scrollIntoView() }
        else if (value === 'sauce') { sauceRef.current.scrollIntoView() }
        else { mainRef.current.scrollIntoView() }
    }

    return (
        <section className={styles.ingridients}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={handlerScroll}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={handlerScroll}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={handlerScroll}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.menu} ref={containerRef} onScroll={hightlightTab}>
                <MenuCategory cards={items} type='bun' refer={bunRef} headerKey='bun' />
                <MenuCategory cards={items} type='sauce' refer={sauceRef} headerKey='sauce' />
                <MenuCategory cards={items} type='main' refer={mainRef} headerKey='main' />
            </div>
        </section>
    )
}
