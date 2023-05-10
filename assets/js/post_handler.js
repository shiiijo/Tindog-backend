
function addEventListner(user){
    let post_content = "dummy";
    console.log(post_content);
    // upload_post -- id for submit button
    $("#testId").click(function(e){   
        e.preventDefault();
        // post_content = $('#post_content').val();
        let new_message = $('<div>').addClass("carousel-item");
        new_message.append($('<h2>',{
            html: post_content,
        }));
        
        new_message.addClass("testimonial-text");
    
        new_message.append($('<img>',{class:'tes-img',src:`${picture}`}))
    
        new_message.append($('<em>',{
            html:`${username}`
        }));
        
        $("#post-items").append(new_message).addClass("carousel-inner");
        console.log('end')
    });

}

addEventListner();
