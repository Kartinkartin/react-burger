import React from 'react';
import styles from './order.module.css';

export default function Order({ order }) {
    return (
        <div className={`${styles.container} p-6`}>

            <div className={`${styles.service_info} pb-6 text text_type_digits-default`}>
                #{order.num}
                <span className={`${styles.date} text text_type_main-default`}>
                    {new Date().getFullYear()}
                    {/* дату поменять потом не забудь */}
                </span>
            </div>

            <h2 className="pb-6 text text_type_main-medium">
                {order.name}
            </h2>
            <div>
                <div>
                    cfv pfrfp
                </div>
                <div>
                    {order.price}
                </div>
            </div>
        </div>
    )
}