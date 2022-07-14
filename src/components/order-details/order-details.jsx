import React from "react";
import doneImage from '../../images/done.jpg';

export default function OrderDetails() {
    return(
        <>
            <p className="text text_type_digits-large pb-8">
                034536
            </p>
            <p className=" text text_type_main-medium">
                идентификатор заказа
            </p>
            <img src={doneImage} className='pt-15 pb-15' />
            <p className='text text_type_main-default pb-2'>
                Ваш заказ начали готовить
            </p>
            <p className='text text_type_main-default text_color_inactive'>
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    )
}