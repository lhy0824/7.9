$.ajax({
    url: '/api/list',
    dataType: 'json',
    success: function(json) {
        console.log(json)
    }
});