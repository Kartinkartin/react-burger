import React, { useEffect, useMemo, useRef } from "react";
import PropTypes from 'prop-types';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { useSelector } from "react-redux";
import { Ingredient } from "../ingredient/ingredient";

export default function BurgerIngredients( { onClick } ) {
    const items = useSelector(store => store.ingredientsApi)
    const [current, setCurrent] = React.useState('one');
    const sectionRef = useRef();
    const tabsRef = useRef();
    const bunRef = useRef();
    const mainRef = useRef();
    const sauceRef = useRef();
    const refs = [bunRef, mainRef, sauceRef];
    let delta = 0;
    useEffect(() => {
        if(sectionRef.current) {
            const section = sectionRef.current;
            section.addEventListener("scroll", () => {
                return delta = bunRef.current.getBoundingClientRect().top - tabsRef.current.getBoundingClientRect().top
            });
            
        }
    }, [sectionRef])
    useEffect(()=> {
        if(bunRef.current) {
            const positions= refs.map(item => {
                return Math.abs(item.current.getBoundingClientRect().top - tabsRef.current.getBoundingClientRect().top)
            })
            const currentTabRef = refs[positions.indexOf(Math.min.apply(null, positions))];
            const currentSection = currentTabRef.current.textContent;
        setCurrent(currentSection === 'Булки' ? 'bun' :
            currentSection === 'Соусы' ? 'sauce' : 'main' )
        }
    }, [bunRef.current, delta]) //от туть

    return(
        <section className={styles.ingridients}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div style={{ display: 'flex' }} ref = {tabsRef}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.menu} ref={sectionRef}>
                <MenuCategory cards={items} type='bun' refer={bunRef} onClick={onClick} />
                <MenuCategory cards={items} type='sauce' refer={sauceRef} onClick={onClick} />
                <MenuCategory cards={items} type='main' refer={mainRef} onClick={onClick} />
            </div>
        </section>
    )
}
BurgerIngredients.propTypes = {
    onClick: PropTypes.func.isRequired,
}

function MenuCategory({cards, type, refer, onClick}) {
    const types = {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинки'
    }
    return (
        <>
        <h2 ref={refer} className={styles.title + " pt-10 pb-6 text text_type_main-medium"}>{types[type]}</h2>
        <div className={styles.category + " " + "pl-4 pr-4"}>
            {
                useMemo(() => {return cards.filter(prod => prod.type === type)
                .map(card => {
                    return(
                        <Ingredient card={card} key={card._id} onClick={() => onClick(card)} />
                    )
                })}, [cards])
            }
        </div>
        </>
    )
}
MenuCategory.propTypes = {
    cards: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func
}