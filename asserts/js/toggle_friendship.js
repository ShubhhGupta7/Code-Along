{   
    // method to add and remove friend using AJAX
    let toggleFriendship = function() {
        let toggleLink = $('#toggle-friendship');
        let toggleButton = $('.friendship-toggle-button');

        toggleLink.click(function(event) {
            event.preventDefault();

            let self = this;

            $.ajax({
                type: 'GET',
                url: $(self).attr('href')
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

    toggleFriendship();
}

