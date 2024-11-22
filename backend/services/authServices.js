const bcrypt = require("bcrypt");
const admin = require("firebase-admin");
const db = admin.firestore();
const adminCollection = db.collection("admins");

const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if admin already exists
    const querySnapshot = await adminCollection.where("email", "==", email).get();
    if (!querySnapshot.empty) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save admin to Firestore using an auto-generated ID
    await adminCollection.add({ email, password: hashedPassword });

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering admin", error: error.message });
  }
};


const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const querySnapshot = await adminCollection
      .where("email", "==", email)
      .get();
    if (querySnapshot.empty) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const doc = querySnapshot.docs[0];

    // Validate password
    const isValid = await bcrypt.compare(password, doc.data().password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Admin logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

module.exports = { registerAdmin, loginAdmin };
