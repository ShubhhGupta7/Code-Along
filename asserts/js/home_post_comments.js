// Let's implement this via classes 

// this class would be initialized for every post on the page
// 1. When the page Loads.
// 2. Creation of every post dynamically via AJAX

class PostComments {
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;

        // call for the existing comments
        $(` .delete-comment-button`, this.postContainer).each(function() {
            self.deleteComment($(this));
        });
    }

    createComment(postId) {
        let pSelf = this;
        this.newCommentForm.submit(function(event) {
            event.preventDefault();

            let self = this;
            
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),

                success: function(data) {
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    new ToggleLike($(' .toggle-like-button', newComment));
                    new Noty({
                        theme: 'relax',
                        text: 'Comment published!',
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

    newCommentDom = function(comment) {
        return $(`
            <li id="comment-${comment._id}" class="comment">
                <div class="comment-header">
                    <div class="comment-heading">
                        <h4> ${comment.user.name} </h4>
                    </div>
            
                    <div class="comment-options-dropdown" style="float: right;" >
                        <i class="fas fa-ellipsis-h" id="dropdown-btn" style="font-size: 0.7rem"></i>
                        <div class="comment-options-dropdown-content" >
                            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">Delete</a>
                        </div>
                    </div>
                </div>
                <p> ${comment.content } </p>

                <div class="action-bar">
                    <div class="action-container">      
                        <div class = "actions">
                            <div><a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment"> <i class="far fa-heart">
                                <span> <p style="display: inline-block;"> 0 likes</p></span>
                            </i></a> </div>
                        </div>
                    </div>
                </div>
            </li>
        `);
    }

    deleteComment(deleteLink) {
        $(deleteLink).click(function(event) {
            event.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),


                success: function(data) {
                    console.log(data.data);
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: 'Comment Deleted',
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
}