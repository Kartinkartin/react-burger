import React from 'react';
import styles from './profile.module.css';
import AppHeader from "../components/app-header/app-header";
import FormProfile from '../components/form-profile/form-profile';
import ProfileNavigator from '../components/profile-navigator/profile-navigator';

export const ProfilePage = () => {
    

    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                    <ProfileNavigator />
                    <FormProfile />
            </div>
            
        </main>
    )
}