import React from 'react';
import styles from './orders-list.module.css';

export default function OrdersList() {

    return (
        <section className={''}>
            <div className={styles.container}>
                <h1 className="text text_type_main-large pt-10 pb-5">
                    Лента заказов
                </h1>

            </div>
        </section>
    )
}

OrdersList.propTypes = {

}