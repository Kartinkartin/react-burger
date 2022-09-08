import { useDrag } from "react-dnd";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './layer.module.css';
import PropTypes from 'prop-types';

export function Layer({ prod, onDelete ,index }) {
//     const [ { opacity } ,dragRef] = useDrag({
//        type: 'item', /*card.type*/
//        item: prod,
//        collect: monitor => ({
//            opacity: monitor.isDragging() ? 0.5 : 1,
//        })
//    });
   const deleteProd = (e) => {
       //console.log(index);
       //console.log(e);
       //debugger;
       if (e.target.nodeName === 'path') {onDelete(e, index)}
       //onDelete(e, index);
   }
   return(
       <li className={styles.layer_element + " pb-4"} onClick={deleteProd}>
           <DragIcon />
           <ConstructorElement
               text={prod.name}
               price={prod.price}
               thumbnail={prod.image}
           />
           {/* <button className={styles.delete_button} >
               <DeleteIcon type="primary" />
           </button> */}
       </li>
   )
}

Layer.propTypes = {
   prod: PropTypes.object.isRequired
}
