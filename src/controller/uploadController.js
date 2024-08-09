import uploadImageToFirebase from "../services/uploadService.js";

const uploadImage = async (req, res) => {
  try {
    console.log("Request Files:", req.file); // Log received file
    console.log("Request Body:", req.body); // Log request body (if any)

    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded." });
    }

    const publicUrl = await uploadImageToFirebase(req.file);
    console.log("Public URL:", publicUrl);
    res.status(200).send({ imageUrl: publicUrl });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
};

export default uploadImage;
