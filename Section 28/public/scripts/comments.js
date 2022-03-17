const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

// ************* Fetching Comments *************
loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);

async function fetchCommentsForPost() {
  const postId = loadCommentsBtnElement.dataset.postid;

  try {
    const response = await fetch(`/posts/${postId}/comments`);

    if (!response.ok) {
      alert("Fetching comments failed....");
      return;
    }

    const responseData = await response.json();

    if (responseData && responseData.length > 0) {
      const commentsListElement = createCommentsList(responseData);
      commentsSectionElement.innerText = "";
      commentsSectionElement.appendChild(commentsListElement);
    } else {
      commentsSectionElement.firstElementChild.textContent =
        "Dude no comments yet for this post. Be the first to comment!!";
    }
  } catch (error) {
    alert("Failed to get comments froms the server...");
  }
}

function createCommentsList(comments) {
  const commentListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
      <article class="comment-item">
          <h2>${comment.title}</h2>
          <p>${comment.text}</p>
      </article>    
      `;
    commentListElement.appendChild(commentElement);
  }

  return commentListElement;
}
// *******************************************

//  ************* Saving Comments *************
commentsFormElement.addEventListener("submit", saveComment);

async function saveComment(event) {
  event.preventDefault();
  const postId = commentsFormElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const comment = { title: enteredTitle, text: enteredText };

  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      fetchCommentsForPost();
      commentTitleElement.value = "";
      commentTextElement.value = "";
    } else {
      alert("Could not send a comment...");
    }
  } catch (error) {
    alert("Could not send the request....");
  }
}
// *******************************************
