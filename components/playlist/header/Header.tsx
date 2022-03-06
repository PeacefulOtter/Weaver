

import styles from './Header.module.css'

const Header = () => {

    return (
        <div className={styles.headerwrapper}>
            <div className={styles.headercontainer}>
                <div className={styles.headerimg + " img"}></div>
                <div className="header-content">
                    <div className={styles.headertitle}>
                        Playlist title
                    </div>    
                    <div className={styles.headerstats}>
                        <div className={styles.headerauthor}>
                            Genjyy#5432
                        </div>
                        •
                        <div className="header-songs">66 songs</div>    
                        •
                        <div className="header-duration">1h52</div>    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;