

import styles from './Header.module.css'
import { FiPlay } from 'react-icons/fi'
import { useEffect, useRef, useState } from 'react'

const Header = ({name, image, owner}) => {

    const [minimal, setMinimal] = useState<boolean>(false)
    const headerRef = useRef()

    useEffect( () => {
        const scrollHandler = (e: any) => {
            const { height } = (headerRef.current as any).getBoundingClientRect()
            setMinimal(window.scrollY > height)
            
            // console.log(minimal, bottom);
            // if (bottom < 0 && !minimal)
            //     setMinimal(true)
            // else if ( bottom > 0 && minimal)
            //     setMinimal(false)
        }

        window.addEventListener('scroll', scrollHandler)
        return () => window.removeEventListener('scroll', scrollHandler)
    })

    return (
        <div className={styles.headerwrapper + ' ' + (minimal ? styles.headerWrapperMin : '')} ref={headerRef}>
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