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
    <?php

    ?>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:100">
        <div id="wrapper">
            <div id="menu">
                <p class="welcome" style="font-family: 'Montserrat', serif;
                                          font-size: 24px;
                                          font-style: normal;
                                          font-weight: normal;">Welcome, <b><?php echo $_SESSION['name']; ?></b></p>
                <p class="logout"><a id="exit" href="#" style= "font-family: 'Montserrat', serif;
                    font-size: 20px;
                    font-style: normal;
                    font-weight: normal;
                    background-color: #bb0A21;
                    color: white;
                    padding: 6px;
                    border: 2px solid black;
                    border-radius: 18px;
                    cursor: pointer;
                    text-align: center;
                    text-transform: uppercase;">Exit Chat</a></p>
            </div>

            <div id="chatbox" style="font-family: 'Montserrat', serif;
                                     font-size: 14px
                                     font-style: normal;
                                     font-weight: normal;">
            <?php
            if(file_exists("log.html") && filesize("log.html") > 0){
                $contents = file_get_contents("log.html");
                echo $contents;
            }
            ?>
            </div>

            <form name="message" action="" style="font-family: 'Montserrat', serif; 
                                                  font-size: 14px;
                                                  font-style: normal;
                                                  color: black;">
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
