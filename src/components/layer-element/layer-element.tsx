import React, { FunctionComponent, DragEvent } from 'react';
import { useDrag } from "react-dnd";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './layer-element.module.css';
import { TIngredient } from '../../services/types/data';

type TLayerProps = {
    prod: TIngredient, 
    index: number, 
    handleDelete: (e: any, index: number) => any, 
    handleDrag: (index: number) => void, 
    handleDrop: (e: DragEvent<HTMLLIElement>, index: number) => void
}

export const LayerElement: FunctionComponent<TLayerProps> = ({ prod, index, handleDelete, handleDrag, handleDrop }: TLayerProps) => {
    const [{ opacity }, dragRef] = useDrag({
        type: 'item',
        item: prod,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        })
    });
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
                handleClose={() => (e: any) => handleDelete(e, index)}
            />
        </li>
    )
}
