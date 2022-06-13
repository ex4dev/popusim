import { Component } from "solid-js"
import styles from "./../assets/styles/NewsTicker.module.css"

export const NewsTicker: Component = (props: any | { newsStory: string }) => {
    return (
        <div class={styles.newsTicker}>
            <marquee direction="left" class={styles.newsTicker}>{props.newsStory || <br />}</marquee>
        </div>
    )
}
