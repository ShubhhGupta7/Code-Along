// create a class of a toggle likes when a link is clicked, using AJAX

class ToggleLike {
    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike() {
        $(this.toggler).click(function(e) {
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax
            $.ajax({
                type: 'POST',
                url: $(self).attr('href')
            })
            .done(function(data) {
                let likeCount = parseInt($(self).attr('data-likes'));
                console.log(likeCount);

                if(data.data.deleted == true) {
                    likeCount -= 1;

                    // $(self).html('<i class="far fa-heart" style="color: black;"></i>');
                    $(self).html(`<i class="far fa-heart" style="color: black;">
                    <span> <p> ${likeCount} likes</p></span>
                </i>`);
                } else {
                    likeCount += 1;

                    // $(self).html('<i class="fas fa-heart" style="color: red;" ></i>');
                    $(self).html(`<i class="fas fa-heart" style="color: red;">
                    <span> <p> ${likeCount} likes</p></span>
                </i>`);
                }
                $(self).attr('data-likes', likeCount);
            }).fail(function(errData) {
                console.log('error in completing the request ');
            });
        })
    }
}