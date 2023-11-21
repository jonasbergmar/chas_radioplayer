// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>

const channelsContainer = document.getElementById("channels-container");

async function fetchData() {
  // Fetch data from Sveriges Radio API
  const response = await fetch(
    "https://api.sr.se/api/v2/channels/?format=json"
  );
  const data = await response.json();

  channelsContainer.innerHTML = "";
  // lista alla kanaler med namn, tagline, bild och färgkod för varje kanal.
  data.channels.forEach((channel) => {
    const channelDiv = document.createElement("div");
    channelDiv.setAttribute("class", "channel");

    // Display channel name
    const nameElement = document.createElement("h1");
    nameElement.textContent = channel.name;
    channelDiv.appendChild(nameElement);

    // Display channel image
    const imageElement = document.createElement("img");
    imageElement.src = channel.image;
    channelDiv.appendChild(imageElement);

    channelDiv.style.backgroundColor = `#${channel.color}`;

    // Add audio element for live stream
    const audioPlayerElement = document.createElement("audio");
    audioPlayerElement.controls = true;
    const audioSourceElement = document.createElement("source");
    audioSourceElement.src = channel.liveaudio.url;
    audioSourceElement.type = "audio/mpeg";

    audioPlayerElement.appendChild(audioSourceElement);
    channelDiv.appendChild(audioPlayerElement);
    channelsContainer.appendChild(channelDiv);
  });
}

//skeleton loader
function skeletonLoader(skeleton) {
  for (let i = 0; i < 10; i++) {
    const skeleton = document.createElement("div");
    skeleton.setAttribute("class", "skeleton");
    const skeletonImg = document.createElement("img");
    const skeletonText = document.createElement("h1");
    const skeletonAudio = document.createElement("div");
    channelsContainer.appendChild(skeleton);
    skeleton.appendChild(skeletonImg);
    skeleton.appendChild(skeletonText);
    skeleton.appendChild(skeletonAudio);
  }
}
// Call the async function
fetchData();
skeletonLoader();
