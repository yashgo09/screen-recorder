const stopButton = document.querySelector(".stop");

async function record() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
  });

  const chunk = [];

  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.start();

  mediaRecorder.addEventListener("dataavailable", (e) => {
    chunk.push(e.data);
  });

  mediaRecorder.addEventListener("stop", (e) => {
    const videoURL = URL.createObjectURL(
      new Blob(chunk, {
        type: chunk[0].type,
      })
    );
    document.querySelector("video").src = videoURL;
    document.querySelector(".download").href = videoURL;
  });

  stopButton.addEventListener("click", () => mediaRecorder.stop());
}

const recordButton = document.querySelector(".record");

recordButton.addEventListener("click", record);
