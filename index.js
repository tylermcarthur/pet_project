var testInput = ""
var textbox = $('#textInput')
var textboxBtn = $('#testBtn')
var testcase = ''
var copyBtn = $('#copyBtn')
var player;

function onYouTubeIframeAPIReady(testInput){
    if(testInput != undefined){
        player = new YT.Player('player', {
            height: '99%',
            width: '100%',
            videoId: testInput,
            events: {
             'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
            }
        });
    }
}

function onPlayerReady(event){
    event.target.playVideo();
}
var done = false;
// i dont want this but if i remove it youtube's api yells at me.
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}


// takes the input, cuts off the bits that are unneccsary and plugs it into the player
function runTest(){
    if(textbox.val() != ''){
        let fullText = textbox.val();
        var testInput = fullText.slice(32);    
        
        // sets the copyable text at the bottom of the page
        $('#textToCopy').text(`${exampleP1}"${testInput}"${exampleP2}`)

        // removes the old player
        $('#player').remove();

        //creates a new player that the youtube api can target
        let newplayer = $('<div id="player"><div>')
        $('#videoPlayer').append(newplayer);
        onYouTubeIframeAPIReady(testInput)
    } 
}
//copys the text within copy field
function copyToClipboard(text){
    var copyTest = document.queryCommandSupported('copy');
    if(copyTest === true){
        var copyTextArea = document.createElement("textarea");
        copyTextArea.value = text;
        document.body.appendChild(copyTextArea);
        copyTextArea.select();
        try{
            var successful = document.execCommand('copy')
            var msg = successful ? 'copied' : 'not copied';
        }catch (err){
            console.log('failure')
        }
        $('textarea').remove();
    } else{
        window.prompt('copy it here', text)
    }
}




function copy(){
    var copyText = $('#textToCopy').text();

    copyToClipboard(copyText)
}



$(copyBtn).on('click', copy)

$(textboxBtn).on('click', runTest)

$(textbox).keypress(function(e){
    if(e.which == 13){
        runTest();
    }
})


var exampleP1 = 
`<!DOCTYPE html>
<html>
  <body>
    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <div id="player"></div>

    <script>
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId:`
var exampleP2 = `,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
    </script>
  </body>
</html>`
