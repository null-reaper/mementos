import React from 'react'
import { Link } from 'gatsby'

export function PostCard (props) {

    return (
        <Link to={props.link} className="post-card card">
            <header className="post-card-header">
                {props.feature_image &&
                    <div className="post-card-image" style={{
                        backgroundImage: `url(${props.feature_image})` ,
                    }}></div>}
            </header>
            <div className="cardbox">
                <h2 className="post-card-title">{props.title}</h2>
                <section className="post-card-excerpt">{props.excerpt}</section>
            </div>
        </Link>
    );
}