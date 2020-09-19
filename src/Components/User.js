import React from 'react'

export default ({ user }) => (
//     avatar_url
// name
    <div>
        <h2>{user.name}</h2>
        <img src={user.avatar_url} />
    </div>
)
