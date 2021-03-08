<!DOCTYPE html>
<html>
<head>
    <h1>Calendar<h1>
    

    <meta charset="utf-8" />
</head>
<body>
<p>Upcomming events.</p>


<button id="authorize_button" style="display: none;">Authorize</button>
<button id="signout_button" style="display: none;">Sign Out</button>
<button id="showless_button" style="display: none">Show Less</button>
<button id="showmore_button" style="display: none">Show More</button>

<pre id="content" style="white-space: pre-wrap;"></pre>

<script type="text/javascript">
    
    var CLIENT_ID = '156367547920-clartpt52dfgvr2dsht9u0vaoid5mm75.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyAfrnZVcJp1YKRwd940ofe-y7XIKTvMSPk';

        
        var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

        var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

        var authorizeButton = document.getElementById('authorize_button');
        var signoutButton = document.getElementById('signout_button');
        var showlessButton = document.getElementById('showLess_button');
        var showmoreButton = document.getElementById('showMore_button');

        var eventNum = 10;
       
        function handleClientLoad() {
            gapi.load('client:auth2', initClient);
        }

        
        function initClient() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            }).then(function () {
               
                gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

                
                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                authorizeButton.onclick = handleAuthClick;
                signoutButton.onclick = handleSignoutClick;
            }, function(error) {
                appendPre(JSON.stringify(error, null, 2));
            });
        }

       
        function updateSigninStatus(isSignedIn) {
            if (isSignedIn) {
            authorizeButton.style.display = 'none';
            signoutButton.style.display = 'block';
            listUpcomingEvents();
        } else {
            authorizeButton.style.display = 'block';
            signoutButton.style.display = 'none';
        }
        }

       
        function handleAuthClick(event) {
            gapi.auth2.getAuthInstance().signIn();
        }

        
        function handleSignoutClick(event) {
            gapi.auth2.getAuthInstance().signOut();
        }

        
        function appendPre(message) {
            var pre = document.getElementById('content');
            var textContent = document.createTextNode(message + '\n');
            pre.appendChild(textContent);
        }

        
        function listUpcomingEvents() {
            gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': eventNum,
                'orderBy': 'startTime'
            }).then(function(response) {
                var events = response.result.items;
                appendPre('Upcoming events:');

                if (events.length > 0) {
                    for (i = 0; i < events.length; i++) {
                        var event = events[i];
                        var when = event.start.dateTime;
                        if (!when) {
                            when = event.start.date;
                        }
                        appendPre(event.summary + ' (' + when + ')')
                    }
                } else {
                    appendPre('No upcoming events found.');
                }
            });
        }
        function showMore(){
            if(eventNum < 20){
                eventNum = eventNum + 5;
            }
            listUpcomingEvents()
        }
        function showLess(){
            if(eventNum > 5){
                eventNum = eventNum - 5;
            }
            listUpcomingEvents()

        }

</script>

<button onClick='showLess()'> Show less </button>
<button onClick='showMore()'> Show more </button>

<button onClick="window.location='https://calendar.google.com/calendar/u/0/r?tab=kc';">Google Calendar</button>
<script async defer src="https://apis.google.com/js/api.js"
        onload="this.onload=function(){};handleClientLoad()"
        onreadystatechange="if (this.readyState === 'complete') this.onload()">
</script>
</body>
</html>
