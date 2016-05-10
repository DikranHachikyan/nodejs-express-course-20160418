$(document).ready( function(){
	var rootRef = new Firebase( 'https://mushop.firebaseio.com/');
	$('#login-btn').on('click', function(event){

		rootRef.authWithPassword({
			'email': $('#mail').val(),
			'password': $('#passwd').val()
		}, function(error, authData){
			if( authData)
			{
				var frmData = new FormData();
				frmData.append('token', authData.token);
				$.post({
					url: '/user/try-login/',
					data: frmData,
					contentType: false,
					processData:false,
					success: function(data){
						console.log('ok!');
						window.location = data.redirect;
					}// on success
				});
				console.log('auth:', authData);
			}
		});//authenticate

	});// on click login button
});