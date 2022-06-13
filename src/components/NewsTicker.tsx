import { Component } from "solid-js"
import styles from "./../assets/styles/NewsTicker.module.css"

export const NewsTicker: Component = (props) => {
    return (
        <div class={styles.newsTicker}>
            <marquee direction="left" class={styles.newsTicker}>{props.newsStory || <br />}</marquee>
        </div>
    )
}
