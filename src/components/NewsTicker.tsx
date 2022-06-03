import { Component } from "solid-js"
import styles from "./../App.module.css"

export const NewsTicker: Component = (props) => {
    return (
        <marquee direction="left" class={styles.newsTicker}>{ props.newsStory }</marquee>
    )
}