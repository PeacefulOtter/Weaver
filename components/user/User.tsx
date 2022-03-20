

import styles from './User.module.css'

const User = ( { me } ) => {
    return (
        <div className={styles.userwrapper}>
            <div className={styles.userprofile + " img"} style={{backgroundImage: `url(${me.image})`}}></div>
            <div className={styles.username}>{me.name}</div>
            <div className="usersubscription">{me.subscription}</div>
        </div>
    )
}

export default User