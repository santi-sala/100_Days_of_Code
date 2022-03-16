const filePickerElement = document.getElementById("image");
const imagePreviewElement = document.getElementById("image-preview");

filePickerElement.addEventListener("change", showPreview);

function showPreview() {
  const files = filePickerElement.files;
  if (!files || files.legth === 0) {
    imagePreviewElement.style.display = "none";
    return;
  }

  const pickedFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = "block";
}
