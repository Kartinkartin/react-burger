import React, { useMemo, LegacyRef } from "react";
import styles from './menu-category.module.css';
import { Ingredient } from "../ingredient/ingredient";
import { TIngredient } from "../../services/types/data";

type TCategoryProps ={ 
    cards: Array<TIngredient>, 
    type: string, 
    refer: any, 
    headerKey: string
}
const types: {[name: string]: string} = {
    'bun': 'Булки',
    'sauce': 'Соусы',
    'main': 'Начинки'
}
export default function MenuCategory({ cards, type, refer, headerKey }: TCategoryProps) {
    const typeArray = useMemo(() => { return cards.filter(prod => prod.type === type) }, [cards, type])
    return (
        <>
            <h2 ref={refer} className={`${styles.title} pt-10 pb-6 text text_type_main-medium`} data-type={headerKey} >
                {types[type]}
            </h2>
            <div className={`${styles.category} pl-4 pr-4`}>
                {
                    typeArray.map(card => {
                        return (
                            <Ingredient card={card} key={card._id} />
                        )
                    })
                }
            </div>
        </>
    )
}