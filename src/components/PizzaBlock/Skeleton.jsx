import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="133" cy="118" r="118" />
        <rect x="0" y="250" rx="10" ry="10" width="280" height="22" />
        <rect x="0" y="300" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="413" rx="10" ry="10" width="135" height="30" />
        <rect x="145" y="413" rx="10" ry="10" width="135" height="30" />
    </ContentLoader>
)

export default Skeleton