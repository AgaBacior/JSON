// Create all post elements based on the information from db.json 
function createPost (data) { 
	var pAuthor = document.createElement('p');
	var textAuthor = document.createTextNode(data.author);
	pAuthor.appendChild(textAuthor);

	var hTitle = document.createElement('h2');
	var textTitle = document.createTextNode(data.title);
	hTitle.appendChild(textTitle);

	var pContent = document.createElement('p');
	var textContent = document.createTextNode(data.content);
	pContent.appendChild(textContent);

	var articleBox = document.createElement('article');
	articleBox.appendChild(pAuthor);
	articleBox.appendChild(hTitle);
	articleBox.appendChild(pContent);
	
	return articleBox;
}
// Add all posts to DOM
function addPosts (data){
		
	// Call the function createPost for each post 
	for (var i = 0, c = data.length; i < c; i++) {
		var post = data[i];

		var postElem = createPost(post);
		sectionPost.appendChild(postElem);
	}
}
// Add last post to DOM 
function addLastPost (data) {
		var postElem = createPost(data[data.length-1]);
		sectionPost.appendChild(postElem);
}
// Creation of posts on the page
$.ajax({
	url:'/posts',
	success:addPosts
});

// Two variables globals
var sectionPost = document.getElementById('sectionPost');
var form = document.getElementById('submitPost');

// After submit form - recovery and placement the data in db.json 
// Success - call the function recoverPost
form.addEventListener('submit', function(e) {
	e.preventDefault();
	$.ajax({
		url:'/posts',
		method: 'POST',
		data: $(form).serialize(),
		success:recoverPost
	});
});

// call the function which adds last post to DOM 
function recoverPost () {
	$.ajax({
		url:'/posts',
		success:addLastPost
	});
}