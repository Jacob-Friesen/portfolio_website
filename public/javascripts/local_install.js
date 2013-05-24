Portfolio.localInstall = (function($, mozApps, _location, userAgent, mode){
    var settings = {
        manifest: _location + '/portfolio.webapp',// Must be absolute
        message: 'Install Locally',
        attach: (mode === 'desktop') ? '.contact_footer' : '#social_media',
        buttonClass: 'install_local',
        error: 'Email jacob@jacobfriesen.com with the steps you have taken to get here.'
    }

    function installButton(){
        // Create and add the button to the end of the document
        var button = $('<button></button>');
            button[0].innerHTML = settings.message;
            button[0].className = settings.buttonClass;

        $(settings.attach).append(button);
        Portfolio.utility.change_text.register_elements([button]);

        // Handle installing the application via the button
        button.click(function(event){
            var myApp = mozApps.install(settings.manifest);

            // Remove the button when the app is installed
            myApp.onsuccess = function(data) {
                button.remove();
            };

            myApp.onerror = function(error) {
                // A user cancel action
                if (myApp.error.name === 'DENIED')
                    return true;

                // A user reinstall
                if (myApp.error.name === 'REINSTALL_FORBIDDEN')
                    alert('This app has already been installed on your device.');
                else
                    alert('Error: ' + myApp.error.name + '\n' + settings.error);
            };
        });
    }

    return function(){
        if (mozApps && mozApps.install){
            var request = mozApps.checkInstalled(settings.manifest);
                request.onsuccess = function() {
                    if (!request.result) installButton();
                };
        }
    }
})($, navigator.mozApps, 'http://' + window.location.host, navigator.userAgent, Portfolio.selector.get_mode());