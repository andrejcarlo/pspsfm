import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import styles from '../../styles/Station.module.css'



export const Navbar : React.FC = () => {
  // const
  useEffect(() => {
    
  }, []);

  // eslint-disable-next-line jsx-a11y/iframe-has-title
return (
    <div className={styles.App_logo} title={"@andrejcarlo <3 @alxmuller"}>
        <Marquee 
        speed={40}
        gradient={false}
        pauseOnHover={true}
        direction={"right"}
        >
            <div> 
                psps fm +
            </div>
            <div> 
                emolino /
            </div>
            <div> 
                ocean /
            </div>
            <div> 
                doors /
            </div>
            <div> 
                naughty /
            </div>
                
        </Marquee>
    </div>
  );
}