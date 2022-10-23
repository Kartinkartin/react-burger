import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './feed-detail.module.css';
import AppHeader from '../../components/app-header/app-header';

export function FeedDetailPage() {
    const { id } = useParams();
    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                
            </div>
        </main>
    )
}