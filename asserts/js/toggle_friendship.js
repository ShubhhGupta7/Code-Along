{   
    // method to add and remove friend using AJAX
    let toggleFriendship = function(toggleLink) {
        // let toggleLink = $('#toggle-friendship');

        $(toggleLink).click(function(event) {
            event.preventDefault();

            let self = this;

            $.ajax({
                type: 'GET',
                url: $(toggleLink).prop('href')
            })
            .done(function(data) {
                console.log('data',data.data.isFriendNow);
                if(data.data.isFriendNow) {
                    $(toggleLink).html(`
                    <button id="remove-friend">
                        Remove
                    </button>
                    `);  
                } else {
                    $(toggleLink).html(`
                    <button id="add-friend">
                        Add
                    </button>
                    `); 
                }
            });
        });
    }

    // toggleFriendship();
    
    
    // Converting all add, remove button to ajax in ejs itself because the like.js is used in diffenet ejs files with different use cases so attacting that use case seperately in each ejs file.

    let convertFriendshipToAjax = function() {
        $('#friend-chat-container ul li').each(function() {
            let self =  $(this);
            console.log(this);
            let addRemoveButton = $(' #toggle-friendship', self);
            toggleFriendship(addRemoveButton);
        });
    }
    convertFriendshipToAjax();
    toggleFriendship($('#toggle-friendship'));
}
