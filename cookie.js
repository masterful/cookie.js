/* Just a small wrapper for handling the cookies for settings, relies on jQuery's extend */

var   settings	= {
		// Default settings
		  username		: 'jdoe'
		, name			: 'John Doe'
		, userID		: 123
		// Since JSON doesn't encode functions, this function is gracefully removed and only the settings persist when loaded in from the cookie
		, save			: function() {
			// Save the current settings in a cookie:
			document.cookie	= 'settings=' + JSON.stringify(this);
		}
	}
	, cookies	= document.cookie.split(';');

// Now extend the above with whatever's in the cookie: (overwrite defaults)
for ( var i in cookies ) {
	// Is this the settings cookie?
	if (/^\s*settings=/.test(cookies[i]) ) {
		jQuery.extend( settings, JSON.parse(cookies[i].substring(cookies[i].indexOf('=')+1)) )
		// Save it after to preserve the cookie longer
			.save();
		break;	//No sense waiting around once we've found our settings cookie.
	}
}

// Use the settings to save new preferences/settings
settings.preferences	= { theme : 'white' };
settings.rememberMe		= true;
settings.save();