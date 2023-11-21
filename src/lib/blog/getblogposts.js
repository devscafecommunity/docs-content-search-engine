async function getblogposts(){
    let url = process.env.BLOG_URL + '/api/posts/getallposts';
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

export default getblogposts;