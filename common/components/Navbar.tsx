import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import Link from 'next/link';
import styles from '../../styles/Navbar.module.css'
  
interface Props {
    channel_selected?: string,
}

export const Navbar : React.FC<Props> = (props) => {
  // const
  useEffect(() => {
    
  }, []);

  // eslint-disable-next-line jsx-a11y/iframe-has-title
return (
    <div className={styles.channel_navbar}>
        <Marquee 
        speed={40}
        gradient={false}
        pauseOnHover={true}
        direction={"right"}
        >
            
            <Link href={"/"} passHref={true}>
                <div className={(props.channel_selected == "index" ? styles.navbar_element_selected :  styles.navbar_element)}> 
                    psps fm
                </div>
            </Link>
            +
            <Link href={"/emolino"} passHref={true}>
                <div className={(props.channel_selected == "emolino" ? styles.navbar_element_selected :  styles.navbar_element)}> 
                    emolino
                </div>
            </Link>
            /
            <Link href={"/ocean"} passHref={true}>
                <div className={(props.channel_selected == "ocean" ? styles.navbar_element_selected :  styles.navbar_element)}> 
                    ocean
                </div>
            </Link>
            /
            <Link href={"/doors"} passHref={true}>
                <div className={(props.channel_selected == "doors" ? styles.navbar_element_selected :  styles.navbar_element)}> 
                    doors
                </div>
            </Link>
            /
            <Link href={"/naughty"} passHref={true}>
                <div className={(props.channel_selected == "naughty" ? styles.navbar_element_selected :  styles.navbar_element)}> 
                    naughty
                </div>
            </Link>
                
        </Marquee>
    </div>
  );
}