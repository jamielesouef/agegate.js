#JS Age Gate
This little guy was created to for a bunch of alchole related websites that I've worked on. The issue we faced using PHP as the Age Gate processor was caching - each and every page had to be validated and caused all sorts of issues. Hence what **JS Age Gate** was created.

###How to use:

As this needs to fire before any other code loads, it must to go in the header of the site and not as a seperate file include. It ***must*** parse straight away or else restricted content might be seen. 

Also, so that any other scripts can access it, I reccommend adding it as a global object

	<script>
	    window.ageGate = new AgeGate(18,'myNewAgeGate');

	    var cookie = ageGate.getCookie(),
	        dateForm = document.getElementById('dob'),
	        message = document.getElementById('message'),
	        button = document.getElementById('saveCookie');

	    if ( cookie && cookie === 'ageCheckValid=true' ){
	       message.innerHTML = 'Welcome back!'
	       dateForm.remove();
	    } else {
	        message.innerHTML = 'We need to check your age';
	        dateForm.addEventListener('change', function(){
	           var value = dateForm.value.split('-'),
	                date = new Date(value[0],value[1],value[2],0,0,0,0),
	                valid = false;

	            valid = ageGate.validate(date);
	            if (valid){
	                message.innerHTML = 'Enjoy your visit';
	                button.addEventListener('click', function(e){
	                    e.preventDefault();
	                    dateForm.style.display = 'none';
	                    ageGate.setCookieAsValid();
	                })
	                button.style.display = 'block';
	            } else {
	                message.innerHTML = 'Too young bra!';
	                button.style.display = 'none';
	            }
	        })
	    }
	</script>   	
And you're done!

Use this in conjunction with `<noscript>` in order to block what you don't want seen if the user has Javascript turned off
