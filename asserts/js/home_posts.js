{
    // method to sumbit the form data from new post using AJAX
    let createPost = function() {
        let newPost = $('#post-form');

        newPost.submit(function(event) {
            event.preventDefault();
            
            $.ajax({
                type: 'post', 
                url: '/posts/create',
                data: newPost.serialize(),

                success: function(data) {
                    let newPost = newPostDom(data.data.post);
                    $('#post-display-container>ul').prepend(newPost);

                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: 'Post published!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500  
                    }).show();
                },

                error: function(error) {
                    console.log(error.responseText);
                }

            }); 
        })
    }

    // method to create a post in DOM
    let newPostDom = function(post) {
        return $(`  
        <li id="post-${post._id}" class="sub-container">    
        <div class="post-header">
            <div class="post-heading">
                <h4> ${post.user.name} </h4>
            </div>
    
            <div class="post-options-dropdown" style="float: right;" >
                <i class="fas fa-ellipsis-h" id="dropdown-btn" style="font-size: 0.7rem"></i>
                <div class="post-options-dropdown-content" >
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
                </div>
            </div>
        </div>
        
            
        </h4>
        <p> ${ post.content } </p>
        <div id='form-container'>
            <form action="/comments/create" id="post-${post._id}-comments-form" method="POST" class="comment-form">
                <div>
                    <textarea name="content" id="text-area" cols="20" rows="1" placeholder="Write a comment..." required></textarea>
                </div>
                <input type="hidden" value = "${post._id}" name = "post">
                <div>
                    <button type="submit">Post Comment</button>
                </div>
            </form>
        </div> 
        
        <div class="action-bar">
            <div class="action-container">      
                <div class = "actions">
                    <div><a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post"> <i class="far fa-heart">
                        <span> <p style="display: inline-block;"> 0 likes</p></span>
                    </i></a> </div>
                </div>
            </div>
        </div>

        <h4>Comments</h4>
        <div id="comments-display-container">
            <ul id="post-comments-${post._id}">
            </ul>
        </div>
    
    </li>
        `);
    }

    // method to delete a post from DOM
    let deletePost = function(deleteLink) {
        $(deleteLink).click(function(event) {
            event.preventDefault();

                $.ajax({
                    type: 'get',
                    url: $(deleteLink).prop('href'),

                    success: function(data) {
                        console.log('success');
                        $(`#post-${data.data.post_id}`).remove();
                        new Noty({
                            theme: 'relax',
                            text: 'Post Deleted',
                            type: 'success',
                            layout: 'topRight',
                            timeout: 1500
                        }).show();
                    },
                    
                    error: function(error) {
                        console.log(error.responseText);
                    }
                });
        });
    }

    // Loop over all the existing posts on the page (When the window loads for the first time) and call the delete post method on the delete link of each, and also add AJAX(using the class we've created) to the deleted button of each

    let convertPostsToAjax = function() {
        $('#post-display-container>ul>li').each(function() {
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self = self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();
}