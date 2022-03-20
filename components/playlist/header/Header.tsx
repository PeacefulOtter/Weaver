

import styles from './Header.module.css'

const Header = ({name, image, owner}) => {

    return (
        <div className={styles.headerwrapper}>
            <div className={styles.headercontainer}>
                <div className={styles.headerimg + " img"} style={{backgroundImage: `url(${image})`}}></div>
                <div className="header-content">
                    <div className={styles.headertitle}>
                       { name }
                    </div>    
                    <div className={styles.headerstats}>
                        <div className={styles.headerauthor}>
                            { owner.display_name }
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