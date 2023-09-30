/*
Get a user's profile picture

Imput: username
Output: profile picture url as image/png
*/ 

async function getUserPfp(username) {
    const url = `https://api.github.com/users/${username}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.avatar_url;
}

export default getUserPfp;