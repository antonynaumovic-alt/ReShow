<?php

session_start();
$_SESSION['name'] = "User";
if(isset($_GET['logout'])){


    $logout_message = "<div class='msgln'><span class='left-info'>User <b class='user-name-left'>". $_SESSION['name'] ."</b> has left the chat session.</span><br></div>";
    file_put_contents("log.html", $logout_message, FILE_APPEND | LOCK_EX);

    session_destroy();
}

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        
        <title>chat test</title>


    </head>
    <body>
    <link rel="stylesheet" href="Chat.css" />>
    <div id="ChatPage">
                <svg className="chatDisplayBox" viewBox="0 0 552 679.386">
                    <path id="chatDisplayBox" d="M 0 0 L 552 0 L 552 679 L 0 679 L 0 0 Z">
                    </path>
                </svg>
                <form>
                    <input type="text" id="chatInput" name="inputChat" placeholder=" Type your message here..."></input>
                </form>

                <button className="sendBtn">Send</button>
                <button className="minimiseBtn"></button>
                <button className="closeBtn"></button>

                <svg className="topBar">
                    <rect id="topBar" rx="0" ry="0" x="0" y="0" width="435" height="54">
                    </rect>
                </svg>

                <img id="close_window" src={exitIcon}/>
                <img id="minimise_window" src={minimiseIcon}/>

                <div id="roomGroupChat">
                    <span>Room Group Chat</span>
                </div>
                <svg className="verticalLine" viewBox="0 0 4 807">
                    <path id="verticalLine" d="M 0 0 L 0 807">
                    </path>
                </svg>
                <svg className="horizontalLine" viewBox="0 0 552 3">
                    <path id="horizontalLine" d="M 0 0 L 552 0">
                    </path>
                </svg>
            </div>

        <div id="wrapper">
            <div id="menu">
                <p class="welcome">Welcome, <b><?php echo $_SESSION['name']; ?></b></p>
                <p class="logout"><a id="exit" href="#">Exit Chat</a></p>
            </div>

            <div id="chatbox">
            <?php
            if(file_exists("log.html") && filesize("log.html") > 0){
                $contents = file_get_contents("log.html");
                echo $contents;
            }
            ?>
            </div>

            <form name="message" action="">
                <input name="usermsg" type="text" id="usermsg" />
                <input name="submitmsg" type="submit" id="submitmsg" value="Send" />
            </form>
        </div>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script type="text/javascript">

            $(document).ready(function () {
                $("#submitmsg").click(function () {
                    var clientmsg = $("#usermsg").val();
                    $.post("post.php", { text: clientmsg });
                    $("#usermsg").val("");
                    return false;
                });

                function loadLog() {
                    var oldscrollHeight = $("#chatbox")[0].scrollHeight - 20;

                    $.ajax({
                        url: "log.html",
                        cache: false,
                        success: function (html) {
                            $("#chatbox").html(html);


                            var newscrollHeight = $("#chatbox")[0].scrollHeight - 20;
                            if(newscrollHeight > oldscrollHeight){
                                $("#chatbox").animate({ scrollTop: newscrollHeight }, 'normal');
                            }
                        }
                    });
                }

                setInterval (loadLog, 2500);

                $("#exit").click(function () {
                    var exit = confirm("Are you sure you want to end the session?");
                    if (exit == true) {
                    window.location = "index.php?logout=true";
                    }
                });
            });
        </script>
    </body>
</html>
<?php
?>