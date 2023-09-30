async function getblogposts(){
    let url = 'http://localhost:3000/api/posts/getallposts';
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

export default getblogposts;