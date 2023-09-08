(function() {
	const txtEmail = document.getElementById('account');
	const txtPassword = document.getElementById('password');
	const btnSignUp = document.getElementById('signButton');
	const btnLogin = document.getElementById('LogIn');
	const btnGoogleLogin = document.getElementById('LogInWithGoogle');

	//Login into watrago
	btnLogin.addEventListener('click', e => {
		// Get email and password
		const email = txtEmail.value;
		const password = txtPassword.value;
		const auth = firebase.auth();
		const name = email.split("@")[0];
		console.log("try to sign in");
		// Sign in
		const promise = auth.signInWithEmailAndPassword(email, password).then(e => {
			window.alert("您好, "+name);
			window.location.href = 'index.html';
			
		});
		promise.catch(e => window.alert(e.message));
	});

	//Register an account
	btnSignUp.addEventListener('click', e => {
		//Get email and password
		//TODO: check real email
		const email = txtEmail.value;
		const password = txtPassword.value;
		const auth = firebase.auth();
		// Sign in
		const promise = auth.createUserWithEmailAndPassword(email, password);
		const name = email.split("@")[0];
		promise.then(e => {
			firestore.collection("user").doc(email).set({
    			user_mail : email,
    			user_name : name,
				user_ig_google:5,
				user_time_range:true,
				like:[],
				Collection:[]
  			}).then(e => {
				window.alert("您好, "+name);
				window.location.href = 'index.html';
  			});
			
		});
  		promise.catch(e => window.alert("Got an error: " + e.message));

	});
	
	btnGoogleLogin.addEventListener('click', e =>{
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(result => {
 			var token = result.credential.accessToken;
  			// The signed-in user info.
			let user = result.user;
  			let email = user.email;
  			let name = user.displayName;
  			//console.log(user);
  			firestore.collection("user").doc(email).set({
    			user_mail : email,
    			user_name : name,
				user_ig_google:5,
				user_time_range:true,
				like:[],
				Collection:[]
  			}).then(e =>{
					window.alert("您好, "+name);
					window.location.href = 'index.html';
			});
		}).catch(function(error) {
  			// Handle Errors here.
  			var errorCode = error.code;
  			var errorMessage = error.message;
  			// The email of the user's account used.
  			var email = error.email;
  			// The firebase.auth.AuthCredential type that was used.
  			var credential = error.credential;
  			// ...
		});
	});

	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			//window.alert("您好, " + firebaseUser.email);
			console.log(firebaseUser);
	


  			txtEmail.value = "";
			txtPassword.value = "";
			//btnSignOut.style.visibility = 'visible';
		}else{
			console.log('not logged in.');
			//btnSignOut.style.visibility = 'hidden';
		}
	});

}());