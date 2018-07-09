$.ajax({
    url: '/api/list',
    dataType: 'json',
    success: function(json) {
        consoel.log(json)
    }
});