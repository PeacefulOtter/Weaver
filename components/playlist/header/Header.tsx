

import styles from './Header.module.css'
import { FiPlay } from 'react-icons/fi'

const Header = ({name, image, owner}) => {

    return (
        <div className={styles.headerwrapper}>
            <div className={styles.headercontainer}>
                <div className={styles.headerimg + " img"} style={{backgroundImage: `url(${image})`}}></div>
                <div className={styles.headercontent}>
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
            <div className={styles.playbtn}><FiPlay /></div>
            
        </div>
    )
}

export default Header;