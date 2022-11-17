import { useDrag } from "react-dnd";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './layer-element.module.css';
import PropTypes from 'prop-types';

type TLayerProps = {
    prod: {
        name: string,
        price: number,
        image: string
    }, 
    index: number, 
    handleDelete: (e: any, index: number) => {}, 
    handleDrag: (index: number) => {}, 
    handleDrop: (e: any, index: number) => {}
}

export default function LayerElement({ prod, index, handleDelete, handleDrag, handleDrop }: TLayerProps) {
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

LayerElement.propTypes = {
    prod: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleDrag: PropTypes.func.isRequired,
    handleDrop: PropTypes.func.isRequired
}
