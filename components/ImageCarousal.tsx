import { useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Bootstrap.module.css";
import Image from "next/image";

interface Props {
    items: any[]
}

const ImageCarousal = (props: Props) => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex: any, e: any) => {
       setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {props.items.map((url: any) => (
                <Carousel.Item key={url} className={styles.itemP} interval={4000}>
                    <Image src={url} alt="slides"/>
                    <Carousel.Caption className={styles.caption}>
                    <h3>{'hello'}</h3>
                    <p>{'test'}</p>
                    <button className="btn btn-danger">Visit Docs</button>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );    
}

export default ImageCarousal;