import { useDrag } from "react-dnd";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './layer.module.css';
import PropTypes from 'prop-types';

export default function Layer(props) {
    const { prod, index, handleDelete, handleDrag, handleDrop } = props;
    const [ { opacity } ,dragRef] = useDrag({
       type: 'item',
       item: prod,
       collect: monitor => ({
           opacity: monitor.isDragging() ? 0.5 : 1,
       })
    });
    return(
        <li className={styles.layer_element + " pb-4"} 
            draggable 
            ref={dragRef} 
            onDrag={() => handleDrag(index)} 
            onDrop={(e) => handleDrop(e, index)} 
            style={ {opacity} }>
            <DragIcon />
            <ConstructorElement
                text={prod.name}
                price={prod.price}
                thumbnail={prod.image}
                handleClose={(e) => handleDelete(e, index)}
            />
        </li>
    )
}

Layer.propTypes = {
    prod: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired, 
    handleDrag: PropTypes.func.isRequired, 
    handleDrop: PropTypes.func.isRequired
}
