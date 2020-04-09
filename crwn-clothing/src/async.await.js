//We will fetch our users and will bring us back a promise in a JSON Format, which now have our array of users
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    const firstUser = users[0];
    console.log(firstUser);
    return fetch(
      //It will bring us back all the posts posted by FirstUser
      "https://jsonplaceholder.typicode.com/posts?useId=" + firstUser.id
    );
  })
  .then((response) => response.json())
  .then((posts) => console.log(posts))
  .catch((error) => console.log(error));

//The way we can write an async function
//When we use async keyword, we are now allowed to await keyword
//await() pauses the function until it gets back what it is being waiting for

//We can use TRY CATCH Block for Error Handling
const myAsyncFunction = async () => {
  try {
    // code after this line will execute only when we get response, since we are using await and by using it in const we will be able to use it again
    const userResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = await userResponse.json();
    const secondUser = users[1];
    console.log(secondUser);

    const postsResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=" + secondUser.id
    );
    const posts = await postsResponse.json();
    console.log(posts);
  } catch (err) {
    console.log("There was an error");
  }
};
