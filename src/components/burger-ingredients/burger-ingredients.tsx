import React, { useState, useRef, FunctionComponent, RefObject } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { MenuCategory } from "../menu-category/menu-category";
import { getApiIngredients } from "../../services/selectors/selectors";
import { useSelector } from "../../services/hooks/hooks";


export const BurgerIngredients: FunctionComponent = () => {
    const items = useSelector(getApiIngredients); // загрузка в App
    
    const [current, setCurrent] = useState<string | undefined>('bun');
    const containerRef = useRef<HTMLInputElement>(null);
    const bunRef = useRef<HTMLInputElement>(null);
    const mainRef = useRef<HTMLInputElement>(null);
    const sauceRef = useRef<HTMLInputElement>(null);

    const hightlightTab = () => {
        const refs = [bunRef, mainRef, sauceRef];
        const positions: Array<number> = refs.map((item: RefObject<HTMLInputElement>) => {
            return Math.abs(item.current!.getBoundingClientRect().top - containerRef.current!.getBoundingClientRect().top)
        })
        const currentTabRef = refs[positions.indexOf(Math.min.apply(null, positions))];
        const currentSection = currentTabRef.current!.dataset.type; 
        // dataset.type - чтение атрибута data-type, см. MenuCategory -> h2.data-type (так и называется data-* атрибуты)
        setCurrent(currentSection)
    }
    const handlerScroll = (value: string) => {
        setCurrent(value);
        if (value === 'bun') { bunRef.current!.scrollIntoView() }
        else if (value === 'sauce') { sauceRef.current!.scrollIntoView() }
        else { mainRef.current!.scrollIntoView() }
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
