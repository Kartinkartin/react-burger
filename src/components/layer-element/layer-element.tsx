import React, { FunctionComponent, DragEvent } from 'react';
import { useDrag } from "react-dnd";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './layer-element.module.css';
import { TIngredient } from '../../services/types/data';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { getConstructorIngedients } from '../../services/selectors/selectors';
import { deleteIngredient } from '../../services/actions';

type TLayerProps = {
    prod: TIngredient,
    index: number,
    handleDrag: (index: number) => void,
    handleDrop: (e: DragEvent<HTMLLIElement>, index: number) => void
}


export const LayerElement: FunctionComponent<TLayerProps> = ({ prod, index, handleDrag, handleDrop }: TLayerProps) => {
    const [{ opacity }, dragRef] = useDrag({
        type: 'item',
        item: prod,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        })
    });
    const dispatch = useDispatch();
    const ingredientsConstructor = useSelector(getConstructorIngedients);
    const notBunsIngredients = ingredientsConstructor.filter(prod => prod.type !== 'bun')
    const handleDeleteItem = (index: number) => {
        const id = notBunsIngredients[index]._id;
        const item = notBunsIngredients.splice(index, 1)[0]; // изменяет notBunsIngredients
        dispatch(deleteIngredient(notBunsIngredients, id))
    };
    return (
        <li className={`${styles.layer_element} pb-4`}
            draggable
            ref={dragRef}
            onDrag={() => handleDrag(index)}
            onDrop={(e) => handleDrop(e, index)}
            style={{ opacity }}>
            <DragIcon type='primary' />
            <ConstructorElement
                text={prod.name}
                price={prod.price}
                thumbnail={prod.image}
                handleClose={() => handleDeleteItem(index)}
            />
        </li>
    )
}
