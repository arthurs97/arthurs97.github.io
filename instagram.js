console.log("instagram script loaded");

var token = '5515915196.6e2837d.5cbec0f249fe446b905e84f72cb9d76b',
    num_photos = 6;
 
$.ajax({
    url: 'https://api.instagram.com/v1/users/self/media/recent',
    dataType: 'jsonp',
    type: 'GET',
    data: { access_token: token, count: num_photos },
    success: function(data){
        console.log(data);
        for (x in data.data) {
            $('#instafeed').append('<li><img src="'+data.data[x].images.standard_resolution.url+'"></li>');
        }
    },
    error: function(data){
        console.log(data);
    }
});